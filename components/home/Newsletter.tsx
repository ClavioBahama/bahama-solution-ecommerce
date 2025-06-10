"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Mail } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Inscrição realizada!",
        description: "Você receberá nossas novidades em breve.",
      })
      setEmail("")
      setLoading(false)
    }, 1000)
  }

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <Mail className="h-12 w-12 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Fique por Dentro das Novidades</h2>
          <p className="text-blue-100 text-lg mb-8">
            Receba ofertas exclusivas, lançamentos e dicas diretamente no seu e-mail
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white text-gray-900"
              required
            />
            <Button type="submit" variant="secondary" disabled={loading} className="whitespace-nowrap">
              {loading ? "Inscrevendo..." : "Inscrever-se"}
            </Button>
          </form>

          <p className="text-sm text-blue-100 mt-4">Não enviamos spam. Você pode cancelar a qualquer momento.</p>
        </div>
      </div>
    </section>
  )
}
