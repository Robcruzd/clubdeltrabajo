import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CtProjectTestModule } from '../../../test.module';
import { ArchivoDetailComponent } from 'app/entities/archivo/archivo-detail.component';
import { Archivo } from 'app/shared/model/archivo.model';

describe('Component Tests', () => {
  describe('Archivo Management Detail Component', () => {
    let comp: ArchivoDetailComponent;
    let fixture: ComponentFixture<ArchivoDetailComponent>;
    const route = ({ data: of({ archivo: new Archivo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CtProjectTestModule],
        declarations: [ArchivoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ArchivoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ArchivoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load archivo on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.archivo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
