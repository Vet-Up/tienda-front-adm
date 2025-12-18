import { Component } from '@angular/core';
import { IUser } from '../../../core/models/i-user';
import { UserService } from '../../../core/services/user-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-c-users-management',
  imports: [FormsModule],
  templateUrl: './c-users-management.html',
  styleUrl: './c-users-management.scss',
})
export class CUsersManagement {
  searchEmail = '';
  user: IUser | null = null;
  error = '';

  constructor(private userService: UserService) {}

  searchUser() {
    if (!this.searchEmail.trim()) {
      this.error = 'Ingresa un correo electrónico';
      return;
    }

    this.error = '';
    this.user = null;

    this.userService.getUserByEmail(this.searchEmail).subscribe({
      next: (data) => {
        console.log('Usuario encontrado:', data);
        this.user = data},
      error: (err) => this.error = err.status === 404 ? 'Usuario no encontrado' : 'Error al buscar el usuario'
    });
  }

  clearSearch() {
    this.searchEmail = '';
    this.user = null;
    this.error = '';
  }

  updateRole() {
    if (!this.user) return;

    console.log('Actualizando rol a:', this.user);

    this.userService.updateUser(this.user).subscribe({
      next: (data) => this.user = data,
      error: () => this.error = 'Error al actualizar el rol'
    });
  }
}