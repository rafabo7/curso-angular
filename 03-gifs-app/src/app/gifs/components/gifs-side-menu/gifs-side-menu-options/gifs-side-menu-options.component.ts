import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifService } from 'src/app/gifs/services/gif.service';

interface MenuOption {
  icon: string;
  label: string;
  route: string;
  sublabel: string;
}


@Component({
  selector: 'gifs-side-menu-options',
  imports: [
    RouterLink, RouterLinkActive
  ],
  templateUrl: './gifs-side-menu-options.component.html'
})
export class GifsSideMenuOptionsComponent { 

  gifService = inject(GifService)

  menuOptions: MenuOption[] = [

    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      sublabel: 'Popular Gifs',
      route: '/dashboard/trending'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Search',
      sublabel: 'Browse Gifs',
      route: '/dashboard/search'
    }

  ]; 


}
