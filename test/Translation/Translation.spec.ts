import Translator from "../../src/models/Translation/Translation";

// @ts-ignore
import cy_GB from '../../src/imports/translations/cy_GB.json';
// @ts-ignore
import da_DK from '../../src/imports/translations/da_DK.json';
// @ts-ignore
import de_DE from '../../src/imports/translations/de_DE.json';
// @ts-ignore
import en_GB from '../../src/imports/translations/en_GB.json';
// @ts-ignore
import en_US from '../../src/imports/translations/en_US.json';
// @ts-ignore
import es_ES from '../../src/imports/translations/es_ES.json';
// @ts-ignore
import fr_FR from '../../src/imports/translations/fr_FR.json';
// @ts-ignore
import nl_NL from '../../src/imports/translations/nl_NL.json';
// @ts-ignore
import no_NO from '../../src/imports/translations/no_NO.json';
// @ts-ignore
import sv_SE from '../../src/imports/translations/sv_SE.json';

describe('translate()', () => {
  it('should leave english unchanged', () => {
    let translator = new Translator('en_GB');
    expect(translator.translate('Expiration date')).toBe('Expiration date');
  });

  it('should translate to french', () => {
    let translator = new Translator('fr_FR');
    expect(translator.translate('Expiration date')).toBe('Date d\'expiration');
  });

  it('should translate to german', () => {
    let translator = new Translator('de_DE');
    expect(translator.translate('Expiration date')).toBe('Ablaufdatum');
  });

  it('should have translations for all Language parameters', () => {
    let translations = [en_GB, cy_GB, da_DK, de_DE, en_US, es_ES, fr_FR, nl_NL, no_NO, sv_SE];
    for (let i in translations) {
      let translation: any = translations[i];
      let language: any = Translator.translations;
      for (let key in language) {
        let text = language[key];
        expect(translation[text]).toBeDefined();
      }
    }
  });
});
