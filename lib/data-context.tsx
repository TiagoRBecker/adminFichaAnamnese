"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface Product {
  id: string
  name: string
  cover: string
  pdf?: string
  description: string
  inStock: boolean
  price: number
  categoryIds?: string[]
}

interface Category {
  id: string
  name: string
  productCount?: number
}

interface Document {
  id: string
  title: string
  file: string
  categoryId: string
  categoryName?: string
  createdAt: string
}

interface Sale {
  id: string
  customerName: string
  productName: string
  productId: string
  amount: number
  timestamp: string
  status: "completed" | "pending" | "cancelled"
}

interface DataContextType {
  products: Product[]
  categories: Category[]
  documents: Document[]
  sales: Sale[]
  addProduct: (product: Omit<Product, "id">) => void
  updateProduct: (id: string, product: Omit<Product, "id">) => void
  deleteProduct: (id: string) => void
  addCategory: (category: Omit<Category, "id" | "productCount">) => void
  updateCategory: (id: string, category: Omit<Category, "id" | "productCount">) => void
  deleteCategory: (id: string) => void
  addDocument: (document: Omit<Document, "id" | "createdAt" | "categoryName">) => void
  updateDocument: (id: string, document: Omit<Document, "id" | "createdAt" | "categoryName">) => void
  deleteDocument: (id: string) => void
  addSale: (sale: Omit<Sale, "id" | "timestamp">) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Eletrônicos", productCount: 0 },
    { id: "2", name: "Roupas", productCount: 0 },
    { id: "3", name: "Casa e Jardim", productCount: 0 },
  ])

  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Smartphone Premium",
      cover: "/generic-product-display.png",
      description: "Smartphone de última geração com câmera profissional",
      inStock: true,
      price: 1299.99,
      categoryIds: ["1"],
    },
    {
      id: "2",
      name: "Camiseta Básica",
      cover: "/generic-product-display.png",
      description: "Camiseta 100% algodão, confortável e durável",
      inStock: true,
      price: 49.99,
      categoryIds: ["2"],
    },
    {
      id: "3",
      name: "Mesa de Centro",
      cover: "/generic-product-display.png",
      description: "Mesa de centro moderna em madeira maciça",
      inStock: false,
      price: 899.99,
      categoryIds: ["3"],
    },
  ])

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      title: "Manual do Smartphone",
      file: "/manual-smartphone.pdf",
      categoryId: "1",
      categoryName: "Eletrônicos",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      title: "Guia de Tamanhos",
      file: "/guia-tamanhos.pdf",
      categoryId: "2",
      categoryName: "Roupas",
      createdAt: "2024-01-10",
    },
  ])

  const [sales, setSales] = useState<Sale[]>([
    {
      id: "1",
      customerName: "João Silva",
      productName: "Smartphone Premium",
      productId: "1",
      amount: 1299.99,
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      status: "completed",
    },
    {
      id: "2",
      customerName: "Maria Santos",
      productName: "Camiseta Básica",
      productId: "2",
      amount: 49.99,
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      status: "completed",
    },
  ])

  // Atualizar contagem de produtos por categoria
  useEffect(() => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        productCount: products.filter((product) => product.categoryIds?.includes(category.id)).length,
      })),
    )
  }, [products])

  // Atualizar nomes de categorias nos documentos
  useEffect(() => {
    setDocuments((prevDocuments) =>
      prevDocuments.map((document) => ({
        ...document,
        categoryName: categories.find((cat) => cat.id === document.categoryId)?.name,
      })),
    )
  }, [categories])

  const addProduct = (productData: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
    }
    setProducts((prev) => [...prev, newProduct])
  }

  const updateProduct = (id: string, productData: Omit<Product, "id">) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...productData, id } : p)))
  }

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const addCategory = (categoryData: Omit<Category, "id" | "productCount">) => {
    const newCategory: Category = {
      ...categoryData,
      id: Date.now().toString(),
      productCount: 0,
    }
    setCategories((prev) => [...prev, newCategory])
  }

  const updateCategory = (id: string, categoryData: Omit<Category, "id" | "productCount">) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...categoryData, id, productCount: c.productCount } : c)))
  }

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id))
    // Remover categoria dos produtos
    setProducts((prev) =>
      prev.map((p) => ({
        ...p,
        categoryIds: p.categoryIds?.filter((catId) => catId !== id),
      })),
    )
    // Remover documentos da categoria
    setDocuments((prev) => prev.filter((d) => d.categoryId !== id))
  }

  const addDocument = (documentData: Omit<Document, "id" | "createdAt" | "categoryName">) => {
    const category = categories.find((c) => c.id === documentData.categoryId)
    const newDocument: Document = {
      ...documentData,
      id: Date.now().toString(),
      categoryName: category?.name,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setDocuments((prev) => [...prev, newDocument])
  }

  const updateDocument = (id: string, documentData: Omit<Document, "id" | "createdAt" | "categoryName">) => {
    const category = categories.find((c) => c.id === documentData.categoryId)
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...documentData,
              id,
              categoryName: category?.name,
              createdAt: d.createdAt,
            }
          : d,
      ),
    )
  }

  const deleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id))
  }

  const addSale = (saleData: Omit<Sale, "id" | "timestamp">) => {
    const newSale: Sale = {
      ...saleData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    }
    setSales((prev) => [newSale, ...prev])
  }

  return (
    <DataContext.Provider
      value={{
        products,
        categories,
        documents,
        sales,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        addDocument,
        updateDocument,
        deleteDocument,
        addSale,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)

  
  return context
}
