import { Injectable, signal } from '@angular/core';
import { Stock } from '../model/stock';

export interface StockResult {
  success: boolean;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class StockService {
  private readonly stockState = signal<Stock[]>([
    new Stock('Test Stock Company', 85, 'TSC', 80),
    new Stock('Test Stock Company 2', 25, 'TSC2', 20),
    new Stock('Test Stock Company 3', 50, 'TSC3', 45),
  ]);

  readonly stocks = this.stockState.asReadonly();

  createStock(stock: Stock): StockResult {
    if (this.stockState().some((each) => each.code === stock.code)) {
      return { success: false, message: `Stock code ${stock.code} already exists` };
    }

    this.stockState.update((stocks) => [...stocks, new Stock(
      stock.name,
      stock.price,
      stock.code,
      stock.previousPrice,
      stock.exchange,
    )]);
    return { success: true, message: `Stock ${stock.code} created successfully` };
  }

  toggleFavorite(stock: Stock): void {
    this.stockState.update((stocks) => stocks.map((each) => {
      if (each.code !== stock.code) return each;

      const updated = new Stock(
        each.name,
        each.price,
        each.code,
        each.previousPrice,
        each.exchange,
      );
      updated.favorite = !each.favorite;
      return updated;
    }));
  }

  deleteStock(stock: Stock): StockResult {
    const stocks = this.stockState();
    if (!stocks.some((each) => each.code === stock.code)) {
      return { success: false, message: 'Stock not found' };
    }

    this.stockState.update((current) => current.filter((each) => each.code !== stock.code));
    return { success: true, message: 'Stock deleted successfully' };
  }

  updateStock(stock: Stock, originalCode: string = stock.code): StockResult {
    const stocks = this.stockState();
    if (!stocks.some((each) => each.code === originalCode)) {
      return { success: false, message: 'Stock not found' };
    }
    if (stock.code !== originalCode && stocks.some((each) => each.code === stock.code)) {
      return { success: false, message: `Stock code ${stock.code} already exists` };
    }

    this.stockState.update((current) => current.map((each) =>
      each.code === originalCode
        ? new Stock(stock.name, stock.price, stock.code, stock.previousPrice, stock.exchange)
        : each,
    ));
    return { success: true, message: 'Stock updated successfully' };
  }
}
