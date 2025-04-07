import { effect, Injectable, signal } from '@angular/core';
import { Character } from '../interfaces/character.interface';

function loadFromLocaStorage ():Character[] {
  const characters = localStorage.getItem('characters')
  return characters ? JSON.parse(characters) : []
}

@Injectable({providedIn: 'root'})
export class DragonballService {
  constructor() { } // el constructor se usaba en anteriores versiones, aun está disponible pero se promueve la nueva forma.
  // Aquí iría toda la info y métodos

  characters = signal<Character[]>(loadFromLocaStorage())

  // no recomendado para peticiones HTTP
  saveToLocalStorage = effect( () => {
    localStorage.setItem('characters', JSON.stringify(this.characters()))
  } )

  addCharacter (newCharacter: Character) {
    this.characters.update(
      list => [...list, newCharacter]
    )

  }

}