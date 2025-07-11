import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GifService {

    constructor(){
        this.loadTrendingGifs()
    }

    trendingGifs = signal<Gif[]>([])

    private http = inject(HttpClient)
    
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

    searchGifs(query: string) {

        return this.http.get<GiphyResponse>(`${ environment.giphyUrl }/gifs/search`, {
            params: {
                api_key: environment.giphyApiKey,
                q: query,
                limit: 20
            }
        })
            .pipe(
                map( ({data}) => GifMapper.mapGiphyToGifArr(data))
            )
    }



    
}