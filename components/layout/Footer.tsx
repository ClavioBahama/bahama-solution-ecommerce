"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-emerald-600"></div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                Bahama Solution
              </span>
            </div>
            <p className="text-muted-foreground">{t("footer.description")}</p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t("footer.quickLinks")}</h3>
            <div className="space-y-2">
              <Link href="/products" className="block text-muted-foreground hover:text-primary">
                {t("footer.products")}
              </Link>
              <Link href="/categories" className="block text-muted-foreground hover:text-primary">
                {t("footer.categories")}
              </Link>
              <Link href="/about" className="block text-muted-foreground hover:text-primary">
                {t("footer.about")}
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-primary">
                {t("footer.contact")}
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t("footer.customerService")}</h3>
            <div className="space-y-2">
              <Link href="/help" className="block text-muted-foreground hover:text-primary">
                {t("footer.help")}
              </Link>
              <Link href="/shipping" className="block text-muted-foreground hover:text-primary">
                {t("footer.shipping")}
              </Link>
              <Link href="/returns" className="block text-muted-foreground hover:text-primary">
                {t("footer.returns")}
              </Link>
              <Link href="/faq" className="block text-muted-foreground hover:text-primary">
                {t("footer.faq")}
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t("footer.contactInfo")}</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@bahamasolution.com</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+258 84 123 4567</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Maputo, Moçambique</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 Bahama Solution. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  )
}
