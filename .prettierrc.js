/**
 * @type {import('prettier').Config}
 */
const prettierConfig = {
  /**
   * ts推荐100-120才换行，因为需要显示声明类型，代码会比较长
   */
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  trailingComma: "none",
  bracketSpacing: true,
  bracketSameLine: false,
  
  /** 
   * 箭头函数必须有括号
   * 原因：提高函数的辨识度，修改形参的时候也比较方便
   */
  arrowParens: "always",

  htmlWhitespaceSensitivity: "ignore",
  endOfLine: "auto",

}

module.exports = prettierConfig