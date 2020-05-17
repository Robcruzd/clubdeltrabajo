import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CtProjectTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { InformacionLaboralDeleteDialogComponent } from 'app/entities/informacion-laboral/informacion-laboral-delete-dialog.component';
import { InformacionLaboralService } from 'app/entities/informacion-laboral/informacion-laboral.service';

describe('Component Tests', () => {
  describe('InformacionLaboral Management Delete Component', () => {
    let comp: InformacionLaboralDeleteDialogComponent;
    let fixture: ComponentFixture<InformacionLaboralDeleteDialogComponent>;
    let service: InformacionLaboralService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CtProjectTestModule],
        declarations: [InformacionLaboralDeleteDialogComponent]
      })
        .overrideTemplate(InformacionLaboralDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(InformacionLaboralDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InformacionLaboralService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
