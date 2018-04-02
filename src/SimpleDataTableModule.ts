import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SimpleDataTableDirective} from "./directives/simpledatatable.directive";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SimpleDataTableDirective
    ],
    exports: [
        SimpleDataTableDirective
    ]
})
export class SimpleDataTableModule {

}