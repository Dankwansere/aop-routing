import { NavigationExtras } from '@angular/router';
import { NavAux } from '../model/models';
import { NavigationService } from '../navigation/navigation.service';
import { take } from 'rxjs/operators';
import { NavError } from '../model/enum';


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
            const navObj = prepareNavObject(result, page, navigationExtras);
            NavigationService.goToNextPage(navObj);
        };
    };
}

export function RouteNextAsync(page?: string, navigationExtras?: NavigationExtras) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function(...args: any[]) {

            try {
                originalMethod.apply(this, args).pipe(
                    take(1)
                ).subscribe( (result: string | NavAux) => {
                    let navObj;
                    if (typeof result === 'string') {
                        page = result || page;
                        navObj = prepareNavObject(undefined, page, navigationExtras);
                        NavigationService.goToNextPage(navObj);
                    } else {
                        navObj = prepareNavObject(result);
                        NavigationService.goToNextPage(navObj);
                    }
                }, error => {
                    throw new Error(NavError.OBSERVABLE_REQUIRED);
                });
            } catch (error) {
                throw new Error(NavError.OBSERVABLE_REQUIRED);
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
            NavigationService.goToPreviousPage(navObj);
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
                    let navObj;
                    if (typeof result === 'string') {
                        navObj = prepareNavObject(undefined, result);
                        NavigationService.goToPreviousPage(navObj);
                    } else {
                        navObj = prepareNavObject(result);
                        NavigationService.goToPreviousPage(navObj);
                    }
                }, error => {
                    throw new Error(NavError.OBSERVABLE_REQUIRED);
                });
            } catch(error) {
                throw new Error(NavError.OBSERVABLE_REQUIRED);
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
            NavigationService.goToState(navObj);
        };
    };
}

export function RouteToStateAsync(state?: number) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function(...args: any[]) {

            try {
                originalMethod.apply(this, args).pipe(
                    take(1)
                ).subscribe(result => {
                    let navObj;
                    if (typeof result === 'number') {
                        state = result || state;
                        navObj = prepareNavObject(undefined, state);
                        NavigationService.goToState(navObj);
                    } else {
                        result = result || state;
                        navObj = prepareNavObject(result);
                        NavigationService.goToState(navObj);
                    }
                }, error => {
                   // throw new Error(NavError.OBSERVABLE_REQUIRED);
                });
            } catch (error) {
                throw new Error(NavError.OBSERVABLE_REQUIRED);
            }
        };
    };
}

/**
 * Calls the `createNavObj` or `updateNavObj` to create an instance of the NavAux class with the passed in parameters.
 * @param result - Result of executed function
 * @param page - Destination page
 * @param navigationExtras - Router navigation extra properties
 */
function prepareNavObject(result: NavAux, page?: string | number, navigationExtras?: NavigationExtras): NavAux {
    let navObj: NavAux;

    if (page) {
        navObj = createNavObj(page, navigationExtras);
    }

    if (result instanceof NavAux) {
        navObj = updateNavObj(navObj, result);
    }

    return navObj;
}

/**
 * Creates an instance of the NavAux class by using the passed parameters.
 * @param page - Destination page
 * @param navigationExtras - Router extra properties
 */
function createNavObj(page: string | number, navigationExtras: NavigationExtras): NavAux {
    return new NavAux(page, navigationExtras);
}

/**
 * Will updated the existing instance of the NavAux to a new NavAux instance.
 * @param oldNavObj - Exsting instance of NavAux class
 * @param newNavObj - New Instance of NavAux class
 */
function updateNavObj(oldNavObj: NavAux, newNavObj: NavAux): NavAux {

    if (oldNavObj) {
        if (newNavObj.destinationPage) {
            oldNavObj.destinationPage = newNavObj.destinationPage;
        }

        if (newNavObj.navigationExtra) {
            oldNavObj.navigationExtra = newNavObj.navigationExtra;
        }

        if (newNavObj.preprocess) {
            oldNavObj.preprocess = newNavObj.preprocess;
        }
        if (newNavObj.params) {
            oldNavObj.params = newNavObj.params;
        }
        return oldNavObj;
    }
    return newNavObj;
}
