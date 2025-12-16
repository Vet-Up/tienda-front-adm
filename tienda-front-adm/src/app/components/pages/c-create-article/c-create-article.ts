import { Component } from '@angular/core';
import { IArticle } from '../../../core/models/i-article';
import { ArticleService } from '../../../core/services/article-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-c-create-article',
  imports: [FormsModule],
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

  constructor(private articleService: ArticleService, private router: Router) {}

  createArticle(): void {
    this.articleService.create(this.article).subscribe({
      next: (response) => {
        console.log('Artículo creado correctamente', response);
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Error al crear artículo', err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
