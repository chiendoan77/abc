import { Component, Input } from '@angular/core';
import { StockItem } from '../stock-item/stock-item';
import { Stock } from '../model/stock';
import { StockService } from '../service/stock-service';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  imports: [StockItem, FormsModule],
  selector: 'app-stock-list',
  styleUrl: './stock-list.css',
  templateUrl: './stock-list.html',
})
export class StockList {
  @Input() stocks: Stock[] = [];
  searchCode: string = '';

  constructor( private stockService: StockService, private cdr: ChangeDetectorRef) {};

  loadStocks() {
  this.stockService.getStocks().subscribe(stocks => {
    console.log('StockList nhan duoc:', stocks);
    this.stocks = [...stocks];
    this.searchCode = '';
    this.cdr.detectChanges();
  });
}

  ngOnInit() {
    this.loadStocks();
  }
  findStockByCode() {
    if (this.searchCode.trim() === '') {
      this.loadStocks();
    } else {
      this.stockService.findStockByCode(this.searchCode).subscribe(stock => {
        if (stock) {
          this.stocks = [stock];
        } else {
          this.stocks = [];
        }
      });
    }
  }
}
