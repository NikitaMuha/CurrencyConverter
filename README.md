# CurrencyConverter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.0.

## Initializing

Make sure you have the Angular CLI installed.  
To manage dependencies, you can use either `yarn` or `npm`.  
Depending on your choice, run `yarn install` or `npm install`.  
Once all dependencies are resolved, run `npm start` to create an environment and start the development server.

Then open your browser and navigate to http://localhost:4200/

## Additional Notes

If you want to add or remove a currency from the list, you should modify `convertor-form.component.ts` as follows:

- Add or remove currencies in:

  ```typescript
    type Currency = 'USD' | 'EUR' | 'UAH';
    this.currencyList = ['UAH', 'USD', 'EUR'];