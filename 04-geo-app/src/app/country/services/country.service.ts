import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interface/rest-countries.interfaces';
import { CountryMapper } from '../mappers/country.mapper';
import { map, Observable } from 'rxjs';
import { CountryInterface } from '../interface/country.interface';

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor() { }

  private http = inject(HttpClient)

  searchByCapital( query: string ): Observable<CountryInterface[]> {
    query = query.toLowerCase()

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map( resp => CountryMapper.mapRestCountry(resp) )
      )
  }


}
