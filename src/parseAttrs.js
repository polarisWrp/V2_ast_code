// 将attrstr转为数组

export default function (attrStr) {
  // console.log(att)
  if (attrStr == undefined) return []
  // console.log(attrStr)
  // 当前是否在引号内
  let isYaoHao = false
  // 断点
  let point = 0
  let result = []
  let tempStr = ''

  for (let i = 0; i < attrStr.length; i++) {
    const char = attrStr[i]
    if (char == '"') {
      // 在引号内
      isYaoHao = !isYaoHao
    } else if (char == ' ' && !isYaoHao) {
      // 遇见了空格并且在引号外
      tempStr = attrStr.substring(point, i)
      // console.log( tempStr )
      if (!/^\s*$/.test(tempStr)) {
        result.push( tempStr.trim() )
        point = i
      }
    }
  }
  result.push(
    attrStr.substring(point).trim()
  )
  result = result.map(item => {
    // 根据 = 拆分;捕获 {属性名：类名}
    const obj = item.match(
      /^(.+)="(.+)"$/
    )
    return {
      name: obj[1],
      value: obj[2],
    }
  })
  // console.log('jjjjjj', result)
  return result
}
