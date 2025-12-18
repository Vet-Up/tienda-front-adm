import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-c-sidebar',
  imports: [RouterLink],
  templateUrl: './c-sidebar.html',
  styleUrl: './c-sidebar.scss',
})
export class CSidebar {

  constructor(private authService: AuthService) {}
  username: string | null = null;

  ngOnInit(){
    this.authService.user$.subscribe(user => {
      this.username = user ? user.username : null;
    });
  }

}
