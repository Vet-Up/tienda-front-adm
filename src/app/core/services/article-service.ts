import { Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { map, Observable } from 'rxjs';
import { IArticle as Article, IArticle } from '../models/i-article';
import { IPage as PageResponse } from '../models/i-page';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = '/api/products';

  constructor(private http: HttpService) {}

  getAll(page: number = 1, size: number = 10, categoryId?: number): Observable<PageResponse<Article>> {
    // Sin categoría: usa el endpoint normal paginado
    if (!categoryId || categoryId === 0) {
      return this.http.get<PageResponse<Article>>(`${this.apiUrl}?page=${page}&size=${size}`);
    }
    // Con categoría: usa el endpoint de categoría (devuelve lista)
    return this.http.get<Article[]>(`${this.apiUrl}/category/${categoryId}?page=${page}&size=${size}`).pipe(
      map(data => ({
        data: data,
        pageNumber: page,
        pageSize: size,
        totalElements: data.length
      } as PageResponse<Article>))
    );
  }

  getById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }

  create(article: Article): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, article);
  }

  update(id: number, article: IArticle): Observable<IArticle> {
  return this.http.put<IArticle>(`${this.apiUrl}/${id}`, article);
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
