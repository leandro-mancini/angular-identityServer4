import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { AuthenticationService } from '@app/infra/authentication/authentication.service';
import { OidcFacade } from 'ng-oidc-client';
import { User } from 'oidc-client';
import { environment } from '../../../environments/environment';


@Injectable()
export class HttpInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private oidcFacade: OidcFacade
  ) {  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.oidcFacade.identity$.pipe(
      switchMap((user: User) => {
        if (!request.url.match(environment.serverUrl)) {
          if (user && user.access_token) {
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${user.access_token}`
              }
            });
          }
        }

        return next.handle(request).pipe(catchError(error => this.errorHandler(error)));
      })
    );
  }

  private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {
    throw response;
  }
}
