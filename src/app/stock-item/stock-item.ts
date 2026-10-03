import { Component, OnInit, Input } from '@angular/core';
import { Stock } from '../model/stock';

@Component({
  imports: [],
  selector: 'app-stock-item',
  styleUrl: './stock-item.css',
  templateUrl: './stock-item.html',
})
export class StockItem implements OnInit {
  @Input() stock!: Stock;
  constructor() { }

  ngOnInit() {
    // this.stock = new Stock('Test Stock Company', 85, 'TSC', 80);
  }
  toggleFavorite(event: Event) {
    console.log('toggleFavorite called');
    this.stock.favorite = !this.stock.favorite;
  }
}

