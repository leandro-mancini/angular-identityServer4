import { ValidationResult } from 'ts.validator.fluent/dist';

import { UsuarioModel } from '@app/core/domain/entities/usuario.model';

export abstract class IUsuarioValidator {
  abstract validateFields(model: UsuarioModel): ValidationResult;
  abstract validarId(id: number): ValidationResult;
}
