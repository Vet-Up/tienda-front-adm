import { Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { Observable } from 'rxjs';
import { IReview } from '../models/i-review';
import { IPage } from '../models/i-page';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'http://localhost:8080/api/reviews';

  constructor(private http: HttpService) {}

  getByProductId(productId: number, page: number = 1, size: number = 10): Observable<IPage<IReview>> {
    return this.http.get<IPage<IReview>>(`${this.apiUrl}/product/${productId}?page=${page}&size=${size}`);
  }

  getByUserId(userId: number, page: number = 1, size: number = 10): Observable<IPage<IReview>> {
    return this.http.get<IPage<IReview>>(`${this.apiUrl}/user/${userId}?page=${page}&size=${size}`);
  }

  getById(id: number): Observable<IReview> {
    return this.http.get<IReview>(`${this.apiUrl}/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
