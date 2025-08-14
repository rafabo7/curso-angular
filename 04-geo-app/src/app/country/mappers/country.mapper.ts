import type { CountryInterface } from './../interface/country.interface';
import type { RESTCountry } from "../interface/rest-countries.interfaces";
import countryRoutes from '../country.routes';

export class CountryMapper {

    static restCountryToCountry (restCountry: RESTCountry): CountryInterface {

        // taking the first language key name, it is the nativeName key
        // see rest-countries interface
        const firstLang: string = Object.keys(restCountry.languages)[0] as keyof typeof restCountry.languages
        const officialNativeName: string = restCountry.name.nativeName[firstLang].official
        const langs = Object.values(restCountry.languages)

        
        
        
        return {
            cca2: restCountry.cca2,
            flag: restCountry.flags.svg,
            name : restCountry.name.official,
            subregion: restCountry.subregion,
            languages: langs,
            area: restCountry.area,
            coatOfArms: restCountry.coatOfArms.svg,
            nativeName: officialNativeName,
            capital : restCountry.capital ? restCountry.capital[0] : "—",
            population : restCountry.population,
            popDensity: restCountry.population / restCountry.area

        }
    }

    static mapRestCountry (restCountryArr: RESTCountry[]): CountryInterface[] {

        console.log(restCountryArr)
        
        return restCountryArr.map( this.restCountryToCountry )
    }


}