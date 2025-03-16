import { Component, signal } from '@angular/core';

interface Character {
  id:number,
  name:string,
  power:number
}

@Component({
  templateUrl: './dragonball-super-page.component.html',
  selector: 'dragon-ball-super'
})

export class DragonBallSuperPageComponent {

  name = signal('Gohan')
  power = signal(1000)

  characters = signal<Character[]>([
    {id: 1, name: 'Goku', power: 9001},
    {id: 2, name: 'Vegeta', power: 8000}
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

}
