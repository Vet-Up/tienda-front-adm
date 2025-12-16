import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CHeader, } from "../../ui/c-header/c-header";
import { CSidebar } from '../../ui/c-sidebar/c-sidebar';
import { CWelcome } from '../c-welcome/c-welcome';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CHeader, CSidebar,CWelcome],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('tienda-front-adm');
}
