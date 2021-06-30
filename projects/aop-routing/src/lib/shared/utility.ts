import { AopBaseNavigation } from '../model/abstract/aop-base-navigation';
import { NavError } from '../model/enum';
import { AopProxyNavigationService } from '../navigation/aop-proxy-navigation.service';
import { Transient } from './transient';

/**
 * Determines if the passed value is a string.
 * @param value - value to perform operation on
 */
export function isTypeString(value: any): boolean {
  return typeof value === 'string';
}

/**
 * Determins if passed string value is an empty string.
 * @param value - value to perform operation on 
 */
export function isEmptyString(value: string): boolean {
  return value === '';
}

/**
 * Determines if the passed value is a number.
 * @param value - value to perform operation on
 */
export function isTypeNumber(value: any): boolean {
  return typeof value === 'number';
}

/**
 * Determines if the passed argument is defined and is also an instance of `AopBaseNavigation`
 * @param proxyNavRef - proxy service
 */
export function isProxyNavigationProvided(proxyNavRef: AopProxyNavigationService): boolean {
  return proxyNavRef && proxyNavRef instanceof AopBaseNavigation;
}

/**
 * Determines if the passed object is of type `AopNav` by searching for a 
 * `routeTransform` property.
 * @param navObj - javascript object
 */
export function isAopNavObj(navObj: object): boolean {
  if (navObj) {
    if (Transient.useExperimentalFeatures) {
      return 'routeTransform' in navObj;
    } else if (!Transient.useExperimentalFeatures && 'routeTransform' in navObj) {
      logError(createErrorObj(NavError.EXPIREMENTAL_FEATURE_ROUTE_TRANSFORM));
      throw NavError.EXPIREMENTAL_FEATURE_ROUTE_TRANSFORM;
    }
  }
  return false;
}

/**
 * Creates an `Error` object with the passed string.
 * @param errorMsg - message used to construct Error object
 */
export function createErrorObj(errorMsg: string): Error {
  const err = new Error(errorMsg);
  err.name = 'aop-routing Error';
  return err;
}

/**
 * Logs error to the console.
 * @param error - Error object
 */
export function logError(error: Error) {
  console.error(error);
}

/**
 *  returns the value of the first element in the provided array that satisfies the provided testing function.
 *  If no values satisfies the testing function, undefined is returned.
 *
 * @param array - array to search on
 * @param item - item to search for
 */
export function findElementInArray(array: any[], item: any): any {
  return array.find((element) => element.path === item);
}
