import {Component, Input, OnChanges} from "@angular/core";
import * as _ from "lodash";
import {SimpleDataTableDirective} from "../directives/simpledatatable.directive";

@Component({
    selector: "mfBootstrapPaginator",
    template: `
        <sfPaginator #p [sfTable]="sfTable">
            <ul class="pagination" *ngIf="p.dataLength > p.rowsOnPage">
                <li class="page-item" [class.disabled]="p.currentPage <= 1" (click)="p.setPage(1)">
                    <a class="page-link" style="cursor: pointer">&laquo;</a>
                </li>
                <li class="page-item" *ngIf="p.currentPage > 4 && p.currentPage + 1 > p.lastPage"
                    (click)="p.setPage(p.currentPage - 4)">
                    <a class="page-link" style="cursor: pointer">{{p.currentPage - 4}}</a>
                </li>
                <li class="page-item" *ngIf="p.currentPage > 3 && p.currentPage + 2 > p.lastPage"
                    (click)="p.setPage(p.currentPage - 3)">
                    <a class="page-link" style="cursor: pointer">{{p.currentPage - 3}}</a>
                </li>
                <li class="page-item" *ngIf="p.currentPage > 2" (click)="p.setPage(p.currentPage - 2)">
                    <a class="page-link" style="cursor: pointer">{{p.currentPage - 2}}</a>
                </li>
                <li class="page-item" *ngIf="p.currentPage > 1" (click)="p.setPage(p.currentPage - 1)">
                    <a class="page-link" style="cursor: pointer">{{p.currentPage - 1}}</a>
                </li>
                <li class="page-item active">
                    <a class="page-link" style="cursor: pointer">{{p.currentPage}}</a>
                </li>
                <li class="page-item" *ngIf="p.currentPage + 1 <= p.lastPage" (click)="p.setPage(p.currentPage + 1)">
                    <a class="page-link" style="cursor: pointer">{{p.currentPage + 1}}</a>
                </li>
                <li class="page-item" *ngIf="p.currentPage + 2 <= p.lastPage" (click)="p.setPage(p.currentPage + 2)">
                    <a class="page-link" style="cursor: pointer">{{p.currentPage + 2}}</a>
                </li>
                <li class="page-item" *ngIf="p.currentPage + 3 <= p.lastPage && p.currentPage < 3"
                    (click)="p.setPage(p.currentPage + 3)">
                    <a class="page-link" style="cursor: pointer">{{p.currentPage + 3}}</a>
                </li>
                <li class="page-item" *ngIf="p.currentPage + 4 <= p.lastPage && p.currentPage < 2"
                    (click)="p.setPage(p.currentPage + 4)">
                    <a class="page-link" style="cursor: pointer">{{p.currentPage + 4}}</a>
                </li>
                <li class="page-item" [class.disabled]="p.currentPage >= p.lastPage" (click)="p.setPage(p.lastPage)">
                    <a class="page-link" style="cursor: pointer">&raquo;</a>
                </li>
            </ul>
            <ul class="pagination pull-right float-sm-right" *ngIf="p.inputData.length > minRowsOnPage">
                <li class="page-item" *ngFor="let rows of rowsOnPageSet" [class.active]="p.rowsOnPage===rows"
                    (click)="p.setRowsOnPage(rows)">
                    <a class="page-link" style="cursor: pointer">{{rows}}</a>
                </li>
            </ul>
        </sfPaginator>
    `
})
export class BootstrapPaginator implements OnChanges {
    @Input("rowsOnPageSet") rowsOnPageSet = [];
    @Input("sfTable") sfTable: SimpleDataTableDirective;

    minRowsOnPage = 0;

    ngOnChanges(changes: any): any {
        if (changes.rowsOnPageSet) {
            this.minRowsOnPage = _.min(this.rowsOnPageSet)
        }
    }
}