import { Component, inject, resource, signal } from '@angular/core';
import { CountrySearchInputComponent } from "../../components/country-search-input/country-search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'by-country-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent { 

  countryService = inject(CountryService)

  query = signal("")

  
  countryResource = rxResource({
    params: () => ({ query: this.query() }),

    stream: ( {params} ) => {

      if ( !params.query ) return of([])

      return this.countryService.searchByCountry(params.query)
    }
  })


  // countryResource = resource({
  //   params: () => ({ query: this.query() }),

  //   loader: async( {params} ) => {

  //     if ( !params.query ) return []

  //     return await firstValueFrom(

  //       this.countryService.searchByCountry(params.query)
  //     )
  //   }
  // })


 }
