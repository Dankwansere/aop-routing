import { Route, Routes } from '@angular/router';
import { mockPartialRouter } from '../../mock/test-data';
import { RouteTransform } from '../model/models';
import { RouteHelper } from './router-helper';

describe('RouteHelper', () => {
  let mockRouter;
  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('mockRouter', ['navigate', 'config']);
    const mockData: Routes = [{ path: '123' }];
    mockRouter.config.and.returnValue(mockData);
  });

  describe('#modifyRouteTable', () => {
    it('should create a deep copy of router config object', () => {
      spyOn(RouteHelper, 'getRoutePathObj');
      spyOn(RouteHelper, 'addNewRoutePath');
      spyOn(RouteHelper, 'changeRouteComponent');
      spyOn(RouteHelper, 'updateCanActivateGuards');
      const routeTransform: RouteTransform = {
        path: 'Test3',
        component: '' as any,
      };
      RouteHelper.modifyRouteTable(mockRouter, routeTransform);
      expect(RouteHelper['pristineRouteConfig']).toBeDefined();
    });

    it(`should call addNewRoutePath if getRoutePathObj returns undefined`, () => {
      spyOn(RouteHelper, 'getRoutePathObj').and.returnValue(undefined);
      spyOn(RouteHelper, 'addNewRoutePath');
      const routeTransform: RouteTransform = {
        path: 'Test3',
        component: '' as any,
        canActivateGuards: ['guard 1'],
      };
      RouteHelper.modifyRouteTable(mockRouter, routeTransform);
      expect(RouteHelper.addNewRoutePath).toHaveBeenCalledWith(
        mockRouter,
        routeTransform.path,
        routeTransform.component,
        routeTransform.canActivateGuards,
      );
    });

    it(`should call changeRouteComponent if getRoutePathObj returns a value and
         routeTranform component property is defined`, () => {
      spyOn(RouteHelper, 'getRoutePathObj').and.returnValue({
        path: '123',
        component: 'test-comp',
        canActivate: ['guard 1'],
      });
      spyOn(RouteHelper, 'changeRouteComponent');
      spyOn(RouteHelper, 'updateCanActivateGuards');
      const routeTransform: RouteTransform = {
        path: 'Test3',
        component: 'test-component' as any,
        canActivateGuards: ['guard 1'],
      };
      RouteHelper.modifyRouteTable(mockRouter, routeTransform);
      expect(RouteHelper.changeRouteComponent).toHaveBeenCalledWith(
        mockRouter,
        routeTransform.path,
        routeTransform.component,
      );
    });

    it(`should call updateCanActivateGuards if getRoutePathObj returns a value and
        routeTranform canActivateGuards property is defined`, () => {
      spyOn(RouteHelper, 'getRoutePathObj').and.returnValue({
        path: '123',
        component: 'test-comp',
        canActivate: ['guard 1'],
      });
      spyOn(RouteHelper, 'changeRouteComponent');
      spyOn(RouteHelper, 'updateCanActivateGuards');
      const routeTransform: RouteTransform = {
        path: 'Test3',
        component: 'test-component' as any,
        canActivateGuards: ['guard 1'],
      };
      RouteHelper.modifyRouteTable(mockRouter, routeTransform);
      expect(RouteHelper.updateCanActivateGuards).toHaveBeenCalledWith(
        mockRouter,
        routeTransform.path,
        routeTransform.canActivateGuards,
      );
    });
  });

  describe('#addNewRoutePath', () => {
    it('should add a path object to the router config array', () => {
      const router = mockPartialRouter('123');
      const routeTransform: RouteTransform = {
        path: 'Test3',
        component: 'test-component' as any,
      };
      RouteHelper.addNewRoutePath(router, routeTransform.path, routeTransform.component);
      expect(router.config[0].path).toBe('123');
    });

    it('should throw an error if component arg is empty or undefined', () => {
      const router = mockPartialRouter('123');
      const routeTransform: RouteTransform = {
        path: 'Test3',
        component: '' as any,
      };
      spyOn(console, 'error');
      expect(function () {
        RouteHelper.addNewRoutePath(router, routeTransform.path, routeTransform.component);
      }).toThrow();
    });
  });

  describe('#changeRouteComponent', () => {
    it('should change component property of path object to the passed in component value', () => {
      const router = mockPartialRouter('123');
      const routeTransform: RouteTransform = {
        path: '123',
        component: 'component-abc' as any,
      };
      RouteHelper.changeRouteComponent(router, routeTransform.path, routeTransform.component);
      const result = RouteHelper.getRoutePathObj(router, routeTransform.path);
      expect(result.component).toBe('component-abc');
    });
  });

  describe('#updateCanActivateGuards', () => {
    it('should call addCanActivateGuard method if array of guards were provided', () => {
      spyOn(RouteHelper, 'addOrRemoveCanActivateGuard');
      RouteHelper.updateCanActivateGuards(mockRouter, '123', ['guard1']);
      expect(RouteHelper.addOrRemoveCanActivateGuard).toHaveBeenCalledWith(mockRouter, '123', ['guard1']);
    });
    it('should call disableCanActivateGuards method if an empty array was provided', () => {
      spyOn(RouteHelper, 'disableCanActivateGuards');
      RouteHelper.updateCanActivateGuards(mockRouter, '123', []);
      expect(RouteHelper.disableCanActivateGuards).toHaveBeenCalledWith(mockRouter, '123');
    });
    it('should do nothing if guard length is lesser than 0', () => {
      const fakeGuard = { path: '123' } as any;
      spyOn(RouteHelper, 'disableCanActivateGuards');
      spyOn(RouteHelper, 'addOrRemoveCanActivateGuard');
      RouteHelper.updateCanActivateGuards(mockRouter, '123', fakeGuard);
      expect(RouteHelper.addOrRemoveCanActivateGuard).not.toHaveBeenCalled();
      expect(RouteHelper.disableCanActivateGuards).not.toHaveBeenCalled();
    });
  });

  describe('#disableCanActivateGuards', () => {
    it('should clear guards array ', () => {
      const router = mockPartialRouter('123');
      const routeTransform: RouteTransform = {
        path: '123',
        component: 'component-abc' as any,
      };
      RouteHelper.disableCanActivateGuards(router, routeTransform.path);
      const result = RouteHelper.getRoutePathObj(router, routeTransform.path);
      expect(result.canActivate).toEqual([]);
    });
  });

  describe('#addCanActivateGuard', () => {
    it('should set canActivate of path object to passed guard array', () => {
      const router = mockPartialRouter('abc');
      const routeTransform: RouteTransform = {
        path: 'abc',
        component: 'component-abc' as any,
      };
      RouteHelper.addOrRemoveCanActivateGuard(router, routeTransform.path, ['guard2']);
      const result = RouteHelper.getRoutePathObj(router, 'abc');
      expect(result.canActivate[0]).toBe('guard2');
    });

    it('should add passed guards to canActivate of path object property', () => {
      const router = mockPartialRouter('123');
      const routeTransform: RouteTransform = {
        path: '123',
        component: 'component-abc' as any,
      };
      RouteHelper.addOrRemoveCanActivateGuard(router, routeTransform.path, ['guard2']);
      const result = RouteHelper.getRoutePathObj(router, '123');
      expect(result.canActivate[0]).toBe('guard1');
      expect(result.canActivate[1]).toBe('guard2');
    });
  });

  describe('#getRoutePathObj', () => {
    it('Should return path object in config array if available ', () => {
      const router = mockPartialRouter('123');
      const result = RouteHelper.getRoutePathObj(router, '123');
      expect(result.path).toBe('123');
    });
  });

  describe('#resetRouterConfig', () => {
    it('should clear guards array ', () => {
      const router = mockPartialRouter('123');
      const result = RouteHelper.getRoutePathObj(router, '123');
      expect(result.path).toBe('123');
    });
  });
});
