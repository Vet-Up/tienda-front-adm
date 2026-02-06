import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../core/services/order-service';
import { IOrder } from '../../../core/models/i-order';
import { CPaginator } from '../../ui/c-paginator/c-paginator';

@Component({
  selector: 'app-c-orders-management',
  imports: [CommonModule, FormsModule, CPaginator],
  templateUrl: './c-orders-management.html',
  styleUrl: './c-orders-management.scss',
})
export class COrdersManagement implements OnInit {
  orders: IOrder[] = [];
  filteredOrders: IOrder[] = [];
  loading = true;
  searchTerm = '';

  currentPage = 1;
  pageSize = 10;
  totalElements = 0;

  get paginatedOrders(): IOrder[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredOrders.slice(startIndex, endIndex);
  }

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.orderService.getAll().subscribe({
      next: (orders) => {
        this.orders = orders.sort((a, b) => {
          const dateA = new Date(a.createdAt || 0).getTime();
          const dateB = new Date(b.createdAt || 0).getTime();
          return dateB - dateA;
        });
        this.filteredOrders = this.orders;
        this.totalElements = this.orders.length;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading orders:', err);
        this.loading = false;
      }
    });
  }

  searchOrders(): void {
    if (!this.searchTerm.trim()) {
      this.filteredOrders = this.orders;
      this.totalElements = this.orders.length;
      this.currentPage = 1;
      return;
    }

    const term = this.normalizeText(this.searchTerm.toLowerCase());
    this.filteredOrders = this.orders.filter(order =>
      this.normalizeText(order.user?.name || '').toLowerCase().includes(term)
    );
    this.totalElements = this.filteredOrders.length;
    this.currentPage = 1;
  }

  private normalizeText(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  deleteOrder(orderId: number | undefined): void {
    if (!orderId) return;

    if (confirm('¿Estás seguro de que quieres eliminar esta orden?')) {
      this.orderService.delete(orderId).subscribe({
        next: () => {
          this.orders = this.orders.filter(o => o.id !== orderId);
          this.searchOrders();
        },
        error: (err) => {
          console.error('Error deleting order:', err);
          alert('Error al eliminar la orden');
        }
      });
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatPrice(price: number | undefined): string {
    if (price === undefined || price === null) return '€0.00';
    return `€${price.toFixed(2)}`;
  }
}
