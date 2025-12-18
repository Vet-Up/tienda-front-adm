import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const gAuthGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  if (user.isAdmin !== 'ADMIN') {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
