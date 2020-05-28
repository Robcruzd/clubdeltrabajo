import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { InformacionAcademicaService } from 'app/entities/informacion-academica/informacion-academica.service';
import { IInformacionAcademica, InformacionAcademica } from 'app/shared/model/informacion-academica.model';

describe('Service Tests', () => {
  describe('InformacionAcademica Service', () => {
    let injector: TestBed;
    let service: InformacionAcademicaService;
    let httpMock: HttpTestingController;
    let elemDefault: IInformacionAcademica;
    let expectedResult: IInformacionAcademica | IInformacionAcademica[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(InformacionAcademicaService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new InformacionAcademica(0, 0, 0, currentDate, currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fechaInicio: currentDate.format(DATE_FORMAT),
            fechaFin: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a InformacionAcademica', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaInicio: currentDate.format(DATE_FORMAT),
            fechaFin: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaInicio: currentDate,
            fechaFin: currentDate
          },
          returnedFromService
        );

        service.create(new InformacionAcademica()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a InformacionAcademica', () => {
        const returnedFromService = Object.assign(
          {
            nivelEstudio: 1,
            estado: 1,
            fechaInicio: currentDate.format(DATE_FORMAT),
            fechaFin: currentDate.format(DATE_FORMAT),
            tituloOtorgado: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaInicio: currentDate,
            fechaFin: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of InformacionAcademica', () => {
        const returnedFromService = Object.assign(
          {
            nivelEstudio: 1,
            estado: 1,
            fechaInicio: currentDate.format(DATE_FORMAT),
            fechaFin: currentDate.format(DATE_FORMAT),
            tituloOtorgado: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaInicio: currentDate,
            fechaFin: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a InformacionAcademica', () => {
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
