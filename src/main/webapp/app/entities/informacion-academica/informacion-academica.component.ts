import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInformacionAcademica } from 'app/shared/model/informacion-academica.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { InformacionAcademicaService } from './informacion-academica.service';
import { InformacionAcademicaDeleteDialogComponent } from './informacion-academica-delete-dialog.component';

@Component({
  selector: 'jhi-informacion-academica',
  templateUrl: './informacion-academica.component.html'
})
export class InformacionAcademicaComponent implements OnInit, OnDestroy {
  informacionAcademicas?: IInformacionAcademica[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected informacionAcademicaService: InformacionAcademicaService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.informacionAcademicaService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IInformacionAcademica[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.ngbPaginationPage = data.pagingParams.page;
      this.loadPage();
    });
    this.registerChangeInInformacionAcademicas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IInformacionAcademica): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInInformacionAcademicas(): void {
    this.eventSubscriber = this.eventManager.subscribe('informacionAcademicaListModification', () => this.loadPage());
  }

  delete(informacionAcademica: IInformacionAcademica): void {
    const modalRef = this.modalService.open(InformacionAcademicaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.informacionAcademica = informacionAcademica;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IInformacionAcademica[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/informacion-academica'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.informacionAcademicas = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
