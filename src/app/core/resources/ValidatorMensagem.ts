import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { IValidatorMensagem } from '@app/core/interfaces/mensagens/IValidatorMensagem';


@Injectable({
  providedIn: 'root'
})
export class ValidatorMensagem implements IValidatorMensagem {

  constructor(
    private translate: TranslateService
  ) { }

  idNaoEncontrado(): any {
    return this.translate.get('VALID_IdNaoEncontrado');
  }
  intervaloCaracteres(campo: string, caracteresInicial: number, caracteresFinal: number): any {
    return this.translate.get('VALID_IntervaloCaracteres', {
      0: campo, 1: caracteresInicial, 2: caracteresFinal
    });
  }
  obrigatorio(campo: string): any {
    return this.translate.get('VALID_Obrigatorio', {
      0: campo
    });
  }
  tamanhoMaximo(campo: string, caracteres: string): any {
    return this.translate.get('VALID_TamanhoMaximo', {
      0: campo, 1: caracteres
    });
  }
  valorEntre(campo: string, numeroInicial: string, numeroFinal: string): any {
    return this.translate.get('VALID_ValorEntre', {
      0: campo, 1: numeroInicial, 2: numeroFinal
    });
  }
  valorMinimo(campo: string, numero: string): any {
    return this.translate.get('VALIDATOR.ValorMinimo', {
      0: campo, 1: numero
    });
  }
  valorMaximo(campo: string, numero: string): any {
    return this.translate.get('VALID_ValorMaximo', {
      0: campo, 1: numero
    });
  }
}