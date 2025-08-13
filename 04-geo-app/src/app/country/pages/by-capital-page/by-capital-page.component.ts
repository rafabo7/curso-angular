import { RESTCountry } from './../../interface/rest-countries.interfaces';
import { Component, inject, resource, signal } from '@angular/core';
import { CountrySearchInputComponent } from "../../components/country-search-input/country-search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { CountryInterface } from '../../interface/country.interface';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'by-capital-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService)

  query = signal("")

  

  capitalResource = rxResource({
    params: () => ({ query: this.query() }),

    stream: ( {params} ) => {

      if ( !params.query ) return of([])

      return this.countryService.searchByCapital(params.query)
    }
  })


  //* Con resource mejor, aunque el inconveniente es que resource devuelve una promesa que hay procesar con firstValueFrom
  // countryResource = resource({
  //   params: () => ({ query: this.query() }),

  //   loader: async( {params} ) => {

  //     if ( !params.query ) return []

  //     return await firstValueFrom(

  //       this.countryService.searchByCapital(params.query)
  //     )
  //   }
  // })




  //* Esta forma de hacerlo funciona pero no es la mejor ni la más eficiente
  // isLoading = signal(false)
  // isError = signal<string|null>(null)

  // countries = signal<CountryInterface[]>([]) 

  // onSearchedCountry( query:string ) {

  //   if ( this.isLoading() ) return

  //   this.isLoading.set(true)
  //   this.isError.set(null)


  //   this.countryService.searchByCapital(query)
  //     .subscribe({ next: (countries) => {

  //       this.isLoading.set(false)
  //       this.countries.set(countries)
        
  //     },

  //     error: (err) => {
  //       this.isLoading.set(false)
  //       this.countries.set([])
  //       this.isError.set(err)
  //     },
    
  //   })

  // }

  
 }
