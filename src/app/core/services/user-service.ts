import { Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { Observable } from 'rxjs';
import { IUser } from '../models/i-user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpService) {}

  private apiUrl = 'http://localhost:8080/api/users';

  getUserByEmail(email: string): Observable<IUser>  {
    return this.http.get<IUser>(`${this.apiUrl}/by-email?email=${email}`);
  }

  updateUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.apiUrl}/${user.id}`, user);
  }
}
