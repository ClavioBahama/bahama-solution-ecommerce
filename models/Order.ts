import mongoose, { type Document, Schema } from "mongoose"

export interface IOrderItem {
  product: mongoose.Types.ObjectId
  name: string
  price: number
  quantity: number
  image: string
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId
  orderNumber: string
  items: IOrderItem[]
  totalAmount: number
  shippingAmount: number
  taxAmount: number
  finalAmount: number
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded"
  paymentMethod: "mpesa" | "emola" | "card" | "bank" | "cod"
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  paymentDetails?: Record<string, any>
  shippingAddress: {
    fullName: string
    email: string
    phone: string
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  trackingNumber?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const OrderItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Preço não pode ser negativo"],
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantidade deve ser pelo menos 1"],
  },
  image: {
    type: String,
    required: true,
  },
})

const ShippingAddressSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true, default: "Moçambique" },
})

const OrderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    items: [OrderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
      min: [0, "Total não pode ser negativo"],
    },
    shippingAmount: {
      type: Number,
      required: true,
      min: [0, "Frete não pode ser negativo"],
      default: 0,
    },
    taxAmount: {
      type: Number,
      required: true,
      min: [0, "Taxa não pode ser negativa"],
      default: 0,
    },
    finalAmount: {
      type: Number,
      required: true,
      min: [0, "Valor final não pode ser negativo"],
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["mpesa", "emola", "card", "bank", "cod"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    paymentDetails: {
      type: Schema.Types.Mixed,
      default: {},
    },
    shippingAddress: {
      type: ShippingAddressSchema,
      required: true,
    },
    trackingNumber: {
      type: String,
    },
    notes: {
      type: String,
      maxlength: [500, "Notas não podem ter mais de 500 caracteres"],
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
OrderSchema.index({ user: 1, createdAt: -1 })
OrderSchema.index({ orderNumber: 1 })
OrderSchema.index({ status: 1 })
OrderSchema.index({ paymentStatus: 1 })
OrderSchema.index({ createdAt: -1 })

export default mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema)
