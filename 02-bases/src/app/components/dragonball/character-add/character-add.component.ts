import { ChangeDetectionStrategy, Component, signal, input, output } from '@angular/core';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-add',
  templateUrl: './character-add.component.html',
})

export class CharacterAddComponent {


  name = signal('Gohan')
  power = signal(1000)

  newCharacter = output<Character>()


  addCharacter () {
    if ( !this.name() || !this.power() || this.power() <= 0 ) return
    const newCharacter: Character = {
      // id: this.characters().length+1,
      id: Math.floor(Math.random() * 100),
      name: this.name(),
      power: this.power()

    }

    this.newCharacter.emit(newCharacter)
    this.resetInputs()
  }

  resetInputs() {
    this.name.set('')
    this.power.set(0)
  }



 }
