import { Component, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateStock } from './create-stock/create-stock';
import { ReactiveFormsModule } from '@angular/forms';
import { StockList } from './stock-list/stock-list';
import { Stock } from './model/stock';

@Component({
  imports: [RouterOutlet, StockList, CreateStock, ReactiveFormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  @ViewChild(CreateStock) createStockComponent!: CreateStock;
  protected readonly title = signal('abc');

  stocks: Stock[] = [
    new Stock('Test Stock Company', 85, 'TSC', 80),
    new Stock('Test Stock Company 2', 25, 'TSC2', 20),
    new Stock('Test Stock Company 3', 50, 'TSC3', 45),
    new Stock('Test Stock Company 4', 100, 'TSC4', 90),
    new Stock('Test Stock Company 5', 75, 'TSC5', 70),
    new Stock('Test Stock Company 6', 60, 'TSC6', 55),
    new Stock('Test Stock Company 7', 30, 'TSC7', 25),
    new Stock('Test Stock Company 8', 95, 'TSC8', 90),
    new Stock('Test Stock Company 9', 40, 'TSC9', 35),
    new Stock('Test Stock Company 10', 15, 'TSC10', 10),
  ];
  addStock(stock: Stock) {
    console.log('Adding stock:', stock);
    this.stocks = [...this.stocks, stock];
    this.createStockComponent.resetForm();
  }
}
