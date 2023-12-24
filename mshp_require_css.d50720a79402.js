function css_loader(url, insert_function) {
  const existing_css = document.querySelector(`link[href*='${url}']`)
  if (existing_css) return Promise.resolve(existing_css)
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = url

    const on_load = function () {
      link.removeEventListener('load', on_load)
      resolve(link)
    }
    const on_error = function (e) {
      link.removeEventListener('error', on_error)
      reject(e)
    }
    link.addEventListener('load', on_load)
    link.addEventListener('error', on_error)
    if (insert_function && typeof insert_function === 'function') {
      insert_function(link)
    } else {
      const head = document.getElementsByTagName('head')[0]
      head.appendChild(link)
    }
  })
}

async function load_css_to_dom(files, insert_function) {
  for await (const file of files) {
    await css_loader(file, insert_function)
  }
}

window['mshp_require_css'] = async function (files, insert_function) {
  return await load_css_to_dom(files, insert_function)
}
