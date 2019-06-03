import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@env/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MaterialModule } from '@app/material.module';
import { CoreModule } from './core/core.module';
import { DataModule } from './data/data.module';
import { InfraModule } from './infra/infra.module';
import { PresentationModule } from '@app/presentation/presentation.module';

import { IUsuarioRepository } from './core/interfaces/repositories/IUsuarioRepository';
import { UsuarioMockRepository } from './data/repository/usuario/mock/UsuarioMockRepository';
import { IValidatorMensagem } from './core/interfaces/mensagens/IValidatorMensagem';
import { ValidatorMensagem } from './core/resources/ValidatorMensagem';
import { UsuarioValidator } from './core/usecases/usuario/base/validations/UsuarioValidator';
import { IUsuarioValidator } from './core/interfaces/validations/IUsuarioValidator';
import { IUsuarioController } from './core/interfaces/controllers/IUsuarioController';
import { UsuarioController } from './presentation/controllers/usuario.controller';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgOidcClientModule } from 'ng-oidc-client';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    NgbModule,
    MaterialModule,
    CoreModule,
    DataModule,
    InfraModule,
    PresentationModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    NgOidcClientModule.forRoot({
      oidc_config: {
        client_id: 'angular_spa',
        response_type: 'id_token token',
        scope: 'openid profile email API_ARQUITETURA',
        authority: 'https://localhost:5041',
        redirect_uri: 'http://localhost:4200/callback.html',
        post_logout_redirect_uri: 'http://localhost:4200/signout-callback.html',
        silent_redirect_uri: 'http://localhost:4200/renew-callback.html',
        automaticSilentRenew: true
      }
    })
  ],
  providers: [
    {
      provide: IUsuarioRepository, useClass: UsuarioMockRepository
    },
    {
      provide: IUsuarioController, useClass: UsuarioController
    },
    {
      provide: IValidatorMensagem, useClass: ValidatorMensagem
    },
    {
      provide: IUsuarioValidator, useClass: UsuarioValidator
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
