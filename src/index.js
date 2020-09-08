import './scss/index.scss';
import {Player} from '@/components/player/Player';
import {Controls} from '@/components/controls/Controls';

const excel = new Player('#app', {
  components: [Controls],
});

excel.render();
