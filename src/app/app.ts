import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StockItem } from './stock-item/stock-item';
import { CreateStock } from './create-stock/create-stock';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [RouterOutlet, StockItem, CreateStock, ReactiveFormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('abc');
}
