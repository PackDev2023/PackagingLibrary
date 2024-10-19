/* -----------------------------------------------------------------------------
* changeColorScheme
----------------------------------------------------------------------------- */
export function changeColorScheme(theme) {
  const activeEl = document.querySelector(`[data-select-color-scheme] #${theme}`)
  const selectedEl = document.querySelector('[data-selected-color-scheme]')
  if (activeEl && selectedEl) {
    selectedEl.innerHTML = activeEl.innerHTML;
    document.documentElement.setAttribute('data-color-scheme', theme);
    localStorage.setItem('PREFERRED_COLOR_SCHEME', theme);
  }
}

/* -----------------------------------------------------------------------------
* initColorScheme
----------------------------------------------------------------------------- */
export function initColorScheme() {
  const preferredTheme = localStorage.getItem('PREFERRED_COLOR_SCHEME') || document.documentElement.getAttribute('data-color-scheme');
  document.documentElement.setAttribute('data-color-scheme', preferredTheme);
  changeColorScheme(preferredTheme);
}

/* -----------------------------------------------------------------------------
* copyURL
----------------------------------------------------------------------------- */
export function copyURL(src, str) {
  navigator.clipboard.writeText(str);
  src.querySelector('span').innerHTML = src.getAttribute('data-success')
  src.classList.add('text-success', '!border-success')

  src.onmouseleave = function() { 
    setTimeout(function(){
      src.querySelector('span').innerHTML = src.getAttribute('data-label')
      src.classList.remove('text-success', '!border-success')
    }, 1000); 
  }
}

/* -----------------------------------------------------------------------------
* Handle Lightbox
----------------------------------------------------------------------------- */
export function handleLightbox() {
  const images = document.querySelectorAll('.kg-image-card img, .kg-gallery-card img');

  // Lightbox function
  images.forEach(image => {
    const linkElement = document.querySelector('[data-lightbox-link]').content.cloneNode(true);
    const imageLink = image.parentNode.nodeName === 'A' ? image.parentNode.getAttribute('href') : '';
    var lightboxWrapper = imageLink ? image.parentNode : document.createElement('a');

    lightboxWrapper.setAttribute('data-no-swup', '');
    lightboxWrapper.setAttribute('data-fslightbox', '');
    lightboxWrapper.setAttribute('href', image.src);
    lightboxWrapper.setAttribute('aria-label', 'Click for Lightbox');

    if (imageLink) {
      linkElement.querySelector('a').setAttribute('href', imageLink);
      lightboxWrapper.parentNode.insertBefore(linkElement, lightboxWrapper.parentNode.firstChild);
    } else {
      image.parentNode.insertBefore(lightboxWrapper, image.parentNode.firstChild);
      lightboxWrapper.appendChild(image);
    }
  });

  refreshFsLightbox();
}

/* -----------------------------------------------------------------------------
* handleSubmenu
----------------------------------------------------------------------------- */
export function handleSubmenu(e) {
  const subMenu = e.parentNode.querySelector('[data-submenu]')
  const type = e.closest('nav').getAttribute('data-nav')
  const toggle = e.parentNode.querySelector('button')
  if (subMenu && toggle) {
    subMenu.parentNode.toggleAttribute('data-submenu-open')
    toggle.classList.toggle('rotate-180')
    if (type === 'desktop') {
      subMenu.classList.toggle('opacity-0')
      subMenu.classList.toggle('invisible')
      subMenu.classList.toggle('translate-y-1')
    } else {
      subMenu.classList.toggle('hidden')
    }
  }
}

/* -----------------------------------------------------------------------------
* timeAgo from date
----------------------------------------------------------------------------- */
export function timeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);

  // years
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval + ` year${interval > 1 ? 's' : ''} ago`;
  }

  // months
  interval = Math.round(seconds / 2592000);
  if (interval >= 1) {
    return interval + ` month${interval > 1 ? 's' : ''} ago`;
  }

  // days
  interval = Math.floor(seconds / 86400);
  console.log(interval)
  if (interval > 1) {
    return interval + ` day${interval > 1 ? 's' : ''} ago`;
  }

  // hours
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + ` hour${interval > 1 ? 's' : ''} ago`;
  }

  // minutes
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + ` minute${interval > 1 ? 's' : ''} ago`;
  }

  if(seconds < 10) return 'just now';

  return Math.floor(seconds) + ' seconds ago';
};

/* -----------------------------------------------------------------------------
* Job feed layout change
----------------------------------------------------------------------------- */
export function changeJobFeedLayout(layout) {
  document.documentElement.setAttribute('data-job-feed-layout', layout);
  localStorage.setItem('PREFERRED_JOB_FEED', layout);
};

/* -----------------------------------------------------------------------------
* closeSubmenus
----------------------------------------------------------------------------- */
export function closeSubmenus(e) {
  const currentMenu = e.target.closest('li.is-mainitem[data-slug]')
  const menus = currentMenu 
    ? document.querySelectorAll(`[data-submenu-open]:not([data-slug="${currentMenu.getAttribute('data-slug')}"])`)
    : document.querySelectorAll('[data-submenu-open]')
  menus.forEach(menu => {
    const subMenu = menu.querySelector('[data-submenu]')
    const type = menu.closest('nav').getAttribute('data-nav')
    const toggle = menu.querySelector('button')
    if (subMenu && toggle) {
      subMenu.parentNode.removeAttribute('data-submenu-open')
      toggle.classList.remove('rotate-180')
      toggle.ariaExpanded = false
      if (type === 'desktop') {
        subMenu.classList.add('opacity-0')
        subMenu.classList.add('invisible')
        subMenu.classList.add('translate-y-1')
      } else {
        subMenu.classList.add('hidden')
      }
    }
  })
}

/* -----------------------------------------------------------------------------
* handleJobClosingDate
----------------------------------------------------------------------------- */
export function handleJobClosingDate() {
  const jobClosingDateTag = [...document.body.classList].find(className => className.includes('tag-hash-closes-'));
  if (jobClosingDateTag) {
    const jobClosingDate = jobClosingDateTag.split('tag-hash-closes-')[1]
    const closingDate = new Date(jobClosingDate)
    const date = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }).format(closingDate)
    const currentDate = new Date()
    const el = document.querySelector('[data-post-hero="job"] time')
    const text = closingDate.getTime() > currentDate.getTime() ? 'Closes on' : 'Closed on'
  

    if (date && el) {
      el.innerHTML = `${text} <span class="font-semibold">${date}</span>`
    }
  }
}

/* -----------------------------------------------------------------------------
* renderTOC
----------------------------------------------------------------------------- */
export function renderTOC(headings) {
  let headerOffset = document.querySelector('header.sticky[data-header]') ? 92 : 20;

  tocbot.init({
    // Where to render the table of contents.
    tocSelector: '[data-toc-content]',
    // Where to grab the headings to build the table of contents.
    contentSelector: '.ghost-content',
    // Which headings to grab inside of the contentSelector element.
    headingSelector: headings,
    // Ignore some headings (like header card and toggle card)
    ignoreSelector: '[class*="kg-"],[class*="content-cta"]',
    // For headings inside relative or absolute positioned containers within content.
    hasInnerContainers: false,
    // smooth scroll
    scrollSmooth: false,
    // offset
    headingsOffset: headerOffset,
  });

  // document.querySelector('[data-toc-content] .toc-list') ? document.querySelector('[data-toc]').classList.add('is-rendered') : null;
}
