import { Routes } from '@angular/router';
import { StockItem } from './stock-item/stock-item';
import { CreateStock } from './create-stock/create-stock';

export const routes: Routes = [
    { path: '', component: StockItem },
    {path: '**', redirectTo: ''},
];
