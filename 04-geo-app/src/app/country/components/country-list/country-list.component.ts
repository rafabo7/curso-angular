import { Component, input } from '@angular/core';
import { RESTCountry } from '../../interface/rest-countries.interfaces';
import { CountryInterface } from '../../interface/country.interface';

@Component({
  selector: 'country-list',
  imports: [],
  templateUrl: './country-list.component.html',
})
export class CountryListComponent { 

  countries = input<CountryInterface[]>()
}
