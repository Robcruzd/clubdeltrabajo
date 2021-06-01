import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { commonMessages } from 'app/shared/constants/commonMessages';

@Component({
  selector: 'jhi-primer-oferta',
  templateUrl: './primer-oferta.component.html',
  styleUrls: ['./primer-oferta.component.scss']
})
export class PrimerOfertaComponent implements OnInit {
  constructor(private router: Router, private _location: Location) {}

  Bienvenido = commonMessages.BIENVENIDO;
  Publica_oferta_empleo = commonMessages.PUBLICA_OFERTA_EMPLEO;
  gratis = commonMessages.GRATIS;
  Formulario = commonMessages.DILIGENCIA_FORMULARIO;
  Publica_Oferta = commonMessages.PUBLICAR_OFERTA;
  Selecciona_Candidatos = commonMessages.SELECCIONA_CANDIDATOS;
  Volver = commonMessages.VOLVER;
  Crear = commonMessages.CREAR_OFERTA;  

  ngOnInit(): void {}

  crearOferta(): void {
    this.router.navigate(['crear-oferta']);
  }

  backClicked(): void {
    // this._location.back();
    this.router.navigate(['perfil-empresa']);
  }
}
