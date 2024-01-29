import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'https://dummyjson.com/users';

  addUser(userData: User) {
    return this.http.post<User>(`${this.baseUrl}/add`, userData);
  }
}
