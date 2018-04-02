import {Directive, OnChanges, DoCheck, Input, Output, SimpleChange, EventEmitter, IterableDiffer, IterableDiffers} from "@angular/core";
import * as _ from "lodash";
import {SortingOrder} from "../enums/sorting-order.enum";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {ISortEvent} from "../interfaces/sort-event.interface";
import {IPageEvent} from "../interfaces/page-event.interface";
import {ParamHelper} from "../utils/param.helper.class";

@Directive({
    selector: 'table[sfData]',
    exportAs: 'sfSimpleDataTable'
})
export class SimpleDataTableDirective implements OnChanges, DoCheck {
    /* Inputs */
    @Input("sfData") public inputData: any[] = [];
    @Input("sfSortBy") public sortBy: string | string[] = "";
    @Input("sfSortOrder") public sortOrder: SortingOrder = SortingOrder.ASC;
    @Input("sfRowsOnPage") public rowsOnPage = 1000;
    @Input("sfCurrentPage") public currentPage = 1;

    /* Outputs */
    @Output("sfSortByChange") public sortByChange = new EventEmitter<string | string[]>();
    @Output("sfSortOrderChange") public sortOrderChange = new EventEmitter<string>();

    /* Vars */
    private diff: IterableDiffer<any>;
    private mustRecalculateData = false;
    public data: any[];
    public lastPage: number = 1000;
    public onSortChange = new ReplaySubject<ISortEvent>(1);
    public onPageChange = new EventEmitter<IPageEvent>();

    public constructor(private differs: IterableDiffers) {
        this.diff = differs.find([]).create(null);
    }

    public ngOnChanges(changes: { [key: string]: SimpleChange }): any {
        if (changes["rowsOnPage"]) {
            this.handleChangeRowsOnPage(changes["rowsOnPage"]);
        }
        if (changes["inputData"]) {
            this.handleChangeInputData(changes["inputData"]);
        }
        if (changes["sortBy"] || changes["sortOrder"]) {
            this.handleChangeSort();
        }
    }

    public ngDoCheck(): any {
        let changes = this.diff.diff(this.inputData);
        if (changes) {
            this.recalculatePage();
            this.mustRecalculateData = true;
        }
        if (this.mustRecalculateData) {
            this.fillData();
            this.mustRecalculateData = false;
        }
    }

    private fillData(): void {
        let offset = (this.currentPage - 1) * this.rowsOnPage;
        let data = this.inputData;
        const sortBy = this.sortBy;
        if (typeof sortBy === 'string') {
            data = _.orderBy(data, this.caseInsensitiveIteratee(<string>sortBy), [this.sortOrder]);
        } else {
            data = _.orderBy(data, sortBy, [this.sortOrder]);
        }
        data = _.slice(data, offset, offset + this.rowsOnPage);
        this.data = data;
    }

    public getSort(): ISortEvent {
        return {sortBy: this.sortBy, sortOrder: this.sortOrder};
    }

    public setSort(sortBy: string|string[], sortOrder: SortingOrder): void {
        if (this.sortBy !== sortBy || this.sortOrder !== sortOrder) {
            this.sortBy = sortBy;
            this.sortOrder = ParamHelper.guardAndReturnSortingOrder(sortOrder);
            this.mustRecalculateData = true;
            this.onSortChange.next({sortBy: sortBy, sortOrder: sortOrder});
            this.sortByChange.emit(this.sortBy);
            this.sortOrderChange.emit(this.sortOrder);
        }
    }

    public setPage(currentPage: number, rowsOnPage?: number): void {
        if (this.rowsOnPage !== rowsOnPage || this.currentPage !== currentPage) {
            this.currentPage = this.currentPage !== currentPage ? currentPage : this.calculateNewCurrentPage(this.rowsOnPage, rowsOnPage);
            this.rowsOnPage = rowsOnPage;
            this.mustRecalculateData = true;
            this.onPageChange.emit({
                currentPage: this.currentPage,
                rowsOnPage: this.rowsOnPage,
                dataLength: this.inputData ? this.inputData.length : 0
            });
        }
    }

    public setRowsOnPage(rowsOnPage: number) {
        this.rowsOnPage = rowsOnPage;
    }

    private caseInsensitiveIteratee(sortBy: string) {
        return (row: any): any => {
            let value = row;
            for (let sortByProperty of sortBy.split('.')) {
                if (value) {
                    value = value[sortByProperty];
                }
            }
            if (value && typeof value === 'string') {
                return value.toLowerCase();
            }
            return value;
        };
    }

    private calculateNewCurrentPage(previousRowsOnPage: number, currentRowsOnPage: number): number {
        const firstRowOnPage = (this.currentPage - 1) * previousRowsOnPage + 1;
        return Math.ceil(firstRowOnPage / currentRowsOnPage);
    }

    private recalculatePage() {
        this.lastPage = Math.ceil(this.inputData.length / this.rowsOnPage);
        this.currentPage = this.lastPage < this.currentPage ? this.lastPage : this.currentPage;
        this.currentPage = this.currentPage || 1;

        this.onPageChange.emit({
            currentPage: this.currentPage,
            rowsOnPage: this.rowsOnPage,
            dataLength: this.inputData.length
        });
    }

    private handleChangeRowsOnPage(change: SimpleChange) {
        this.rowsOnPage = change.previousValue;
        this.setPage(this.currentPage, change.currentValue);
        this.mustRecalculateData = true;
    }

    private handleChangeInputData(change: SimpleChange) {
        this.inputData = change.currentValue || [];
        this.recalculatePage();
        this.mustRecalculateData = true;
    }

    private handleChangeSort() {
        this.sortOrder = ParamHelper.guardAndReturnSortingOrder(this.sortOrder);
        if (this.sortBy) {
            this.onSortChange.next({sortBy: this.sortBy, sortOrder: this.sortOrder});
        }
        this.mustRecalculateData = true;
    }
}