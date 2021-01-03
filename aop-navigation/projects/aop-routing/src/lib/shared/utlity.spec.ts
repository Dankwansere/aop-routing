import { BadProxy, GoodProxy } from '../../mock/test-data';
import { NavError } from '../model/enum';
import { RouteHelper } from '../navigation/router-helper';
import {
  createErrorObj,
  isAopNavObj,
  isProxyNavigationProvided,
  isTypeNumber,
  isTypeString,
  logError,
} from './utility';
import * as utilityFunctions from './utility';
import { Transient } from './transient';

describe('Utility', () => {
  beforeEach(() => {});

  describe('#isTypeString', () => {
    it('should return true if passed arg is of type string', () => {
      const result = isTypeString('testAop');
      expect(result).toBe(true);
    });

    it('should return false if passed arg is NOT of type string', () => {
      const result = isTypeString(77);
      expect(result).toBe(false);
    });
  });

  describe('#isTypeNumber', () => {
    it('should return true if passed arg is of type numer', () => {
      const result = isTypeNumber(77);
      expect(result).toBe(true);
    });

    it('should return false if passed arg is NOT of type number', () => {
      const result = isTypeNumber('testAop');
      expect(result).toBe(false);
    });
  });

  describe('#isProxyNavigationProvided', () => {
    it('should return true if passed arg is an instance of BaseNavigation', () => {
      const mockProxy = new GoodProxy();
      const result = isProxyNavigationProvided(mockProxy);
      expect(result).toBe(true);
    });

    it('should return false if passed arg is NOT an instance of BaseNavigation', () => {
      const mockProxy = new BadProxy() as any;
      const result = isProxyNavigationProvided(mockProxy);
      expect(result).toBe(false);
    });
  });

  describe('#isAopNavObj', () => {
    it('should return false if useExperimentalFeatures flag of RouteHelper is false', () => {
      Transient.useExperimentalFeatures = false;
      const result = isAopNavObj({});
      expect(result).toBe(false);
    });

    it(`should return false if useExperimentalFeatures flag of RouteHelper
     is true and passed object does not have a routeTransform property`, () => {
      Transient.useExperimentalFeatures = true;
      const result = isAopNavObj({});
      expect(result).toBe(false);
    });

    it(`should return true if useExperimentalFeatures flag of RouteHelper
    is true and passed object contains a routeTransform property`, () => {
      Transient.useExperimentalFeatures = true;
      const mockObj = {
        routeTransform: '',
      };
      const result = isAopNavObj(mockObj);
      expect(result).toBe(true);
    });

    it(`should return false if useExperimentalFeatures flag of RouteHelper
   is false and passed object contains a routeTransform property`, () => {
      spyOn(console, 'error');
      Transient.useExperimentalFeatures = false;
      const mockObj = {
        routeTransform: '',
      };
      expect(function () {
        isAopNavObj(mockObj);
      }).toThrow();
    });
  });

  describe('#createErrorObj', () => {
    it('should return return an error object with passed string arg', () => {
      const errMsg = 'aop-unit-test-error';
      const result = createErrorObj(errMsg);
      expect(result.message).toBe(errMsg);
    });
  });

  describe('#logError', () => {
    it('should return return an error object with passed string arg', () => {
      spyOn(console, 'error');
      logError(createErrorObj('aop-unit-test-error'));
      expect(console.error).toHaveBeenCalled();
    });
  });
});
