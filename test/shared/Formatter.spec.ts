import Formatter from '../../src/shared/Formatter';

// given
describe('Formatter', () => {
  const { instance } = FormatterFixture();
  // when
  beforeEach(() => {});

  // then
  describe('number()', () => {});

  // then
  describe('date()', () => {});

  // then
  describe('code()', () => {});

  // then
  describe('_dateISO()', () => {
    // then
    it('should return formatted date with slash between month and year', () => {
      // @ts-ignore
      expect(instance._dateISO(['12', '1'], ['12', '19'])).toEqual('12/19');
    });
  });

  // then
  describe('_dateFixed()', () => {
    // then
    it('should return formatted date with slash between month and year', () => {
      // @ts-ignore
      expect(instance._dateFixed('1219')).toEqual('12/19');
    });
  });
});

function FormatterFixture() {
  const locale: string = 'en_GB';
  const instance = new Formatter(locale);
  return { instance };
}
