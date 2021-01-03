import { MockDecoratorClass } from '../../mock/test-data';
import { AopNavigationService } from '../navigation/aop-navigation.service';

describe('Nav Decorators', () => {
    beforeEach(() => {

      });

      describe('#RouteNext', () => {
        it('should call goToNextPage of NavigationService if string arg is provided to RouteNext', () => {
            spyOn(AopNavigationService, 'goToNextPage');
            const mockClass = new MockDecoratorClass();
            mockClass.mockNextMethod();
            expect(AopNavigationService.goToNextPage).toHaveBeenCalled();
        });

        it('should call goToNextPage of NavigationService if function returns a NavAux instance ', () => {
            spyOn(AopNavigationService, 'goToNextPage');
            const mockClass = new MockDecoratorClass();
            mockClass.mockNextObjMethod();
            expect(AopNavigationService.goToNextPage).toHaveBeenCalled();
        });
     });

     describe('#RouteNextAsync', () => {
        it('should subscribe to returned function observable and call goToNextPage of NavigationService', () => {
            spyOn(AopNavigationService, 'goToNextPage');
            const mockClass = new MockDecoratorClass();
            mockClass.mockNextMethodAsync();
            expect(AopNavigationService.goToNextPage).toHaveBeenCalled();
        });

        it('should call goToNextPage by using the returned of value of the function through subscription ', () => {
            spyOn(AopNavigationService, 'goToNextPage');
            const mockClass = new MockDecoratorClass();
            mockClass.mockNextObjMethodAsync();
            expect(AopNavigationService.goToNextPage).toHaveBeenCalled();
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
            spyOn(AopNavigationService, 'goToPreviousPage');
            const mockClass = new MockDecoratorClass();
            mockClass.mockBackMethod();
            expect(AopNavigationService.goToPreviousPage).toHaveBeenCalled();
        });
     });

     describe('#RouteBackAsync', () => {
        it('should call goToPreviousPage of NavigationService if function returns a NavAux instance ', () => {
            spyOn(AopNavigationService, 'goToPreviousPage');
            const mockClass = new MockDecoratorClass();
            mockClass.mockBackMethodAsync();
            expect(AopNavigationService.goToPreviousPage).toHaveBeenCalled();
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
            spyOn(AopNavigationService, 'goToState');
            const mockClass = new MockDecoratorClass();
            mockClass.mockRouteToStateMethod();
            expect(AopNavigationService.goToState).toHaveBeenCalled();
        });

        it('should call goToState of NavigationService with the returned value of function', () => {
            spyOn(AopNavigationService, 'goToState');
            const mockClass = new MockDecoratorClass();
            mockClass.mockRouteToStateMethodObj();
            expect(AopNavigationService.goToState).toHaveBeenCalled();
        });
     });

     describe('#RouteStateAsync', () => {
        it('should call goToPreviousPage of NavigationService if function returns a NavAux instance ', () => {
            spyOn(AopNavigationService, 'goToState');
            const mockClass = new MockDecoratorClass();
            mockClass.mockRouteToStateMethoObjAsync();
            expect(AopNavigationService.goToState).toHaveBeenCalled();
        });

        it('should call goToPreviousPage of NavigationService with passed value to decorator ', () => {
            spyOn(AopNavigationService, 'goToState');
            const mockClass = new MockDecoratorClass();
            mockClass.mockRouteToStateMethodAsync();
            expect(AopNavigationService.goToState).toHaveBeenCalled();
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



