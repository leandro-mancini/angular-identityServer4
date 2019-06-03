import { Component, OnInit } from '@angular/core';

import { Logger } from '@app/infra/log/logger.service';
import { AuthenticationService } from '@app/infra/authentication/authentication.service';
import { UsuarioModel } from '@app/core/domain/entities/usuario.model';
import { OidcFacade } from 'ng-oidc-client';
import { Observable } from 'rxjs';
import { User } from 'oidc-client';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private oidcFacade: OidcFacade
  ) {

  }

  ngOnInit() {
  }

  get usuario(): UsuarioModel {
    return this.authenticationService.getCredentials;
  }

  signinRedirect() {
    this.oidcFacade.signinRedirect({
      data: {
        redirect_url: 'http://localhost:4200/'
      }
    });
  }

  signoutRedirect() {
    this.oidcFacade.signoutRedirect();
  }

}
