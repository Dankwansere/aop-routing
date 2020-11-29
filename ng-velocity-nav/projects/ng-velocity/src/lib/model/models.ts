import { NavigationExtras } from '@angular/router';

export interface NavigationResponse {
    isSuccess: boolean;
    isError: boolean;
    errorMessage?: string;
}

export interface NavAuxiliary {
    destinationPage?: string;
    navigationExtra?: NavigationExtras;
    preprocess?: Function;
}

export class NavAux {
    destinationPage: string | number;
    navigationExtra: NavigationExtras;
    preprocess: Function;
    params: any;

    constructor(destinationPage?: string | number, navigationExtra?: NavigationExtras | undefined, preprocess?: Function, param?: any) {
        this.destinationPage = destinationPage;
        this.navigationExtra = navigationExtra;
        this.preprocess = preprocess;
        this.params = param;
    }
}


