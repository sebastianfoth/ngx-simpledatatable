import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SimpleDataTableDirective} from "./directives/simpledatatable.directive";
import {BootstrapPaginator} from "./components/bootstrap-paginator.component";
import {DefaultSorter} from "./components/default-sorter.component";
import {Paginator} from "./components/paginator.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        BootstrapPaginator,
        SimpleDataTableDirective,
        Paginator,
        DefaultSorter
    ],
    exports: [
        BootstrapPaginator,
        SimpleDataTableDirective,
        Paginator,
        DefaultSorter
    ]
})
export class SimpleDataTableModule {

}