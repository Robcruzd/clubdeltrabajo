import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CtProjectTestModule } from '../../../test.module';
import { InformacionPersonalDetailComponent } from 'app/entities/informacion-personal/informacion-personal-detail.component';
import { InformacionPersonal } from 'app/shared/model/informacion-personal.model';

describe('Component Tests', () => {
  describe('InformacionPersonal Management Detail Component', () => {
    let comp: InformacionPersonalDetailComponent;
    let fixture: ComponentFixture<InformacionPersonalDetailComponent>;
    const route = ({ data: of({ informacionPersonal: new InformacionPersonal(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CtProjectTestModule],
        declarations: [InformacionPersonalDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(InformacionPersonalDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(InformacionPersonalDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load informacionPersonal on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.informacionPersonal).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
