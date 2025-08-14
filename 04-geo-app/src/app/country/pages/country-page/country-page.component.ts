import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from '../../../shared/components/not-found/not-found.component';
import { CountryInfoComponent } from './country-info/country-info.component';

@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, CountryInfoComponent],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent { 

  countryCode = inject(ActivatedRoute).snapshot.params['code']
  countryService = inject(CountryService)

  isInfoReady = signal<boolean>(false)

  countryResource = rxResource({
    params: () => ( {code: this.countryCode} ),
    stream: ({params}) => {
      return this.countryService.searchByCode(params.code)

    }
  })

  

}
