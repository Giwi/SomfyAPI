module.exports = {
    apps: [
        {
            name: "SomfyAPI",
            script: "./dist/src/index.js",
            instances: 1,
            watch: false,
            exec_mode: "cluster",
            env: {
                "ENV": "prod"
            }
        }
    ]
}