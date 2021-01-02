import { NavigationExtras } from '@angular/router';
import { mockFunction } from '../../mock/test-data';
import { NavAux, RouteTransform } from '../model/models';
import { Transient } from '../shared/transient';
import { createNavObj, prepareNavObject, updateNavObj } from './navigation-helper';

describe('#navigation-helper', () => {
    const page = 'aopPage';
    beforeEach(() => {
    });

      describe('#prepareNavObject', () => {
        beforeEach(() => {
            Transient.useExperimentalFeatures = false;
        });

        it(`should return an object with a navAux and routeTransform property
        if isAopNavObj method returns true`, () => {
            Transient.useExperimentalFeatures = true;
            const dummyComp: any = '';
            const routeTransform: RouteTransform = {
                path: 'Test3',
                component: dummyComp
               };
            const mockObj = {routeTransform}
            const result = prepareNavObject(mockObj);
            expect(result.navAux).toBeDefined();
            expect(result.routeTransform).toBeDefined();

        });

        it(`should return a NavAux object with the destination property
          set to the passed in page argument`, () => {
              const result: NavAux = prepareNavObject(undefined, page);
              expect(result.destinationPage).toBe(page);
        });

        it(`should return a NavAux object with the destination property
            set to the passed in page argument`, () => {
                const result: NavAux = prepareNavObject(undefined, page);
                expect(result.destinationPage).toBe(page);
        });

        it(`should return a NavAux object with the navigationExtra property
        set to the passed in navigationExtra argument`, () => {
            const navExtra: NavigationExtras = {
                skipLocationChange: true
            };
            const result: NavAux = prepareNavObject(undefined, page, navExtra);
            expect(result.navigationExtra.skipLocationChange).toBe(true);
        });

        it(`should override destination property of NavAux object if both page
        and an navAux object was passed as an argument and the passed navAux object
        contains a destinationPage property`, () => {
            const newPage = 'newAopPage';
            const navAuxArg = new NavAux(newPage);
            const result: NavAux = prepareNavObject(navAuxArg, page);
            expect(result.destinationPage).toBe(newPage);
        });

        it(`should override destination property of NavAux object if both navigationExra
        and an navAux object was passed as an argument and the passed navAux object
        contains a navigationExra property`, () => {
            const navExtra: NavigationExtras = {skipLocationChange: true};
            const newNavExtra: NavigationExtras = {skipLocationChange: false};
            const navAuxArg = new NavAux(undefined, newNavExtra);
            const result: NavAux = prepareNavObject(navAuxArg, page, navExtra);
            expect(result.navigationExtra.skipLocationChange).toBe(false);
        });
     });

     describe('#createNavObj', () => {
        it(`should return a NavAux instance with destinationPage property set to passed
        page argument`, () => {
           const result = createNavObj(page, undefined);
           expect(result.destinationPage).toBe(page);
        });

        it(`should return a NavAux instance with navigationExtra property set to passed
        navigationExtras argument`, () => {
            const navExtra: NavigationExtras = {
                skipLocationChange: true
            };
            const result = createNavObj(page, navExtra);
            expect(result.navigationExtra.skipLocationChange).toBe(true);
        });
     });

     describe('#updateNavObj', () => {
        it(`should override the destinationPage property of old instance of NavAux with
        new destinationPage property of new NavAux instance`, () => {
            const newPage = 'new-aop-page';
            const oldNavAux = new NavAux('old-aop-page');
            const newNavAux = new NavAux(newPage);
            const result = updateNavObj(oldNavAux, newNavAux);
            expect(result.destinationPage).toBe(newPage);
        });

        it(`should override the navigationExtra property of old instance of NavAux with
        new navigationExtra property of new NavAux instance`, () => {
            const navExtra: NavigationExtras = {
                skipLocationChange: true
            };
            const oldNavAux = new NavAux('old-aop-page');
            const newNavAux = new NavAux(undefined, navExtra);
            const result = updateNavObj(oldNavAux, newNavAux);
            expect(result.navigationExtra.skipLocationChange).toBe(true);
        });

        it(`should override the preprocess property of old instance of NavAux with
        new preprocess property of new NavAux instance`, () => {
            const oldNavAux = new NavAux('old-aop-page');
            const newNavAux = new NavAux(undefined, undefined, mockFunction);
            const result = updateNavObj(oldNavAux, newNavAux);
            expect(result.preprocess).toBe(mockFunction);
        });

        it(`should override the param property of old instance of NavAux with
        new param property of new NavAux instance`, () => {
            const oldNavAux = new NavAux('old-aop-page');
            const param = 'aop-nav-library';
            const newNavAux = new NavAux(undefined, undefined, mockFunction, param);
            const result = updateNavObj(oldNavAux, newNavAux);
            expect(result.param).toBe(param);
        });

        it(`should return passed new instance of NavAux if old NavAux instance was not passed`, () => {
            const newNavAux = new NavAux(page, undefined);
            const result = updateNavObj(undefined, newNavAux);
            expect(result.destinationPage).toBe(page);
        });
     });
});
