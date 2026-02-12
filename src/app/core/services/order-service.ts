import { Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { Observable } from 'rxjs';
import { IOrder } from '../models/i-order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://vetup-store-back.preproducciondaw.cip.fpmislata.com/api/orders';

  constructor(private http: HttpService) {}

  getAll(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.apiUrl);
  }

  getById(id: number): Observable<IOrder> {
    return this.http.get<IOrder>(`${this.apiUrl}/${id}`);
  }

  getByUserId(userId: number): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.apiUrl}/user/${userId}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
