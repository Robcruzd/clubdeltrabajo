import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CtProjectTestModule } from '../../../test.module';
import { InformacionAcademicaDetailComponent } from 'app/entities/informacion-academica/informacion-academica-detail.component';
import { InformacionAcademica } from 'app/shared/model/informacion-academica.model';

describe('Component Tests', () => {
  describe('InformacionAcademica Management Detail Component', () => {
    let comp: InformacionAcademicaDetailComponent;
    let fixture: ComponentFixture<InformacionAcademicaDetailComponent>;
    const route = ({ data: of({ informacionAcademica: new InformacionAcademica(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CtProjectTestModule],
        declarations: [InformacionAcademicaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(InformacionAcademicaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(InformacionAcademicaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load informacionAcademica on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.informacionAcademica).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
