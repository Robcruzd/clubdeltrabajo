/* eslint-disable @typescript-eslint/camelcase */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { CommonMessagesService } from 'app/entities/commonMessages/commonMessages.service';
// import { combineAll } from 'rxjs/operators';

@Component({
  selector: 'jhi-solicitar-registro',
  templateUrl: './solicitar-registro.component.html',
  styleUrls: ['./solicitar-registro.component.scss']
})
export class SolicitarRegistroComponent implements OnInit {
  cmSolicitarRegistro: any = null;
  Para_Ofrecer = commonMessages.PARA_OFRECER;
  Empresa_Registrada = commonMessages.EMPRESA_DEBE_REGISTRADA;
  Registra_Empresa = commonMessages.REGISTRA_EMPRESA;

  constructor(private router: Router, private commonMessagesService: CommonMessagesService) {}

  ngOnInit(): void {
    this.commonMessagesService
      .query({
        'tipoMensaje.equals': 'cmSolicitarRegistro'
      })
      .subscribe(
        res => {
          const body: any = res.body;
          const mensajes = JSON.parse(body[0].mensajes);
          this.cmSolicitarRegistro = mensajes;
          this.updateVariables();
        },
        err => {
          /* eslint-disable no-console */
          console.log(err);
          this.cmSolicitarRegistro = 0;
        }
      );
  }

  updateVariables(): void {
    this.Para_Ofrecer = this.cmSolicitarRegistro.PARA_OFRECER;
    this.Empresa_Registrada = this.cmSolicitarRegistro.EMPRESA_DEBE_REGISTRADA;
    this.Registra_Empresa = this.cmSolicitarRegistro.REGISTRA_EMPRESA;
  }

  registrarHojaVida(): void {
    this.router.navigate(['/agregar-usuario']);
  }
}
