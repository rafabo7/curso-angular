import type { CountryInterface } from './../interface/country.interface';
import type { RESTCountry } from "../interface/rest-countries.interfaces";
import countryRoutes from '../country.routes';

export class CountryMapper {

    static restCountryToCountry (restCountry: RESTCountry): CountryInterface {
        
        
        return {
            cca2: restCountry.cca2,
            flag: restCountry.flags.svg,
            name : restCountry.name.official,
            capital : restCountry.capital ? restCountry.capital[0] : "—",
            population : restCountry.population

        }
    }

    static mapRestCountry (restCountryArr: RESTCountry[]): CountryInterface[] {
        
        return restCountryArr.map( this.restCountryToCountry )
    }


}