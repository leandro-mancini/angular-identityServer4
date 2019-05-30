import { Injectable } from '@angular/core';
import { ValidationResult, Validator, IValidator } from 'ts.validator.fluent/dist';
import { UsuarioModel } from '@app/core/domain/entities/usuario.model';
import { IValidatorMensagem } from '@app/core/interfaces/mensagens/IValidatorMensagem';
import { IUsuarioValidator } from '@app/core/interfaces/validations/IUsuarioValidator';
import { UsuarioValidatorGenerated } from './UsuarioValidator.generated';

@Injectable({
  providedIn: 'root'
})
export class UsuarioValidator extends UsuarioValidatorGenerated implements IUsuarioValidator {

  constructor(
    protected iValidatorMensagem: IValidatorMensagem
  ) {
    super(iValidatorMensagem);
  }

  validateFields(model: UsuarioModel): ValidationResult {
    return new Validator(model).Validate(this.validateRules);
  }

  validateRules = (validator: IValidator<UsuarioModel>): ValidationResult => {
    return this.validateBase(validator)
      .ToResult();
  }

  validarId(id: number): ValidationResult {
    return new Validator(id).Validate(this.validateIdRules);
  }

  validateIdRules = (validator: IValidator<number>): ValidationResult => {
    return this.validateIdBase(validator)
      .ToResult();
  }
}
