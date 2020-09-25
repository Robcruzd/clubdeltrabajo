import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProfesion } from 'app/shared/model/profesion.model';

@Component({
  selector: 'jhi-profesion-detail',
  templateUrl: './profesion-detail.component.html'
})
export class ProfesionDetailComponent implements OnInit {
  profesion: IProfesion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profesion }) => (this.profesion = profesion));
  }

  previousState(): void {
    window.history.back();
  }
}
