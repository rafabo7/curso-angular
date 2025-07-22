import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { environment } from '@environments/environment';
import { GifMapper } from '../mapper/gif.mapper';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import type { Gif } from '../interfaces/gif.interface';

const SEARCH_HISTORY = "searchHistory"

const loadFromLocaSorage = () => {

    const localStorageGifs = localStorage.getItem(SEARCH_HISTORY) ?? '{}'
    const parsedGifs = JSON.parse(localStorageGifs)
    return parsedGifs
}

@Injectable({providedIn: 'root'})
export class GifService {

    constructor(){
        this.loadTrendingGifs()
    }


    saveToLocalStorage = effect( () => {
        
        localStorage.setItem(SEARCH_HISTORY, JSON.stringify(this.searchHistory()))

    } )


    trendingGifs = signal<Gif[]>([])

    private http = inject(HttpClient)

    // Search results as a record, keys as queries
    searchHistory = signal<Record<string, Gif[]>>( loadFromLocaSorage() )

    masonryGroups = computed<Gif[][]>( () => {
        const groups = []
        for ( let i = 0; i < this.trendingGifs().length; i += 3 ) {
            groups.push( this.trendingGifs().slice(i, i + 3) )
        }
        console.log(groups)
        return groups
    } )

    // Keys of record, for aside display of recent searches
    searchHistoryKeys = computed( () => Object.keys(this.searchHistory()) )
    
    
    loadTrendingGifs(){

        this.http.get<GiphyResponse>(`${ environment.giphyUrl }/gifs/trending`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: 20
            }
        }).subscribe( res => {
            const gifs = GifMapper.mapGiphyToGifArr(res.data)
            this.trendingGifs.set(gifs)
        } )


    }

    searchGifs(query: string): Observable<Gif[]> {

        return this.http.get<GiphyResponse>(`${ environment.giphyUrl }/gifs/search`, {
            params: {
                api_key: environment.giphyApiKey,
                q: query,
                limit: 20
            }
        })
            .pipe(
                map( ({data}) => GifMapper.mapGiphyToGifArr(data)),
                // Asign of history data
                tap( items => {
                    this.searchHistory.update( current => ({
                        ...current, 
                        [query.toLowerCase()]: items
                    }) )
                } )
            )
    }

    getPreviousSearch( query: string ): Gif[] {

        return this.searchHistory()[query] ?? []

    }


    
}