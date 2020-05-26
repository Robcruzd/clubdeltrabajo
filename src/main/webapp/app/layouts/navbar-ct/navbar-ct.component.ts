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

  lstOpcionesMenu: any = [
    { id: 1, etiqueta: 'Inicio' },
    { id: 2, etiqueta: 'Trabajos' },
    { id: 3, etiqueta: 'Candidatos' },
    { id: 4, etiqueta: 'Empresas' },
    { id: 5, etiqueta: 'Registro' }
  ];

  constructor() {}

  ngOnInit(): void {}
}
