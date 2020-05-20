import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CtProjectTestModule } from '../../../test.module';
import { IdiomaUpdateComponent } from 'app/entities/idioma/idioma-update.component';
import { IdiomaService } from 'app/entities/idioma/idioma.service';
import { Idioma } from 'app/shared/model/idioma.model';

describe('Component Tests', () => {
  describe('Idioma Management Update Component', () => {
    let comp: IdiomaUpdateComponent;
    let fixture: ComponentFixture<IdiomaUpdateComponent>;
    let service: IdiomaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CtProjectTestModule],
        declarations: [IdiomaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(IdiomaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(IdiomaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(IdiomaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Idioma(123);
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
        const entity = new Idioma();
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
