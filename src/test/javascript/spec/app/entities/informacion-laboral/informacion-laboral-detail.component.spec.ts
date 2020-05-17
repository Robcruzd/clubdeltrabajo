import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CtProjectTestModule } from '../../../test.module';
import { InformacionLaboralDetailComponent } from 'app/entities/informacion-laboral/informacion-laboral-detail.component';
import { InformacionLaboral } from 'app/shared/model/informacion-laboral.model';

describe('Component Tests', () => {
  describe('InformacionLaboral Management Detail Component', () => {
    let comp: InformacionLaboralDetailComponent;
    let fixture: ComponentFixture<InformacionLaboralDetailComponent>;
    const route = ({ data: of({ informacionLaboral: new InformacionLaboral(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CtProjectTestModule],
        declarations: [InformacionLaboralDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(InformacionLaboralDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(InformacionLaboralDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load informacionLaboral on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.informacionLaboral).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
