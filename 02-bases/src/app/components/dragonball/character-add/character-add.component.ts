import { ChangeDetectionStrategy, Component, signal, input } from '@angular/core';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-add',
  templateUrl: './character-add.component.html',
})

export class CharacterAddComponent {


  name = signal('Gohan')
  power = signal(1000)


  addCharacter () {
    if ( !this.name() || !this.power() || this.power() <= 0 ) return
    const newCharacter: Character = {
      // id: this.characters().length+1,
      id:65654,
      name: this.name(),
      power: this.power()

    }
    console.log({ newCharacter });
    this.resetInputs()
  }

  resetInputs() {
    this.name.set('')
    this.power.set(0)
  }



 }
