import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CtProjectTestModule } from '../../../test.module';
import { OfertaDetailComponent } from 'app/entities/oferta/oferta-detail.component';
import { Oferta } from 'app/shared/model/oferta.model';

describe('Component Tests', () => {
  describe('Oferta Management Detail Component', () => {
    let comp: OfertaDetailComponent;
    let fixture: ComponentFixture<OfertaDetailComponent>;
    const route = ({ data: of({ oferta: new Oferta(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CtProjectTestModule],
        declarations: [OfertaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OfertaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OfertaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load oferta on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.oferta).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
