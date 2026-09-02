import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { SpinnerService } from './spinner';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private spinner: SpinnerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.spinner.show();

    return next.handle(req).pipe(
      delay(9000),
      finalize(() => this.spinner.hide())
    );
  }
}
