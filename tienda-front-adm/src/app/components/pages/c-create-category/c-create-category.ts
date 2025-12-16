import { Component } from '@angular/core';
import { ICategory } from '../../../core/models/i-category';
import { CategoryService } from '../../../core/services/category-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-c-create-category',
  imports: [FormsModule],
  templateUrl: './c-create-category.html',
  styleUrl: './c-create-category.scss',
})
export class CCreateCategory {

  category: ICategory = {
    categoryId: 0,
    name: '',
    description: ''
  };

  constructor(private categoryService: CategoryService, private router: Router) {}

  createCategory(): void {
    this.categoryService.create(this.category).subscribe({
      next: (response) => {
        console.log('Categoría creada correctamente', response);
        this.router.navigate(['/categories']);
      },
      error: (err) => {
        console.error('Error al crear categoría', err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/categories']);
  }
}
