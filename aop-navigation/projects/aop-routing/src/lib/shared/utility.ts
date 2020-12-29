import { NavError } from '../model/enum';
import { BaseNavigation } from '../model/models';
import { ProxyNavigationService } from '../navigation/proxy-navigation.service';
import { RouteHelper } from '../navigation/router-helper';

export function isTypeString(value: any): boolean {
    return typeof value === 'string';
}

export function isTypeNumber(value: any): boolean {
    return typeof value === 'number';
}

export function isProxyNavigationProvided(proxyNavRef: ProxyNavigationService): boolean {
    return proxyNavRef && proxyNavRef instanceof BaseNavigation;
}

export function isAopNavObj(navObj: object): boolean {
    console.log('Log here');
    if (RouteHelper.useExperimentalFeatures) {
        return 'routeTransform' in navObj;
    } else if (!RouteHelper.useExperimentalFeatures && 'routeTransform' in navObj) {
        console.log('log 2');
        logError(createErrorObj(NavError.EXPIREMENTAL_FEATURE_ROUTE_TRANSFORM));
        throw NavError.EXPIREMENTAL_FEATURE_ROUTE_TRANSFORM;
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