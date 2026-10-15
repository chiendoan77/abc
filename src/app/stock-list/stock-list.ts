import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { StockItem } from '../stock-item/stock-item';
import { Stock } from '../model/stock';
import { StockService } from '../service/stock-service';

@Component({
  imports: [StockItem, FormsModule, AsyncPipe],
  selector: 'app-stock-list',
  styleUrl: './stock-list.css',
  templateUrl: './stock-list.html',
})
export class StockList {
  stocks$: Observable<Stock[]>;
  searchCode = '';

  constructor(private readonly stockService: StockService) {
    this.stocks$ = this.stockService.getStocks();
  }

  filteredStocks(stocks: Stock[]): Stock[] {
    const code = this.searchCode.trim().toLowerCase();
    return code
      ? stocks.filter((stock) => stock.code.toLowerCase().includes(code))
      : stocks;
  }
}
