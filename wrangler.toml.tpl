name = "ppm-worker-dev"
type = "webpack"
account_id = ""
zone_id = ""
workers_dev = true
webpack_config = "webpack.config.dev.js"

kv_namespaces = [
 { binding = "PPMConfigKV", id = "", preview_id = ""},
 { binding = "PPMStorageKV", id = "", preview_id = ""}
]

[dev]
ip = "0.0.0.0"
port = 9191
local_protocol="http"
upstream_protocol="https"

[env.production]
name = "cfwt-prod"
webpack_config = "webpack.config.js"
kv_namespaces = [
 { binding = "PPMConfigKV", id = "" },
 { binding = "PPMStorageKV", id = "" }
]
