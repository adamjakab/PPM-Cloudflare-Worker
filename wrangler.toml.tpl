name = "ppm-worker-dev"
type = "webpack"
account_id = ""
zone_id = ""
workers_dev = true
webpack_config = "webpack.development.js"

[dev]
ip = "0.0.0.0"
port = 9191
local_protocol="http"
upstream_protocol="https"

[env.production]
name = "cfwt-prod"
webpack_config = "webpack.config.js"
