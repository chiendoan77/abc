import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StockItem } from '../stock-item/stock-item';
import { Stock } from '../model/stock';
import { StockService } from '../service/stock-service';

@Component({
  imports: [StockItem, FormsModule],
  selector: 'app-stock-list',
  styleUrl: './stock-list.css',
  templateUrl: './stock-list.html',
})
export class StockList {
  stocks: Stock[] = [];
  searchCode = '';

  constructor(private readonly stockService: StockService) {
    this.loadStocks();
    this.stockService.stocksChanged.subscribe(() => this.loadStocks());
  }

  loadStocks(): void {
    this.stockService.getStocks().subscribe((stocks) => this.stocks = stocks);
  }

  get filteredStocks(): Stock[] {
    const code = this.searchCode.trim().toLowerCase();
    return code
      ? this.stocks.filter((stock) => stock.code.toLowerCase().includes(code))
      : this.stocks;
  }
}
