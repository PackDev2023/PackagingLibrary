import { getPosts } from './ghost';
import { timeAgo } from './utils';

/* -----------------------------------------------------------------------------
* renderPosts
----------------------------------------------------------------------------- */
export async function renderJobs(jobs) {
  const resultText = document.querySelector('[data-filter-result]')
  if (resultText) { 
    jobs.length == 0 
      ? resultText.innerHTML = `0 results`
      : resultText.innerHTML = `Showing ${jobs.length} result${jobs.length > 1 ? 's' : ''}` 
  }

  const feed = document.querySelector('[data-job-feed]')
  const template = document.querySelector('[data-job-card-template]')

  if (feed && template) {
    let postsHtml = jobs.map(job => {
      const jobCard = template.content.cloneNode(true).querySelector('article')
      
      // links
      jobCard.querySelectorAll('[data-template-url]').forEach(link => {
        link.setAttribute('href', job.url)
      })

      // featured
      if (job.featured) {
        jobCard.setAttribute('data-featured','')
        const featuredClasses = jobCard.getAttribute('data-featured-class').split(' ')
        featuredClasses.forEach(cls => {
          jobCard.classList.add(cls)
        });
      }

      // image
      if (job.feature_image) {
        jobCard.querySelector('[data-template-img]').setAttribute('src', job.feature_image)
        jobCard.querySelector('[data-template-img]').setAttribute('alt', job.title)
        jobCard.querySelector('[data-template-media]').classList.remove('hidden')
      }

      // date
      jobCard.querySelector('[data-template-date]').innerText = //timeAgo(new Date(job.published_at))
        new Date(job.published_at).toLocaleDateString('en', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
      
      // title
      jobCard.querySelector('[data-template-title]').innerText = job.title

      // excerpt
      jobCard.querySelector('[data-template-excerpt]').innerText = job.custom_excerpt ? job.custom_excerpt : ''


      // tags
      if (job.tags) {
        jobCard.querySelector('[data-template-tags]').classList.remove('hidden')
        const item = jobCard.querySelector('li');
        const tagCount = job.tags.length
        const tagLimit = parseInt(jobCard.querySelector('[data-template-tags]').getAttribute('data-template-tags'))
        const tags = job.tags
        if (!isNaN(tagLimit)) {
          tags.length = tagLimit
        }

        const tagsHTML = job.tags.map((tag,index) => {
          const tagItem = item.cloneNode(true) 
          if (index === tagCount - 1) { tagItem.classList = '' }
          tagItem.querySelector('a').setAttribute('href',tag.url)
          tagItem.querySelector('a').innerText = tag.name
          return tagItem.outerHTML
        }).join('')

        jobCard.querySelector('[data-template-tags]').innerHTML = tagsHTML
      }

      return jobCard.outerHTML
    }).join('')

    feed.innerHTML = postsHtml
  }
}

/* -----------------------------------------------------------------------------
* getFilters
----------------------------------------------------------------------------- */
export function getFilters() {
  const allFilterGroups = [...document.querySelectorAll('[data-filter-group]')]
  const filterGroupsInputs = allFilterGroups.map(group => {
    return group.querySelectorAll('input:checked').length > 0 ? group : false
  })
  const filterGroups = filterGroupsInputs.filter(group => group != false)
  const query = filterGroups.map(group => {
    const filters = [...group.querySelectorAll('input')]
    let groupQuery = filters.filter(filter => filter.checked).map(filter => {
      return `tag:${filter.value}`
    }).join(',');

    if (groupQuery && filterGroups.length > 1) { groupQuery = `(${groupQuery})` }

    return groupQuery
  }).filter(Boolean).join('+')

  return query
}

/* -----------------------------------------------------------------------------
* submitFilters
----------------------------------------------------------------------------- */
export async function submitFilters(e) {
  const buttonText = e.currentTarget.querySelector('span')
  const buttonIcon = e.currentTarget.querySelector('i')
  const buttonClear = document.querySelector('[data-filter-clear]')
  const pagination = document.querySelector('[data-pagination]')

  buttonText && buttonText.classList.add('hidden')
  buttonIcon && buttonIcon.classList.remove('hidden')

  const query = getFilters()
  const alert = document.querySelector('[data-alert="filter-error"]')

  if (query) {
    alert && alert.classList.add('hidden')
    const sort = themeGlobal.searchJobsFeaturedFirst ? 'featured desc, published_at desc' : 'published_at desc'
    const jobs = await getPosts({filter:query,order:sort})
    await renderJobs(jobs)
    buttonText && buttonText.classList.remove('hidden')
    buttonIcon && buttonIcon.classList.add('hidden')
    buttonClear && buttonClear.classList.remove('hidden')
    pagination && pagination.classList.add('hidden')
  } else {
    alert && alert.classList.remove('hidden')
    buttonText && buttonText.classList.remove('hidden')
    buttonIcon && buttonIcon.classList.add('hidden')
  }
}

/* -----------------------------------------------------------------------------
* clearFilters
----------------------------------------------------------------------------- */
export function clearFilters() {
  const elements = document.querySelectorAll('[data-filter-group] input')
  elements.forEach(element => {
    element.checked = false
  })
}