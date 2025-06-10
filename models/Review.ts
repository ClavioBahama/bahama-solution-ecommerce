import mongoose, { type Document, Schema } from "mongoose"

export interface IReview extends Document {
  user: mongoose.Types.ObjectId
  product: mongoose.Types.ObjectId
  rating: number
  title: string
  comment: string
  images?: string[]
  isVerifiedPurchase: boolean
  isApproved: boolean
  helpfulVotes: number
  createdAt: Date
  updatedAt: Date
}

const ReviewSchema = new Schema<IReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: {
      type: Number,
      required: [true, "Avaliação é obrigatória"],
      min: [1, "Avaliação deve ser pelo menos 1"],
      max: [5, "Avaliação não pode ser maior que 5"],
    },
    title: {
      type: String,
      required: [true, "Título é obrigatório"],
      trim: true,
      maxlength: [100, "Título não pode ter mais de 100 caracteres"],
    },
    comment: {
      type: String,
      required: [true, "Comentário é obrigatório"],
      maxlength: [1000, "Comentário não pode ter mais de 1000 caracteres"],
    },
    images: [
      {
        type: String,
      },
    ],
    isVerifiedPurchase: {
      type: Boolean,
      default: false,
    },
    isApproved: {
      type: Boolean,
      default: true,
    },
    helpfulVotes: {
      type: Number,
      default: 0,
      min: [0, "Votos úteis não podem ser negativos"],
    },
  },
  {
    timestamps: true,
  },
)

// Compound index to prevent duplicate reviews
ReviewSchema.index({ user: 1, product: 1 }, { unique: true })
ReviewSchema.index({ product: 1, isApproved: 1 })
ReviewSchema.index({ rating: -1 })
ReviewSchema.index({ createdAt: -1 })

export default mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema)
