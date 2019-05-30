import { Observable } from 'rxjs';

import { UsuarioModel } from '@app/core/domain/entities/usuario.model';

export abstract class IUsuarioRepository {
  abstract obterAll(): Observable<UsuarioModel>;
  abstract obter(model: UsuarioModel): Observable<UsuarioModel>;
  abstract inserir(model: UsuarioModel): Observable<UsuarioModel>;
  abstract alterar(model: UsuarioModel): Observable<UsuarioModel>;
  abstract excluir(id: number): Observable<UsuarioModel>;
}
