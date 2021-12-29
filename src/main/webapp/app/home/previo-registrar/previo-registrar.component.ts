/* eslint-disable @typescript-eslint/camelcase */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { CommonMessagesService } from 'app/entities/commonMessages/commonMessages.service';

@Component({
  selector: 'jhi-previo-registrar',
  templateUrl: './previo-registrar.component.html',
  styleUrls: ['./previo-registrar.component.scss']
})
export class PrevioRegistrarComponent implements OnInit {
  cmPrevioRegistrar: any = null;
  Hola = commonMessages.HOLA;
  Parte_Club = commonMessages.HAZ_PARTE;
  Registra_Completa_Encuentra = commonMessages.REGISTRATE_COMPLETA_ENCUENTRA;
  Registrarte = commonMessages.REGISTRARTE;

  constructor(private router: Router, private commonMessagesService: CommonMessagesService) {}

  ngOnInit(): void {
    this.commonMessagesService
      .query({
        'tipoMensaje.equals': 'cmPrevioRegistrar'
      })
      .subscribe(
        res => {
          const body: any = res.body;
          const mensajes = JSON.parse(body[0].mensajes);
          this.cmPrevioRegistrar = mensajes;
          this.updateVariables();
        },
        err => {
          /* eslint-disable no-console */
          console.log(err);
          this.cmPrevioRegistrar = 0;
        }
      );
  }

  updateVariables(): void {
    this.Hola = this.cmPrevioRegistrar.HOLA;
    this.Parte_Club = this.cmPrevioRegistrar.HAZ_PARTE;
    this.Registra_Completa_Encuentra = this.cmPrevioRegistrar.REGISTRATE_COMPLETA_ENCUENTRA;
    this.Registrarte = this.cmPrevioRegistrar.REGISTRARTE;
  }

  crearOferta(): void {
    this.router.navigate(['/agregar-usuario'], { queryParams: { userType: 'natural' } });
  }
}
