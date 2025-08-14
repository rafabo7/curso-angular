import { Component, input } from '@angular/core';
import { RESTCountry } from '../../interface/rest-countries.interfaces';
import { CountryInterface } from '../../interface/country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-list.component.html',
})
export class CountryListComponent { 

  countries = input.required<CountryInterface[]>()

  errorMessage = input<Error|undefined>()
  isLoading = input<boolean>(false)
  isEmpty = input<boolean>(false)
}
