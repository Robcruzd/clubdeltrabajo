import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { NavbarService } from 'app/shared/services/navbar.service';

@Component({
  selector: 'jhi-previo-registrar-emp',
  templateUrl: './previo-registrar-emp.component.html',
  styleUrls: ['./previo-registrar-emp.component.scss']
})
export class PrevioRegistrarEmpComponent implements OnInit, OnDestroy {
  Hola = commonMessages.HOLA;
  Parte_Club = commonMessages.HAZ_PARTE;
  Registra_Empresa = commonMessages.REGISTRA_EMPRESA_ENCUENTRA;
  Registrar = commonMessages.REGISTRAR;

  constructor(private router: Router, private navbarService: NavbarService) {}

  ngOnInit(): void {
    // eslint-disable-next-line no-console
    console.log('ngonit');
    this.navbarService.setNavbarState(false);
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
