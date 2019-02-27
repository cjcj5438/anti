# anti-fugle
当用户在重复输入点击，高频率输入文本，滚轮事件，页面窗口频繁改变大小时。 限制函数的执行频率
# install
```
npm install anti-fugle --save
```
## throttle
（保证多少ms内只执行一次）

### USE
```js
import { throttle } from 'anti-fugle';
throttle(delay, noTrailing, callback, debounceMode)
```

### OPTIONS
- delay 延迟的时间
- noTrailing 在最后一次调用时是否执行 callback，true 不执行，false 执行
- callback 目标回调函数
- debounceMode 为 true 时，在被调用时，先执行 callback，在没有被调用时，在指定的延迟之后执行 clear，如果在clear 执行之前继续调用，会重置定时器；为 false 时，在被调用时，不会执行 callback，在指定的延迟之后执行 callback，如果在 callback 执行之前继续调用，会重置定时器

## debounce
（保证多少ms内不再被触发时就会执行一次）
但是不同于 throttle 的是，debounce 能保证在一系列调用的时间内，回调函数只执行一次

### USE
```javascript
import { debounce } from 'anti-fugle';
debounce(delay, atBegin, callback)
```


### OPTIONS
- delay 延迟的时间
- atBegin  为 true 时，在被调用时，会马上执行 callback，如果在延迟时间之前继续调用，不会执行 callback；为 false 时，在被调用时，不会执行 callback，在延迟时间之后会执行 callback，如果在延迟时间之前继续调用，会重置定时器
- callback 目标回调函数