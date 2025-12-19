import { Component } from '@angular/core';
import { ILogin, ILoginResponse } from '../../../core/models/i-login';
import { AuthService } from '../../../core/services/auth-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-c-login',
  imports: [FormsModule],
  templateUrl: './c-login.html',
  styleUrl: './c-login.scss',
})
export class CLogin {

  username: string = '';
  password: string = '';
  loading: boolean = false;
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();

    this.loading = true;
    this.authService.login(this.username, this.password).subscribe({
      next: (response: ILoginResponse) => {
        console.log('Login exitoso:', response);
        this.authService.validateToken(response.token).subscribe({
          next: (user) => {
            if (user) {
              this.authService.setUser(user);
              this.router.navigate(['/dashboard']);
            } else {
              this.error = 'Error al obtener datos del usuario';
              this.loading = false;
            }
          },
          error: (error) => {
            console.error('Error al validar token:', error);
            this.loading = false;
          }
        });
      },
      error:(error: any) => {
        if (error && error.status === 500) {
          alert('Acceso denegado: solo administradores pueden ingresar');
        }
        console.error('Error de login:', error);    
        this.loading = false;
      }
    });
  }
}
