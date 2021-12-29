/* eslint-disable @typescript-eslint/camelcase */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { NavbarService } from 'app/shared/services/navbar.service';
import { CommonMessagesService } from 'app/entities/commonMessages/commonMessages.service';

@Component({
  selector: 'jhi-previo-registrar-emp',
  templateUrl: './previo-registrar-emp.component.html',
  styleUrls: ['./previo-registrar-emp.component.scss']
})
export class PrevioRegistrarEmpComponent implements OnInit, OnDestroy {
  cmPrevioRegistrarEmp: any = null;
  Hola = commonMessages.HOLA;
  Parte_Club = commonMessages.HAZ_PARTE;
  Registra_Empresa = commonMessages.REGISTRA_EMPRESA_ENCUENTRA;
  Registrar = commonMessages.REGISTRAR;

  constructor(private router: Router, private navbarService: NavbarService, private commonMessagesService: CommonMessagesService) {}

  ngOnInit(): void {
    // eslint-disable-next-line no-console
    console.log('ngonit');
    this.navbarService.setNavbarState(false);
    this.commonMessagesService
      .query({
        'tipoMensaje.equals': 'cmPrevioRegistrarEmp'
      })
      .subscribe(
        res => {
          const body: any = res.body;
          const mensajes = JSON.parse(body[0].mensajes);
          this.cmPrevioRegistrarEmp = mensajes;
          this.updateVariables();
        },
        err => {
          /* eslint-disable no-console */
          console.log(err);
          this.cmPrevioRegistrarEmp = 0;
        }
      );
  }

  updateVariables(): void {
    this.Hola = this.cmPrevioRegistrarEmp.HOLA;
    this.Parte_Club = this.cmPrevioRegistrarEmp.HAZ_PARTE;
    this.Registra_Empresa = this.cmPrevioRegistrarEmp.REGISTRA_EMPRESA_ENCUENTRA;
    this.Registrar = this.cmPrevioRegistrarEmp.REGISTRAR;
  }

  ngOnDestroy(): void {
    // eslint-disable-next-line no-console
    console.log('onDestroy');
    this.navbarService.setNavbarState(true);
  }

  crearOferta(): void {
    this.router.navigate(['/agregar-usuario'], { queryParams: { userType: 'juridico' } });
  }
}
