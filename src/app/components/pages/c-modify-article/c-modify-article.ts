import { Component, OnInit } from '@angular/core';
import { IArticle } from '../../../core/models/i-article';
import { ArticleService } from '../../../core/services/article-service';
import { CategoryService } from '../../../core/services/category-service';
import { ICategory } from '../../../core/models/i-category';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-c-modify-article',
  imports: [FormsModule, CommonModule],
  templateUrl: './c-modify-article.html',
  styleUrl: './c-modify-article.scss',
})
export class CModifyArticle implements OnInit {
  article: IArticle = {
    productId: 0,
    name: '',
    productDescription: '',
    basePrice: 0,
    discount: 0,
    price: 0,
    pictureProduct: '',
    brand: '',
    categoryId: 0,
    stock: 0,
    averageRating: 0
  };

  categories: ICategory[] = [];

  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    const id = this.route.snapshot.paramMap.get('productId');
    if (id) {
      this.loadArticle(+id);
    }
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Error al cargar categorías', err);
        this.categories = [];
      }
    });
  }

  loadArticle(id: number): void {
    this.articleService.getById(id).subscribe({
      next: (data) => {
        console.log('Datos que vienen de la API:', data); 
        this.article = data;
      },
      error: (err) => console.error('Error cargando artículo', err)
    });
  }

  saveChanges(): void {
    if (this.article.basePrice < 0 || this.article.discount < 0) {
      alert('El precio base y el descuento no pueden ser negativos.');
      return;
    }
    if (this.article.stock < 0) {
      alert('El stock no puede ser negativo.');
      return;
    }
    if (this.article.discount > 100) {
      alert('El descuento no puede ser mayor al 100%.');
      return;
    }
    console.log('Datos a enviar:', this.article);
    this.articleService.update(this.article.productId, this.article).subscribe({
      next: (response) => {
        console.log('Artículo actualizado correctamente', response);
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Error al actualizar artículo', err);
      }
    });
  }

  calculateFinalPrice(): number {
    if (this.article.basePrice == null) return 0;
    const discountAmount = this.article.basePrice * (this.article.discount / 100);
    return +(this.article.basePrice - discountAmount).toFixed(2);
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
