// Database seeding script
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/bahama-solution"

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log("✅ Connected to MongoDB")
  } catch (error) {
    console.error("❌ MongoDB connection error:", error)
    process.exit(1)
  }
}

// User Schema
const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ["admin", "customer", "seller"], default: "customer" },
    avatar: String,
    phone: String,
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true },
)

// Category Schema
const CategorySchema = new mongoose.Schema(
  {
    name: String,
    slug: String,
    description: String,
    image: String,
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
)

// Product Schema
const ProductSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    originalPrice: Number,
    images: [String],
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    brand: String,
    sku: String,
    stock: Number,
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
  },
  { timestamps: true },
)

// Create models
const User = mongoose.models.User || mongoose.model("User", UserSchema)
const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema)
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema)

// Seed data
async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...")

    // Clear existing data
    await User.deleteMany({})
    await Category.deleteMany({})
    await Product.deleteMany({})

    console.log("🗑️ Cleared existing data")

    // Create admin user
    const hashedPassword = await bcrypt.hash("123456", 12)

    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@bahamasolution.com",
      password: hashedPassword,
      role: "admin",
      phone: "+258 84 123 4567",
    })

    const customerUser = await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: hashedPassword,
      role: "customer",
      phone: "+258 87 123 4567",
    })

    console.log("👤 Created users")

    // Create categories
    const categories = await Category.insertMany([
      {
        name: "Eletrônicos",
        slug: "eletronicos",
        description: "Smartphones, laptops, tablets e mais",
        image: "/placeholder.svg?height=200&width=200",
        sortOrder: 1,
      },
      {
        name: "Roupas",
        slug: "roupas",
        description: "Moda masculina e feminina",
        image: "/placeholder.svg?height=200&width=200",
        sortOrder: 2,
      },
      {
        name: "Casa & Jardim",
        slug: "casa-jardim",
        description: "Decoração e utensílios para casa",
        image: "/placeholder.svg?height=200&width=200",
        sortOrder: 3,
      },
      {
        name: "Esportes",
        slug: "esportes",
        description: "Equipamentos e roupas esportivas",
        image: "/placeholder.svg?height=200&width=200",
        sortOrder: 4,
      },
      {
        name: "Beleza",
        slug: "beleza",
        description: "Cosméticos e produtos de beleza",
        image: "/placeholder.svg?height=200&width=200",
        sortOrder: 5,
      },
      {
        name: "Livros",
        slug: "livros",
        description: "Literatura, educação e entretenimento",
        image: "/placeholder.svg?height=200&width=200",
        sortOrder: 6,
      },
    ])

    console.log("📂 Created categories")

    // Create products
    const products = [
      {
        name: "Smartphone Premium XZ Pro Max",
        description:
          "Smartphone de última geração com câmera profissional de 108MP, processador octa-core, 256GB de armazenamento e bateria de longa duração.",
        price: 899.99,
        originalPrice: 1199.99,
        images: ["/placeholder.svg?height=300&width=300"],
        category: categories[0]._id, // Eletrônicos
        brand: "TechBrand",
        sku: "TECH-PHONE-001",
        stock: 25,
        isFeatured: true,
        averageRating: 4.8,
        totalReviews: 124,
      },
      {
        name: "Tênis Esportivo Pro Runner",
        description:
          "Tênis profissional para corrida com tecnologia de amortecimento avançada, material respirável e design ergonômico.",
        price: 159.99,
        originalPrice: 199.99,
        images: ["/placeholder.svg?height=300&width=300"],
        category: categories[3]._id, // Esportes
        brand: "SportMax",
        sku: "SPORT-SHOE-001",
        stock: 50,
        isFeatured: true,
        averageRating: 4.6,
        totalReviews: 89,
      },
      {
        name: "Fone Bluetooth Elite Sound",
        description:
          "Fone de ouvido sem fio com cancelamento de ruído ativo, qualidade de som premium e bateria de 30 horas.",
        price: 249.99,
        images: ["/placeholder.svg?height=300&width=300"],
        category: categories[0]._id, // Eletrônicos
        brand: "AudioTech",
        sku: "AUDIO-HEAD-001",
        stock: 35,
        isFeatured: true,
        averageRating: 4.9,
        totalReviews: 156,
      },
      {
        name: "Relógio Inteligente Smart Watch",
        description:
          "Smartwatch com monitoramento de saúde, GPS integrado, resistente à água e compatível com iOS e Android.",
        price: 299.99,
        originalPrice: 399.99,
        images: ["/placeholder.svg?height=300&width=300"],
        category: categories[0]._id, // Eletrônicos
        brand: "WearTech",
        sku: "WEAR-WATCH-001",
        stock: 15,
        isFeatured: true,
        averageRating: 4.7,
        totalReviews: 203,
      },
      {
        name: "Camiseta Premium Cotton",
        description: "Camiseta 100% algodão premium, corte moderno, disponível em várias cores e tamanhos.",
        price: 49.99,
        images: ["/placeholder.svg?height=300&width=300"],
        category: categories[1]._id, // Roupas
        brand: "FashionCo",
        sku: "FASH-SHIRT-001",
        stock: 100,
        averageRating: 4.4,
        totalReviews: 67,
      },
      {
        name: "Notebook Gamer Ultra",
        description: "Notebook para jogos com placa de vídeo dedicada, processador Intel i7, 16GB RAM e SSD 512GB.",
        price: 1299.99,
        originalPrice: 1599.99,
        images: ["/placeholder.svg?height=300&width=300"],
        category: categories[0]._id, // Eletrônicos
        brand: "GameTech",
        sku: "GAME-LAPTOP-001",
        stock: 8,
        averageRating: 4.9,
        totalReviews: 45,
      },
      {
        name: "Sofá Moderno 3 Lugares",
        description:
          "Sofá confortável com design moderno, estofado em tecido de alta qualidade, perfeito para sala de estar.",
        price: 799.99,
        images: ["/placeholder.svg?height=300&width=300"],
        category: categories[2]._id, // Casa & Jardim
        brand: "HomeCorp",
        sku: "HOME-SOFA-001",
        stock: 12,
        averageRating: 4.5,
        totalReviews: 34,
      },
      {
        name: "Kit Maquiagem Profissional",
        description:
          "Kit completo de maquiagem com pincéis profissionais, paleta de sombras, base e batom de longa duração.",
        price: 129.99,
        images: ["/placeholder.svg?height=300&width=300"],
        category: categories[4]._id, // Beleza
        brand: "BeautyPro",
        sku: "BEAUTY-KIT-001",
        stock: 40,
        averageRating: 4.6,
        totalReviews: 78,
      },
      {
        name: "Livro: Programação Web Moderna",
        description: "Guia completo sobre desenvolvimento web moderno com React, Node.js e tecnologias atuais.",
        price: 59.99,
        images: ["/placeholder.svg?height=300&width=300"],
        category: categories[5]._id, // Livros
        brand: "TechBooks",
        sku: "BOOK-PROG-001",
        stock: 25,
        averageRating: 4.8,
        totalReviews: 92,
      },
      {
        name: "Bicicleta Mountain Bike Pro",
        description: "Bicicleta mountain bike com quadro de alumínio, 21 marchas e suspensão dianteira.",
        price: 599.99,
        originalPrice: 799.99,
        images: ["/placeholder.svg?height=300&width=300"],
        category: categories[3]._id, // Esportes
        brand: "BikePro",
        sku: "BIKE-MTB-001",
        stock: 18,
        averageRating: 4.7,
        totalReviews: 56,
      },
    ]

    await Product.insertMany(products)

    console.log("📦 Created products")
    console.log("✅ Database seeding completed successfully!")
    console.log("\n📊 Summary:")
    console.log(`- Users: ${await User.countDocuments()}`)
    console.log(`- Categories: ${await Category.countDocuments()}`)
    console.log(`- Products: ${await Product.countDocuments()}`)
    console.log("\n👤 Test Accounts:")
    console.log("Admin: admin@bahamasolution.com / 123456")
    console.log("Customer: john@example.com / 123456")
  } catch (error) {
    console.error("❌ Seeding error:", error)
  } finally {
    await mongoose.connection.close()
    console.log("🔌 Database connection closed")
  }
}

// Run seeding
connectDB().then(seedDatabase)
