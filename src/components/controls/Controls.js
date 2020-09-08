import {PlayerComponent} from '@core/PlayerComponent'
import {$} from '@core/dom';

const PHASES = {
  PAUSE: 'pause',
  PLAYING: 'play_arrow',
}

const MODES = {
  HELLO_MESSAGE: 'hello_message',
  PLAYER: 'player'
}

const SMALL_PLAY_BUTTON_TEMPLATES = {
  [PHASES.PLAYING]: `<span class="material-icons-round" >pause</span>`,
  [PHASES.PAUSE]:
      '<span class="material-icons-round big-icon" >play_arrow</span>',
}

const AUDIO_LEVEL = {
  DOWN: 0.25,
  MUTE: 0,
  UP: 0.75,
}

const AUDIO_ICONS = {
  [AUDIO_LEVEL.DOWN]: 'volume_down',
  [AUDIO_LEVEL.MUTE]: 'volume_mute',
  [AUDIO_LEVEL.UP]: 'volume_up',
}

const BIG_PLAY_BUTTON_TEMPLATES = {

  [MODES.PLAYER]: `
    <div class="text">
        <b>Установить</b> 
        Prevola
    </div>`,
  [MODES.HELLO_MESSAGE]:
      '<span class="material-icons-round big-icon" >play_arrow</span>',
}

export class Controls extends PlayerComponent {
  static className = 'player__controls';
  state = {
    phase: PHASES.PAUSE,
    mode: MODES.HELLO_MESSAGE,
  };
  audio = new Audio(
      'https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3'
  );

  constructor($root, options) {
    super($root, {
      name: 'Controls',
      listeners: ['click'],
    });


    this.audio.addEventListener(
        'loadeddata',
        () => {
          // debugger
          const length = this.$root
              .find(`.time .length`);

          if (length) {
            length.textContent = Controls.getTimeCodeFromNum(
                this.audio.duration
            )
          }
          this.audio.volume = AUDIO_LEVEL.UP;
        },
        false
    );
  }

  static getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
        seconds % 60
    ).padStart(2, 0)}`;
  }

  switchPlay() {
    this.state.phase = this.state.phase == PHASES.PAUSE
        ? PHASES.PLAYING
        : PHASES.PAUSE;

    const play = this.$root
        .find('[data-type="play-button"]')

    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }

    if (play) play.html(SMALL_PLAY_BUTTON_TEMPLATES[this.state.phase]);
  }

  onClick(e) {
    const target = $(e.target);
    // console.log(e.target);

    if (target.closest('[data-type="play-button"]')) {
      this.switchPlay();
    }

    if (target.closest('.volume')) {
      switch (this.audio.volume) {
        case AUDIO_LEVEL.UP:
          this.audio.volume = AUDIO_LEVEL.DOWN;
          break;

        case AUDIO_LEVEL.DOWN:
          this.audio.volume = AUDIO_LEVEL.MUTE;
          break;

        case AUDIO_LEVEL.MUTE:
          this.audio.volume = AUDIO_LEVEL.UP;
          break;
      }

      this.$root.find('.volume').html(AUDIO_ICONS[this.audio.volume]);
    }

    if (target.closest('.timeline')) {
      const timeline = target.closest('.timeline');

      const timelineWidth = window.getComputedStyle(timeline.$el).width;
      const timeToSeek =
          e.offsetX / parseInt(timelineWidth) * this.audio.duration;
      this.audio.currentTime = timeToSeek;
    }

    if (target.closest('[data-type="switch-mode-button"]')) {
      if (this.state.mode == MODES.PLAYER) {
        this.switchPlay();

        const link = document.createElement('a')
        link.setAttribute('href', 'localhost:3000/');
        link.setAttribute('target', '_blank');
        link.click();
      }

      this.state.mode = MODES.PLAYER;
      this.switchPlay();
      this.$root
          .find('[data-type="switch-mode-button"]')
          .html(BIG_PLAY_BUTTON_TEMPLATES[this.state.mode]);
      this.$root.html(this.getControlTemplate());

      const length = this.$root
          .find(`.time .length`);

      if (length) {
        length.html(Controls.getTimeCodeFromNum(
            this.audio.duration
        ))
      }

      setInterval(() => {
        const progressBar = this.$root.find('.progress');
        const calculatedWidth =
            this.audio.currentTime / this.audio.duration * 100;
        progressBar.$el.style.width = calculatedWidth < 6
            ? '8px'
            : calculatedWidth + '%';

        this.$root
            .find('.time .current')
            .html(Controls.getTimeCodeFromNum(
                this.audio.currentTime
            ));
      }, 500);
    }
  }

  getControlTemplate() {
    if (this.state.mode == MODES.PLAYER) {
      return `
    <div class="small-play-button" data-type="play-button">
      ${SMALL_PLAY_BUTTON_TEMPLATES[this.state.phase]}
    </div>
    <div class="bar">
      <div class="top-menu">
        <div class="track-title"><b>Prevola</b> - Главная</div>
        <span class="material-icons-round volume">volume_up</span>
      </div>
      <div class="timeline">
        <div class="progress"></div>
      </div>
      <div class="time">
        <div class="current">00:00</div>
        <div class="length">00:48</div>
      </div>
    </div>
    <div class="big-play-button" data-type="switch-mode-button">
${BIG_PLAY_BUTTON_TEMPLATES[this.state.mode]}
</div>
  `
    }
    return `
      <div class='hello-message'>Прослушайте презентацию
о нашем продукте</div>
      <div class="big-play-button" data-type="switch-mode-button">
${BIG_PLAY_BUTTON_TEMPLATES[this.state.mode]}
</div>`

  }

  toHTML() {
    return `
      ${this.getControlTemplate()}
    `
  }
}
