import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NumbersValidatorService } from './numbers-validator.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {

private fb = inject(FormBuilder);
private numbersValidator = inject(NumbersValidatorService);


public currencyForm(): FormGroup {
  return this.fb.group({ 
    currencyFirst: ['UAH'],
    valueFirst: [1, [Validators.required, this.numbersValidator.numberValidator]],
    currencySecond: ['USD'],
    valueSecond: [1, [Validators.required, this.numbersValidator.numberValidator]],
  })
  }
}
