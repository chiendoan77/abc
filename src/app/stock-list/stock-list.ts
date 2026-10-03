import { Component, Input } from '@angular/core';
import { StockItem } from '../stock-item/stock-item';
import { Stock } from '../model/stock';

@Component({
  imports: [StockItem],
  selector: 'app-stock-list',
  styleUrl: './stock-list.css',
  templateUrl: './stock-list.html',
})
export class StockList {
  @Input() stocks: Stock[] = [];
}
