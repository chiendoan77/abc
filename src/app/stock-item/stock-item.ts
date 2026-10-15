import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Stock } from '../model/stock';
import { StockService } from '../service/stock-service';
import { FormsModule } from '@angular/forms';


@Component({
  imports: [FormsModule],
  selector: 'app-stock-item',
  styleUrl: './stock-item.css',
  templateUrl: './stock-item.html',
})
export class StockItem  implements OnInit {
  @Input() stock!: Stock;
  @Output() stockUpdated = new EventEmitter<Stock>();
  @Output() stockDeleted = new EventEmitter<Stock>();
  showDialog: boolean = false;
  editForm: any = {};
  openDetail() {
    this.editForm = { ...this.stock };
    this.showDialog = true;
  }
  closeDialog() {
    this.showDialog = false;
  }
  saveStock() {
    if (!this.editForm.name.trim() || !this.editForm.code.trim()) {
      return;
    }

    this.stock.name = this.editForm.name;
    this.stock.code = this.editForm.code;
    this.stock.price = Number(this.editForm.price);
    this.stock.previousPrice = Number(this.editForm.previousPrice);
    this.stock.exchange = this.editForm.exchange;
    this.showDialog = false;
    this.stockUpdated.emit();
  }
  constructor(private stockService: StockService) { }

  ngOnInit() {
  }
  toggleFavorite(event: Event) {
    console.log('toggleFavorite called');
    this.stockService.toggleFavorite(this.stock).subscribe(updatedStock => {
      this.stock = updatedStock;
    });
  }
  deleteStock(event: Event) {
    this.stockService.delteStock(this.stock).subscribe(result => {
      if (result.success) {
        console.log('Stock deleted successfully');
        this.stockDeleted.emit(this.stock);
      } else {
        console.error('Failed to delete stock');
      }
    }); 
  }

  updateStock(event: Event) {
    this.stockService.updateStock(this.stock).subscribe(result => {
      if (result.success) {
        console.log('Stock updated successfully');
        this.stockUpdated.emit(this.stock);
      } else {
        console.error('Failed to update stock');
      }
    }); 
  }
}

