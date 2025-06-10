"use client"

import type React from "react"

import { useState } from "react"
import { useCart } from "@/contexts/CartContext"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { CreditCard, Smartphone, Building, Truck } from "lucide-react"
import Image from "next/image"

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("mpesa")

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Moçambique",
  })

  const [paymentInfo, setPaymentInfo] = useState({
    // M-Pesa
    mpesaNumber: "",
    // E-Mola
    emolaNumber: "",
    // Credit Card
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    // Bank Transfer
    bankAccount: "",
  })

  const shipping = 15.99
  const tax = total * 0.1
  const finalTotal = total + shipping + tax

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Pedido realizado com sucesso!",
        description: "Você receberá um email de confirmação em breve.",
      })
      clearCart()
      setLoading(false)
      // Redirect to success page
      window.location.href = "/order-success"
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="h-5 w-5 mr-2" />
                    Informações de Entrega
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Nome Completo</Label>
                      <Input
                        id="fullName"
                        value={shippingInfo.fullName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">Cidade</Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Código Postal</Label>
                      <Input
                        id="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">País</Label>
                      <Input
                        id="country"
                        value={shippingInfo.country}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Método de Pagamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-4">
                      {/* M-Pesa */}
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="mpesa" id="mpesa" />
                        <Label htmlFor="mpesa" className="flex items-center cursor-pointer flex-1">
                          <Smartphone className="h-5 w-5 mr-2 text-green-600" />
                          <span className="font-medium">M-Pesa</span>
                        </Label>
                      </div>

                      {paymentMethod === "mpesa" && (
                        <div className="ml-6 space-y-2">
                          <Label htmlFor="mpesaNumber">Número M-Pesa</Label>
                          <Input
                            id="mpesaNumber"
                            placeholder="+258 84 123 4567"
                            value={paymentInfo.mpesaNumber}
                            onChange={(e) => setPaymentInfo({ ...paymentInfo, mpesaNumber: e.target.value })}
                            required
                          />
                          <p className="text-sm text-muted-foreground">
                            Você receberá uma notificação para confirmar o pagamento
                          </p>
                        </div>
                      )}

                      {/* E-Mola */}
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="emola" id="emola" />
                        <Label htmlFor="emola" className="flex items-center cursor-pointer flex-1">
                          <Smartphone className="h-5 w-5 mr-2 text-blue-600" />
                          <span className="font-medium">E-Mola</span>
                        </Label>
                      </div>

                      {paymentMethod === "emola" && (
                        <div className="ml-6 space-y-2">
                          <Label htmlFor="emolaNumber">Número E-Mola</Label>
                          <Input
                            id="emolaNumber"
                            placeholder="+258 87 123 4567"
                            value={paymentInfo.emolaNumber}
                            onChange={(e) => setPaymentInfo({ ...paymentInfo, emolaNumber: e.target.value })}
                            required
                          />
                        </div>
                      )}

                      {/* Credit Card */}
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center cursor-pointer flex-1">
                          <CreditCard className="h-5 w-5 mr-2 text-purple-600" />
                          <span className="font-medium">Cartão de Crédito/Débito</span>
                        </Label>
                      </div>

                      {paymentMethod === "card" && (
                        <div className="ml-6 space-y-4">
                          <div>
                            <Label htmlFor="cardNumber">Número do Cartão</Label>
                            <Input
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={paymentInfo.cardNumber}
                              onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                              required
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiryDate">Data de Validade</Label>
                              <Input
                                id="expiryDate"
                                placeholder="MM/AA"
                                value={paymentInfo.expiryDate}
                                onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV</Label>
                              <Input
                                id="cvv"
                                placeholder="123"
                                value={paymentInfo.cvv}
                                onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="cardName">Nome no Cartão</Label>
                            <Input
                              id="cardName"
                              value={paymentInfo.cardName}
                              onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                              required
                            />
                          </div>
                        </div>
                      )}

                      {/* Bank Transfer */}
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="bank" id="bank" />
                        <Label htmlFor="bank" className="flex items-center cursor-pointer flex-1">
                          <Building className="h-5 w-5 mr-2 text-gray-600" />
                          <span className="font-medium">Transferência Bancária</span>
                        </Label>
                      </div>

                      {paymentMethod === "bank" && (
                        <div className="ml-6 space-y-2">
                          <div className="p-4 bg-muted rounded-lg">
                            <h4 className="font-medium mb-2">Dados Bancários:</h4>
                            <p className="text-sm">Banco: Millennium BIM</p>
                            <p className="text-sm">Conta: 123456789</p>
                            <p className="text-sm">NIB: 000800001234567890172</p>
                            <p className="text-sm">Titular: Bahama Solution Lda</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Após a transferência, envie o comprovativo para confirmar o pagamento
                          </p>
                        </div>
                      )}

                      {/* Cash on Delivery */}
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod" className="flex items-center cursor-pointer flex-1">
                          <Truck className="h-5 w-5 mr-2 text-orange-600" />
                          <span className="font-medium">Pagamento na Entrega</span>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="rounded object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qtd: {item.quantity}</p>
                        </div>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frete</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Impostos</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? "Processando..." : "Finalizar Pedido"}
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Seus dados estão seguros e protegidos</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}
