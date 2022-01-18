/* eslint-disable @typescript-eslint/camelcase */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { CommonMessagesService } from 'app/entities/commonMessages/commonMessages.service';

@Component({
  selector: 'jhi-primer-oferta',
  templateUrl: './primer-oferta.component.html',
  styleUrls: ['./primer-oferta.component.scss']
})
export class PrimerOfertaComponent implements OnInit {
  cmPrimerOferta: any = null;

  Bienvenido = commonMessages.BIENVENIDO;
  Publica_oferta_empleo = commonMessages.PUBLICA_OFERTA_EMPLEO;
  gratis = commonMessages.GRATIS;
  Formulario = commonMessages.DILIGENCIA_FORMULARIO;
  Publica_Oferta = commonMessages.PUBLICAR_OFERTA;
  Selecciona_Candidatos = commonMessages.SELECCIONA_CANDIDATOS;
  Volver = commonMessages.VOLVER;
  Crear = commonMessages.CREAR_OFERTA;

  constructor(private router: Router, private _location: Location, private commonMessagesService: CommonMessagesService) {}

  ngOnInit(): void {
    this.commonMessagesService
      .query({
        'tipoMensaje.equals': 'cmPrimerOferta'
      })
      .subscribe(
        res => {
          const body: any = res.body;
          const mensajes = JSON.parse(body[0].mensajes);
          this.cmPrimerOferta = mensajes;
          this.updateVariables();
        },
        err => {
          // eslint-disable-next-line no-console
          console.log(err);
          this.cmPrimerOferta = 0;
        }
      );
  }

  updateVariables(): void {
    this.Bienvenido = this.cmPrimerOferta.BIENVENIDO;
    this.Publica_oferta_empleo = this.cmPrimerOferta.PUBLICA_OFERTA_EMPLEO;
    this.gratis = this.cmPrimerOferta.GRATIS;
    this.Formulario = this.cmPrimerOferta.DILIGENCIA_FORMULARIO;
    this.Publica_Oferta = this.cmPrimerOferta.PUBLICAR_OFERTA;
    this.Selecciona_Candidatos = this.cmPrimerOferta.SELECCIONA_CANDIDATOS;
    this.Volver = this.cmPrimerOferta.VOLVER;
    this.Crear = this.cmPrimerOferta.CREAR_OFERTA;
  }

  crearOferta(): void {
    this.router.navigate(['crear-oferta']);
  }

  backClicked(): void {
    // this._location.back();
    this.router.navigate(['perfil-empresa']);
  }
}
