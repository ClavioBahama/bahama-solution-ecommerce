import mongoose, { type Document, Schema } from "mongoose"

export interface IProduct extends Document {
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: mongoose.Types.ObjectId
  brand: string
  sku: string
  stock: number
  isActive: boolean
  isFeatured: boolean
  specifications: Record<string, any>
  tags: string[]
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  seoTitle?: string
  seoDescription?: string
  averageRating: number
  totalReviews: number
  createdAt: Date
  updatedAt: Date
}

const DimensionsSchema = new Schema({
  length: { type: Number, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
})

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Nome do produto é obrigatório"],
      trim: true,
      maxlength: [100, "Nome não pode ter mais de 100 caracteres"],
    },
    description: {
      type: String,
      required: [true, "Descrição é obrigatória"],
      maxlength: [2000, "Descrição não pode ter mais de 2000 caracteres"],
    },
    price: {
      type: Number,
      required: [true, "Preço é obrigatório"],
      min: [0, "Preço não pode ser negativo"],
    },
    originalPrice: {
      type: Number,
      min: [0, "Preço original não pode ser negativo"],
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Categoria é obrigatória"],
    },
    brand: {
      type: String,
      required: [true, "Marca é obrigatória"],
      trim: true,
    },
    sku: {
      type: String,
      required: [true, "SKU é obrigatório"],
      unique: true,
      uppercase: true,
    },
    stock: {
      type: Number,
      required: [true, "Estoque é obrigatório"],
      min: [0, "Estoque não pode ser negativo"],
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    specifications: {
      type: Schema.Types.Mixed,
      default: {},
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    weight: {
      type: Number,
      min: [0, "Peso não pode ser negativo"],
    },
    dimensions: DimensionsSchema,
    seoTitle: {
      type: String,
      maxlength: [60, "Título SEO não pode ter mais de 60 caracteres"],
    },
    seoDescription: {
      type: String,
      maxlength: [160, "Descrição SEO não pode ter mais de 160 caracteres"],
    },
    averageRating: {
      type: Number,
      default: 0,
      min: [0, "Avaliação não pode ser menor que 0"],
      max: [5, "Avaliação não pode ser maior que 5"],
    },
    totalReviews: {
      type: Number,
      default: 0,
      min: [0, "Total de avaliações não pode ser negativo"],
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for better performance
ProductSchema.index({ name: "text", description: "text", tags: "text" })
ProductSchema.index({ category: 1, isActive: 1 })
ProductSchema.index({ brand: 1, isActive: 1 })
ProductSchema.index({ price: 1 })
ProductSchema.index({ averageRating: -1 })
ProductSchema.index({ createdAt: -1 })
ProductSchema.index({ isFeatured: 1, isActive: 1 })

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema)
