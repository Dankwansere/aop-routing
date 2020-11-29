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

  static goToNextPage(navObj: NavAux): void {
    if (navObj.preprocess) {
      this.executePreProcessLogic(navObj.preprocess, navObj.params);
    }
    if (typeof navObj.destinationPage === 'string') {
    this.routerRef.navigate([navObj.destinationPage], navObj.navigationExtra);
    }
  }

  static goToPreviousPage(navObj: NavAux): void {
    if (navObj.preprocess) {
      this.executePreProcessLogic(navObj.preprocess, navObj.params);
    }
    this.locationRef.back();
  }

  static goToState(navObj: NavAux) {
    if (navObj.preprocess) {
      this.executePreProcessLogic(navObj.preprocess, navObj.params);
    }
    if (typeof navObj.destinationPage === 'number') {
      history.go(navObj.destinationPage);
    }
  }

  private static executePreProcessLogic(preProcessFunc: Function, param): void {
    if (preProcessFunc) {
      param ? preProcessFunc(param) : preProcessFunc();
    }
  }
}
