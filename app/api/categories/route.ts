import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Category from "@/models/Category"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const includeInactive = searchParams.get("includeInactive") === "true"

    const query = includeInactive ? {} : { isActive: true }

    const categories = await Category.find(query).populate("parent", "name slug").sort({ sortOrder: 1, name: 1 }).lean()

    return NextResponse.json({
      success: true,
      data: categories,
    })
  } catch (error) {
    console.error("Categories fetch error:", error)
    return NextResponse.json({ error: "Erro ao buscar categorias" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const categoryData = await request.json()

    // Generate slug from name if not provided
    if (!categoryData.slug && categoryData.name) {
      categoryData.slug = categoryData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
    }

    const category = new Category(categoryData)
    await category.save()

    const populatedCategory = await Category.findById(category._id).populate("parent", "name slug")

    return NextResponse.json(
      {
        success: true,
        data: populatedCategory,
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Category creation error:", error)

    if (error.code === 11000) {
      return NextResponse.json({ error: "Slug já existe" }, { status: 409 })
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json({ error: messages.join(", ") }, { status: 400 })
    }

    return NextResponse.json({ error: "Erro ao criar categoria" }, { status: 500 })
  }
}
