import { Languages } from './rest-countries.interfaces';
export interface CountryInterface {

    cca2: string;
    flag: string;
    name: string;
    nativeName: string;
    capital: string;
    subregion: string;
    coatOfArms: string;
    languages: string[];
    area: number;
    population: number;
    popDensity: number;

}