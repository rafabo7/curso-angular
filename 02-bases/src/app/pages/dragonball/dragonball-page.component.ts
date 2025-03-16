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

  name = signal('Gohan')
  power = signal(1000)

  characters = signal<Character[]>([
    {id: 1, name: 'Goku', power: 9001},
    {id: 2, name: 'Vegeta', power: 8000},
    {id: 3, name: 'Krillin', power: 2000},
    {id: 4, name: 'Yamcha', power: 500},
  ])

  addCharacter () {
    if ( !this.name() || !this.power() || this.power() <= 0 ) return
    const newCharacter: Character = {
      id: this.characters().length+1,
      name: this.name(),
      power: this.power()

    }

    this.characters.update( (current) => [...current, newCharacter] )
    this.resetInputs()
  }

  resetInputs() {
    this.name.set('')
    this.power.set(0)
  }

  powerClasses = computed( () => {
    // Esto serviria para hacerlo con ngClass
    return {
      'text-danger'  : true
    }
  })

}
