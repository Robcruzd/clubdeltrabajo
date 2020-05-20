import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInformacionLaboral } from 'app/shared/model/informacion-laboral.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { InformacionLaboralService } from './informacion-laboral.service';
import { InformacionLaboralDeleteDialogComponent } from './informacion-laboral-delete-dialog.component';

@Component({
  selector: 'jhi-informacion-laboral',
  templateUrl: './informacion-laboral.component.html'
})
export class InformacionLaboralComponent implements OnInit, OnDestroy {
  informacionLaborals?: IInformacionLaboral[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected informacionLaboralService: InformacionLaboralService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.informacionLaboralService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IInformacionLaboral[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
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
    this.registerChangeInInformacionLaborals();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IInformacionLaboral): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInInformacionLaborals(): void {
    this.eventSubscriber = this.eventManager.subscribe('informacionLaboralListModification', () => this.loadPage());
  }

  delete(informacionLaboral: IInformacionLaboral): void {
    const modalRef = this.modalService.open(InformacionLaboralDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.informacionLaboral = informacionLaboral;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IInformacionLaboral[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/informacion-laboral'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.informacionLaborals = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
