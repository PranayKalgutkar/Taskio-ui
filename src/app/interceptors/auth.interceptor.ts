import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // Retrieve token from localStorage, cookie, or any secure place
    const authToken = localStorage.getItem('authToken');  // Or sessionStorage or cookies

    const clonedRequest = authToken
      ? request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      })
      : request;

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle Unauthorized (e.g., navigate to login page)
          console.error('Token expired or not valid');
          // You can redirect to login or show a modal here
        }
        return throwError(error);
      })
    );
    // if (authToken) {
    //   // Clone the request and append the Authorization header
    //   const clonedRequest = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${authToken}`
    //     }
    //   });
    //   return next.handle(clonedRequest);
    // }
    // // If no token, continue with the original request
    // return next.handle(request);


  }
}
