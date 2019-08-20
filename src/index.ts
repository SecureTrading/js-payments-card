import Card from './models/Card/Card';
import './styles/card.scss';

(() => {
  return Card.ifCardExists() && new Card();
})();
