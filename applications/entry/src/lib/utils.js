export const promiseQueue = (promises) => {
  async function queue () {
    const res = []
    for (const p of promises) {
      res.push(await p())
    }
    return res
  }

  return queue()
}

export const runHook = (hooks) => {
  if (Array.isArray(hooks)) {
    return Promise.all(hooks.map(hook => hook({})))
  } else {
    return hooks({})
  }
}

export const loadModule = (url) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = ({ type }) => resolve({ status: type, url });
    script.onerror = ({ type }) => resolve({ status: type, url });
    script.src = url;
    document.head.appendChild(script);
  });
}
