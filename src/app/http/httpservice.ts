import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Httpservice {
  private readonly apiUrl = 'http://localhost:3000/stocks';
  private readonly options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getStock(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  postStock(stock: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, stock, this.options);
  }

  updateStock(id: number | string, stock: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, stock, this.options);
  }

  deleteStock(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
