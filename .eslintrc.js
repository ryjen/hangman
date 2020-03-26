module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "react-native/react-native": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:react/recommended",
        "plugin:flowtype/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "parser": "babel-eslint",
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "settings": {
        "import/resolver": {
            "babel-module": {}
        },
        "react": {
            "version": "detect",
            "flowVersion": "0.92.0"
        }
    },
    "plugins": [
        "react",
        "react-native",
        "import",
        "module-resolver",
        "flowtype"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "never"
        ],
        "react-native/no-unused-styles": 2,
        "react-native/no-inline-styles": 2,
        "react-native/no-single-element-style-arrays": 2,
        "react-native/split-platform-components": 2,
        "import/no-unresolved": 2,
        "import/named": 2,
        "import/namespace": 2,
        "import/default": 2,
        "import/export": 2,
        "module-resolver/use-alias": 2,
        "flowtype/no-types-missing-file-annotation": 0
    }
}
