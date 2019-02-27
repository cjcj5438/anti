/* eslint-disable no-undefined */

import throttle from './throttle';

/**
 取消函数的执行。消除抖动,不像节流,保证一个函数只被执行一次，在开头或者是结尾
 *
 * @param  {Number}   delay         延迟时间
 * @param  {Boolean}  [atBegin]     可选，默认为false。如果atBegin为false或未指定，则回调将仅在最后一次debounced-function调用之后的毫秒内执行“delay”。如果atBegin为真，回调将仅在第一次debounced-function调用时执行。(在“延迟”毫秒未调用节流函数之后，将重置内部计数器)。
 * @param  {Function} callback      延迟毫秒后执行的函数。当执行debounced函数时，“this”上下文和所有参数按原样传递给“callback”。
 * @return {Function}               返回 debounced function.
 */
export default function ( delay, atBegin, callback ) {
    return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
}