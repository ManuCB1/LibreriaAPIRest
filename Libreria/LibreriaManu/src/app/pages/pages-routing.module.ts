import { AutoresComponent } from './autores/autores.component';
import { TemaComponent } from './tema/tema.component';
import { MainPageComponent } from './main-page.component';
import { LibrosComponent } from './libros/libros.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CrearLibroComponent } from './libros/crear-libro/crear-libro.component';
import { EdicionComponent } from './edicion/edicion.component';
import { FormatoComponent } from './formato/formato.component';

const routes: Routes = [
    {path: 'main', component: MainPageComponent, children: [
    { path: 'libro', component: LibrosComponent, data:{title:"Libros"}},
    { path: 'autor', component: AutoresComponent, data:{title:"Autor"}},
    { path: 'tema', component: TemaComponent, data:{title:"Tema"}},
    { path: 'edicion', component: EdicionComponent, data:{title:"Edicion"}},
    { path: 'formato', component: FormatoComponent, data:{title:"Formato"}},
    { path: 'crear-libro', component: CrearLibroComponent, data:{title:"Nuevo Libro"}}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
