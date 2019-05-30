import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { UsuarioModel } from '@app/core/domain/entities/usuario.model';
import { UsuarioController } from '@app/presentation/controllers/usuario.controller';

const credentialsKey = 'credentials';

@Injectable()
export class AuthenticationService {

  private credentials: UsuarioModel | null;

  constructor(
    private usuarioController: UsuarioController
  ) {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);

    if (savedCredentials) {
      this.credentials = JSON.parse(savedCredentials);
    }
  }

  login(params: UsuarioModel): Observable<UsuarioModel> {
    return this.usuarioController.obter(params);
  }

  logout(): Observable<boolean> {
    this.setCredentials();
    return of(true);
  }

  isAuthenticated(): boolean {
    return !!this.getCredentials;
  }

  get getCredentials(): UsuarioModel | null {
    return this.credentials;
  }

  setCredentials(credentials?: UsuarioModel) {
    this.credentials = credentials || null;

    if (credentials) {
      localStorage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      localStorage.removeItem(credentialsKey);
    }
  }

}
