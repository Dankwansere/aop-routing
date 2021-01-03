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
    // tslint:disable-next-line:ban-types
    preprocess?: Function;
    param?: any;
}

export class AopConfig {
    expirementNav: boolean;
}






