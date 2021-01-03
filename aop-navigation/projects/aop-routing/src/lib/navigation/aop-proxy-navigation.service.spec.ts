import { NavAux } from '../model/nav-aux';
import { AopProxyNavigationService } from './aop-proxy-navigation.service';

describe('ProxyNavigationService', () => {
  const navAux = new NavAux('aop-nav');
  beforeEach(() => {});

  describe('#goToNextPage', () => {
    it('should call goToNextPage', () => {
      const proxy = new AopProxyNavigationService();
      spyOn(proxy, 'goToNextPage');
      proxy.goToNextPage(navAux);
      expect(proxy.goToNextPage).toHaveBeenCalledWith(navAux);
    });
  });

  describe('#goToPreviousPage', () => {
    it('should call goToPreviousPage', () => {
      const proxy = new AopProxyNavigationService();
      spyOn(proxy, 'goToPreviousPage');
      proxy.goToPreviousPage(navAux);
      expect(proxy.goToPreviousPage).toHaveBeenCalledWith(navAux);
    });
  });

  describe('#goToState', () => {
    it('should call goToState', () => {
      const proxy = new AopProxyNavigationService();
      spyOn(proxy, 'goToState');
      proxy.goToState(navAux);
      expect(proxy.goToState).toHaveBeenCalledWith(navAux);
    });
  });
});
