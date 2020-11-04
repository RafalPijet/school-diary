var OFF = 0, WARN = 1, ERROR = 2;

module.exports = {
    "env": {
        "node": true,
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "parserOptions": {
        "ecmaVersion": 12
    },
    "rules": {
        "semi": ["error", "always"],
        // Variables
        "init-declarations": [ ERROR, "always" ],
        "no-catch-shadow": WARN,
        "no-delete-var": ERROR,
        "no-label-var": ERROR,
        "no-shadow-restricted-names": ERROR,
        "no-shadow": WARN,
        // We require all vars to be initialized (see init-declarations)
        // If we NEED a var to be initialized to undefined, it needs to be explicit
        "no-undef-init": OFF,
        "no-undef": ERROR,
        "no-undefined": OFF,
        "no-unused-vars": WARN,
        // Disallow hoisting - let & const don't allow hoisting anyhow
        "no-use-before-define": ERROR,
        "callback-return": [ WARN, [ "callback", "next" ]],
        "global-require": ERROR,
        "handle-callback-err": WARN,
        "no-mixed-requires": WARN,
        "no-new-require": ERROR,
        // Use path.concat instead
        "no-path-concat": ERROR,
        "no-process-exit": ERROR,
        "no-restricted-modules": OFF,
        "no-sync": WARN,
    }
};
