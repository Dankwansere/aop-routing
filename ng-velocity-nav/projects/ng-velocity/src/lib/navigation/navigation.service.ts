import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { NavAux } from '../model/models';

// @dynamic//
@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private static routerRef: Router;
  private static locationRef: Location;

  constructor(private router: Router, private location: Location) {
    NavigationService.routerRef = this.router;
    NavigationService.locationRef = this.location;

   }

  /**
   * Performs action to call router navigate method and uses the destinationPage property of the NavAux instance
   * to route to next page. If preprocess property of NavAux is provided, it will be executed prior to route navigation.
   * @param navObj - Instance of NavAux class
   */
  static goToNextPage(navObj: NavAux): void {
    if (navObj && navObj.preprocess) {
      this.executePreProcessLogic(navObj.preprocess, navObj.params);
    }
    if (typeof navObj.destinationPage === 'string') {
    this.routerRef.navigate([navObj.destinationPage], navObj.navigationExtra);
    }
  }

  /**
   * Performs action to call the back method of the Location service. If preprocess property of NavAux is provided, it will be executed
   * prior to the execution of the back method.
   * @param navObj - Instance of NavAux class
   */
  static goToPreviousPage(navObj: NavAux): void {
    if (navObj && navObj.preprocess) {
      this.executePreProcessLogic(navObj.preprocess, navObj.params);
    }
    this.locationRef.back();
  }

   /**
   * Performs action to call the go method of the History object. If preprocess property of NavAux is provided, it will be executed
   * prior to the execution of the go method.
   * @param navObj - Instance of NavAux class
   */
  static goToState(navObj: NavAux) {
    if (navObj && navObj.preprocess) {
      this.executePreProcessLogic(navObj.preprocess, navObj.params);
    }
    if (typeof navObj.destinationPage === 'number') {
      history.go(navObj.destinationPage);
    }
  }

  /**
   * Executes the passed function reference. Passed param property will be used as function argument.
   * @param preProcessFunc - Function reference
   * @param param - Parameter to be used for the function
   */
  private static executePreProcessLogic(preProcessFunc: Function, param): void {
    if (preProcessFunc) {
      param ? preProcessFunc(param) : preProcessFunc();
    }
  }
}
