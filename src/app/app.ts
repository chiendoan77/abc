import { Component, signal } from '@angular/core';
import { CreateStock } from './create-stock/create-stock';
import { ReactiveFormsModule } from '@angular/forms';
import { StockList } from './stock-list/stock-list';

@Component({
  imports: [StockList, CreateStock, ReactiveFormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('abc');
}
