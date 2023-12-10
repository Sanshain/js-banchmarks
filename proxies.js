//@ts-check
const { performance } = require('perf_hooks');


function createObj() {
    const obj = {};
    for (var i = 0; i < 100000; i++) {
        obj[i + 1] = i + 1;
    }
    return obj;
}

function createProxy() {
    const proxy = new Proxy({}, {
        set(target, prop, value) {
            target[prop] = value;
            return true;
        },
    });
    for (var i = 0; i < 100000; i++) {
        proxy[i + 1] = i + 1;
    }
    return proxy;
}


function readProps(proxy) {
    let s = 0
    for (var i = 0; i < 100000; i++) {
        if (proxy[i]) s++
    }
    return s;
}


/**
 * @param {Function} func
 * @param {any[]} args
 */
function test(func, args, iter=1, comment = '') {
    
    let s = performance.now()
    
    const r = func(...args)

    console.log(performance.now() - s, `ms (${func.name})`, comment)

    return r;
}



let obj = test(createObj, [])
let proxy = test(createProxy, [])
test(readProps, [obj])
test(readProps, [proxy], 1, 'proxy')

console.log('...WARMING UP:');

for (let i = 0; i < 10; i++) {
    createProxy()
    createObj();

    readProps(obj)
    readProps(proxy)
}

test(createObj, [])
test(createProxy, [])
test(readProps, [obj])
test(readProps, [proxy], 1, 'proxy')