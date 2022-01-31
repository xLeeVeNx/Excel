// Styles
import './scss/main.scss';

// SVG-sprites
import './assets/images/icons/delete.svg';
import './assets/images/icons/exit-back.svg';
import './assets/images/icons/excel.svg';
import './assets/images/icons/format-left.svg';
import './assets/images/icons/format-center.svg';
import './assets/images/icons/format-right.svg';
import './assets/images/icons/format-bold.svg';
import './assets/images/icons/format-italic.svg';
import './assets/images/icons/format-underlined.svg';
import './assets/images/icons/fx.svg';

// Components
import {Excel} from '@/components/Excel/Excel';
import {Header} from '@/components/Header/Header';
import {Toolbar} from '@/components/Toolbar/Toolbar';
import {Formula} from '@/components/Formula/Formula';
import {Table} from '@/components/Table/Table';

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
});

excel.render();
