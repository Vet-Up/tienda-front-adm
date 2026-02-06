import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ArticleService } from '../../../core/services/article-service';
import { CategoryService } from '../../../core/services/category-service';
import { UserService } from '../../../core/services/user-service';
import { OrderService } from '../../../core/services/order-service';

@Component({
  selector: 'app-c-dashboard',
  imports: [CommonModule],
  templateUrl: './c-dashboard.html',
  styleUrl: './c-dashboard.scss',
})
export class CDashboard implements OnInit {
  stats = {
    totalProducts: 0,
    totalCategories: 0,
    totalUsers: 0,
    totalOrders: 0,
  };

  topRatedProducts: any[] = [];
  nextTopRatedProducts: any[] = [];
  recentOrders: any[] = [];
  loading = true;

  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private userService: UserService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;

    this.articleService.getAll(1, 1).subscribe({
      next: (response) => {
        this.stats.totalProducts = response.totalElements || 0;
      },
      error: (err) => console.error('Error loading products:', err)
    });

    this.articleService.getProductsOrdered('top-rated', 1, 5).subscribe({
      next: (response) => {
        this.topRatedProducts = response.data || [];
      },
      error: (err) => console.error('Error loading top rated products:', err)
    });

    this.articleService.getProductsOrdered('top-rated', 2, 5).subscribe({
      next: (response) => {
        this.nextTopRatedProducts = response.data || [];
      },
      error: (err) => console.error('Error loading next top rated products:', err)
    });

    this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.stats.totalCategories = categories.length;
      },
      error: (err) => console.error('Error loading categories:', err)
    });

    this.userService.getAllUsers(1, 1).subscribe({
      next: (response) => {
        this.stats.totalUsers = response.totalElements || 0;
      },
      error: (err) => console.error('Error loading users:', err)
    });

    this.orderService.getAll().subscribe({
      next: (orders) => {
        this.stats.totalOrders = orders.length;
        this.recentOrders = orders
          .sort((a, b) => {
            const dateA = new Date(a.createdAt || 0).getTime();
            const dateB = new Date(b.createdAt || 0).getTime();
            return dateB - dateA; // Más recientes primero
          })
          .slice(0, 5);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading orders:', err);
        this.loading = false;
      }
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' }) + 
           ' ' + date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }

  formatPrice(price: number | undefined): string {
    if (price === undefined || price === null) return '€0.00';
    return `€${price.toFixed(2)}`;
  }
}
