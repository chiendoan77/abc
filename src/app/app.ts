import { Component, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateStock } from './create-stock/create-stock';
import { ReactiveFormsModule } from '@angular/forms';
import { StockList } from './stock-list/stock-list';
import { Stock } from './model/stock';
import { StockService } from './service/stock-service';

@Component({
  imports: [RouterOutlet, StockList, CreateStock, ReactiveFormsModule],
  selector: 'app-root',
  providers: [StockService],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  @ViewChild(StockList) stockList!: StockList;
  protected readonly title = signal('abc');

  reload(stock: Stock) {
    console.log('Adding stock:', stock);
    this.stockList.loadStocks();
  }
}
