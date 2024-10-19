/* -----------------------------------------------------------------------------
CSS imports & Polyfill
----------------------------------------------------------------------------- */
import '../css/main.css';
import '../css/ghost.css';

import 'vite/modulepreload-polyfill'


/* -----------------------------------------------------------------------------
Alpine Js
----------------------------------------------------------------------------- */
import Alpine from 'alpinejs'
window.Alpine = Alpine
Alpine.start()

/* -----------------------------------------------------------------------------
Tocbot
----------------------------------------------------------------------------- */
import tocbot from 'tocbot';
window.tocbot = tocbot

/* -----------------------------------------------------------------------------
Custom functions
----------------------------------------------------------------------------- */
import { 
  initColorScheme, 
  changeColorScheme,
  copyURL,
  handleSubmenu,
  closeSubmenus,
  changeJobFeedLayout,
  handleJobClosingDate,
  renderTOC
} from './utils';

window.initColorScheme = initColorScheme
window.changeColorScheme = changeColorScheme
window.copyURL = copyURL
window.handleSubmenu = handleSubmenu
window.closeSubmenus = closeSubmenus
window.changeJobFeedLayout = changeJobFeedLayout
window.handleJobClosingDate = handleJobClosingDate
window.renderTOC = renderTOC

handleJobClosingDate()

/* -----------------------------------------------------------------------------
Fitvids
----------------------------------------------------------------------------- */
import fitvids from 'fitvids';
window.Fitvids = fitvids
Fitvids();


/* -----------------------------------------------------------------------------
Job filter
----------------------------------------------------------------------------- */
import { submitFilters, clearFilters} from './filter';
window.submitFilters = submitFilters
window.clearFilters = clearFilters

