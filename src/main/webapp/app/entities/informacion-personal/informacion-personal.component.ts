import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInformacionPersonal } from 'app/shared/model/informacion-personal.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { InformacionPersonalService } from './informacion-personal.service';
import { InformacionPersonalDeleteDialogComponent } from './informacion-personal-delete-dialog.component';

@Component({
  selector: 'jhi-informacion-personal',
  templateUrl: './informacion-personal.component.html'
})
export class InformacionPersonalComponent implements OnInit, OnDestroy {
  informacionPersonals?: IInformacionPersonal[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected informacionPersonalService: InformacionPersonalService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.informacionPersonalService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IInformacionPersonal[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
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
    this.registerChangeInInformacionPersonals();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IInformacionPersonal): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInInformacionPersonals(): void {
    this.eventSubscriber = this.eventManager.subscribe('informacionPersonalListModification', () => this.loadPage());
  }

  delete(informacionPersonal: IInformacionPersonal): void {
    const modalRef = this.modalService.open(InformacionPersonalDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.informacionPersonal = informacionPersonal;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IInformacionPersonal[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/informacion-personal'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.informacionPersonals = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
