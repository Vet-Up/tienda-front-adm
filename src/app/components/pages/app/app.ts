import { Component, inject} from '@angular/core';
import { Router,RouterOutlet } from '@angular/router';
import { CHeader, } from "../../ui/c-header/c-header";
import { CSidebar } from '../../ui/c-sidebar/c-sidebar';
import { AuthService } from '../../../core/services/auth-service';
import { firstValueFrom } from 'rxjs';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CHeader, CSidebar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  readonly router = inject(Router);
  
  async ngOnInit() {
  }
}
