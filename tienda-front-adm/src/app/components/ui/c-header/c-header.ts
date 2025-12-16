import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-c-header',
  imports: [],
  templateUrl: './c-header.html',
  styleUrl: './c-header.scss',
})
export class CHeader {

  constructor(private router: Router) {}

  navigateToWelcome() {
    this.router.navigate(['/welcome']);
  }

}
