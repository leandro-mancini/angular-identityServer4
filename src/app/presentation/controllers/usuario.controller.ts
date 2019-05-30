import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { UsuarioModel } from '@app/core/domain/entities/usuario.model';
import { UsuarioUseCase } from '@app/core/usecases/usuario/base/UsuarioUseCase';
import { IUsuarioController } from '@app/core/interfaces/controllers/IUsuarioController';

@Injectable({
  providedIn: 'root'
})
export class UsuarioController implements IUsuarioController {

  constructor(
    private usuarioUseCase: UsuarioUseCase
  ) { }

  obterAll(): Observable<UsuarioModel> {
    return this.usuarioUseCase.obterAll();
  }
  obter(model: UsuarioModel): Observable<UsuarioModel> {
    return this.usuarioUseCase.obter(model);
  }
  inserir(model: UsuarioModel): Observable<UsuarioModel> {
    return this.usuarioUseCase.inserir(model);
  }
  alterar(model: UsuarioModel): Observable<UsuarioModel> {
    return this.usuarioUseCase.alterar(model);
  }
  excluir(id: number): Observable<UsuarioModel> {
    return this.usuarioUseCase.excluir(id);
  }


}
