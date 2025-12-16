import { Component } from '@angular/core';
import { IArticle } from '../../../core/models/i-article';
import { ICategory } from '../../../core/models/i-category';
import { ArticleService } from '../../../core/services/article-service';
import { CategoryService } from '../../../core/services/category-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-c-articles-management',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './c-articles-management.html',
  styleUrl: './c-articles-management.scss',
})
export class CArticlesManagement {
  articles:IArticle[] = [];
  pageNumber = 1;
  pageSize = 10;
  totalElements = 0;
  searchTerm: string = '';
  selectedCategory: number = 0;

  categories: ICategory[] = [];

  constructor(private articleService: ArticleService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadArticles();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (response) => {
        console.log('Categorías recibidas:', response);
        this.categories = response;
      },
      error: (err) => console.error('Error cargando categorías', err)
    });
  }

  loadArticles(page: number = 1): void {
    const categoryId = Number(this.selectedCategory);
    this.articleService.getAll(page, this.pageSize, categoryId).subscribe({
      next: (response) => {
        this.articles = response.data;
        this.pageNumber = response.pageNumber;
        this.pageSize = response.pageSize;
        this.totalElements = response.totalElements;
      },
      error: (err) => console.error('Error cargando artículos', err)
    });
  }

  changePage(page: number): void {
    this.loadArticles(page);
  }
  
  get pages(): number[] {
    const totalPages = Math.ceil(this.totalElements / this.pageSize);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  get filteredArticles(): IArticle[] {
    if (!this.searchTerm.trim()) return this.articles;
    const term = this.searchTerm.toLowerCase();
    return this.articles.filter(a => a.name?.toLowerCase().includes(term));
  }

  deleteArticle(id: number) {
    this.articleService.delete(id).subscribe({
      next: () => {
        this.articles = this.articles.filter(article => article.productId !== id);
      },
      error: (err) => {
        console.error('Error deleting article:', err);
      }
    });
  }

  exportToPdf(): void {
    // Cargar TODOS los productos (página 1, tamaño muy grande)
    const categoryId = Number(this.selectedCategory);
    this.articleService.getAll(1, 10000, categoryId).subscribe({
      next: (response) => {
        let allArticles = response.data;
        
        // Aplicar filtro de búsqueda si existe
        if (this.searchTerm.trim()) {
          const term = this.searchTerm.toLowerCase();
          allArticles = allArticles.filter(a => a.name?.toLowerCase().includes(term));
        }
        
        this.generatePdf(allArticles);
      },
      error: (err) => console.error('Error al cargar artículos para exportar', err)
    });
  }

  private generatePdf(articles: IArticle[]): void {
    const doc = new jsPDF();
    
    // Título
    doc.setFontSize(18);
    doc.text('Lista de Productos', 14, 22);
    
    // Fecha
    doc.setFontSize(10);
    doc.text(`Generado: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Total: ${articles.length} productos`, 14, 36);
    
    // Tabla con todos los artículos
    const data = articles.map(a => [
      a.productId,
      a.name,
      `${a.price.toFixed(2)} €`,
      a.discountedPrice && a.discountedPrice > 0 ? `${a.discountedPrice.toFixed(2)} €` : 'Sin descuento',
      a.brand,
      this.getCategoryName(a.categoryId)
    ]);
    
    autoTable(doc, {
      startY: 42,
      head: [['ID', 'Nombre', 'Precio', 'Dto.', 'Marca', 'Categoría']],
      body: data,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [66, 139, 202] }
    });
    
    doc.save('productos.pdf');
  }

  getCategoryName(id: number): string {
    return this.categories.find(c => c.categoryId === id)?.name || 'Sin categoría';
  }

}
