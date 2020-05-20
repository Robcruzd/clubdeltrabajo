import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CtProjectTestModule } from '../../../test.module';
import { IdiomaDetailComponent } from 'app/entities/idioma/idioma-detail.component';
import { Idioma } from 'app/shared/model/idioma.model';

describe('Component Tests', () => {
  describe('Idioma Management Detail Component', () => {
    let comp: IdiomaDetailComponent;
    let fixture: ComponentFixture<IdiomaDetailComponent>;
    const route = ({ data: of({ idioma: new Idioma(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CtProjectTestModule],
        declarations: [IdiomaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(IdiomaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(IdiomaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load idioma on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.idioma).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
