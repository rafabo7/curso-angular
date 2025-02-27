import { UpperCasePipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-hero-page',
  imports: [UpperCasePipe],
  templateUrl: './hero-page.component.html',
})
export class HeroPageComponent {

  name = signal<string>('Ironman')
  age = signal<number>(45)

  heroDescription = computed( () => {
    const description = `${this.name()} - ${this.age()} years old`

    return description
  })

  capitalizeName = computed( () => this.name().toUpperCase())


  public changeHero():void {
    this.name.set('Spiderman')
    this.age.set(20)
  }

  public changeAge():void {
    this.age.set(60)
  }

  public resetForm():void {
    this.name.set('Ironman')
    this.age.set(45)
  }


}
