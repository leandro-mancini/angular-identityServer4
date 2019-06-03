import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '@app/infra/authentication/authentication.service';
import { Observable, of } from 'rxjs';
import { User } from 'oidc-client';
import { OidcFacade } from 'ng-oidc-client';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-nav-current-user',
  templateUrl: './nav-current-user.component.html',
  styleUrls: ['./nav-current-user.component.scss']
})
export class NavCurrentUserComponent implements OnInit {

  identity: Observable<User>;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private oidcFacade: OidcFacade,
    private http: HttpClient
  ) {
    this.identity = this.oidcFacade.identity$;
  }

  ngOnInit() {
    this.oidcFacade.getOidcUser();

    this.checkUserInfo();
  }

  get username(): string {
    const credentials = this.authenticationService.getCredentials;
    return credentials ? credentials.username : null;
  }

  logout() {
    this.authenticationService.logout()
      .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  checkUserInfo() {
    const identityProviderUrl = this.oidcFacade.getOidcClient().settings.authority;

    this.identity = this.http.get<User>(identityProviderUrl + '/connect/userinfo');
  }

}
