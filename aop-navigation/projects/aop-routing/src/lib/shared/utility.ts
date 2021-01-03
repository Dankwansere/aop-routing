import { AopBaseNavigation } from '../model/abstract/aop-base-navigation';
import { NavError } from '../model/enum';
import { AopProxyNavigationService } from '../navigation/aop-proxy-navigation.service';
import { Transient } from './transient';

export function isTypeString(value: any): boolean {
    return typeof value === 'string';
}

export function isTypeNumber(value: any): boolean {
    return typeof value === 'number';
}

export function isProxyNavigationProvided(proxyNavRef: AopProxyNavigationService): boolean {
    return proxyNavRef && proxyNavRef instanceof AopBaseNavigation;
}

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

export function createErrorObj(errorMsg: string): Error {
    const err = new Error(errorMsg);
    err.name = 'aop-routing Error';
    return err;
}

export function logError(error: Error) {
    console.error(error);
}
