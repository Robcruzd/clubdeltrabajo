import { Router, NavigationEnd } from '@angular/router';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-navbar-ct',
  templateUrl: './navbar-ct.component.html',
  styleUrls: ['./navbar-ct.component.scss']
})
export class NavbarCtComponent implements OnInit {
  lblIngresar = commonMessages.INGRESAR_LABEL;
  lblSalir = commonMessages.SALIR_LABEL;
  show = true;

  lstOpcionesMenu: any = [
    { id: 1, etiqueta: 'Inicio', ruta: '/' },
    { id: 2, etiqueta: 'Trabajos', ruta: '/' },
    { id: 3, etiqueta: 'Candidatos', ruta: '/' },
    { id: 4, etiqueta: 'Empresas', ruta: '/' },
    { id: 5, etiqueta: 'Registro', ruta: '/' }
  ];

  constructor(private router: Router) {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.show = val.url === '/' || val.url === '/agregar-usuario' ? false : true;
      }
    });
  }

  ngOnInit(): void {}

  ventanaInicioSesion(): void{
    this.router.navigate(['/inicio-sesion']);
  }
}
