import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { UsuarioModel } from '@app/core/domain/entities/usuario.model';
import { IUsuarioRepository } from '@app/core/interfaces/repositories/IUsuarioRepository';
import { IUsuarioUseCase } from '@app/core/interfaces/usecases/IUsuarioUseCase';
import { IUsuarioValidator } from '@app/core/interfaces/validations/IUsuarioValidator';
import { Logger } from '@app/infra/log/logger.service';

const log = new Logger('UsuarioUseCase');

@Injectable({
  providedIn: 'root'
})
export class UsuarioUseCase implements IUsuarioUseCase<UsuarioModel, UsuarioModel> {

  constructor(
    private iUsuarioRepository: IUsuarioRepository,
    private iUsuarioValidator: IUsuarioValidator
  ) { }

  obterAll(params: void): Observable<UsuarioModel> {
    return this.iUsuarioRepository.obterAll();
  }
  obter(params: UsuarioModel): Observable<UsuarioModel> {
    const validator = this.iUsuarioValidator.validateFields(params);

    if (validator.IsValid) {
      return this.iUsuarioRepository.obter(params);
    } else {
      log.error(validator.Errors);

      return throwError(validator.Errors);
    }
  }
  inserir(params: UsuarioModel): Observable<UsuarioModel> {
    const validator = this.iUsuarioValidator.validateFields(params);

    if (validator.IsValid) {
      return this.iUsuarioRepository.inserir(params);
    } else {
      log.error(validator.Errors);

      return throwError(validator.Errors);
    }
  }
  alterar(params: UsuarioModel): Observable<UsuarioModel> {
    const validator = this.iUsuarioValidator.validateFields(params);

    if (validator.IsValid) {
      return this.iUsuarioRepository.alterar(params);
    } else {
      log.error(validator.Errors);

      return throwError(validator.Errors);
    }
  }
  excluir(params: number): Observable<UsuarioModel> {
    const validator = this.iUsuarioValidator.validarId(params);

    if (validator.IsValid) {
      return this.iUsuarioRepository.excluir(params);
    } else {
      log.error(validator.Errors);

      return throwError(validator.Errors);
    }
  }

}
