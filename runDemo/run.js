// import { throttle, debounce ,text} from '../index';
//
// $("#jl").click(function(){
//     debounce(3000, false,() => {
//         console.log(111)
//     })();
//     // throttle(300, false,() => {
//     //     console.log(11221)
//     // })();
// });

import { throttle, debounce } from 'anti-fugle';
$("#jl").click(function(){
    debounce(3000, false,() => {
        console.log(111)
    })();
    // throttle(300, false,() => {
    //     console.log(11221)
    // })();
});
