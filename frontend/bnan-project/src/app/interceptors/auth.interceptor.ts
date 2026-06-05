import { HttpErrorResponse, HttpInterceptorFn, } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = localStorage.getItem('bnan_token');
  const publicUrls = ['/auth/login/', '/auth/register/', '/auth/refresh/'];
  const isPublicUrl = publicUrls.some(url => req.url.includes(url));

  if (isPublicUrl) {
    return next(req);
  }

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401) {
        return throwError(() => error);
      }

      const refresh = localStorage.getItem('bnan_refresh_token');
      return authService.refreshToken(refresh!).pipe(
        switchMap(response => {
          localStorage.setItem('bnan_token', response.access);

          if (response.refresh) {
            localStorage.setItem('bnan_refresh_token', response.refresh);
          }

          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${response.access}`,
            },
          });

          return next(req);
        }),
        catchError(refreshError => {
          authService.logout();
          return throwError(() => refreshError);
        })
      );
    })
  );
};