module.exports = {
  range: (start, end) => {
    var ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i);
    }
    return ans;
  },
  crudEntry: (val) => {
    const response = {
      create: 'Created',
      update: 'Updated',
      delete: 'Deleted'
    }
    return response[val]
  },
  capitalize: (value) => {
    if (value) return `${value.charAt(0).toUpperCase()}${value.slice(1)}`
    return ''
  },
  toDateString: (dt) => {
    let date = new Date()
    if (dt && dt !== '') date = new Date(dt)
    return `${monthName(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`
  },
  dateFormatter: (dt) => {
    if (!dt) return ''
    const parsedDate = new Date(dt)
    const parseYear = (parsedDate.getFullYear()).toString().substring(2, 4)
    const month = monthName(parsedDate.getMonth()).substring(0, 3)
    const formattedDate = [parsedDate.getDate(), month, parseYear].join('-')
    return formattedDate
  },
  monthName: (i) => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December']
    return monthNames[`${i}`]
  },
  encodeReqQuery: (query) => {
    const keys = Object.keys(query)
    const req = keys
      .filter((k) => query[`${k}`])
      .reduce((acc, curr, i) => curr ? `${acc}${curr}=${query[`${curr}`]}&` : acc, '?')
    return encodeURI(req)
  },
  isAlphabet: (e) => {
    const char = String.fromCharCode(e.keyCode)
  
    if (/^[0-9 ()+-]+$/.test(char)) {
      return true
    } else {
      e.preventDefault()
    }
  },
  sortBy: (arr, name) => {
    return arr.sort((a, b) => {
      const x = a[`${name}`].toUpperCase()
      const y = b[`${name}`].toUpperCase()
      return x === y ? 0 : x > y ? 1 : -1
    })
  },
  sortByDate: (arr, field, order = 'asc') => {
    return arr.sort((a, b) => {
      const da = new Date(a[`${field}`])
      const db = new Date(b[`${field}`])
      return order === 'desc' ? db - da : db + da
    })
  }
}