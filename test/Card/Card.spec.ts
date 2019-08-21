import each from 'jest-each';
import {cardsLogos} from '../../src/imports/card/card-logos';
import Card from '../../src/models/Card/Card';
import DomMethods from '../../src/models/DomMethods/DomMethods';
import Selectors from "../../src/imports/card/card-selectors";
import Translator from "../../src/models/Translation/Translation";

// given
describe('Card', () => {

  // given
  describe('_setCardDetail()', () => {

    // when
    beforeEach(() => {

    });

    // then
    it('should return value when its truthy', () => {
      // @ts-ignore
      expect(Card._setCardDetail('some value', 'some placeholder')).toEqual('some value');
    });

    // then
    it('should return placeholder when value its falsy', () => {
      // @ts-ignore
      expect(Card._setCardDetail('', 'some placeholder')).toEqual('some placeholder');
    });
  });
});
