
// 主函数
import parseAttrs from "./parseAttrs"

// 识别开始结束标记
export default function parse(templateStr) {
  // 指针
  let idx = 0
  // 剩余部分
  let rest = templateStr
  // 开始标记正则
  const startReg = /^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/
  // 结束标记正则
  const endReg = /^\<\/([a-z]+[1-6]?)\>/
  // 抓取结束标签前的文字;
  // 不考虑结束标签后开始标签前的文本
  const wordReg = /^([^\<]+)\<\/[a-z]+[1-6]?\>/

  const startStack = []
  const endStack = [{children: []}]

  while (idx < templateStr.length - 1) {
    rest = templateStr.substring(idx)
    // 判断这个字符是不是开始标签
    if (startReg.test(rest)) {
      // 捕获这个标签
      let stag = rest.match(startReg)[1]

      let attrStr = rest.match(startReg)[2]
      console.log('检测到开始标记', stag)
      // 开始标记推入栈
      startStack.push(stag)
      // 空数组推入栈
      endStack.push({
        tag: stag,
        children: [],
        attrs: parseAttrs(attrStr),
      })

      const strLen =
        attrStr == null
          ? 0
          : attrStr.length
      // 指针后移, +2是因为<>字符
      idx += stag.length + 2 + strLen
      // console.log(startStack, endStack)

    } else if (endReg.test(rest)) {
      let etag = rest.match(endReg)[1]
        let s_pop = startStack.pop() //标签

      // console.log('检测到结束标记', etag)
      // etag和startStack栈顶元素一定是相同的
      if (etag == s_pop) {
        let e_pop = endStack.pop() //数组
        if (endStack.length) {
          endStack[endStack.length - 1].children.push(e_pop)
        }
      } else {
        throw new Error(
          s_pop,
          ':::标签没有封闭！'
        )
      }

      //  指针后移, +3是因为</>字符
      idx += etag.length + 3
      // console.log(
      //   startStack,
      //   JSON.stringify(endStack)
      // )

    } else if (wordReg.test(rest)) {
      let word = rest.match(wordReg)[1]
      if (!/^\s+$/.test(word)) {
        // 检测文字并且不是空格
        // console.log('检测到文字', word)
        // 将文字推入endStack栈顶数组中
        endStack[
          endStack.length - 1
        ].children.push({ text: word , type: 3})
      }
      idx += word.length
      // console.log(startStack, endStack)
    } else {
      idx++
    }

  }
  return endStack[0].children[0]
  // console.log(endStack[])
}