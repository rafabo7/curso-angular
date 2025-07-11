import { Component, inject, signal } from '@angular/core';
import { GifsListComponent } from '../../components/gifs-list/gifs-list.component';
import { GifService } from '../../services/gif.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifsListComponent],
  templateUrl: './search-page.component.html'
})
export default class SearchPageComponent { 

  gifService = inject(GifService)

  gifs = signal<Gif[]>([])

  onSearch(query: string) {
    this.gifService.searchGifs(query)
      .subscribe(res => this.gifs.set(res))
  }
 }
