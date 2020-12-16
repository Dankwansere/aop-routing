import { BaseNavigation } from '../model/models';
import { ProxyNavigationService } from '../navigation/proxy-navigation.service';

export function isTypeString(value: any): boolean {
    return typeof value === 'string';
}

export function isTypeNumber(value: any): boolean {
    return typeof value === 'number';
}

export function isProxyNavigationProvided(proxyNavRef: ProxyNavigationService): boolean {
    return proxyNavRef && proxyNavRef instanceof BaseNavigation;
}

export function createErrorObj(errorMsg: string): Error {
    const err = new Error(errorMsg);
    err.name = 'aop-routing Error';
    return err;
}

export function logError(error: Error) {
    console.error(error);
}