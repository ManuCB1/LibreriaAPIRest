import { PagesModule } from './pages/pages.module';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import ca from '@angular/common/locales/ca';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_DATE_LOCALE, NZ_I18N, es_ES } from 'ng-zorro-antd/i18n';
import es from '@angular/common/locales/es';

registerLocaleData(ca);

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration(),
    { provide: NZ_I18N, useValue: es_ES},
    { provide: NZ_DATE_LOCALE, useValue: es_ES }
    
    // {
    //   provide: APP_INITIALIZER,
    //   multi: true,
    //   useValue: () => {
    //     console.log('Iniciando la app con INITIALIZER');
    //   }
    // }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
