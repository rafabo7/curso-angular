import { Component, signal } from '@angular/core';
import { CharacterListComponent } from "../../components/dragonball/character-list/character-list.component";
import { CharacterAddComponent } from '../../components/dragonball/character-add/character-add.component';

interface Character {
  id:number,
  name:string,
  power:number
}

@Component({
  templateUrl: './dragonball-super-page.component.html',
  selector: 'dragon-ball-super',
  imports: [CharacterListComponent, CharacterAddComponent]
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
      // id: this.characters().length+1,
      id: 654,
      name: this.name(),
      power: this.power()

    }

    // this.characters.update( (current) => [...current, newCharacter] )
    console.log({ newCharacter });
    this.resetInputs()
  }

  resetInputs() {
    this.name.set('')
    this.power.set(0)
  }

}
