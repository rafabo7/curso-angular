import { Routes } from '@angular/router';
import { CounterPageComponent } from './pages/counter/counter-page.component';
import { HeroPageComponent } from './pages/hero/hero-page/hero-page.component';
import { DragonBallPage } from './pages/dragonball/dragonball-page.component';
import { DragonBallSuperPageComponent } from './pages/dragonball-super/dragonball-super-page.component';

export const routes: Routes = [
  {
    path: '',
    component: CounterPageComponent
  },
  {
    path: 'hero',
    component: HeroPageComponent
  },
  {
    path: 'dragonball',
    component: DragonBallPage
  },
  {
    path: 'dragonball-super',
    component: DragonBallSuperPageComponent
  },
  {
    path: '**',
    redirectTo: ''
  }

];
