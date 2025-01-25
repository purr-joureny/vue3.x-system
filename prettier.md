-  文件注释

```json
{
    // 每行最大字符数
    "printWidth": 80,
    // 使用单引号而不是双引号
    "singleQuote": false,
    // 在对象或数组最后一个元素后面是否加逗号
    "trailingComma": "all",
    // 在括号和对象的文字之间加上一个空格
    "bracketSpacing": true,
    // 缩进使用空格
    "useTabs": true,
    // 缩进级别的空格数
    "tabWidth": 2,
    // 在语句末尾添加分号
    "semi": true,
    // 箭头函数只有一个参数时是否使用括号
    "arrowParens": "always",
    // Vue 文件中的 script 和 style 标签内的内容是否缩进
    "vueIndentScriptAndStyle": false,
    // HTML 元素（以及 JSX，Vue 模板等）中的空格敏感度
    "htmlWhitespaceSensitivity": "css",
    // 每个属性单独一行
    "singleAttributePerLine": false,
    // 在 HTML、Vue 和 JSX 中强制每行使用一个属性
    "bracketSameLine": false,
    // 是否在对象字面量中的括号之间打印空格
    "bracketSpacing": true,
    // 在 Windows 上使用 CRLF 作为行尾序列
    "endOfLine": "lf",
    // 是否格式化嵌入引号中的代码
    "embeddedLanguageFormatting": "auto",
    // JSX 中使用单引号而不是双引号
    "jsxSingleQuote": false,
    // 是否缩进 Vue 文件中的 <script> 和 <style> 标签
    "vueIndentScriptAndStyle": false,
    // 是否在 prose 中换行
    "proseWrap": "preserve",
    // 指定要使用的解析器
    "parser": "vue",
    // 覆盖特定文件的配置
    "overrides": [
        {
            "files": "*.md",
            "options": {
                "parser": "markdown"
            }
        },
        {
            "files": "*.json",
            "options": {
                "parser": "json"
            }
        },
        {
            "files": "*.yml",
            "options": {
                "parser": "yaml"
            }
        }
    ]
}
```