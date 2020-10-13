import { Component, OnInit } from '@angular/core';
import { Archivo } from 'app/shared/model/archivo.model';

@Component({
  selector: 'jhi-oferta-publicada',
  templateUrl: './oferta-publicada.component.html',
  styleUrls: ['./oferta-publicada.component.scss']
})
export class OfertaPublicadaComponent implements OnInit {
  imagen!: Archivo;
  ulrImgDefault = '../../../content/images/Image 28_M.png';

  constructor() {}

  ngOnInit(): void {}
}
