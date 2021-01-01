import { NavigationExtras } from '@angular/router';
import { Type } from '@angular/core';

export interface RouteTransform {
    path: string;
    component?: Type<any>;
    canActivateGuards?: any[];
}

export interface AopNav {
    routeTransform: RouteTransform;
    navigationExtra?: NavigationExtras | undefined;
}
export interface AopNavigator {
    destinationPage?: string | number;
    navigationExtra?: NavigationExtras | undefined;
    preprocess?: Function;
    param?: any;
}

export class AopConfig {
    expirementNav: boolean;
}

/**
 * Class to encapsulate extra navigation properties or methods that's required to execute the navigation process.
 */
export class NavAux {
    constructor(public destinationPage?: string | number,
         public navigationExtra?: NavigationExtras | undefined,
         public preprocess?: Function, public param?: any) {
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


