import GhostContentAPI from '@tryghost/content-api';

/* -----------------------------------------------------------------------------
Get Api Key
----------------------------------------------------------------------------- */
export function getApiKey() {
  return document.querySelector('[data-ghost][data-key]').getAttribute('data-key')
}


/* -----------------------------------------------------------------------------
Get Content Api
----------------------------------------------------------------------------- */
export function getContentApi() {
  return new GhostContentAPI({
    url: themeGlobal.siteUrl,
    key: getApiKey(),
    version: 'v5.0'
  });
}


/* -----------------------------------------------------------------------------
Get Posts
----------------------------------------------------------------------------- */
export async function getPosts({limit,include,fields,filter,formats,order}) {
  const api = getContentApi()

  const config = {
    limit: limit ? limit : 'all',
    include: include ? include : 'tags,authors',
    fields: fields ? fields : 'url,slug,title,featured,feature_image,published_at,excerpt,custom_excerpt',
    filter: filter ? filter : '',
    formats: formats ? formats : '',
    order: order ? order : 'published_at desc'
  }

  // fetch posts
  try {
    const posts = await api.posts
    .browse({
      limit: config.limit, 
      include: config.include,
      fields: config.fields,
      filter: config.filter,
      formats: config.formats,
      order: config.order
    });
    return posts;
  } catch (err) {
    console.log(err);
  }
}
