import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateStock } from './create-stock/create-stock';

@Component({
  imports: [RouterOutlet, CreateStock],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
