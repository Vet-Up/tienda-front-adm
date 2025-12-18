import { Component } from '@angular/core';
import { CategoryService } from '../../../core/services/category-service';
import { ICategory } from '../../../core/models/i-category';
import { IArticle } from '../../../core/models/i-article';
import { ArticleService } from '../../../core/services/article-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
    price: 0,
    discountedPrice: 0,
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

  createArticle(): void {
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

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
