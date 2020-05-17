import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInformacionLaboral } from 'app/shared/model/informacion-laboral.model';

@Component({
  selector: 'jhi-informacion-laboral-detail',
  templateUrl: './informacion-laboral-detail.component.html'
})
export class InformacionLaboralDetailComponent implements OnInit {
  informacionLaboral: IInformacionLaboral | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ informacionLaboral }) => (this.informacionLaboral = informacionLaboral));
  }

  previousState(): void {
    window.history.back();
  }
}
