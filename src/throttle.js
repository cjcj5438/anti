// 限制回调函数的执行频率
/**
 * 节流函数的执行。特别适用于速率限制
 * 在诸如调整大小和滚动等事件上执行处理程序。
 *
 * @param  {Number}    delay            毫秒为零或更大的延迟。对于事件回调，大约100或250(甚至更高)的值是最有用的。
 * @param  {Boolean}   [noTrailing]     可选，默认为false。如果notracking为真，则callback将仅在
 *                                      正在调用节流函数。如果notracking为false或未指定，则最后一次执行回调
 *                                      在最后一次节流函数调用之后。(在没有为“延迟”毫秒调用节流函数之后，
 *                                      内部计数器复位)
 * @param  {Function}  callback         延迟毫秒后执行的函数。“this”上下文和所有参数都按原样传递，
 *                                      在执行节流函数时回调。
 * @param  {Boolean}   [debounceMode]   如果“debounceMode”(开始时)为真，则在“delay”之后安排“clear”执行;如果“debounceMode”(结束时)为假，
 *                                      安排“回调”在“延迟”ms后执行。
 *
 * @return {Function}                   一个新的、节流的函数。
 */
export default function ( delay, noTrailing, callback, debounceMode ) {

    /*
     * After wrapper has stopped being called, this timeout ensures that
     * 回调函数函数会在节流之前执行
     * 防抖模式.
     */
    var timeoutID;
    var cancelled = false;

    // Keep track of the last time `callback` was executed.
    var lastExec = 0;

    // Function to clear existing timeout
    function clearExistingTimeout () {
        if ( timeoutID ) {
            clearTimeout(timeoutID);
        }
    }

    // Function to cancel next exec
    function cancel () {
        clearExistingTimeout();
        cancelled = true;
    }


    // `noTrailing` defaults to falsy.
    if ( typeof noTrailing !== 'boolean' ) {
        debounceMode = callback;
        callback = noTrailing;
        noTrailing = undefined;
    }

    /*
     * The `wrapper` function encapsulates all of the throttling / debouncing
     * functionality and when executed will limit the rate at which `callback`
     * is executed.
     */
    function wrapper () {

        var self = this;
        var elapsed = Date.now() - lastExec;
        var args = arguments;

        if (cancelled) {
            return;
        }

        // Execute `callback` and update the `lastExec` timestamp.
        function exec () {
            lastExec = Date.now();
            callback.apply(self, args);
        }

        /*
         * If `debounceMode` is true (at begin) this is used to clear the flag
         * to allow future `callback` executions.
         */
        function clear () {
            timeoutID = undefined;
        }

        if ( debounceMode && !timeoutID ) {
            /*
             * Since `wrapper` is being called for the first time and
             * `debounceMode` is true (at begin), execute `callback`.
             */
            exec();
        }

        clearExistingTimeout();

        if ( debounceMode === undefined && elapsed > delay ) {
            /*
             * In throttle mode, if `delay` time has been exceeded, execute
             * `callback`.
             */
            exec();

        } else if ( noTrailing !== true ) {
            /*
             * In trailing throttle mode, since `delay` time has not been
             * exceeded, schedule `callback` to execute `delay` ms after most
             * recent execution.
             *
             * If `debounceMode` is true (at begin), schedule `clear` to execute
             * after `delay` ms.
             *
             * If `debounceMode` is false (at end), schedule `callback` to
             * execute after `delay` ms.
             */
            timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
        }

    }

    wrapper.cancel = cancel;

    // Return the wrapper function.
    return wrapper;

}
