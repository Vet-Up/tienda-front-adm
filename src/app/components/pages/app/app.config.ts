import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, provideAppInitializer, inject } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from '../../../core/services/authInterceptor';
import { AuthService } from '../../../core/services/auth-service';
import { firstValueFrom, tap } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAppInitializer(() => {
      const authService = inject(AuthService);
      const token = authService.getToken();
      if (token) {
        return firstValueFrom(
          authService.validateToken(token).pipe(
            tap(user => {
              if (user) {
                authService.setUser(user);
              }
            })
          )
        );
      }
      return Promise.resolve();
    })
  ]
};
