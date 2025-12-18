import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-c-paginator',
  imports: [CommonModule],
  templateUrl: './c-paginator.html',
  styleUrl: './c-paginator.scss',
})
export class CPaginator {
  @Input() totalElements: number = 0;
  @Input() pageSize: number = 10;
  @Input() currentPage: number = 1;
  
  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalElements / this.pageSize);
  }

  get isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  get isLastPage(): boolean {
    return this.currentPage >= this.totalPages;
  }

  previousPage(): void {
    if (!this.isFirstPage) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (!this.isLastPage) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }
}
