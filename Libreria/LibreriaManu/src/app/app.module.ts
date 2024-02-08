import { PagesModule } from './pages/pages.module';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    HttpClientModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration(),
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
