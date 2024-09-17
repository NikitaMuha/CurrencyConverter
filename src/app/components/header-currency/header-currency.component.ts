import { Component, inject, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CurrencyService } from '../../../services/currency.service';

@Component({
  selector: 'app-header-currency',
  templateUrl: './header-currency.component.html',
  styleUrl: './header-currency.component.scss'
})
export class HeaderCurrencyComponent implements OnInit {
private currencyService = inject(CurrencyService);
EUR: number = 0;
USD: number = 0;

ngOnInit() {
  this.getData();
}

private getData() {
  forkJoin({
    usd: this.currencyService.getData('USD', 'UAH'),
    eur: this.currencyService.getData('EUR', 'UAH')
  }).subscribe({
      next: ({ usd, eur }) => {
        const usdRate = usd.find(currency => currency.cc === 'USD')?.rate ?? 0;
        const eurRate = eur.find(currency => currency.cc === 'EUR')?.rate ?? 0;

        this.USD = usdRate;
        this.EUR = eurRate;
    }})
  }
}
