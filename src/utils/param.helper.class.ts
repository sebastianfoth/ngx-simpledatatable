import {SortingOrder} from "../enums/sorting-order.enum";

export class ParamHelper {

    static guardAndReturnSortingOrder(sortOrder) {
        return Object.values(SortingOrder).indexOf(sortOrder) > -1 ? sortOrder : SortingOrder.ASC;
    }

}