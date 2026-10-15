import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Stock } from '../model/stock';
import { JsonPipe, NgIf } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StockService } from '../service/stock-service';

let count = 1;

@Component({
  imports: [FormsModule, JsonPipe, ReactiveFormsModule, NgIf],
  selector: 'app-create-stock',
  styleUrl: './create-stock.css',
  templateUrl: './create-stock.html',
})
export class CreateStock {

  // public stock!: Stock;
  // public oldCode: string = '';
  // public priceVisited: boolean = false;
  // public nameControl = new FormControl();
  // ----------------------------------------
  // public stockForm: FormGroup = new FormGroup({
  //   name: new FormControl('', [Validators.required]),
  //   price: new FormControl(0, [Validators.required, Validators.min(0)]),
  //   code: new FormControl(''),
  //   previousPrice: new FormControl(0),
  //   exchange: new FormControl(''),
  // });
  //----------------------------------------
  private stock: Stock;
  public stockForm!: FormGroup;
  constructor( private fb: FormBuilder, private stockService: StockService) {
    this.createForm();
    this.stock = new Stock('Test' + count++, 20, 'TST', 10);
  }

  private createForm() {
    this.stockForm = this.fb.group({
      name: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]],
      code: ['', [Validators.required]],
      previousPrice: [0],
      exchange: [''],
    });
  }

  // ngOnInit() {
  //   this.stock = new Stock('', 85, 'TSC', 80, "NYSE");
  // }

  // isNameValid(): boolean {
  //   return this.stock.name.trim().length > 0;
  // }

  // onPriceFocus() {
  //   this.priceVisited = true;
  // }
  onSubmit() {
    const stock = new Stock(
    this.stockForm.value.name,
    this.stockForm.value.price,
    this.stockForm.value.code,
    this.stockForm.value.previousPrice,
    this.stockForm.value.exchange
  );
    if (this.stockForm.invalid) {
      this.stockForm.markAllAsTouched();
      return;
    }

    const result = this.stockService.createStock(stock);
    if (result.success) {
      this.stockForm.reset({ name: '', price: 0, code: '', previousPrice: 0, exchange: '' });
    } else {
      this.stockForm.get('code')?.setErrors({ duplicate: true });
    }
  }
  get name(){ return this.stockForm.get('name'); }
  get code(){ return this.stockForm.get('code'); }
  get price(){ return this.stockForm.get('price'); }

  loadStockForm(){
    this.stock = new Stock('Test' + count++, 20,'TST', 10);
    let stockFormModel: Partial<Stock> = Object.assign({}, this.stock);
    delete stockFormModel.previousPrice;
    delete stockFormModel.favorite;
    this.stockForm.setValue(stockFormModel); 
  }

  patchStockForm(){
    this.stock = new Stock("Test " + count++, 20, 'TST', 10);
    this.stockForm.patchValue(this.stock);
  }

  resetForm(){
    this.stockForm.reset();
  }
}
