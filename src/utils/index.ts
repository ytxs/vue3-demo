export * from './date'
export * from './permission'

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url: string) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    `{"${
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ')
    }"}`
  )
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time: Date | string | number, cFormat: string) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date,
    _time: string | number
  if (time instanceof Date) {
    date = time
  } else {
    _time = time
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      _time = parseInt(time, 10)
    } else if ((typeof time === 'number') && (time.toString().length === 10)) {
      _time = time * 1000
    }
    date = new Date(_time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  return format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key: keyof typeof formatObj) => {
    let value: string = formatObj[key].toString()
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][Number(value)] }
    if (result.length > 0 && value.length === 1) {
      value = `0${value}`
    }
    return value || '0'
  })
}

export const checkEnv = () => {
  try {
    // 只有是新版的入口页需要去掉旧菜单
    const portalAdminNew = sessionStorage.getItem('portal-admin-new')
    const drawerNew = sessionStorage.getItem('drawer-new')
    const url = window.location.href
    let env = ''
    // 由于环境变量本地开发 和 dev打包重复了，才使用此方法判断是否本地
    if (url.includes('localhost') || url.includes('//10') || url.includes('//172') || url.includes('//192') || !portalAdminNew) {
      env = 'local'
    }
    if (portalAdminNew) {
      env = 'portalAdminNew'
    }
    if (drawerNew) {
      env = 'drawerAdminNew'
    }
    return env
  } catch (error) {
    console.log(error)
    return ''
  }
}
