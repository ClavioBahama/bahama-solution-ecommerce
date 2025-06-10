"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: "1",
    name: "Maria Silva",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    comment: "Excelente qualidade dos produtos e entrega super rápida. Recomendo!",
    product: "Smartphone Premium XZ",
  },
  {
    id: "2",
    name: "João Santos",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    comment: "Atendimento excepcional e produtos de primeira qualidade. Voltarei a comprar!",
    product: "Tênis Esportivo Pro",
  },
  {
    id: "3",
    name: "Ana Costa",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 4,
    comment: "Ótima experiência de compra. Site fácil de usar e produtos chegaram perfeitos.",
    product: "Fone Bluetooth Elite",
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">O Que Nossos Clientes Dizem</h2>
          <p className="text-muted-foreground text-lg">Avaliações reais de clientes satisfeitos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-3">"{testimonial.comment}"</p>
                <p className="text-sm font-medium">Produto: {testimonial.product}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
