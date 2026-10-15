import { Injectable } from '@angular/core';
import { Observable, of, Subject, throwError } from 'rxjs';
import { Stock } from '../model/stock';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class StockService {
  private stocks: Stock[] = [
    new Stock('Test Stock Company', 85, 'TSC', 80),
    new Stock('Test Stock Company 2', 25, 'TSC2', 20),
    new Stock('Test Stock Company 3', 50, 'TSC3', 45),
  ];
  stocksChanged = new Subject<void>();
  
  constructor(private http: HttpClient){}

  getStocks(): Observable<Stock[]> {
    return of([...this.stocks]);
  }

  createStock(stock: Stock): Observable<any> {
    const found = this.stocks.find((each) => each.code === stock.code);
    if (found) {
      return of(false);
    }

    this.stocks.push(stock);
    this.stocksChanged.next();
    return of({ success: true, message: 'Stock created successfully ' + stock.code });
  }

  toggleFavorite(stock: Stock): Observable<Stock> {
    const foundStock = this.stocks.find((each) => each.code === stock.code);
    if (foundStock) {
      foundStock.favorite = !foundStock.favorite;
      this.stocksChanged.next();
      return of(foundStock);
    }
    return throwError(() => new Error('Stock not found'));
  }

  deleteStock(stock: Stock): Observable<any> {
    const index = this.stocks.findIndex((each) => each.code === stock.code);
    if (index !== -1) {
      this.stocks.splice(index, 1);
      this.stocksChanged.next();
      return of({ success: true, message: 'Stock deleted successfully' });
    }
    return throwError(() => new Error('Stock not found'));
  }

  findStockByCode(code: string): Observable<Stock | undefined> {
    const foundStock = this.stocks.find((each) => each.code === code);
    return of(foundStock);
  }

  updateStock(stock: Stock, originalCode: string = stock.code): Observable<any> {
    const foundStock = this.stocks.find((each) => each.code === originalCode);
    if (foundStock) {
      foundStock.name = stock.name;
      foundStock.code = stock.code;
      foundStock.price = stock.price;
      foundStock.previousPrice = stock.previousPrice;
      foundStock.exchange = stock.exchange;
      this.stocksChanged.next();
      return of({ success: true, message: 'Stock updated successfully' });
    }
    return throwError(() => new Error('Stock not found'));
  }
}
