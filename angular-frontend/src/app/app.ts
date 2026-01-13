import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './header/header';
import {Footer} from './footer/footer';

//this is a decorator
//components use @component, which creates HTML/CSS/TS files
//it also connects them all together
//the body of the component decorator establishes these links

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-frontend');
}
