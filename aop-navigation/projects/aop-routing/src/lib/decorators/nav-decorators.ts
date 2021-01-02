import { NavigationExtras } from '@angular/router';
import { AopNavigationService } from '../navigation/aop-navigation.service';
import { take } from 'rxjs/operators';
import { NavError } from '../model/enum';
import { createErrorObj, isTypeNumber, isTypeString, logError } from '../shared/utility';
import { prepareNavObject } from '../navigation/navigation-helper';


/**
 * Executes the original wrapped method and uses the return value along with the passed in arguments of the decorator
 * to create an instance of the NavAux class, then proceeds to navgigate to destination page.
 * @param page - Destination page
 * @param navigationExtras - Extra properties for the Router
 */
export function RouteNext(page?: string, navigationExtras?: NavigationExtras) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function(...args: any[]) {
            const result = originalMethod.apply(this, args);
            let navObj;
            if (isTypeString(result)) {
                page = result || page;
                navObj = prepareNavObject(undefined, page, navigationExtras);
            } else {
                navObj = prepareNavObject(result, page, navigationExtras);
            }
            AopNavigationService.goToNextPage(navObj);
        };
    };
}

export function RouteNextAsync() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function(...args: any[]) {

            try {
                originalMethod.apply(this, args).pipe(
                    take(1)
                ).subscribe( result => {
                    let navObj;
                    if (isTypeString(result)) {
                        navObj = prepareNavObject(undefined, result);
                    } else {
                        navObj = prepareNavObject(result);
                    }
                    AopNavigationService.goToNextPage(navObj);
                }, error => {
                    logError(createErrorObj(NavError.OBSERVABLE_STREAM));
                    throw new Error(error);
                });
            } catch (error) {
                logError(createErrorObj(NavError.OBSERVABLE_REQUIRED));
                throw new Error(error);
            }
        };
    };
}

/**
 * Executes the original wrapped method and uses the return value to create an instance of the NavAux class. Then proceeds
 * to navigate backwards using popState.
 *
 */
export function RouteBack() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function(...args: any[]) {
            const result = originalMethod.apply(this, args);
            const navObj = prepareNavObject(result);
            AopNavigationService.goToPreviousPage(navObj);
        };
    };
}

export function RouteBackAsync() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function(...args: any[]) {
            try {
                originalMethod.apply(this, args).pipe(
                    take(1)
                ).subscribe(result => {
                    const navObj = prepareNavObject(result);
                    AopNavigationService.goToPreviousPage(navObj);
                }, error => {
                    logError(createErrorObj(NavError.OBSERVABLE_STREAM));
                    throw new Error(error);
                });
            } catch (error) {
                logError(createErrorObj(NavError.OBSERVABLE_REQUIRED));
                throw new Error(error);
            }
        };
    };
}


/**
 * Executes the original wrapped method and uses the return value along with the passed in arguments of the decorator
 * to create an instance of the NavAux class, then proceeds to traverse through the history to the specified state.
 * @param state - page in the state to navigate to
 */
export function RouteToState(state?: number) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function(...args: any[]) {
            const result = originalMethod.apply(this, args);
            const navObj = prepareNavObject(result, state);
            AopNavigationService.goToState(navObj);
        };
    };
}

export function RouteToStateAsync() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function(...args: any[]) {

            try {
                originalMethod.apply(this, args).pipe(
                    take(1)
                ).subscribe(result => {
                    let navObj;
                    if (isTypeNumber(result)) {
                        navObj = prepareNavObject(undefined, result);
                    } else {
                        navObj = prepareNavObject(result);
                    }
                    AopNavigationService.goToState(navObj);
                }, error => {
                    logError(createErrorObj(NavError.OBSERVABLE_STREAM));
                    throw new Error(error);
                });
            } catch (error) {
                logError(createErrorObj(NavError.OBSERVABLE_REQUIRED));
                throw new Error(error);
            }
        };
    };
}

