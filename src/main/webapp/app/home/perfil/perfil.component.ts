import { Component, OnInit } from '@angular/core';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { Router } from '@angular/router';
import { AccountService } from '../../core/auth/account.service';
import { PersonaService } from '../../entities/persona/persona.service';

declare let alertify: any;

@Component({
  selector: 'jhi-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  lblVerHojaVida = commonMessages.VER_HOJA_VIDA_LABEL;
  lblBuscaEmpleo = commonMessages.VER_BUSCA_EMPLEO_LABEL;
  lblVerOfertas = commonMessages.VER_OFERTAS_LABEL;
  lblEditarHojaVida = commonMessages.EDITAR_HOJA_VIDA_LABEL;
  qrCard: any;
  persona : any;

  constructor(private router: Router, private accountService: AccountService, private personaService: PersonaService ) {}

  ngOnInit(): void {
    this.qrCard = 'Perfil de presentación Juan Pérez.';
    this.cargarInformacionCuenta();
  }

  obtenerIdUsuario(): Promise<any> {
    return new Promise((resolve) => {
      this.accountService.getAuthenticationState().subscribe(
      response => {
        resolve(response);
      },() => (alertify.set('notifier','position', 'top-right'),
      alertify.error('Ingresado correctamente')));
    });
  }

  async cargarInformacionCuenta(): Promise<any>{
    const cuenta = await this.obtenerIdUsuario();
    const idPersona = cuenta.user;
    this.personaService.find(idPersona).subscribe(
      (response) => {
          this.persona = response.body;        
      },
      () => (alertify.set('notifier','position', 'top-right'),
      alertify.error('Ingresado correctamente'))
    );
  }

  editarHojaVida(): void {
    this.router.navigate(['crear-hoja-vida']);
  }

  verHojaVida(): void {
    this.router.navigate(['hoja-vida']);
  }
}
