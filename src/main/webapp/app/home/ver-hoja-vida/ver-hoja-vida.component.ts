import { Component, OnInit } from '@angular/core';
import { commonMessages } from 'app/shared/constants/commonMessages';

@Component({
  selector: 'jhi-ver-hoja-vida',
  templateUrl: './ver-hoja-vida.component.html',
  styleUrls: ['./ver-hoja-vida.component.scss']
})
export class VerHojaVidaComponent implements OnInit {
  lblDescargar = commonMessages.DESCARGAR_HOJAVIDA_LABEL;

  constructor() {}

  ngOnInit(): void {}
}
