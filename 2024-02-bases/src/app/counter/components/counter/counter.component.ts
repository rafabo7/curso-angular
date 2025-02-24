import { Component,  } from "@angular/core";

@Component({
  selector: 'app-counter',
  template: `
  <h4>{{title}}</h4>
  <p>Counter: {{counter}} </p>
  <button (click)="updateCounter(+5)" >+5</button>
  <button (click)="updateCounter(+1)" >+1</button>
  <button (click)="resetCounter()" >Reset</button>
  <button (click)="updateCounter(-1)" >-1</button>
  <button (click)="updateCounter(-5)" >-5</button>

  `
})
export class CounterComponent {

  public title: string = 'Hola Mundico';
  public counter: number = 10;

  updateCounter( value: number ): void {
    this.counter += value
  }

  resetCounter(): void {
    this.counter = 10
  }

}
