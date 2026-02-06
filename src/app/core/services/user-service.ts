import { Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { Observable } from 'rxjs';
import { IUser } from '../models/i-user';
import { IPage } from '../models/i-page';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpService) {}

  private apiUrl = 'http://localhost:8080/api/users';

  getUserByEmail(email: string): Observable<IUser>  {
    return this.http.get<IUser>(`${this.apiUrl}/by-email?email=${email}`);
  }

  searchUsersByEmail(email: string, page: number = 0, size: number = 10): Observable<IPage<IUser>> {
    return this.http.get<IPage<IUser>>(`${this.apiUrl}/search?email=${email}&page=${page}&size=${size}`);
  }

  updateUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.apiUrl}/${user.id}`, user);
  }

  getAllUsers(page: number = 0, size: number = 10): Observable<IPage<IUser>> {
    return this.http.get<IPage<IUser>>(`${this.apiUrl}?page=${page}&size=${size}`);
  }
}
