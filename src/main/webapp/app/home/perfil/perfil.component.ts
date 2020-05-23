import { Component, OnInit } from '@angular/core';
import { commonMessages } from 'app/shared/constants/commonMessages';

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

  constructor() {}

  ngOnInit(): void {}
}
