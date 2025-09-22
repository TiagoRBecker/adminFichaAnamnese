"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, FileText } from "lucide-react"

interface Document {
  id: string
  title: string
  file: string
  categoryId: string
}

interface Category {
  id: string
  name: string
}

interface DocumentFormProps {
  document?: Document | null
  categories: Category[]
  onSubmit: (document: Omit<Document, "id">) => void
  onCancel: () => void
}

export function DocumentForm({ document, categories, onSubmit, onCancel }: DocumentFormProps) {
  const [formData, setFormData] = useState({
    title: document?.title || "",
    file: document?.file || "",
    categoryId: document?.categoryId || "",
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (file: File) => {
    // Simular upload - em produção, você faria upload real para um servidor
    const fakeUrl = URL.createObjectURL(file)
    handleInputChange("file", fakeUrl)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.file || !formData.categoryId) {
      return
    }
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Título do Documento */}
      <div className="space-y-2">
        <Label htmlFor="title">Título do Documento</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          placeholder="Digite o título do documento"
          required
        />
      </div>

      {/* Categoria */}
      <div className="space-y-2">
        <Label>Categoria</Label>
        <Select value={formData.categoryId} onValueChange={(value) => handleInputChange("categoryId", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Upload de PDF */}
      <div className="space-y-2">
        <Label>Arquivo PDF</Label>
        <Card className="border-dashed border-2 border-muted-foreground/25">
          <CardContent className="p-6">
            {formData.file ? (
              <div className="flex items-center gap-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">PDF carregado</p>
                  <p className="text-xs text-muted-foreground">Clique para alterar</p>
                </div>
                <Button type="button" variant="ghost" size="icon" onClick={() => handleInputChange("file", "")}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                <div className="mt-4">
                  <Button type="button" variant="ghost" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="mr-2 h-4 w-4" />
                    Carregar PDF
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">PDF até 50MB</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFileUpload(file)
              }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Botões */}
      <div className="flex gap-4 pt-4">
        <Button type="submit" className="flex-1" disabled={!formData.title || !formData.file || !formData.categoryId}>
          {document ? "Atualizar Documento" : "Criar Documento"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
