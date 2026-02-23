import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../../../core/services/review-service';
import { ArticleService } from '../../../core/services/article-service';
import { IReview } from '../../../core/models/i-review';
import { IArticle } from '../../../core/models/i-article';

@Component({
  selector: 'app-c-reviews-management',
  imports: [CommonModule, FormsModule],
  templateUrl: './c-reviews-management.html',
  styleUrl: './c-reviews-management.scss',
})
export class CReviewsManagement implements OnInit {
  reviews: IReview[] = [];
  filteredReviews: IReview[] = [];
  products: IArticle[] = [];
  selectedProductId: number = 0;
  loading = true;
  currentPage = 1;
  pageSize = 20;
  totalElements = 0;

  constructor(
    private reviewService: ReviewService,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.articleService.getAll().subscribe({
      next: (response: any) => {
        this.products = Array.isArray(response) ? response : (response?.data || []);
      },
      error: (err) => console.error('Error loading products:', err)
    });
  }

  loadReviews(): void {
    const productId = Number(this.selectedProductId);
    if (!productId) {
      this.reviews = [];
      this.filteredReviews = [];
      this.totalElements = 0;
      this.loading = false;
      return;
    }

    this.loading = true;
    const apiPage = Math.max(this.currentPage - 1, 0);
    this.reviewService.getByProductId(productId, apiPage, this.pageSize).subscribe({
      next: (response: any) => {
        const reviews = Array.isArray(response) ? response : (response?.data || response?.content || []);
        this.reviews = reviews;
        this.filteredReviews = this.reviews;
        this.totalElements = response?.totalElements ?? this.reviews.length;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading reviews:', err);
        this.loading = false;
      }
    });
  }

  onProductChange(productId?: number): void {
    this.selectedProductId = Number(productId ?? this.selectedProductId);
    this.currentPage = 1;
    this.loadReviews();
  }

  deleteReview(reviewId: number | undefined): void {
    if (!reviewId) return;

    if (confirm('¿Estás seguro de que quieres eliminar esta review?')) {
      this.reviewService.delete(reviewId).subscribe({
        next: () => {
          this.loadReviews();
        },
        error: (err) => {
          console.error('Error deleting review:', err);
          alert('Error al eliminar la review');
        }
      });
    }
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  }

  getStars(rating: number): string[] {
    return Array(5).fill('').map((_, i) => i < rating ? 'full' : 'empty');
  }

  getProductName(productId: number): string {
    const product = this.products.find(p => p.productId === productId);
    return product?.name || 'Unknown Product';
  }
}
