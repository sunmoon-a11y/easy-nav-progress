module.exports = {
  rollup(config, options) {
    config.output.sourcemap = false
    config.output.minify = false
    return config
  }
}
