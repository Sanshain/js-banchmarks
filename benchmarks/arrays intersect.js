//@ts-check
const { performance } = require('perf_hooks');



function _createArr() {
    const arr = [];
    for (var i = 0; i < 10000; i++) {
        arr[i] = i;
    }
    return arr;
}

function _createArr2() {
    const arr = [];
    for (var i = 5000; i < 10000; i++) {
        arr[i] = i;
    }
    return arr;
}


/**
 * @param {Function} func
 * @param {any[]} args
 */
function test$(func, args, iter=1) {
    
    let s = performance.now()
    
    const r = func(...args)

    console.log(performance.now() - s, `ms (${func.name})`)

    return r;
}

/**
 * @param {any[]} arr
 * @param {any[]} arr2
 */
function exclude(arr, arr2) {
    return arr.filter(item => !arr2.includes(item))
}

function excludeSet(arr, arr2) {
    const set = new Set(arr2);
    return arr.filter(item => !set.has(item))
}

const [arr, arr2] = [_createArr(), _createArr2()];

test$(exclude, [arr, arr2])
test$(excludeSet, [arr, arr2])

