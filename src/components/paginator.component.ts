import {Component, Input, SimpleChange, OnChanges, Optional} from "@angular/core";
import {IPageEvent, SimpleDataTableDirective} from "..";

@Component({
    selector: "sfPaginator",
    template: `<ng-content></ng-content>`
})
export class Paginator implements OnChanges {

    @Input("sfTable") inputSfTable: SimpleDataTableDirective;

    private sfTable: SimpleDataTableDirective;

    public activePage: number;
    public rowsOnPage: number;
    public dataLength: number = 0;
    public lastPage: number;

    public constructor(@Optional() private injectSfTable: SimpleDataTableDirective) {
    }

    public ngOnChanges(changes: {[key: string]: SimpleChange}): any {
        this.sfTable = this.inputSfTable || this.injectSfTable;
        this.onPageChangeSubscriber(this.sfTable.getPageEvent());
        this.sfTable.onPageChange.subscribe(this.onPageChangeSubscriber);
    }

    public setPage(pageNumber: number): void {
        this.sfTable.setPage(pageNumber, this.rowsOnPage);
    }

    public setRowsOnPage(rowsOnPage: number): void {
        this.sfTable.setPage(this.activePage, rowsOnPage);
    }

    private onPageChangeSubscriber = (event: IPageEvent)=> {
        this.activePage = event.currentPage;
        this.rowsOnPage = event.rowsOnPage;
        this.dataLength = event.dataLength;
        this.lastPage = Math.ceil(this.dataLength / this.rowsOnPage);
    };
}