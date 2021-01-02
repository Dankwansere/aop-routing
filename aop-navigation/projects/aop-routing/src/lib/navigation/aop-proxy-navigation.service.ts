import { Injectable } from '@angular/core';
import { NavAux } from '../model/models';

@Injectable({
    providedIn: 'root'
})
/**
 * Dummy service to allow custom implemenation of navigation logic.
 * Should be overriden by a custom navigation class inheriting BaseNavigation Class.
 * The custom navigation class should be provided by the angular injector through the `useClass` attribute
 * of the provider array.
 */
export class AopProxyNavigationService {
    goToNextPage(navObj: NavAux, ...args: any[]): void {}
    goToPreviousPage(navObj: NavAux, ...args: any[]): void {}
    goToState(navObj: NavAux, ...args: any[]): void {}
}
