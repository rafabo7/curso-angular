import { Component } from '@angular/core';

@Component({
  selector: 'app-heroes-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

  public name: string = 'Ironman';
  public age:  number = 45;

  get capitalizeName(): string {
    return this.name.toUpperCase()
  }

  getheroDescription(): string {

    return `${ this.name }, age: ${ this.age }`
  }

  changeHero(): void {
    this.name = 'Spiderman'

  }

  changeAge(): void {
    this.age = 25
  }

  reset(): void {
    this.name = 'Ironman'
    this.age = 45
  }


}
