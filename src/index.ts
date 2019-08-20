import './Card/card.scss';
import Card from './Card/Card';

(() => {
  return Card.ifCardExists() && new Card();
})();
