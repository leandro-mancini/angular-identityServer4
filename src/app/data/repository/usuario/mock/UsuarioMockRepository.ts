import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, flatMap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { IUsuarioRepository } from '@app/core/interfaces/repositories/IUsuarioRepository';
import { UsuarioModel } from '@app/core/domain/entities/usuario.model';
import { UsuarioMockEntity } from './IUsuarioMockEntity';
import { UsuarioMockMapper } from './UsuarioMockMapper';

@Injectable({
  providedIn: 'root'
})
export class UsuarioMockRepository implements IUsuarioRepository {

  private mapper = new UsuarioMockMapper();

  constructor(
    private http: HttpClient
  ) { }

  obterAll(): Observable<UsuarioModel> {
    return this.http
    .get<UsuarioMockEntity[]>(environment.serverUrl + '/usuarios')
    .pipe(flatMap((item) => item))
    .pipe(map(this.mapper.mapFrom));
  }

  obter(model: UsuarioModel): Observable<UsuarioModel> {
    return this.http
      .get<UsuarioMockEntity>(environment.serverUrl + '/usuarios?username=' + model.username + '&senha=' + model.senha + '')
      .pipe(map((item) => {
        if (item[0]) {
          return this.mapper.mapFrom(item[0]);
        }

        return null;
      }));
  }

  inserir(model: UsuarioModel): Observable<UsuarioModel> {
    return this.http
      .post<UsuarioMockEntity>(environment.serverUrl + '/usuarios', model)
      .pipe(map(this.mapper.mapFrom));
  }
  alterar(model: UsuarioModel): Observable<UsuarioModel> {
    return this.http
      .put<UsuarioMockEntity>(environment.serverUrl + '/usuarios/' + model.id, model)
      .pipe(map(this.mapper.mapFrom));
  }
  excluir(id: number): Observable<UsuarioModel> {
    return this.http
      .delete<UsuarioMockEntity>(environment.serverUrl + '/usuarios/' + id);
  }

}
