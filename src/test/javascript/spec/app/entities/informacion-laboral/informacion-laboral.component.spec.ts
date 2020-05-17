import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { CtProjectTestModule } from '../../../test.module';
import { InformacionLaboralComponent } from 'app/entities/informacion-laboral/informacion-laboral.component';
import { InformacionLaboralService } from 'app/entities/informacion-laboral/informacion-laboral.service';
import { InformacionLaboral } from 'app/shared/model/informacion-laboral.model';

describe('Component Tests', () => {
  describe('InformacionLaboral Management Component', () => {
    let comp: InformacionLaboralComponent;
    let fixture: ComponentFixture<InformacionLaboralComponent>;
    let service: InformacionLaboralService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CtProjectTestModule],
        declarations: [InformacionLaboralComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: {
                subscribe: (fn: (value: Data) => void) =>
                  fn({
                    pagingParams: {
                      predicate: 'id',
                      reverse: false,
                      page: 0
                    }
                  })
              }
            }
          }
        ]
      })
        .overrideTemplate(InformacionLaboralComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InformacionLaboralComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InformacionLaboralService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new InformacionLaboral(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.informacionLaborals && comp.informacionLaborals[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new InformacionLaboral(123)],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.informacionLaborals && comp.informacionLaborals[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
  });
});
