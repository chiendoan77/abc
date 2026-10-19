
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription, timer, switchMap, map, distinctUntilChanged, catchError, of } from 'rxjs';
import { StockItem } from '../stock-item/stock-item';
import { Stock } from '../model/stock';
import { StockService } from '../service/stock-service';

@Component({
  imports: [StockItem, FormsModule],
  selector: 'app-stock-list',
  styleUrl: './stock-list.css',
  templateUrl: './stock-list.html',
})
export class StockList implements OnInit, OnDestroy {
  stocks: Stock[] = [];
  searchCode = '';

  private pollingSubscription?: Subscription;

  constructor(
    private readonly stockService: StockService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.stockService.stocksChanged.subscribe(() => this.findStocks());

    this.pollingSubscription = timer(0, 2000)
      .pipe(
        switchMap(() =>
          this.stockService.getStocks().pipe(
            catchError((error) => {
              console.error('Failed to load stocks:', error);
              return of(null);
            })
          )
        ),
        map((stocks) =>
          stocks === null ? null : JSON.stringify(stocks)
        ),
        distinctUntilChanged()
      )
      .subscribe((data) => {
        if (data !== null) {
          this.findStocks();
        }
      });
  }

  loadStocks(): void {
    this.findStocks();
  }

  findStocks(): void {
    this.stockService.findStockByCode(this.searchCode).subscribe((stocks) => {
      this.stocks = stocks;
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.pollingSubscription?.unsubscribe();
  }
}
