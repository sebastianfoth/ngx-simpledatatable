import {Component, Input, OnInit} from "@angular/core";
import {ISortEvent, SimpleDataTableDirective} from "..";
import {SortingOrder} from "../enums/sorting-order.enum";

@Component({
    selector: "sfDefaultSorter",
    template: `
        <a style="cursor: pointer" (click)="sort()" class="text-nowrap">
            <ng-content></ng-content>
            <span *ngIf="isSortedByMeAsc" class="glyphicon glyphicon-triangle-top" aria-hidden="true"></span>
            <span *ngIf="isSortedByMeDesc" class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
        </a>`
})
export class DefaultSorter implements OnInit {
    @Input("by") sortBy: string;

    isSortedByMeAsc: boolean = false;
    isSortedByMeDesc: boolean = false;

    public constructor(private sfTable: SimpleDataTableDirective) {
    }

    public ngOnInit(): void {
        this.sfTable.onSortChange.subscribe((event: ISortEvent) => {
            this.isSortedByMeAsc = (event.sortBy == this.sortBy && event.sortOrder == "asc");
            this.isSortedByMeDesc = (event.sortBy == this.sortBy && event.sortOrder == "desc");
        });
    }

    sort() {
        if (this.isSortedByMeAsc) {
            this.sfTable.setSort(this.sortBy, SortingOrder.DESC);
        } else {
            this.sfTable.setSort(this.sortBy, SortingOrder.ASC);
        }
    }
}