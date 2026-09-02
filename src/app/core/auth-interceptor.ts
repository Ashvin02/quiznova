import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { AuthService } from './auth';
import { SpinnerService } from './spinner';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private spinner: SpinnerService, private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();

    const token = this.auth.getToken();
    let authReq = req;

    if (token) {
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(authReq).pipe(
      finalize(() => this.spinner.hide())
    );
  }
}

