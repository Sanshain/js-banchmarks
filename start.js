const { spawnSync, execSync } = require('child_process');
const fs = require('fs');


fs.readdirSync('./benchmarks').forEach(file => {


    console.log('\n\x1b[4m\x1b[34m' + file + ':\x1b[0m')

    let r = execSync(`node "./benchmarks/${file}"`)

    // let r = spawnSync('node', ['./benchmarks/arrays intersect.js']).output.toString()

    console.log(r.toString());
})

