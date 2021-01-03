import { NavigationExtras } from '@angular/router';

/**
 * Class to encapsulate extra navigation properties or methods that's required to execute the navigation process.
 */
export class NavAux {
    constructor(public destinationPage?: string | number,
         public navigationExtra?: NavigationExtras | undefined,
         // tslint:disable-next-line:ban-types
         public preprocess?: Function, public param?: any) {
    }
}
