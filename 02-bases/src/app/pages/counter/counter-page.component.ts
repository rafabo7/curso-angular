import { Component, signal } from "@angular/core";
import { count } from "rxjs";

@Component({
  templateUrl: './counter-page.component.html',
  styles: `
    button{
      padding: 5px;
      margin: 4px;
      width: 8rem;
    }
  `
})
export class CounterPageComponent {

  counter = 10

  counterSignal = signal(10)


  public increaseBy(value: number){
    this.counter += value

    this.counterSignal.update( current =>  current + value)

  }

  public resetCounter(){
    this.counter = 0

    this.counterSignal.set(0)
  }

}
