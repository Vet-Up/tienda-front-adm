import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ICategory } from '../../../core/models/i-category';
import { CategoryService } from '../../../core/services/category-service';

@Component({
  selector: 'app-c-categories-management',
  imports: [CommonModule, RouterLink],
  templateUrl: './c-categories-management.html',
  styleUrl: './c-categories-management.scss',
})
export class CCategoriesManagement {
  categories: ICategory[] = [];

  get filteredCategories(): ICategory[] {
    return this.categories;
  }

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (response) => {
        this.categories = response;
        console.log('Categorías cargadas:', this.categories);
      },
      error: (err) => console.error('Error cargando categorías', err)
    });
  }

  deleteCategory(id: number): void {
    this.categoryService.delete(id).subscribe({
      next: () => {
        this.categories = this.categories.filter(category => category.categoryId !== id);
      },
      error: (err) => {
        console.error('Error deleting category:', err);
      }
    });
  }
}
