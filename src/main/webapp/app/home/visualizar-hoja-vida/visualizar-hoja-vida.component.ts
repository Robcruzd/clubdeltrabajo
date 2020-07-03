import { Component, OnInit } from '@angular/core';
import { Archivo } from 'app/shared/model/archivo.model';

@Component({
  selector: 'jhi-visualizar-hoja-vida',
  templateUrl: './visualizar-hoja-vida.component.html',
  styleUrls: ['./visualizar-hoja-vida.component.scss']
})
export class VisualizarHojaVidaComponent implements OnInit {
  imagen!: Archivo;
  urlImageDefault = '../../../content/images/Image 28.png';

  constructor() {}

  ngOnInit(): void {}
}
