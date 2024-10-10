// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PeopleRepositoryFactory } from './core/repositories/repository.factory';
import { PeopleService } from './core/services/impl/people.service';
import { PEOPLE_API_URL_TOKEN, PEOPLE_REPOSITORY_MAPPING_TOKEN, PEOPLE_RESOURCE_NAME_TOKEN } from './core/repositories/repository.tokens';
import { provideHttpClient } from '@angular/common/http';
import { PeopleHttpMapping } from './core/repositories/impl/people-mapping-http.service';
import { PeopleLocalStorageMapping } from './core/repositories/impl/people-mapping-local-storage.service';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(),
    
    { provide: PEOPLE_RESOURCE_NAME_TOKEN, useValue: 'people' },
    { provide: PEOPLE_API_URL_TOKEN, useValue: 'https://randomuser.me/api/?results=100' },
    // Registrar los repositorios
    { 
      provide: PEOPLE_REPOSITORY_MAPPING_TOKEN, 
      useClass: PeopleLocalStorageMapping
    },
    PeopleRepositoryFactory,
    // Registrar otros repositorios según sea necesario
    // Servicios de aplicación
    {
      provide: 'PeopleService',
      useClass: PeopleService
    }
  ],
  // ... otros proveedores],
  bootstrap: [AppComponent],
})
export class AppModule {}
