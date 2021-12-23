### 接口

* 可选属性
* 任意属性： 一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
* 只读属性

~~~type
interface Student {
	id: number,
	name: string,
	age ?: number,
	readonly male: boolean,
	[propName: string]: any,
}
~~~

### 数组的类型

~~~ts
let nums : number[] = [1, 2, 3];
let nums2 : Array<number> = [1, 2, 3];
~~~

### 函数的类型

~~~ts
function sum(x: number, y: number): number {
    return x + y;
}
//可选参数
function sum(x: number, y: number, z?: number): number {
    if(z) {
        return x + y + z;
    } else {
        return x + y;
    }
}
//参数默认值
function sum(x: number, y: number = 0) {
    return x + y;
}
//剩余参数
function sum(x: number, ...rets: number[]) {
    let sum = x;
    rets.foreach(a => {
        sum += a;
    });
    return sum;
}
~~~

### 类型断言

~~~ ts
//值 as 类型
event.target as HTMLElement
//<类型>值
<HTMLElement>(event.target)
~~~

用途：

* 将一个联合类型断言为其中一个类型
* 将一个父类断言为更加具体的子类
* 将任何一个类型断言为any
* 将any类型断言为一个具体的类型

若A兼容B，那么A能够断言为B，B也能够断言为A

### 声明文件

ts会自动解析项目中的所有 *.ts 文件，所以只需要把声明文件放到项目中，其他所有的ts文件就可以获得类型定义了

通过@types统一管理第三方库的声明文件

### 类型别名

~~~ts
type Name = string;
let name : Name = 'wuqinghua';
~~~

### 字符串字面量类型

~~~ts
type EventNames = 'click' | 'scroll' | 'mousemove'
~~~

### 元组

使用元组可以确定元素数据类型，但不要超出范围，可以把元组理解为固定长度，超出范围不能保证其类型

~~~ts
let tom: [string, number] = ['Tom', 25];
~~~

### 枚举

~~~ ts
const enum Directions {
    UP,
    Down,
    Left,
    Right
}
~~~

### 类

* 可以使用public private protected三个修饰符修饰类成员变量
* readonly，只读属性关键字
* abstract：抽象类不能被实例化，抽象类中的抽象方法必须被子类实现

~~~ts
class Animal {
    pulic age: number;
	pulic readonly male: boolean;
	private money: number;
	public constructor(age: number, male: boolean, money: number) {
        this.age = age;
        this.male = male;
        this.money = money;
    }
}
~~~

### 接口再探

接口的另一个用途：对类的一部分进行抽象

~~~ts
interface Alarm {
    alert(): void;
}
interface Light {
    lightOn(): void;
    lightOff(): void;
}
//接口继承接口
interface colorfulLight extends Light {
    colorfulOn(): void;
    colorfulOff(): void;
}
//类实现接口
class Car implements Alarm, Light {
    alert() {
        console.log('car alert');
    }
    lightOn() {
        console.log('car light on');
    }
    lightOff() {
        console.log('car light off');
    }
}
~~~

在typescript中，接口也是可以继承类的，但是只会继承它的实例属性和实例方法，其他的如静态属性、静态方法、构造函数之类的一律都不会继承。

### 泛型

泛型指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

~~~ts
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}
~~~

泛型约束

~~~ts
interface LengthWise {
    length: number;
}
function logLength<T extends LengthWise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
~~~

泛型接口

~~~ts
interface CreateArrayFunc {
    <T>(length: number, value: T): T[];
}
let createArray: CreateArrayFunc;
createArray = function<T>(length: number, value: T) {
    let result: T[] = [];
    for(let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
createArray(3, 'x');
~~~

泛型类

~~~ts
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) {
    return x + y;
}
~~~

泛型参数的默认类型

可以为泛型中的类型参数指定默认类型

~~~ts
function createArray<T = string>(lenth: number, value: T): Array<T> {
    ...
}
~~~

### 声明合并

如果定义了两个相同名字的函数，接口或类，那么它们会合并成一个类型。

### 在Ts中使用ESLint

~~~ts
npm install --save-dev eslint
npm install --save-dev @typescript-eslint/parser
npm install --save-dev @typescript-eslint/eslint-plugin
//在项目根目录下创建一个.eslintrc.js
module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
        'no-var': "error",
        '@typescript-eslint/consistent-type-definitions': [
            "error",
            "interface"
        ]
    }
}
//在package.json中配置eslint命令
"eslint": "eslint src --ext.ts"
~~~

在VSCode中集成ESLint检查

~~~ts
//文件 =》 首选项 =》 设置 =》 工作区
//添加以下配置
"eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript"
],
"typescript.tsdk": "node_modules/typescript/lib"
~~~

开启保存时自动修复功能

~~~ts
{
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",
        "javascript",
        {
            "language": "typescript",
            "autoFix": true
        },
    ],
    "typescript.tsdk": "node_modules/typescript/lib"
}
~~~

### 使用Prettier修复格式错误

~~~ ts
npm install --save-dev prettier
//在项目的根目录下创建一个prettier.config.js文件
//参考：
// prettier.config.js or .prettierrc.js
module.exports = {
    // 一行最多 100 字符
    printWidth: 100,
    // 使用 4 个空格缩进
    tabWidth: 4,
    // 不使用缩进符，而使用空格
    useTabs: false,
    // 行尾需要有分号
    semi: true,
    // 使用单引号
    singleQuote: true,
    // 对象的 key 仅在必要时用引号
    quoteProps: 'as-needed',
    // jsx 不使用单引号，而使用双引号
    jsxSingleQuote: false,
    // 末尾不需要逗号
    trailingComma: 'none',
    // 大括号内的首尾需要空格
    bracketSpacing: true,
    // jsx 标签的反尖括号需要换行
    jsxBracketSameLine: false,
    // 箭头函数，只有一个参数的时候，也需要括号
    arrowParens: 'always',
    // 每个文件格式化的范围是文件的全部内容
    rangeStart: 0,
    rangeEnd: Infinity,
    // 不需要写文件开头的 @prettier
    requirePragma: false,
    // 不需要自动在文件开头插入 @prettier
    insertPragma: false,
    // 使用默认的折行标准
    proseWrap: 'preserve',
    // 根据显示样式决定 html 要不要折行
    htmlWhitespaceSensitivity: 'css',
    // 换行符使用 lf
    endOfLine: 'lf'
};
~~~









