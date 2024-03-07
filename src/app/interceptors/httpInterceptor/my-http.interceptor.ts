import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  constructor(
    private cookieSer: CookieService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.cookieSer.get('token');
    if (token != '') {
      const clonedRequest = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
      return next.handle(clonedRequest);
    }
    return next.handle(request);
  }
}
