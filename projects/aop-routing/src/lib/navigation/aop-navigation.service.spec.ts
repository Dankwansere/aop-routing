import { GoodProxy, mockFunction } from '../../mock/test-data';
import { AopConfig, RouteTransform } from '../model/models';
import { Transient } from '../shared/transient';
import { prepareNavObject } from './navigation-helper';
import { AopNavigationService } from './aop-navigation.service';
import { AopProxyNavigationService } from './aop-proxy-navigation.service';
import { RouteHelper } from './router-helper';
import { NavAux } from '../model/nav-aux';

describe('NavigationService', () => {
  let mockRouter, mockLocation, proxyNavigationService, navigationService: AopNavigationService;

  beforeEach(() => {
    proxyNavigationService = new AopProxyNavigationService();
    mockRouter = jasmine.createSpyObj('mockRouter', ['navigate']);
    mockLocation = jasmine.createSpyObj('mockLocation', ['back']);
    navigationService = new AopNavigationService(mockRouter, mockLocation);
    Transient.useExperimentalFeatures = false;
  });

  describe('#constructor', () => {
    it(`should set useExperimentalFeatures property of RouterHelper to passed in config`, () => {
      const config = new AopConfig();
      config.expirementNav = true;
      spyOn(Transient, 'useExperimentalFeatures');
      navigationService = new AopNavigationService(mockRouter, mockLocation, undefined, config);
      expect(Transient.useExperimentalFeatures).toBe(true);
    });
  });

  describe('#goToNextPage', () => {
    it('should call goToNextPage method of passed in proxy service', () => {
      const goodProxy = new GoodProxy();
      const navigationService2 = new AopNavigationService(mockRouter, mockLocation, goodProxy);
      const navAux = new NavAux('aop-page');
      spyOn(goodProxy, 'goToNextPage');
      AopNavigationService.goToNextPage(navAux);
      expect(goodProxy.goToNextPage).toHaveBeenCalled();
    });

    it(`should call executePreProcessLogic method if passed
         NavAux instance preprocess property is set`, () => {
      const navAux = new NavAux('aop-page', undefined, mockFunction);
      spyOn(AopNavigationService, 'executePreProcessLogic');
      AopNavigationService.goToNextPage(navAux);
      expect(AopNavigationService.executePreProcessLogic).toHaveBeenCalledWith(navAux.preprocess, navAux.param);
    });

    it(`should call modifyRouteTable method of RouterHelper if isAopNavObj method returns true`, () => {
      Transient.useExperimentalFeatures = true;
      const routeTransform: RouteTransform = {
        path: 'Test3',
        component: '' as any,
      };
      const mockObj = { routeTransform };
      spyOn(RouteHelper, 'modifyRouteTable');
      const result = prepareNavObject(mockObj);
      AopNavigationService.goToNextPage(result);
      expect(RouteHelper.modifyRouteTable).toHaveBeenCalledWith(mockRouter, result.routeTransform);
    });

    it(`should call executeImperativeNavigation method if isAopNavObj method returns true`, () => {
      Transient.useExperimentalFeatures = true;
      const routeTransform: RouteTransform = {
        path: 'Test3',
        component: '' as any,
      };
      const mockObj = { routeTransform };
      spyOn(RouteHelper, 'modifyRouteTable');
      spyOn(AopNavigationService, 'executeImperativeNavigation');
      const result = prepareNavObject(mockObj);
      AopNavigationService.goToNextPage(result);
      expect(AopNavigationService.executeImperativeNavigation).toHaveBeenCalledWith(result);
    });

    it(`should call resetRouterConfig method of RouterHelper if isAopNavObj method returns true`, () => {
      Transient.useExperimentalFeatures = true;
      const routeTransform: RouteTransform = {
        path: 'Test3',
        component: '' as any,
      };
      const mockObj = { routeTransform };
      spyOn(RouteHelper, 'modifyRouteTable');
      spyOn(AopNavigationService, 'executeImperativeNavigation');
      spyOn(RouteHelper, 'resetRouterConfig');
      const result = prepareNavObject(mockObj);
      AopNavigationService.goToNextPage(result);
      expect(RouteHelper.resetRouterConfig).toHaveBeenCalledWith(mockRouter);
    });

    it(`should call executeImperativeNavigation method if isAopNavObj method returns false`, () => {
      spyOn(AopNavigationService, 'executeImperativeNavigation');
      const result = prepareNavObject(undefined, 'aop-navigation');
      AopNavigationService.goToNextPage(result);
      expect(AopNavigationService.executeImperativeNavigation).toHaveBeenCalledWith(result);
    });
  });

  describe('#goToPreviousPage', () => {
    it('should call goToPreviousPage method of passed in proxy service', () => {
      const goodProxy = new GoodProxy();
      const navigationService2 = new AopNavigationService(mockRouter, mockLocation, goodProxy);
      const navAux = new NavAux('aop-page');
      spyOn(goodProxy, 'goToPreviousPage');
      AopNavigationService.goToPreviousPage(navAux);
      expect(goodProxy.goToPreviousPage).toHaveBeenCalledWith(navAux);
    });

    it(`should call executePreProcessLogic method if passed NavAux instance preprocess property is set`, () => {
      const navAux = new NavAux('aop-page', undefined, mockFunction);
      spyOn(AopNavigationService, 'executePreProcessLogic');
      AopNavigationService.goToPreviousPage(navAux);
      expect(AopNavigationService.executePreProcessLogic).toHaveBeenCalledWith(navAux.preprocess, navAux.param);
    });

    it(`should call back method of location obj`, () => {
      const navAux = new NavAux();
      AopNavigationService.goToPreviousPage(navAux);
      expect(mockLocation.back).toHaveBeenCalled();
    });

    it(`should throw error if exception thrown trying to call back method of location object`, () => {
      mockLocation.back.and.throwError('unit-test-error');
      const navAux = new NavAux();
      spyOn(console, 'error');
      expect(function () {
        AopNavigationService.goToPreviousPage(navAux);
      }).toThrow();
    });
  });

  describe('#goToState', () => {
    it('should call goToPreviousPage method of passed in proxy service', () => {
      const goodProxy = new GoodProxy();
      const navigationService2 = new AopNavigationService(mockRouter, mockLocation, goodProxy);
      const navAux = new NavAux(-1);
      spyOn(goodProxy, 'goToState');
      AopNavigationService.goToState(navAux);
      expect(goodProxy.goToState).toHaveBeenCalledWith(navAux);
    });

    it(`should call executePreProcessLogic method if passed NavAux instance preprocess property is set`, () => {
      const navAux = new NavAux(-1, undefined, mockFunction);
      spyOn(AopNavigationService, 'executePreProcessLogic');
      AopNavigationService.goToState(navAux);
      expect(AopNavigationService.executePreProcessLogic).toHaveBeenCalledWith(navAux.preprocess, navAux.param);
    });

    it(`should call go method of history obj, if destinationPage property of navAux is a number`, () => {
      const navAux = new NavAux(-1);
      spyOn(history, 'go');
      AopNavigationService.goToState(navAux);
      expect(history.go).toHaveBeenCalledWith(navAux.destinationPage);
    });

    it(`should throw error if exception thrown trying to call go method of history object`, () => {
      spyOn(history, 'go').and.throwError('unit-test-error');
      const navAux = new NavAux(-1);
      spyOn(console, 'error');
      expect(function () {
        AopNavigationService.goToState(navAux);
      }).toThrow();
    });
  });

  describe('#getRouterObj', () => {
    it('should return a router object', () => {
      const routerRes = AopNavigationService.getRouterObj();
      expect(routerRes).toBe(mockRouter);
    });
  });

  describe('#getLocationObj', () => {
    it('should return a location object', () => {
      const locationRes = AopNavigationService.getLocationObj();
      expect(locationRes).toBe(mockLocation);
    });
  });

  describe('#executeImperativeNavigation', () => {
    it('should call navigate method of Router object', () => {
      const navAux = new NavAux('aop-nav');
      AopNavigationService.executeImperativeNavigation(navAux);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['aop-nav'], navAux.navigationExtra);
    });

    it('should call navigate method of Router object with an empty string passed', () => {
      const navAux = new NavAux('');
      AopNavigationService.executeImperativeNavigation(navAux);
      expect(mockRouter.navigate).toHaveBeenCalledWith([''], navAux.navigationExtra);
    });

    it('should call navigate method with the value of routeTransform.path', () => {
      const routeTransformObj = {
        routeTransform: {
          path: 'route-transform-path'
        }
      };

      AopNavigationService.executeImperativeNavigation(routeTransformObj);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['route-transform-path'], undefined);
    });

    it('should throw error if exception thrown trying to call navigate method of router object', () => {
      const navAux = new NavAux('aop-nav');
      spyOn(console, 'error');
      mockRouter.navigate.and.throwError('unit-test-error');
      expect(function () {
        AopNavigationService.executeImperativeNavigation(navAux);
      }).toThrow();
    });
  });

  describe('#executePreProcessLogic', () => {
    it('should call passed in function argument', () => {
      const navAux = new NavAux('aop-page', undefined, mockFunction);
      spyOn(navAux, 'preprocess');
      AopNavigationService.executePreProcessLogic(navAux.preprocess, undefined);
      expect(navAux.preprocess).toHaveBeenCalled();
    });

    it('should call passed in function argument with the passed param argument', () => {
      const navAux = new NavAux('aop-page', undefined, mockFunction, 'aop-test');
      spyOn(navAux, 'preprocess');
      AopNavigationService.executePreProcessLogic(navAux.preprocess, navAux.param);
      expect(navAux.preprocess).toHaveBeenCalledWith(navAux.param);
    });

    it('should throw an error if an exception was thrown', () => {
      const navAux = new NavAux('aop-page', undefined, mockFunction, 'aop-test');
      spyOn(console, 'error');
      spyOn(navAux, 'preprocess').and.throwError('unit-test-error');
      expect(function () {
        AopNavigationService.executePreProcessLogic(navAux.preprocess, navAux.param);
      }).toThrow();
    });
  });
});
