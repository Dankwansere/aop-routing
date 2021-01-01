import { Observable, of, throwError } from 'rxjs';
import { RouteBack, RouteBackAsync, RouteNext, RouteNextAsync, RouteToState, RouteToStateAsync } from '../lib/decorators/nav-decorators';
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
        navigate: jasmine.createSpy('navigate'),
        config: [{path: '123', component: 'test-comp', canActivate: ['guard1']},
        {path: 'abc', component: 'test-comp'}]
    };
}

export class MockDecoratorClass {

    @RouteNext('test-page')
    mockNextMethod(): string {
        return 'hello world';
    }

    @RouteNext()
    mockNextObjMethod(): NavAux {
        return new NavAux('aop-nav');
    }

    @RouteNextAsync('testPage')
    mockNextMethodAsync(): Observable<string> {
        return of('hello world');
    }

    @RouteNextAsync()
    mockNextObjMethodAsync(): Observable<NavAux> {
        return of(new NavAux('aop-nav'));
    }

    @RouteNextAsync()
    mockNextAsyncError(): any {
        return 'random string';
    }

    @RouteBack()
    mockBackMethod(): void {
        // do nothing
    }

    @RouteBackAsync()
    mockBackMethodAsync(): Observable<NavAux> {
        return of(new NavAux(undefined, undefined, this.simpleMockMethod));
    }

    @RouteBackAsync()
    mockBackAsyncError(): any {
        return 'random string';
    }

    @RouteToState(-1)
    mockRouteToStateMethod(): void {
        // do nothing
    }

    @RouteToState()
    mockRouteToStateMethodObj(): Observable<NavAux> {
        return of(new NavAux(-1));
    }

    @RouteToStateAsync(-1)
    mockRouteToStateMethodAsync(): Observable<number> {
       return of(-1);
    }

    @RouteToStateAsync()
    mockRouteToStateMethoObjAsync(): Observable<NavAux> {
        return of(new NavAux(-1));
    }

    @RouteToStateAsync()
    mockRouteToStateAsyncError(): any {
        return 'random string';
    }

    simpleMockMethod(): string {
        return 'hello world';
    }


}
