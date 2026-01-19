import { Component } from '@angular/core';
import { CategoryService } from '../../../core/services/category-service';
import { ICategory } from '../../../core/models/i-category';
import { IArticle } from '../../../core/models/i-article';
import { ArticleService } from '../../../core/services/article-service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-c-create-article',
  imports: [FormsModule, CommonModule],
  templateUrl: './c-create-article.html',
  styleUrl: './c-create-article.scss',
})
export class CCreateArticle {

  article: IArticle = {
    productId: 0,
    name: '',
    productDescription: '',
    basePrice: 0,
    discountedPrice: 0,
    price: 0,
    pictureProduct: '',
    brand: '',
    categoryId: 0
  };


  categories: ICategory[] = [];


  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (categories) => {
        console.log('Categorías recibidas:', categories);
        this.categories = categories;
      },
      error: (err) => {
        console.error('Error al cargar categorías', err);
        this.categories = [];
      }
    });
  }

  createArticle(form: NgForm): void {
    
    if (this.article.basePrice < 0 || this.article.discountedPrice < 0) {
      alert('El precio base y el descuento no pueden ser negativos.');
      return;
    }

    if (!form.valid) {
      alert('Por favor, rellena todos los campos obligatorios.');
      return;
    }


    if (this.article.discountedPrice > 100) {
      alert('El descuento no puede ser mayor al 100%.');
      return;
    }

    // Calcular el precio final antes de enviar
    this.article.price = this.calculateFinalPrice();
    this.articleService.create(this.article).subscribe({
      next: (response) => {
        console.log('Artículo creado correctamente', response);
        this.router.navigate(['/products']);
      },
      error: (err) => {
        alert('Error al crear artículo,hay que rellenar todos los campos obligatorios');
      }
    });

  }

  // Método para calcular el precio final
  calculateFinalPrice(): number {
    if (this.article.basePrice == null) return 0;
    const discount = this.article.basePrice * (this.article.discountedPrice / 100);
    return +(this.article.basePrice - discount).toFixed(2);
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
