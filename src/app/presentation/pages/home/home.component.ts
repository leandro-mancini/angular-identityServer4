import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { MatTableDataSource, MatDialog } from '@angular/material';
import * as _ from 'lodash';

import { UsuarioModel } from '@app/core/domain/entities/usuario.model';
import { NotificationToast } from '@app/presentation/shared/notification/notification.toast';
import { DialogUsuarioComponent } from '@app/presentation/shared/dialog/dialog-usuario/dialog-usuario.component';
import { UsuarioController } from '@app/presentation/controllers/usuario.controller';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoading = false;
  dataSource: any;
  usuarios: UsuarioModel[] = [];
  displayedColumns: string[];

  constructor(
    private notificationToast: NotificationToast,
    private usuarioController: UsuarioController,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.obterAllUsuario();
  }

  obterAllUsuario() {
    this.isLoading = true;

    this.usuarioController.obterAll()
    .subscribe((usuarios: UsuarioModel) => {
      this.isLoading = false;

      this.usuarios.push(usuarios);

      this.displayedColumns = ['id', 'username', 'senha', 'action'];
      this.dataSource = new MatTableDataSource(this.usuarios);
    });
  }

  alterar(usuario: UsuarioModel) {
    this.openDialog(usuario);
  }

  inserir() {
    this.openDialog();
  }

  excluir(params: UsuarioModel) {
    this.usuarioController.excluir(params.id).subscribe(() => {
      const index = _.findIndex(this.usuarios, params);

      this.usuarios.splice(index, 1);

      this.dataSource = new MatTableDataSource(this.usuarios);

    }, err => this.notificationToast.error(err));
  }

  openDialog(usuario?: UsuarioModel) {
    const dialogRef = this.dialog.open(DialogUsuarioComponent, {
      width: '460px',
      data: usuario ? usuario : null
    });

    dialogRef.afterClosed().subscribe((result: UsuarioModel) => {
      if (result) {
        const index = _.findIndex(this.usuarios, ['id', result.id]);

        if (index !== -1) {
          this.usuarios[index] = result;
        } else {
          this.usuarios.push(result);
        }

        this.dataSource = new MatTableDataSource(this.usuarios);
      }
    });
  }

}
