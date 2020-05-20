import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CtProjectTestModule } from '../../../test.module';
import { NivelIdiomaDetailComponent } from 'app/entities/nivel-idioma/nivel-idioma-detail.component';
import { NivelIdioma } from 'app/shared/model/nivel-idioma.model';

describe('Component Tests', () => {
  describe('NivelIdioma Management Detail Component', () => {
    let comp: NivelIdiomaDetailComponent;
    let fixture: ComponentFixture<NivelIdiomaDetailComponent>;
    const route = ({ data: of({ nivelIdioma: new NivelIdioma(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CtProjectTestModule],
        declarations: [NivelIdiomaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(NivelIdiomaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NivelIdiomaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load nivelIdioma on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.nivelIdioma).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
