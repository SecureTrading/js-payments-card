import Card from "./models/Card/Card";
import './styles/card.scss';

/**
 *
 */
class STCard {
  constructor(config: any) {
    Card.ifCardExists() && new Card();
  }

  /**
   *
   * @param fieldID
   */
  public fieldChange(fieldID: string) {
    const field: HTMLInputElement = document.getElementById(fieldID) as HTMLInputElement;
    field.addEventListener('input', () => {
      console.log(field.value);
    })
  }
}

export default (config: any) => new STCard(config);
