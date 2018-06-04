import {SortingOrder} from "../enums/sorting-order.enum";

export class ParamHelper {

    static guardAndReturnSortingOrder(sortOrder) {
        for (const sort in SortingOrder) {
            if (sort === sortOrder) {
                return sortOrder;
            }
        }

        return SortingOrder.ASC;
    }

}