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
    if (RouteHelper.useExperimentalFeatures) {
        return 'routeTransform' in navObj;
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