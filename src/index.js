import parse from "./parse"

const templateStr = `<div>
    <h3 class="kk" id="box">北极星哈哈哈</h3>
    <ul>
      <li>A</li>
      <li>B</li>
      <li>C</li>
    </ul>
  </div>`

const ast = parse(templateStr)
console.log(ast)
