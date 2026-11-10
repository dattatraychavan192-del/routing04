import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable, pipe } from 'rxjs';
import { SpinnerService } from './service/spinner.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _http: SpinnerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    this._http.loaderSub$.next(true);

    return next.handle(request).pipe(
      finalize(() => {
        this._http.loaderSub$.next(false);
      }),
    );
  }
}
