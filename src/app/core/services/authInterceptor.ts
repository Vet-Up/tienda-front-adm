import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const router = inject(Router);

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest).pipe(
      catchError((error) => {
        if (error.status === 401) {
          authService.logout();
          router.navigate(['http://vetup-store-back.preproducciondaw.cip.fpmislata.com/login']);
          console.log('Redirigido por interceptor - 401');
        }
        else if(error.status === 403){
          authService.logout();
          router.navigate(['http://vetup-store-back.preproducciondaw.cip.fpmislata.com/login']);
          console.log('Redirigido por interceptor - 403');
        }
        throw error;
      }
    ));
  }


  return next(req);
};