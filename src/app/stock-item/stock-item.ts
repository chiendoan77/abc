import { Component, Input } from '@angular/core';
import { Stock } from '../model/stock';
import { StockService } from '../service/stock-service';
import { FormsModule } from '@angular/forms';


@Component({
  imports: [FormsModule],
  selector: 'app-stock-item',
  styleUrl: './stock-item.css',
  templateUrl: './stock-item.html',
})
export class StockItem {
  @Input() stock!: Stock;
  showDialog: boolean = false;
  editForm: any = {};
  private originalCode = '';
  openDetail() {
    this.editForm = { ...this.stock };
    this.originalCode = this.stock.code;
    this.showDialog = true;
  }
  closeDialog() {
    this.showDialog = false;
  }
  saveStock() {
    if (!this.editForm.name.trim() || !this.editForm.code.trim()) {
      return;
    }

    const result = this.stockService.updateStock({
      ...this.editForm,
      price: Number(this.editForm.price),
      previousPrice: Number(this.editForm.previousPrice),
    }, this.originalCode);
    if (result.success) {
      this.showDialog = false;
    }
  }
  constructor(private stockService: StockService) { }

  toggleFavorite() {
    this.stockService.toggleFavorite(this.stock);
  }
  deleteStock() {
    this.stockService.deleteStock(this.stock);
  }

}

