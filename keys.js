//@ts-check
const { performance } = require('perf_hooks');


function createObj() {
    const obj = {};
    for (var i = 0; i < 1000000; i++) {
        obj[i + 1] = i + 1;
    }
    return obj;
}


function getkeys(obj) {
    return Object.keys(obj)
}


function createArr() {
    const arr = [];
    for (var i = 0; i < 1000000; i++) {
        arr[i] = i;
    }
    return arr;
}


/**
 * @param {Function} func
 * @param {any[]} args
 */
function test(func, args, iter=1) {
    
    let s = performance.now()
    
    const r = func(...args)

    console.log(performance.now() - s, `ms (${func.name})`)

    return r;
}


const obj = test(createObj, [])
test(getkeys, [obj])
test(createArr, [])

