import { Injectable, signal } from '@angular/core';
import { Character } from '../interfaces/character.interface';

@Injectable({providedIn: 'root'})
export class DragonballService {
  constructor() { } // el constructor se usaba en anteriores versiones, aun está disponible pero se promueve la nueva forma.
  // Aquí iría toda la info y métodos

  characters = signal<Character[]>([
    {id: 1, name: 'Goku', power: 9001},
    {id: 2, name: 'Vegeta', power: 8000}
  ])

  addCharacter (newCharacter: Character) {
    this.characters.update(
      list => [...list, newCharacter]
    )

  }

}