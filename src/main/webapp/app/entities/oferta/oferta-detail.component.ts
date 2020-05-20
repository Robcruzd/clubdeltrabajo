import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOferta } from 'app/shared/model/oferta.model';

@Component({
  selector: 'jhi-oferta-detail',
  templateUrl: './oferta-detail.component.html'
})
export class OfertaDetailComponent implements OnInit {
  oferta: IOferta | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ oferta }) => (this.oferta = oferta));
  }

  previousState(): void {
    window.history.back();
  }
}
