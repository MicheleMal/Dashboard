import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  isAuthenticated = false;

  getToken() {
    return localStorage.getItem('jwtToken');
  }

  logout() {
    localStorage.removeItem('jwtToken');
  }

  register(url: string, data: {}) {
    return this.http.post(url, data);
  }

  login(url: string, data: {}) {
    return this.http.post(url, data);
  }

  edit(url: string, data: {}) {
    return this.http.patch(url, data);
  }
}
