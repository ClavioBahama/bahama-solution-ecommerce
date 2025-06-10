import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import connectDB from "@/lib/mongodb"
import Order from "@/models/Order"
import Product from "@/models/Product"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

function generateOrderNumber(): string {
  const timestamp = Date.now().toString()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `BS${timestamp.slice(-6)}${random}`
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Token de acesso necessário" }, { status: 401 })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status")

    // Build query
    const query: any = {}

    // If not admin, only show user's orders
    if (decoded.role !== "admin") {
      query.user = decoded.userId
    }

    if (status) {
      query.status = status
    }

    const skip = (page - 1) * limit

    const orders = await Order.find(query)
      .populate("user", "name email")
      .populate("items.product", "name images")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    const total = await Order.countDocuments(query)

    return NextResponse.json({
      success: true,
      data: orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Orders fetch error:", error)
    return NextResponse.json({ error: "Erro ao buscar pedidos" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Token de acesso necessário" }, { status: 401 })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any
    const orderData = await request.json()

    // Validate required fields
    const requiredFields = ["items", "shippingAddress", "paymentMethod"]
    for (const field of requiredFields) {
      if (!orderData[field]) {
        return NextResponse.json({ error: `${field} é obrigatório` }, { status: 400 })
      }
    }

    // Validate and calculate totals
    let totalAmount = 0
    const validatedItems = []

    for (const item of orderData.items) {
      const product = await Product.findById(item.product)

      if (!product) {
        return NextResponse.json({ error: `Produto ${item.product} não encontrado` }, { status: 400 })
      }

      if (product.stock < item.quantity) {
        return NextResponse.json({ error: `Estoque insuficiente para ${product.name}` }, { status: 400 })
      }

      const itemTotal = product.price * item.quantity
      totalAmount += itemTotal

      validatedItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.images[0] || "",
      })

      // Update product stock
      await Product.findByIdAndUpdate(product._id, { $inc: { stock: -item.quantity } })
    }

    const shippingAmount = orderData.shippingAmount || 15.99
    const taxAmount = orderData.taxAmount || totalAmount * 0.1
    const finalAmount = totalAmount + shippingAmount + taxAmount

    // Create order
    const order = new Order({
      user: decoded.userId,
      orderNumber: generateOrderNumber(),
      items: validatedItems,
      totalAmount,
      shippingAmount,
      taxAmount,
      finalAmount,
      paymentMethod: orderData.paymentMethod,
      paymentDetails: orderData.paymentDetails || {},
      shippingAddress: orderData.shippingAddress,
      notes: orderData.notes,
    })

    await order.save()

    const populatedOrder = await Order.findById(order._id)
      .populate("user", "name email")
      .populate("items.product", "name images")

    return NextResponse.json(
      {
        success: true,
        data: populatedOrder,
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Order creation error:", error)

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json({ error: messages.join(", ") }, { status: 400 })
    }

    return NextResponse.json({ error: "Erro ao criar pedido" }, { status: 500 })
  }
}
