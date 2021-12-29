/* eslint-disable @typescript-eslint/camelcase */
import { Component, OnInit } from '@angular/core';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { CommonMessagesService } from 'app/entities/commonMessages/commonMessages.service';

@Component({
  selector: 'jhi-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.scss']
})
export class NosotrosComponent implements OnInit {
  cmNosotros: any = null;
  Nosotros = commonMessages.NOSOTROS;
  Texto_1 = commonMessages.NOSOTROS_1;
  Texto_2 = commonMessages.NOSOTROS_2;

  constructor(private commonMessagesService: CommonMessagesService) {}

  ngOnInit(): void {
    this.commonMessagesService
      .query({
        'tipoMensaje.equals': 'cmNosotros'
      })
      .subscribe(
        res => {
          const body: any = res.body;
          const mensajes = JSON.parse(body[0].mensajes);
          this.cmNosotros = mensajes;
          this.updateVariables();
        },
        err => {
          /* eslint-disable no-console */
          console.log(err);
          this.cmNosotros = 0;
        }
      );
  }

  updateVariables(): void {
    this.Nosotros = this.cmNosotros.NOSOTROS;
    this.Texto_1 = this.cmNosotros.NOSOTROS_1;
    this.Texto_2 = this.cmNosotros.NOSOTROS_2;
  }
}
