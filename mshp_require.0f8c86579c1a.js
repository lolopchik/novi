const promises_map = new Map()

function create_script_loader(tag = 'head') {
  const head = document.getElementsByTagName(tag)[0]
  return function(url) {
    const existing_promise = promises_map.get(url)
    if (existing_promise) return existing_promise
    const script_promise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      const on_load = function () {
        script.removeEventListener('load', on_load)
        promises_map.delete(url)
        resolve(script)
      }
      const on_error = function (e) {
        script.removeEventListener('error', on_error)
        promises_map.delete(url)
        reject(e)
      }
      script.addEventListener('load', on_load)
      script.addEventListener('error', on_error)
      script.src = url
      head.appendChild(script)
    })

    promises_map.set(url, script_promise)
    return script_promise
  }
}

const script_loader = create_script_loader()

async function load_scripts_to_dom(scripts) {
  for await (let src of scripts) {
    await script_loader(src)
  }
}

async function load_scripts_by_module(scripts) {
  for await (let src of scripts) {
    await import(src)
  }
}

window['mshp_require'] = async function (scripts, { mode = 'no-strict', hashed = false } = {}) {
  let hash = ''
  if (hashed) {
    const timestamp = $('#requirement').attr('timestamp')
    hash = '?bust=' + timestamp
  }
  if (hash.length) scripts = scripts.map(src => src + hash)
  if (mode === 'no-strict') return await load_scripts_to_dom(scripts, {hashed})
  return await load_scripts_by_module(scripts, {hashed})
}
