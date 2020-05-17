import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CtProjectTestModule } from '../../../test.module';
import { AplicacionOfertaDetailComponent } from 'app/entities/aplicacion-oferta/aplicacion-oferta-detail.component';
import { AplicacionOferta } from 'app/shared/model/aplicacion-oferta.model';

describe('Component Tests', () => {
  describe('AplicacionOferta Management Detail Component', () => {
    let comp: AplicacionOfertaDetailComponent;
    let fixture: ComponentFixture<AplicacionOfertaDetailComponent>;
    const route = ({ data: of({ aplicacionOferta: new AplicacionOferta(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CtProjectTestModule],
        declarations: [AplicacionOfertaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AplicacionOfertaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AplicacionOfertaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load aplicacionOferta on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.aplicacionOferta).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
