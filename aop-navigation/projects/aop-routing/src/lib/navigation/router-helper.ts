import { Type } from '@angular/core';
import { Routes, Router, Route } from '@angular/router';
import cloneDeep from 'lodash/cloneDeep';
import { NavError } from '../model/enum';
import { RouteTransform } from '../model/models';
import { createErrorObj, logError } from '../shared/utility';

// @dynamic//
export class RouteHelper {
    public static useExperimentalFeatures: boolean;
    private static pristineRouteConfig: Routes;

    /**
     * Alters route table by either adding a new route path, change route component or updating canActivate guards.
     * @param router - Router object
     * @param path - Path name
     * @param component - Component to be attached
     * @param guards - list of canActivate guards
     */
    public static modifyRouteTable(router: Router, routeTransform: RouteTransform): void {
        this.pristineRouteConfig = cloneDeep(router.config);
        const pathObj = this.getRoutePathObj(router, routeTransform.path);
        if (!pathObj) {
            this.addNewRoutePath(router, routeTransform.path, routeTransform.component, routeTransform.canActivateGuards);
        } else {
            if (routeTransform.component) {
                this.changeRouteComponent(router, routeTransform.path, routeTransform.component);
            }
            if (routeTransform.canActivateGuards) {
                this.updateCanActivateGuards(router, routeTransform.path, routeTransform.canActivateGuards);
            }
        }
    }

    /**
     * Creates a Route object and adds it to the Router table.
     * @param router - Router object
     * @param path - Path name
     * @param component  - Component to be attached.
     * @param canActivate - List of guards
     */
    public static addNewRoutePath(router: Router, path: string, component: Type<any>, canActivate = []): void {
        if (component) {
            const routeInput: Route = {path, component, canActivate};
            router.config.push(routeInput);
        } else {
            logError(createErrorObj(NavError.EXPERIMENTAL_FEATURE_COMPONENT_MISSING));
            throw NavError.EXPERIMENTAL_FEATURE_COMPONENT_MISSING;
        }
    }

    /**
     * Modifies the existing path to point to the passed component.
     * @param router - Router object
     * @param path - Path name
     * @param component - Component to be attached.
     */
    public static changeRouteComponent(router: Router, path: string, component: Type<any>): void {
        this.getRoutePathObj(router, path).component = component;
    }

    /**
     * Will update canActivate guards on route path. If an empty array of guards is passed, guards on the route will be disabled.
     * if list of guards is passed, they will be added to existing canActivate guards.
     * @param router - Router object
     * @param path - Path name
     * @param guard - list of guards
     */
    public static updateCanActivateGuards(router: Router, path: string, guard: any[]): void {
        if (guard && guard.length > 0) {
            this.addCanActivateGuard(router, path, guard);
        } else if (guard.length === 0) {
            this.disableCanActivateGuards(router, path);
        }
    }

    /**
     * Removes all all guards for canActivate.
     * @param router - Router object
     * @param path - Path name
     */
    public static disableCanActivateGuards(router: Router, path: string): void {
        this.getRoutePathObj(router, path).canActivate = [];
    }

    /**
     * Will add canActivate guards to existing route path. IF there are no existing canActivate guards
     * a new array will be created.
     * @param router - Router object
     * @param path - Path name
     * @param guard - guards array
     */
    public static addCanActivateGuard(router: Router, path: string, guard: any[]): void {
       if (!this.getRoutePathObj(router, path).canActivate) {
        this.getRoutePathObj(router, path).canActivate = guard;
       } else {
        const updatedCanActivatedGuards = [...this.getRoutePathObj(router, path).canActivate, ...guard];
        this.getRoutePathObj(router, path).canActivate = updatedCanActivatedGuards;
       }
    }

    /**
     * Returns a Route object from the router table array.
     * @param router - Router object
     * @param path - path name
     */
    public static getRoutePathObj(router: Router, path: string): Route {
        return router.config.find(element => element.path === path);
    }

    /**
     * Points route config back to existing configuration.
     * @param router - Router object
     */
    public static resetRouterConfig(router: Router): void {
        router.config = this.pristineRouteConfig;
    }
 }
