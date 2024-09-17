import { Component, inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from '../../../services/form.service';
import { CurrencyService } from '../../../services/currency.service';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { Unsubscribe } from '../../../shared/unsubscribe.service';


type Currency = 'USD' | 'EUR' | 'UAH'

@Component({
  selector: 'app-convertor-form',
  templateUrl: './convertor-form.component.html',
  styleUrl: './convertor-form.component.scss',
})
export class ConvertorFormComponent extends Unsubscribe implements OnInit {

private formService = inject(FormService);
private currencyService = inject(CurrencyService)

public currencyList: Currency[];
private loading: boolean

form: FormGroup;

constructor() {
  super();
  this.loading= false;
  this.currencyList = ['UAH', 'USD', 'EUR'];
  this.form = this.formService.currencyForm();
}

  ngOnInit(): void {
    this.trackChanges();
    this.convertCurrency();
  }

private trackChanges() {
  const curencyForms: string[] = ['currencyFirst', 'currencySecond'];
  curencyForms.forEach(form => {
    this.form.get(form)?.valueChanges
    .subscribe(() => {
      this.convertCurrency()
    })
  })




  const valuesForms: string[] = ['valueFirst', 'valueSecond'];
  valuesForms.forEach(form => {
    this.form.get(form)?.valueChanges
    .pipe(
      takeUntil(this.$destroy),
      debounceTime(500),
      distinctUntilChanged()
    )
    .subscribe(() => {
        this.convertCurrency(form)
    })
  })
}

private convertCurrency(updatedField: string = 'valueFirst') {
  if (this.loading) return;

  const firstCurrency = this.form.get('currencyFirst')?.value; 
  const secondCurrency = this.form.get('currencySecond')?.value; 

  this.currencyService.getCoefficient(firstCurrency, secondCurrency)
    .subscribe({
      next: (coefficient) => {
        if (updatedField === 'valueFirst') {
          const valueFirst = this.form.get('valueFirst')?.value;
          if (valueFirst != null) {
            this.form.patchValue({
              valueSecond: valueFirst * coefficient 
            }, { emitEvent: false });
          }
        } else {
          const valueSecond = this.form.get('valueSecond')?.value; 
          if (valueSecond != null) {
            this.form.patchValue({
              valueFirst: valueSecond / coefficient 
            }, { emitEvent: false });
          }
        }
      },
      complete: () => {
        this.loading = false; 
      }
    });
}

public switchForms() {
  const firstCurrency = this.form.get('currencyFirst')?.value;
    const secondCurrency = this.form.get('currencySecond')?.value;

    this.form.patchValue({
      currencyFirst: secondCurrency,
      currencySecond: firstCurrency,
    }, { emitEvent: false });

    this.convertCurrency();
  }
}

