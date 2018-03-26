const conf = require ('./../vibe.config.json')
const fs = require('fs-extra')

fs.copy('./src/assets/icons', './src/tmp/icons')
  .then(() => {
    if (conf.extensions.icon) {
      fs.readdir(conf.extensions.icon, (err, files) => {
        files.forEach(file => {
          fs.copy(conf.extensions.icon + "/" + file, './src/tmp/icons/' + file, { overwrite: true})
            .catch(err => console.log(err))
        });
      })
    }
  })
  .catch(err => console.error(err))
 