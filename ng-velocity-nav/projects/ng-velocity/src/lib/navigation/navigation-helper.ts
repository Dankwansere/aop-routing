import { NavigationExtras } from '@angular/router';
import { NavAux } from 'ng-velocity/lib/model/models';

/**
 * Calls the `createNavObj` or `updateNavObj` to create an instance of the NavAux class with the passed in parameters.
 * @param result - Result of executed function
 * @param page - Destination page
 * @param navigationExtras - Router navigation extra properties
 */
export function prepareNavObject(result: NavAux, page?: string | number, navigationExtras?: NavigationExtras): NavAux {
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
export function createNavObj(page: string | number, navigationExtras: NavigationExtras): NavAux {
    return new NavAux(page, navigationExtras);
}

/**
 * Will updated the existing instance of the NavAux to a new NavAux instance.
 * @param oldNavObj - Exsting instance of NavAux class
 * @param newNavObj - New Instance of NavAux class
 */
export function updateNavObj(oldNavObj: NavAux, newNavObj: NavAux): NavAux {

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