import { BaseNavigation, NavAux } from '../lib/model/models';
import { ProxyNavigationService } from '../lib/navigation/proxy-navigation.service';

export class GoodProxy extends BaseNavigation {
    goToNextPage(navObj: NavAux, ...args: any[]): void {}
    goToPreviousPage(navObj: NavAux, ...args: any[]): void {}
    goToState(navObj: NavAux, ...args: any[]): void {}
}

export class BadProxy {}

export function mockFunction() {}

export function mockPartialRouter(url: string): any {
    return {
        url : '/' + url,
        navigate: jasmine.createSpy('navigate')
    };
}
