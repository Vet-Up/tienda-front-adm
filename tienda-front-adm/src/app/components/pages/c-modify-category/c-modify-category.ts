import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from '../../../core/models/i-category';
import { CategoryService } from '../../../core/services/category-service';

@Component({
  selector: 'app-c-modify-category',
  imports: [CommonModule, FormsModule],
  templateUrl: './c-modify-category.html',
  styleUrl: './c-modify-category.scss',
})
export class CModifyCategory implements OnInit {
  category: ICategory = { categoryId: 0, name: '', description: '' };
  isLoading = true;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('categoryId');
    if (id) {
      this.loadCategory(Number(id));
    }
  }

  loadCategory(id: number): void {
    this.categoryService.getById(id).subscribe({
      next: (data) => {
        this.category = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar categoría', err);
        this.isLoading = false;
      }
    });
  }

  saveCategory(): void {
    this.categoryService.update(this.category.categoryId, this.category).subscribe({
      next: () => {
        console.log('Categoría actualizada correctamente');
        this.router.navigate(['/categories']);
      },
      error: (err) => console.error('Error al actualizar categoría', err)
    });
  }

  cancel(): void {
    this.router.navigate(['/categories']);
  }
}
