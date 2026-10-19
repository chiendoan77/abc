import { Injectable } from '@angular/core';
import { Observable, of, Subject, switchMap, tap, throwError, map } from 'rxjs';
import { Stock } from '../model/stock';
import { Httpservice } from '../http/httpservice';

@Injectable({ providedIn: 'root' })
export class StockService {
  stocksChanged = new Subject<void>();

  constructor(private httpService: Httpservice) {}

  getStocks(): Observable<Stock[]> {
    return this.httpService.getStock().pipe(
      map((stocks: any[]) => stocks.map((stock: any) => this.toStock(stock))),
    );
  }

  createStock(stock: Stock): Observable<any> {
    return this.getStocks().pipe(
      switchMap((stocks) => {
        const found = stocks.some((each) => each.code.toLowerCase() === stock.code.toLowerCase());
        if (found) return of(false);

        return this.httpService.postStock(stock).pipe(
          tap(() => this.stocksChanged.next()),
          map(() => ({ success: true, message: 'Stock created successfully ' + stock.code })),
        );
      }),
    );
  }

  toggleFavorite(stock: Stock): Observable<Stock> {
    if (stock.id === undefined) return throwError(() => new Error('Stock id is missing'));

    const updatedStock = { ...stock, favorite: !stock.favorite };
    return this.httpService.updateStock(stock.id, updatedStock).pipe(
      map((updated) => this.toStock(updated)),
      tap(() => this.stocksChanged.next()),
    );
  }

  deleteStock(stock: Stock): Observable<any> {
    if (stock.id === undefined) return throwError(() => new Error('Stock id is missing'));

    return this.httpService.deleteStock(stock.id).pipe(
      tap(() => this.stocksChanged.next()),
      map(() => ({ success: true, message: 'Stock deleted successfully' })),
    );
  }

  findStockByCode(code: string): Observable<Stock[]> {
    return this.getStocks().pipe(
      map((stocks) => {
        const searchCode = code.trim().toLowerCase();
        return searchCode
          ? stocks.filter((stock) => stock.code.toLowerCase().includes(searchCode))
          : stocks;
      }),
    );
  }

  updateStock(stock: Stock, originalCode: string = stock.code): Observable<any> {
    if (stock.id === undefined) return throwError(() => new Error('Stock id is missing'));

    return this.getStocks().pipe(
      switchMap((stocks) => {
        const duplicate = stocks.some((each) =>
          each.id !== stock.id &&
          each.code.toLowerCase() === stock.code.toLowerCase() &&
          stock.code.toLowerCase() !== originalCode.toLowerCase(),
        );
        if (duplicate) return of({ success: false, message: 'Stock code already exists' });

        return this.httpService.updateStock(stock.id!, stock).pipe(
          tap(() => this.stocksChanged.next()),
          map(() => ({ success: true, message: 'Stock updated successfully' })),
        );
      }),
    );
  }

  private toStock(data: Stock): Stock {
    const stock = new Stock(
      data.name,
      Number(data.price),
      data.code,
      Number(data.previousPrice),
      data.exchange,
    );
    stock.id = data.id;
    stock.favorite = data.favorite === true || String(data.favorite) === 'true';
    return stock;
  }
}
