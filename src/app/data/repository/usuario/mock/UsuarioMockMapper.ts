import * as automapper from 'automapper-ts';

import { Mapper } from '@app/core/base/mapper';
import { UsuarioModel } from '@app/core/domain/entities/usuario.model';
import { UsuarioMockEntity } from './IUsuarioMockEntity';

export class UsuarioMockMapper extends Mapper<UsuarioMockEntity, UsuarioModel> {
  mapFrom(param: UsuarioMockEntity): UsuarioModel {
    automapper
      .createMap('Usuario', UsuarioModel);

    return automapper.map('Usuario', UsuarioModel, param);
  }

  mapTo(param: UsuarioModel): UsuarioMockEntity {
    automapper
      .createMap('UsuarioMockEntity', UsuarioMockEntity);

    return automapper.map('UsuarioMockEntity', UsuarioMockEntity, param);
  }

}
