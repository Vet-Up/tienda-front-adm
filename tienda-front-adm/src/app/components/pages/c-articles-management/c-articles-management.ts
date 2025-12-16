import { Component } from '@angular/core';
import { IArticle } from '../../../core/models/i-article';
import { ArticleService } from '../../../core/services/article-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CDetailArticle } from '../c-detail-article/c-detail-article';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-c-articles-management',
  imports: [FormsModule, CommonModule, CDetailArticle, RouterLink],
  templateUrl: './c-articles-management.html',
  styleUrl: './c-articles-management.scss',
})
export class CArticlesManagement {
  articles:IArticle[] = [];
  pageNumber = 1;
  pageSize = 10;
  totalElements = 0;
  searchTerm: string = '';
  selectedProduct: IArticle | null = null;

  constructor( private articleService: ArticleService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(page: number = 1): void {
    this.articleService.getAll(page, this.pageSize).subscribe({
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

  viewArticle(id: number) {
    this.selectedProduct = this.articles.find(a => a.productId === id) || null;
  }

  closeDetail() {
    this.selectedProduct = null;
  }

  editArticle(id: number) {
    // Lógica para editar el artículo
  }

}
