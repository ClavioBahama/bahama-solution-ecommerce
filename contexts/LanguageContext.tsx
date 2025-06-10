"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "pt" | "en"

interface Translations {
  [key: string]: {
    [key: string]: string
  }
}

const translations: Translations = {
  pt: {
    "nav.home": "Início",
    "nav.products": "Produtos",
    "nav.categories": "Categorias",
    "nav.about": "Sobre",
    "nav.contact": "Contato",
    "nav.login": "Entrar",
    "nav.register": "Registrar",
    "nav.profile": "Perfil",
    "nav.orders": "Pedidos",
    "nav.admin": "Admin",
    "nav.logout": "Sair",
    "search.placeholder": "Pesquisar produtos...",
    "hero.title": "Descubra os Melhores Produtos",
    "hero.subtitle": "Qualidade premium, preços imbatíveis e entrega rápida",
    "hero.cta": "Comprar Agora",
    "footer.description": "Sua loja online de confiança com os melhores produtos e atendimento excepcional.",
    "footer.quickLinks": "Links Rápidos",
    "footer.products": "Produtos",
    "footer.categories": "Categorias",
    "footer.about": "Sobre Nós",
    "footer.contact": "Contato",
    "footer.customerService": "Atendimento",
    "footer.help": "Ajuda",
    "footer.shipping": "Envio",
    "footer.returns": "Devoluções",
    "footer.faq": "FAQ",
    "footer.contactInfo": "Contato",
    "footer.rights": "Todos os direitos reservados.",
  },
  en: {
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.categories": "Categories",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.login": "Login",
    "nav.register": "Register",
    "nav.profile": "Profile",
    "nav.orders": "Orders",
    "nav.admin": "Admin",
    "nav.logout": "Logout",
    "search.placeholder": "Search products...",
    "hero.title": "Discover the Best Products",
    "hero.subtitle": "Premium quality, unbeatable prices and fast delivery",
    "hero.cta": "Shop Now",
    "footer.description": "Your trusted online store with the best products and exceptional service.",
    "footer.quickLinks": "Quick Links",
    "footer.products": "Products",
    "footer.categories": "Categories",
    "footer.about": "About Us",
    "footer.contact": "Contact",
    "footer.customerService": "Customer Service",
    "footer.help": "Help",
    "footer.shipping": "Shipping",
    "footer.returns": "Returns",
    "footer.faq": "FAQ",
    "footer.contactInfo": "Contact Info",
    "footer.rights": "All rights reserved.",
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt")

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") as Language
    if (storedLanguage) {
      setLanguageState(storedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language]?.[key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
