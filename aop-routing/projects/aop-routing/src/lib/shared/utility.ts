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
