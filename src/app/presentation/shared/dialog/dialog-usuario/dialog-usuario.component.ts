import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UsuarioModel } from '@app/core/domain/entities/usuario.model';
import { NotificationToast } from '@app/presentation/shared/notification/notification.toast';
import { UsuarioController } from '@app/presentation/controllers/usuario.controller';

@Component({
  selector: 'app-dialog-usuario',
  templateUrl: './dialog-usuario.component.html',
  styleUrls: ['./dialog-usuario.component.scss']
})
export class DialogUsuarioComponent implements OnInit {

  myForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UsuarioModel,
    private formBuilder: FormBuilder,
    private usuarioController: UsuarioController,
    private notificationToast: NotificationToast
  ) {
    this.createForm();
  }

  createForm() {
    this.myForm = this.formBuilder.group({
      id: [this.data ? this.data.id : ''],
      username: [this.data ? this.data.username : '', Validators.required],
      senha: [this.data ? this.data.senha : '', Validators.required],
      token: [this.data ? this.data.token : '']
    });
  }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.data ? this.alterar() : this.inserir();
  }

  inserir() {
    this.usuarioController.inserir(this.myForm.value).subscribe((resp: any) => {
      this.dialogRef.close(resp);
    }, err => this.notificationToast.error(err));
  }

  alterar() {
    this.usuarioController.alterar(this.myForm.value).subscribe((resp: any) => {
      this.dialogRef.close(resp);
    }, err => this.notificationToast.error(err));
  }

}
