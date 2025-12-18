import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';


@Component({
  selector: 'app-c-header',
  imports: [],
  templateUrl: './c-header.html',
  styleUrl: './c-header.scss',
})
export class CHeader {
  showDropdown = false;
  username = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.username = user ? user.username : '';
    });
  }
  
  navigateToWelcome() {
    this.router.navigate(['/dashboard']);
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  logout(): void {
    this.authService.logout();
    this.showDropdown = false;
    this.router.navigate(['/login']);
  }

}
