### 格式化输出

``` rust
print!
println!
eprint!
eprintln!
```

debug（适用于所有类型或自定义类型）

``` rust
#[derive(Debug)]
struct A_struct {}
println("{:?}", A_struct instance);
```

自定义输出

``` rust
use std::fmt;
struct A_struct {
    x: u32,
    y: u32
}
impl fmt::Display for A_struct {
    fn fmt(&self, f: &mut fmt::Formatter) => fmt::Result {
        write!(f, "({}, {})", self.x, self.y);
    }
}
```

``` rust
struct List {
    vec: Vec<i32>
}

impl List {
    fn new(vec: Vec<i32>) -> List {
        List {
            vec
        }
    }
}

impl fmt::Display for List {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "[")?;
        let vec = &self.vec;
        for (count, v) in vec.iter().enumerate() {
            if count != 0 { write!(f, ",")?; }
            write!(f, "{}", v)?;
        }
        write!(f, "]")
    }
}
```

闭包

``` rust
Fn: 表示捕获方式为通过引用（&T）的闭包
FnMut: 表示捕获方式为通过可变引用（&mut T）的闭包
FnOnce：表示捕获方式为通过值（T）的闭包
```

