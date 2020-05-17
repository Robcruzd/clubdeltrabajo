import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInformacionPersonal } from 'app/shared/model/informacion-personal.model';

@Component({
  selector: 'jhi-informacion-personal-detail',
  templateUrl: './informacion-personal-detail.component.html'
})
export class InformacionPersonalDetailComponent implements OnInit {
  informacionPersonal: IInformacionPersonal | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ informacionPersonal }) => (this.informacionPersonal = informacionPersonal));
  }

  previousState(): void {
    window.history.back();
  }
}
