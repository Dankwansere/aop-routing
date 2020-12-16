import { NavigationExtras } from '@angular/router';

export interface NavigationResponse {
    isSuccess: boolean;
    isError: boolean;
    errorMessage?: string;
}

export interface NavAuxiliary {
    destinationPage?: string;
    navigationExtra?: NavigationExtras;
    preprocess?: Function;
}

/**
 * Class to encapsulate extra navigation properties or methods that's required to execute the navigation process.
 */
export class NavAux {
    destinationPage: string | number;
    navigationExtra: NavigationExtras;
    preprocess: Function;
    params: any;

    constructor(destinationPage?: string | number, navigationExtra?: NavigationExtras | undefined, preprocess?: Function, param?: any) {
        this.destinationPage = destinationPage;
        this.navigationExtra = navigationExtra;
        this.preprocess = preprocess;
        this.params = param;
    }
}

export abstract class BaseNavigation {


    /**
     * Skeleton methods to be overrided and provide custom navigation logic.
     * Recommended to utilize NavAux class, as this class encapsulates navigation properties and will be passed
     * by the decorator functions.
     * @param navObj - Encapsulates navigation properties
     */
    abstract goToNextPage(navObj: NavAux, ...args): void;
    abstract goToPreviousPage(navObj: NavAux, ...args): void;
    abstract goToState(navObj: NavAux, ...args): void;
}


