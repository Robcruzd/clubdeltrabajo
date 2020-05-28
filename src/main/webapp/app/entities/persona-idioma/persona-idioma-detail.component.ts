import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPersonaIdioma } from 'app/shared/model/persona-idioma.model';

@Component({
  selector: 'jhi-persona-idioma-detail',
  templateUrl: './persona-idioma-detail.component.html'
})
export class PersonaIdiomaDetailComponent implements OnInit {
  personaIdioma: IPersonaIdioma | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ personaIdioma }) => (this.personaIdioma = personaIdioma));
  }

  previousState(): void {
    window.history.back();
  }
}
