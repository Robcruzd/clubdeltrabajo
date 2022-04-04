/* eslint-disable @typescript-eslint/camelcase */
import { Component, OnInit } from '@angular/core';
import { Archivo } from 'app/shared/model/archivo.model';
import { Router } from '@angular/router';
@Component({
  selector: 'jhi-oferta-publicada',
  templateUrl: './oferta-publicada.component.html',
  styleUrls: ['./oferta-publicada.component.scss']
})
export class OfertaPublicadaComponent implements OnInit {
  cmOfertaPublicada: any = null;
  imagen!: Archivo;
  urlImgDefault = 'https://d1jbv8ig3bmrxx.cloudfront.net/Image+28_M.png';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  verOfertas(): void {
    this.router.navigate(['/controlar-ofertas']);
  }
}
