import i18next from 'i18next';
// @ts-ignore
import cy_GB from '../../imports/translations/cy_GB.json';
// @ts-ignore
import da_DK from '../../imports/translations/da_DK.json';
// @ts-ignore
import de_DE from '../../imports/translations/de_DE.json';
// @ts-ignore
import en_GB from '../../imports/translations/en_GB.json';
// @ts-ignore
import en_US from '../../imports/translations/en_US.json';
// @ts-ignore
import es_ES from '../../imports/translations/es_ES.json';
// @ts-ignore
import fr_FR from '../../imports/translations/fr_FR.json';
// @ts-ignore
import nl_NL from '../../imports/translations/nl_NL.json';
// @ts-ignore
import no_NO from '../../imports/translations/no_NO.json';
// @ts-ignore
import sv_SE from '../../imports/translations/sv_SE.json';

class Translator {
  private static _translations = {
    LABEL_CARD_NUMBER: 'Card number',
    LABEL_EXPIRATION_DATE: 'Expiration date',
    LABEL_SECURITY_CODE: 'Security code'
  };
  public static get translations(): {
    LABEL_CARD_NUMBER: string;
    LABEL_EXPIRATION_DATE: string;
    LABEL_SECURITY_CODE: string;
  } {
    return this._translations;
  }

  constructor(locale: string) {
    i18next.init({
      debug: false,
      lng: locale,
      resources: {
        cy_GB: { translation: cy_GB },
        da_DK: { translation: da_DK },
        de_DE: { translation: de_DE },
        en_GB: { translation: en_GB },
        en_US: { translation: en_US },
        es_ES: { translation: es_ES },
        fr_FR: { translation: fr_FR },
        nl_NL: { translation: nl_NL },
        no_NO: { translation: no_NO },
        sv_SE: { translation: sv_SE }
      }
    });
  }

  public translate = (text: string) => i18next.t(text);
}

export default Translator;
