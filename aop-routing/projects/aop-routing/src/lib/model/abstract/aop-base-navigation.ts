import { NavAux } from '../nav-aux';

export abstract class AopBaseNavigation {
  /**
   * Skeleton methods to be overrided and provide custom navigation logic.
   * Recommended to utilize NavAux class, as this class encapsulates navigation properties and will be passed
   * by the decorator functions.
   * @param navObj - Encapsulates navigation properties
   */
  abstract goToNextPage(navObj: NavAux, ...args): void;
  abstract goToPreviousPage(navObj: NavAux, ...args): void;
  abstract goToState(navObj: NavAux, ...args): void;
}
