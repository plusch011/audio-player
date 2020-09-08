import {PlayerComponent} from '@core/PlayerComponent';

export class PlayerButton extends PlayerComponent {
  static className = 'player__button';

  constructor($root, options) {
    super($root, {
      name: 'PlayerButton',
      listeners: ['click'],
    });
  }

  onClick(e) {
    console.log(e.target);
  }

  toHTML() {
    return `
      <div class="content">
        <div class="text">
          <b>Установить</b> Prevola  
        </div>
      </div>
    `
  }
}
