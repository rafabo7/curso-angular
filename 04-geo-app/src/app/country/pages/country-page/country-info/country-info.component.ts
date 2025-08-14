import { Component, input } from '@angular/core';
import { CountryInterface } from '../../../interface/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-info',
  imports: [DecimalPipe],
  templateUrl: './country-info.component.html',
})
export class CountryInfoComponent {

  countryInfo = input.required<CountryInterface>()

 }
