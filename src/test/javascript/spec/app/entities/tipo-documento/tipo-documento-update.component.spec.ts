import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CtProjectTestModule } from '../../../test.module';
import { TipoDocumentoUpdateComponent } from 'app/entities/tipo-documento/tipo-documento-update.component';
import { TipoDocumentoService } from 'app/entities/tipo-documento/tipo-documento.service';
import { TipoDocumento } from 'app/shared/model/tipo-documento.model';

describe('Component Tests', () => {
  describe('TipoDocumento Management Update Component', () => {
    let comp: TipoDocumentoUpdateComponent;
    let fixture: ComponentFixture<TipoDocumentoUpdateComponent>;
    let service: TipoDocumentoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CtProjectTestModule],
        declarations: [TipoDocumentoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TipoDocumentoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoDocumentoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoDocumentoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoDocumento(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoDocumento();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
