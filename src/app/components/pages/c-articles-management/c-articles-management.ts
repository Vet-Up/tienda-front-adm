import { Component } from '@angular/core';
import { IArticle } from '../../../core/models/i-article';
import { ICategory } from '../../../core/models/i-category';
import { ArticleService } from '../../../core/services/article-service';
import { CategoryService } from '../../../core/services/category-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from "@angular/router";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CPaginator } from '../../ui/c-paginator/c-paginator';

@Component({
  selector: 'app-c-articles-management',
  imports: [FormsModule, CommonModule, RouterLink, CPaginator],
  templateUrl: './c-articles-management.html',
  styleUrl: './c-articles-management.scss',
})
export class CArticlesManagement {
  articles: IArticle[] = [];
  categories: ICategory[] = [];
  selectedCategory = 0;

  // Paginación
  currentPage = 1;
  pageSize = 10;
  totalElements = 0;

  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Leer página desde query params
    this.route.queryParams.subscribe(params => {
      this.currentPage = params['page'] ? parseInt(params['page']) : 1;
      this.loadCategories();
      this.loadArticles();
    });
  }

  // Cargar datos
  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (response) => this.categories = response,
      error: (err) => console.error('Error cargando categorías', err)
    });
  }

  loadArticles(): void {
    const categoryId = Number(this.selectedCategory);
    this.articleService.getAll(this.currentPage, this.pageSize, categoryId).subscribe({
      next: (response) => {
        this.articles = response.data;
        this.totalElements = response.totalElements;

        // Si la página actual está vacía y no es la primera, ir a la última página válida
        const maxPage = Math.ceil(this.totalElements / this.pageSize);
        if (this.articles.length === 0 && this.currentPage > 1 && maxPage > 0) {
          this.onPageChange(maxPage);
        }
      },
      error: (err) => console.error('Error cargando artículos', err)
    });
  }

  onCategoryChange(): void {
    // Resetear a página 1 cuando cambia el filtro
    this.currentPage = 1;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: 1 },
      queryParamsHandling: 'merge'
    });
    // Recargar artículos con la nueva categoría
    this.loadArticles();
  }

  // Paginación
  onPageChange(page: number): void {
    this.currentPage = page;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }

  deleteArticle(id: number): void {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      return;
    }

    this.articleService.delete(id).subscribe({
      next: () => {
        this.loadArticles();
      },
      error: (err) => console.error('Error eliminando artículo:', err)
    });
  }

  exportToPdf(): void {
    const categoryId = Number(this.selectedCategory);
    this.articleService.getAll(1, 999999, categoryId).subscribe({
      next: (response) => {
        this.generatePdf(response.data);
      },
      error: (err) => console.error('Error exportando artículos', err)
    });
  }

  private generatePdf(articles: IArticle[]): void {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Lista de Productos', 14, 22);
    doc.setFontSize(10);
    doc.text(`Generado: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Total: ${articles.length} productos`, 14, 36);

    const data = articles.map(a => [
      a.productId,
      a.name,
      `${a.basePrice.toFixed(2)} €`,
      `${a.price.toFixed(2)} €`,
      a.discount > 0 ? `${a.discount.toFixed(2)} %` : '-',
      a.brand,
      this.categories.find(c => c.categoryId === a.categoryId)?.name || '-',
      a.averageRating > 0 ? a.averageRating.toFixed(2) : '-'
    ]);

    autoTable(doc, {
      startY: 42,
      head: [['ID', 'Nombre', 'Precio Base', 'Precio con Descuento', '% Descuento', 'Marca', 'Categoría', 'Calificación Promedio']],
      body: data,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [66, 139, 202] }
    });

    doc.save('productos.pdf');
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.categoryId === categoryId);
    return category ? category.name : '-';
  }

}
