import { Injectable } from '@angular/core';
import { IValidator } from 'ts.validator.fluent/dist';
import { UsuarioModel } from '@app/core/domain/entities/usuario.model';
import { IValidatorMensagem } from '@app/core/interfaces/mensagens/IValidatorMensagem';

@Injectable({
  providedIn: 'root'
})
export class UsuarioValidatorGenerated {

  constructor(
    protected iValidatorMensagem: IValidatorMensagem
  ) {
  }

  protected validateBase(validator: IValidator<UsuarioModel>) {
    return validator
      .NotEmpty(m => m.username, this.iValidatorMensagem.obrigatorio('username').value)
      .Length(m => m.username, 0, 100, this.iValidatorMensagem.tamanhoMaximo('username', '100').value)
      .NotEmpty(m => m.senha, this.iValidatorMensagem.obrigatorio('senha').value)
      .Length(m => m.senha, 0, 100, this.iValidatorMensagem.tamanhoMaximo('senha', '100').value);
  }

  protected validateIdBase(validator: IValidator<number>) {
    return validator
      .IsNumberNotEqual(m => m, 0, this.iValidatorMensagem.idNaoEncontrado().value)
  }
}
