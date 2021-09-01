
'use strict';

module.exports = {
    "diff": true,
    "extension": ["js"],
    "package": "./package.json",
    "file": ["./test/app.spec.js"],
    "recursive": true,
    "watch-files": ["./test/**/*.spec.ts"],
    "slow": 75,
    "exit": true,
    "timeout": 2000,
    "ui": "bdd",
    "watch-ignore": ["./test/health/"],
};


