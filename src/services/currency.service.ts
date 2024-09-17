import { inject, Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Currency } from '../shared/currency.interface';
import { catchError, map, Observable, of, switchMap, throttleTime } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
private http = inject(HttpClient);
private toast = inject(ToastrService)

private readonly api = environment.apiUrl;

  constructor() { }

  getData(currencyFirst: string, currencySecond: string): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.api).pipe(
      map(data => {
        const filteredData = data
          .filter(currency => 
            (currency.cc === currencyFirst) ||
            (currency.cc === currencySecond)
          )
          .map(currency => ({
            rate: currency.rate,
            cc: currency.cc
          }));
        if (currencyFirst === 'UAH' || currencySecond === 'UAH') {
            filteredData.push({ rate: 1, cc: 'UAH' });
          }
        return filteredData;
      })
    );
  }
  

  getCoefficient(firstCurrency: string, secondCurrency: string) {
    if (firstCurrency === secondCurrency) {
      return of(1.00);
    } else {
      return this.getData(firstCurrency, secondCurrency).pipe(
        throttleTime(60000),
        switchMap(filteredData => {
          const first = filteredData.find(c => c.cc === firstCurrency);
          const second = filteredData.find(c => c.cc === secondCurrency);

          if (first && second) {
            const coefficient = first.rate / second.rate;
            return of(coefficient);
          } else {
            return of(0.00);
          }
        }),catchError(error => {
            this.toast.error('Error when receiving currency data');
            return of(1);
          }) 
          )
    }}
}
