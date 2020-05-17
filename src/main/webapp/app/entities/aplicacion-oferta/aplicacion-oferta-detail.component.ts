import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAplicacionOferta } from 'app/shared/model/aplicacion-oferta.model';

@Component({
  selector: 'jhi-aplicacion-oferta-detail',
  templateUrl: './aplicacion-oferta-detail.component.html'
})
export class AplicacionOfertaDetailComponent implements OnInit {
  aplicacionOferta: IAplicacionOferta | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ aplicacionOferta }) => (this.aplicacionOferta = aplicacionOferta));
  }

  previousState(): void {
    window.history.back();
  }
}
