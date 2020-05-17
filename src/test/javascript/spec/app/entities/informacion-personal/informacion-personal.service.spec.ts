import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { InformacionPersonalService } from 'app/entities/informacion-personal/informacion-personal.service';
import { IInformacionPersonal, InformacionPersonal } from 'app/shared/model/informacion-personal.model';

describe('Service Tests', () => {
  describe('InformacionPersonal Service', () => {
    let injector: TestBed;
    let service: InformacionPersonalService;
    let httpMock: HttpTestingController;
    let elemDefault: IInformacionPersonal;
    let expectedResult: IInformacionPersonal | IInformacionPersonal[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(InformacionPersonalService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new InformacionPersonal(0, currentDate, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 0, 'AAAAAAA', 0, 0, false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fechaNacimiento: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a InformacionPersonal', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaNacimiento: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaNacimiento: currentDate
          },
          returnedFromService
        );

        service.create(new InformacionPersonal()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a InformacionPersonal', () => {
        const returnedFromService = Object.assign(
          {
            fechaNacimiento: currentDate.format(DATE_FORMAT),
            lugarNacimiento: 'BBBBBB',
            direccionResidencia: 'BBBBBB',
            genero: 'BBBBBB',
            ciudad: 1,
            telefono: 'BBBBBB',
            discapacidad: 1,
            redesSociales: 1,
            licencenciaConduccion: true
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaNacimiento: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of InformacionPersonal', () => {
        const returnedFromService = Object.assign(
          {
            fechaNacimiento: currentDate.format(DATE_FORMAT),
            lugarNacimiento: 'BBBBBB',
            direccionResidencia: 'BBBBBB',
            genero: 'BBBBBB',
            ciudad: 1,
            telefono: 'BBBBBB',
            discapacidad: 1,
            redesSociales: 1,
            licencenciaConduccion: true
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaNacimiento: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a InformacionPersonal', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
