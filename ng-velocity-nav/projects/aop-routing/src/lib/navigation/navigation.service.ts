import { Injectable, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AopConfig, NavAux } from '../model/models';
import { ProxyNavigationService } from './proxy-navigation.service';
import { createErrorObj, isProxyNavigationProvided, isTypeNumber, isTypeString, logError } from '../shared/utility';
import { NavError } from '../model/enum';

// @dynamic//
@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private static routerRef: Router;
  private static locationRef: Location;
  private static proxyNavRef: ProxyNavigationService;
  public static useExperimentalFeatures: boolean;

  constructor(private router: Router, private location: Location,
  @Optional() private proxyNavigationService: ProxyNavigationService, @Optional() config?: AopConfig) {
    if (config) {
      NavigationService.useExperimentalFeatures = config.expirementNav;
    }
    NavigationService.routerRef = this.router;
    NavigationService.locationRef = this.location;
    NavigationService.proxyNavRef = this.proxyNavigationService;

   }

  /**
   * Performs action to call router navigate method and uses the destinationPage property of the NavAux instance
   * to route to next page. If preprocess property of NavAux is provided, it will be executed prior to route navigation.
   * If a ProxyNavigationService token is present it will use the goToNextPage implementation of the ProxyNavigationService instead.
   *
   * @param navObj - Instance of NavAux class
   */
  public static goToNextPage(navObj: NavAux): void {

    if (isProxyNavigationProvided(this.proxyNavRef)) {
      this.proxyNavRef.goToNextPage(navObj);
    } else {
      if (navObj && navObj.preprocess) {
        this.executePreProcessLogic(navObj.preprocess, navObj.param);
      }
      if (isTypeString(navObj.destinationPage)) {
        try {
          this.routerRef.navigate([navObj.destinationPage], navObj.navigationExtra);
        } catch (e) {
          logError(createErrorObj(NavError.ROUTING + navObj.destinationPage));
          throw e;
        }
      }
    }
  }

  /**
   * Performs action to call the back method of the Location service. If preprocess property of NavAux is provided, it will be executed
   * prior to the execution of the back method.
   * If a ProxyNavigationService token is present it will use the goToPreviousPage implementation of the ProxyNavigationService instead.
   * @param navObj - Instance of NavAux class
   */
  public static goToPreviousPage(navObj: NavAux): void {
    if (isProxyNavigationProvided(this.proxyNavRef)) {
      this.proxyNavRef.goToPreviousPage(navObj);
    } else {
      if (navObj && navObj.preprocess) {
        this.executePreProcessLogic(navObj.preprocess, navObj.param);
      }
      try {
        this.locationRef.back();
      } catch (e) {
        logError(createErrorObj(NavError.LOCATION_BACK));
        throw e;
      }
    }
  }

   /**
   * Performs action to call the go method of the History object. If preprocess property of NavAux is provided, it will be executed
   * prior to the execution of the go method.
   * If a ProxyNavigationService token is present it will use the goToState implementation of the ProxyNavigationService instead.
   * @param navObj - Instance of NavAux class
   */
  public static goToState(navObj: NavAux) {

    if (isProxyNavigationProvided(this.proxyNavRef)) {
      this.proxyNavRef.goToState(navObj);
    } else {
      if (navObj && navObj.preprocess) {
        this.executePreProcessLogic(navObj.preprocess, navObj.param);
      }
      try {
        if (isTypeNumber(navObj.destinationPage)) {
          history.go(navObj.destinationPage as number);
        }
      } catch (e) {
        logError(createErrorObj(NavError.STATE_HISTORY));
        throw e;
      }
    }
  }

  /**
   * Returns a router object.
   */
  public static getRouterObj(): Router {
    return this.routerRef;
  }

  /**
   * Returns a location object.
   */
  public static getLocationObj(): Location {
    return this.locationRef;
  }

  /**
   * Executes the passed function reference. Passed param property will be used as function argument.
   * @param preProcessFunc - Function reference
   * @param param - Parameter to be used for the function
   */
  private static executePreProcessLogic(preProcessFunc: Function, param): void {
    try {
      if (preProcessFunc) {
        param ? preProcessFunc(param) : preProcessFunc();
      }
    } catch (e) {
      logError(createErrorObj(NavError.PREPROCRESS_FUNC + preProcessFunc.name));
      throw e;
    }
   
  }
}
