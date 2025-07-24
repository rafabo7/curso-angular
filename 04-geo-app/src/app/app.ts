import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppFooterComponent } from "./shared/components/app-footer/app-footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppFooterComponent],
  templateUrl: './app.html'
})
export class App {
  protected readonly title = signal('country-app');
}
