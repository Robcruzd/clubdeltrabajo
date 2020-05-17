import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IArchivo } from 'app/shared/model/archivo.model';

@Component({
  selector: 'jhi-archivo-detail',
  templateUrl: './archivo-detail.component.html'
})
export class ArchivoDetailComponent implements OnInit {
  archivo: IArchivo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ archivo }) => (this.archivo = archivo));
  }

  previousState(): void {
    window.history.back();
  }
}
