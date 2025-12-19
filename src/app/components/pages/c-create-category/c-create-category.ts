import { Component } from '@angular/core';
import { ICategory } from '../../../core/models/i-category';
import { CategoryService } from '../../../core/services/category-service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

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

  createCategory(form: NgForm): void {
    if (!form.valid) {
      alert('Por favor, rellena todos los campos obligatorios.');
      return;
    }

    this.categoryService.create(this.category).subscribe({
      next: (response) => {
        console.log('Categoría creada correctamente', response);
        this.router.navigate(['/categories']);
      },
      error: (err) => {
        alert('Error al crear categoría,hay que rellenar todos los campos obligatorios');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/categories']);
  }
}
