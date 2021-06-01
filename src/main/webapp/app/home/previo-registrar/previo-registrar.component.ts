import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { commonMessages } from 'app/shared/constants/commonMessages';

@Component({
  selector: 'jhi-previo-registrar',
  templateUrl: './previo-registrar.component.html',
  styleUrls: ['./previo-registrar.component.scss']
})
export class PrevioRegistrarComponent implements OnInit {
  Hola = commonMessages.HOLA;
  Parte_Club = commonMessages.HAZ_PARTE;
  Registra_Completa_Encuentra = commonMessages.REGISTRATE_COMPLETA_ENCUENTRA;
  Registrarte = commonMessages.REGISTRARTE;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  crearOferta(): void {
    this.router.navigate(['/agregar-usuario'], { queryParams: { userType: 'natural' } });
  }
}
