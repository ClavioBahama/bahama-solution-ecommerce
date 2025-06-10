import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Product from "@/models/Product"
import Category from "@/models/Category"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")
    const category = searchParams.get("category")
    const brand = searchParams.get("brand")
    const minPrice = Number.parseFloat(searchParams.get("minPrice") || "0")
    const maxPrice = Number.parseFloat(searchParams.get("maxPrice") || "999999")
    const search = searchParams.get("search")
    const sort = searchParams.get("sort") || "createdAt"
    const order = searchParams.get("order") === "asc" ? 1 : -1
    const featured = searchParams.get("featured") === "true"

    // Build query
    const query: any = { isActive: true }

    if (category) {
      const categoryDoc = await Category.findOne({ slug: category })
      if (categoryDoc) {
        query.category = categoryDoc._id
      }
    }

    if (brand) {
      query.brand = new RegExp(brand, "i")
    }

    if (minPrice || maxPrice) {
      query.price = { $gte: minPrice, $lte: maxPrice }
    }

    if (search) {
      query.$text = { $search: search }
    }

    if (featured) {
      query.isFeatured = true
    }

    // Calculate skip
    const skip = (page - 1) * limit

    // Build sort object
    const sortObj: any = {}
    sortObj[sort] = order

    // Execute query
    const products = await Product.find(query)
      .populate("category", "name slug")
      .sort(sortObj)
      .skip(skip)
      .limit(limit)
      .lean()

    // Get total count for pagination
    const total = await Product.countDocuments(query)

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Products fetch error:", error)
    return NextResponse.json({ error: "Erro ao buscar produtos" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const productData = await request.json()

    // Validate required fields
    const requiredFields = ["name", "description", "price", "category", "brand", "sku"]
    for (const field of requiredFields) {
      if (!productData[field]) {
        return NextResponse.json({ error: `${field} é obrigatório` }, { status: 400 })
      }
    }

    // Check if category exists
    const category = await Category.findById(productData.category)
    if (!category) {
      return NextResponse.json({ error: "Categoria não encontrada" }, { status: 400 })
    }

    // Check if SKU already exists
    const existingProduct = await Product.findOne({ sku: productData.sku })
    if (existingProduct) {
      return NextResponse.json({ error: "SKU já existe" }, { status: 409 })
    }

    const product = new Product(productData)
    await product.save()

    const populatedProduct = await Product.findById(product._id).populate("category", "name slug")

    return NextResponse.json(
      {
        success: true,
        data: populatedProduct,
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Product creation error:", error)

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json({ error: messages.join(", ") }, { status: 400 })
    }

    return NextResponse.json({ error: "Erro ao criar produto" }, { status: 500 })
  }
}
