import { Routes } from '@angular/router';
import { StockList } from './stock-list/stock-list';

export const routes: Routes = [
  { path: '', component: StockList, pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
