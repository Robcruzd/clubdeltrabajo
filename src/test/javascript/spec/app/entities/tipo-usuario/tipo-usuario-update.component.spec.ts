import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CtProjectTestModule } from '../../../test.module';
import { TipoUsuarioUpdateComponent } from 'app/entities/tipo-usuario/tipo-usuario-update.component';
import { TipoUsuarioService } from 'app/entities/tipo-usuario/tipo-usuario.service';
import { TipoUsuario } from 'app/shared/model/tipo-usuario.model';

describe('Component Tests', () => {
  describe('TipoUsuario Management Update Component', () => {
    let comp: TipoUsuarioUpdateComponent;
    let fixture: ComponentFixture<TipoUsuarioUpdateComponent>;
    let service: TipoUsuarioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CtProjectTestModule],
        declarations: [TipoUsuarioUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TipoUsuarioUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoUsuarioUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoUsuarioService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoUsuario(123);
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
        const entity = new TipoUsuario();
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
