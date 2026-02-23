import { Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { Observable } from 'rxjs';
import { ICategory } from '../models/i-category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = '/api/categories';

  constructor(private http: HttpService) {}

  getAll(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.apiUrl);
  }

  getById(id: number): Observable<ICategory> {
    return this.http.get<ICategory>(`${this.apiUrl}/${id}`);
  }

  create(category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(this.apiUrl, category);
  }

  update(id: number, category: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>(`${this.apiUrl}/${id}`, category);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
