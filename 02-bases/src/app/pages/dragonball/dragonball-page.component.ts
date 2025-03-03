import { Component, computed, signal } from '@angular/core';

interface Character {
  id:number,
  name:string,
  power:number
}

@Component({
  templateUrl: './dragonball-page.component.html'
})

export class DragonBallPage {

  characters = signal<Character[]>([
    {id: 1, name: 'Goku', power: 9001},
    {id: 2, name: 'Vegeta', power: 8000},
    {id: 3, name: 'Krillin', power: 2000},
    {id: 4, name: 'Yamcha', power: 500},
  ])

  powerClasses = computed( () => {
    // Esto serviria para hacerlo con ngClass
    return {
      'text-danger'  : true
    }
  })

}
