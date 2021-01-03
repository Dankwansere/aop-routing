import { NavigationExtras } from '@angular/router';
import { NavAux } from '../model/models';
import { isAopNavObj } from '../shared/utility';

/**
 * Calls the `createNavObj` or `updateNavObj` to create an instance of the NavAux class with the passed in parameters.
 * @param result - Result of executed function
 * @param page - Destination page
 * @param navigationExtras - Router navigation extra properties
 */
export function prepareNavObject(result: any, page?: string | number, navigationExtras?: NavigationExtras): any {
  let navObj: NavAux;

  if (isAopNavObj(result)) {
    return {
      navAux: createNavObj(result.routeTransform.path, result.navigationExtra),
      routeTransform: result.routeTransform,
    };
  }

  if (page) {
    navObj = createNavObj(page, navigationExtras);
  }

  if (typeof result === 'object') {
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
    if (newNavObj.param) {
      oldNavObj.param = newNavObj.param;
    }
    return oldNavObj;
  }
  return newNavObj;
}
