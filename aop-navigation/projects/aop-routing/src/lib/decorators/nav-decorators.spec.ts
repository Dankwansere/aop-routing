import { NavigationService } from '../navigation/navigation.service';
import { RouteNext } from '../decorators/nav-decorators';
import { FunctionCall } from '@angular/compiler';
import { MockDecoratorClass } from '../../mock/test-data';
import { Observable, of, throwError } from 'rxjs';

describe('Nav Decorators', () => {
    beforeEach(() => {

      });

      describe('#RouteNext', () => {
        it('should call goToNextPage of NavigationService if string arg is provided to RouteNext', () => {
            spyOn(NavigationService, 'goToNextPage');
            const mockClass = new MockDecoratorClass();
            mockClass.mockNextMethod();
            expect(NavigationService.goToNextPage).toHaveBeenCalled();
        });

        it('should call goToNextPage of NavigationService if function returns a NavAux instance ', () => {
            spyOn(NavigationService, 'goToNextPage');
            const mockClass = new MockDecoratorClass();
            mockClass.mockNextObjMethod();
            expect(NavigationService.goToNextPage).toHaveBeenCalled();
        });
     });

     describe('#RouteNextAsync', () => {
        it('should subscribe to returned function observable and call goToNextPage of NavigationService', () => {
            spyOn(NavigationService, 'goToNextPage');
            const mockClass = new MockDecoratorClass();
            mockClass.mockNextMethodAsync();
            expect(NavigationService.goToNextPage).toHaveBeenCalled();
        });

        it('should call goToNextPage by using the returned of value of the function through subscription ', () => {
            spyOn(NavigationService, 'goToNextPage');
            const mockClass = new MockDecoratorClass();
            mockClass.mockNextObjMethodAsync();
            expect(NavigationService.goToNextPage).toHaveBeenCalled();
        });

        it('should should throw an error ', (done) => {
            spyOn(console, 'error');
            const mockClass = new MockDecoratorClass();

            try {
                mockClass.mockNextAsyncError();
            } catch (e) {
                expect(e.message).toBe('TypeError: originalMethod.apply(...).pipe is not a function');
                done();
            }
        });
     });

     describe('#RouteBack', () => {
        it('should call goToPreviousPage of NavigationService', () => {
            spyOn(NavigationService, 'goToPreviousPage');
            const mockClass = new MockDecoratorClass();
            mockClass.mockBackMethod();
            expect(NavigationService.goToPreviousPage).toHaveBeenCalled();
        });
     });

     describe('#RouteBackAsync', () => {
        it('should call goToPreviousPage of NavigationService if function returns a NavAux instance ', () => {
            spyOn(NavigationService, 'goToPreviousPage');
            const mockClass = new MockDecoratorClass();
            mockClass.mockBackMethodAsync();
            expect(NavigationService.goToPreviousPage).toHaveBeenCalled();
        });

        it('should should throw an error ', (done) => {
            spyOn(console, 'error');
            const mockClass = new MockDecoratorClass();
            try {
                mockClass.mockBackAsyncError();
            } catch (e) {
                expect(e.message).toBe('TypeError: originalMethod.apply(...).pipe is not a function');
                done();
            }
        });
    });

    describe('#RouteState', () => {
        it('should call goToState of NavigationService with the passed in value of decorator', () => {
            spyOn(NavigationService, 'goToState');
            const mockClass = new MockDecoratorClass();
            mockClass.mockRouteToStateMethod();
            expect(NavigationService.goToState).toHaveBeenCalled();
        });

        it('should call goToState of NavigationService with the returned value of function', () => {
            spyOn(NavigationService, 'goToState');
            const mockClass = new MockDecoratorClass();
            mockClass.mockRouteToStateMethodObj();
            expect(NavigationService.goToState).toHaveBeenCalled();
        });
     });

     describe('#RouteStateAsync', () => {
        it('should call goToPreviousPage of NavigationService if function returns a NavAux instance ', () => {
            spyOn(NavigationService, 'goToState');
            const mockClass = new MockDecoratorClass();
            mockClass.mockRouteToStateMethoObjAsync();
            expect(NavigationService.goToState).toHaveBeenCalled();
        });

        it('should call goToPreviousPage of NavigationService with passed value to decorator ', () => {
            spyOn(NavigationService, 'goToState');
            const mockClass = new MockDecoratorClass();
            mockClass.mockRouteToStateMethodAsync();
            expect(NavigationService.goToState).toHaveBeenCalled();
        });

        it('should should throw an error ', (done) => {
            spyOn(console, 'error');
            const mockClass = new MockDecoratorClass();
            try {
                mockClass.mockRouteToStateAsyncError();
            } catch (e) {
                expect(e.message).toBe('TypeError: originalMethod.apply(...).pipe is not a function');
                done();
            }
        });
    });

});



