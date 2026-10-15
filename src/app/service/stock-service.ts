import { Service, Injectable } from '@angular/core';
import { Stock } from '../model/stock';
import { Observable, of, throwError } from 'rxjs';  

@Injectable()
export class StockService {
    private stocks!: Stock[];
    constructor() {
        this.stocks = [
            new Stock('Test Stock Company', 85, 'TSC', 80),
            new Stock('Test Stock Company 2', 25, 'TSC2', 20),
            new Stock('Test Stock Company 3', 50, 'TSC3', 45)
        ];
    }
    getStocks(): Observable<Stock[]> {
        return of([...this.stocks]);
    }
    createStock(stock: Stock): Observable<any> {
        let found = this.stocks.find(each => each.code === stock.code);
        if(found){
            return of(false);
        }
        this.stocks.push(stock);
        return of({success: true, message: 'Stock created successfully' + stock.code});
    }
    toggleFavorite(stock: Stock): Observable<Stock> {
        let foundStock = this.stocks.find(each => each.code === stock.code);
        if(foundStock){
            foundStock.favorite = !foundStock.favorite;
            return of(foundStock);
        }
        return throwError(() => new Error('Stock not found'));
    }
    delteStock(stock: Stock): Observable<any> {
        let index = this.stocks.findIndex(each => each.code === stock.code);
        if(index !== -1){
            this.stocks.splice(index, 1);
            return of({success: true, message: 'Stock deleted successfully'});
        }
        return throwError(() => new Error('Stock not found'));
    }
    findStockByCode(code: string): Observable<Stock | undefined> {
        let foundStock = this.stocks.find(each => each.code === code);
        return of(foundStock);
    }
    updateStock(stock: Stock): Observable<any> {
        let foundStock = this.stocks.find(each => each.code === stock.code);
        if(foundStock){
            foundStock.name = stock.name;
            foundStock.price = stock.price;
            foundStock.previousPrice = stock.previousPrice;
            foundStock.exchange = stock.exchange;
            return of({success: true, message: 'Stock updated successfully'});
        }
        return throwError(() => new Error('Stock not found'));
    }
}
