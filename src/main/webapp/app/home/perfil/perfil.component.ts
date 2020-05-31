import { Component, OnInit } from '@angular/core';
import { commonMessages } from 'app/shared/constants/commonMessages';
import { Router } from '@angular/router';

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
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.qrCard = 'Perfil de presentación Juan Pérez.';
  }

  editarHojaVida(): void {
    this.router.navigate(['crear-hoja-vida']);
  }
}
