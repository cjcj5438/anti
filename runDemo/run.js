import { throttle, debounce } from '../index';

$("#jl").click(function(){
    debounce(3000, false,() => {
        console.log(111)
    })();
    // throttle(300, false,() => {
    //     console.log(11221)
    // })();
});