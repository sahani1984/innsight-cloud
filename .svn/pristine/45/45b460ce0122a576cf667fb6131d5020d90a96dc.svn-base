import { Component,OnInit, Input,Output,EventEmitter,ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from "@angular/material/paginator";

@Component({
  selector: 'mat-pagination',
  template: `
  <div class="d-flex w-100">
	<mat-paginator [length]="length" [pageIndex]="pageIndex" [pageSize]="pageSize" [pageSizeOptions]="pageSizeOptions" (page)="paginationChange($event)">
	</mat-paginator>
	<div class="d-flex">
		<div class="go-to-label">Go to: </div>
		<mat-form-field>
			<mat-select [(ngModel)]="goTo" (selectionChange)="goToChange()">
				<mat-option *ngFor="let pageNumber of pageNumbers" [value]="pageNumber">{{pageNumber}}</mat-option>
			</mat-select>
		</mat-form-field>
	</div>
</div>
  `,
  styles: [`
    .go-to-label{white-space: nowrap;
      width: 60px;
      display: flex;
      align-items: center;
      margin-left: 15px;
    }
    .mat-form-field{width:50px}
    `
  ]
})
export class PaginationComponent implements OnInit {
  pageSize: number;
  pageIndex: number;
  length: number;
  goTo: number;
  pageNumbers: number[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() disabled = false;
  @Input() hidePageSize = false;
  @Input() pageSizeOptions: number[];
  @Input() showFirstLastButtons = false;
  @Output() page = new EventEmitter<PageEvent>();
  @Input('pageIndex') set pageIndexChanged(pageIndex: number) {
    this.pageIndex = pageIndex;
  };
  @Input("length") set lengthChanged(length: number) {
    this.length = length;
    this.updateGoto();
  }
  @Input("pageSize") set pageSizeChanged(pageSize: number) {
    this.pageSize = pageSize;
    this.updateGoto();
  }

  constructor() {}

  ngOnInit() {
    this.updateGoto();
  }

  updateGoto() {
    this.goTo = (this.pageIndex || 0) + 1;
    this.pageNumbers = [];
    for (let i = 1; i <= this.length / this.pageSize; i++) {
      this.pageNumbers.push(i);
    }
  }

  paginationChange(pageEvt: PageEvent) {
    this.length = pageEvt.length;
    this.pageIndex = pageEvt.pageIndex;
    this.pageSize = pageEvt.pageSize;
    this.updateGoto();
    this.emitPageEvent(pageEvt);
  }

  goToChange() {
    this.paginator.pageIndex = this.goTo - 1;
    this.emitPageEvent({
      length: this.paginator.length,
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize
    });
  }

  emitPageEvent(pageEvent: PageEvent) {
    this.page.next(pageEvent);
  }

}
