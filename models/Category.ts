import mongoose, { type Document, Schema } from "mongoose"

export interface ICategory extends Document {
  name: string
  slug: string
  description?: string
  image?: string
  parent?: mongoose.Types.ObjectId
  isActive: boolean
  sortOrder: number
  seoTitle?: string
  seoDescription?: string
  createdAt: Date
  updatedAt: Date
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Nome da categoria é obrigatório"],
      trim: true,
      maxlength: [50, "Nome não pode ter mais de 50 caracteres"],
    },
    slug: {
      type: String,
      required: [true, "Slug é obrigatório"],
      unique: true,
      lowercase: true,
      match: [/^[a-z0-9-]+$/, "Slug deve conter apenas letras minúsculas, números e hífens"],
    },
    description: {
      type: String,
      maxlength: [500, "Descrição não pode ter mais de 500 caracteres"],
    },
    image: {
      type: String,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    seoTitle: {
      type: String,
      maxlength: [60, "Título SEO não pode ter mais de 60 caracteres"],
    },
    seoDescription: {
      type: String,
      maxlength: [160, "Descrição SEO não pode ter mais de 160 caracteres"],
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
CategorySchema.index({ slug: 1 })
CategorySchema.index({ parent: 1, isActive: 1 })
CategorySchema.index({ sortOrder: 1 })

export default mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema)
