module.exports = {
    presets: [
        "module:metro-react-native-babel-preset",
        "@babel/preset-flow"
    ],
    plugins: [
        ["module-resolver", {
            root: ["./src/"],
            alias: {
                components: "./src/app/components",
                types: "./types",
                actions: "./src/app/actions"
            },
        }]
    ]
}
