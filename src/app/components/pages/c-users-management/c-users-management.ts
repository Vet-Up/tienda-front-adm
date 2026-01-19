import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUser } from '../../../core/models/i-user';
import { UserService } from '../../../core/services/user-service';
import { FormsModule } from '@angular/forms';
import { CPaginator } from '../../ui/c-paginator/c-paginator';

@Component({
  selector: 'app-c-users-management',
  imports: [FormsModule, CommonModule, CPaginator],
  templateUrl: './c-users-management.html',
  styleUrl: './c-users-management.scss',
})
export class CUsersManagement {
  searchEmail = '';
  users: IUser[] = [];
  selectedUser: IUser | null = null;
  error = '';

  // Paginación
  currentPage = 1;
  pageSize = 10;
  totalElements = 0;

  constructor(private userService: UserService) {}

  searchUsers() {
    this.error = '';
    this.selectedUser = null;

    const page = this.currentPage - 1; 

    this.userService.searchUsersByEmail(this.searchEmail, page, this.pageSize).subscribe({
      next: (response) => {
        this.users = response.data;
        this.totalElements = response.totalElements;
        if (this.users.length === 0) {
          this.error = 'No se encontraron usuarios';
        }
      },
      error: () => this.error = 'Error al buscar usuarios'
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.searchUsers();
  }

  clearSearch() {
    this.searchEmail = '';
    this.users = [];
    this.selectedUser = null;
    this.error = '';
    this.currentPage = 1;
    this.totalElements = 0;
  }

  selectUser(user: IUser) {
    this.selectedUser = { ...user };
  }

  updateRole() {
    if (!this.selectedUser) return;

    this.userService.updateUser(this.selectedUser).subscribe({
      next: (data) => {
        this.selectedUser = data;
        const index = this.users.findIndex(u => u.id === data.id);
        if (index !== -1) {
          this.users[index] = data;
        }
        this.selectedUser = null;
      },
      error: () => this.error = 'Error al actualizar el rol'
    });
  }

  cancelEdit() {
    this.selectedUser = null;
  }
}