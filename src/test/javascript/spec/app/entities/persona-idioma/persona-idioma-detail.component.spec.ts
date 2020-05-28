import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CtProjectTestModule } from '../../../test.module';
import { PersonaIdiomaDetailComponent } from 'app/entities/persona-idioma/persona-idioma-detail.component';
import { PersonaIdioma } from 'app/shared/model/persona-idioma.model';

describe('Component Tests', () => {
  describe('PersonaIdioma Management Detail Component', () => {
    let comp: PersonaIdiomaDetailComponent;
    let fixture: ComponentFixture<PersonaIdiomaDetailComponent>;
    const route = ({ data: of({ personaIdioma: new PersonaIdioma(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CtProjectTestModule],
        declarations: [PersonaIdiomaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PersonaIdiomaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PersonaIdiomaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load personaIdioma on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.personaIdioma).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
