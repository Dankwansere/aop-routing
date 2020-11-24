import { NavigationExtras } from '@angular/router';
import { NavAux } from '../model/models';
import { NavigationService } from '../navigation/navigation.service';

export function RouteNext(page?: string, navigationExtras?: NavigationExtras) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function(...args: any[]) {
            const result = originalMethod.apply(this, args);
            let navObj: NavAux;

            if (page) {
                navObj = createNavObj(page, navigationExtras);
            }

            if (result instanceof NavAux) {
                navObj = updateNavObj(navObj, result);
            }
            NavigationService.goToNextPage(navObj);
        };
    };
}

function createNavObj(page: string, navigationExtras: NavigationExtras): NavAux {
    return new NavAux(page, navigationExtras);
}

function updateNavObj(oldNavObj: NavAux, newNavObj: NavAux): NavAux {

    if (oldNavObj) {
        if (newNavObj.destinationPage) {
            oldNavObj.destinationPage = newNavObj.destinationPage;
        }

        if (newNavObj.navigationExtra) {
            oldNavObj.navigationExtra = newNavObj.navigationExtra;
        }

        if (newNavObj.preprocess) {
            oldNavObj.preprocess = newNavObj.preprocess;
        }
        if (newNavObj.params) {
            oldNavObj.params = newNavObj.params;
        }
        return oldNavObj;
    }
    return newNavObj;
}
