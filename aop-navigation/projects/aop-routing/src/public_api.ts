/*
 * Public API Surface of ng-velocity
 */

export * from './lib/aop-routing.module';
export { RouteNext } from './lib/decorators/nav-decorators';
export { RouteBack } from './lib/decorators/nav-decorators';
export { RouteToState } from './lib/decorators/nav-decorators';
export { RouteNextAsync } from './lib/decorators/nav-decorators';
export { RouteBackAsync } from './lib/decorators/nav-decorators';
export { RouteToStateAsync } from './lib/decorators/nav-decorators';
export { NavAux } from './lib/model/models';
export { AopConfig } from './lib/model/models';
export { AopNav } from './lib/model/models';
export { RouteTransform } from './lib/model/models';
export { NavigationService } from './lib/navigation/navigation.service';
export { BaseNavigation } from './lib/model/models';
export { ProxyNavigationService } from './lib/navigation/proxy-navigation.service';


