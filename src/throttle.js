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
     * 在停止调用包装器之后，此超时将确保回调函数函数会在节流之前执行doboules模式.
     */
    var timeoutID;
    var cancelled = false;

    // 跟踪上一次执行“回调”的时间。
    var lastExec = 0;

    // 函数清除现有超时
    function clearExistingTimeout () {
        if ( timeoutID ) {
            clearTimeout(timeoutID);
        }
    }

    // 函数取消下一个执行
    function cancel () {
        clearExistingTimeout();
        cancelled = true;
    }


    // noTrailing默认false.
    if ( typeof noTrailing !== 'boolean' ) {
        debounceMode = callback;
        callback = noTrailing;
        noTrailing = undefined;
    }

    /*
     * 功能和执行时间将限制“回调”的执行速度。
     */
    function wrapper () {

        var self = this;
        var elapsed = Date.now() - lastExec;
        var args = arguments;

        if (cancelled) {
            return;
        }

        // 执行“回调”并更新“lastExec”时间戳。
        function exec () {
            lastExec = Date.now();
            callback.apply(self, args);
        }

        /*
         * 如果“debounceMode”为真(在开始时)，则用于清除标志，以允许将来执行“回调”。 */
        function clear () {
            timeoutID = undefined;
        }

        if ( debounceMode && !timeoutID ) {
            // 因为' wrapper '是第一次被调用，' debounceMode '是true(在begin)，所以执行' callback '。
            exec();
        }

        clearExistingTimeout();

        if ( debounceMode === undefined && elapsed > delay ) {
            /*
             * 在节流模式下，如果超过“延迟”时间，则执行“回调”。
             */
            exec();

        } else if ( noTrailing !== true ) {
            /*
             * 在throttle模式下，由于没有超过“延迟”时间，在最近一次执行后，安排“回调”来执行“延迟”ms。
             *
             * 如果“debounceMode”是正确的(在开始时)，那么在“delay”ms.之后安排“clear”执行。
             *
             * 如果“debounceMode”是假的(在末尾)，计划“callback”在“delay”ms之后执行。
             */
            timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
        }

    }

    wrapper.cancel = cancel;

    // Return the wrapper function.
    return wrapper;

}
