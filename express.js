const express = require('express')
const { Nuxt, Builder } = require('nuxt')

// Create express instnace
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())


const config = require('./nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')
const nuxt = new Nuxt(config)

if (config.dev) {
    const builder = new Builder(nuxt)
    builder.build()
}

const Scrapper = require('./scrapper').Scrapper
const scrapper = new Scrapper()

const getBody = async id => {
    try {
        if (!RegExp('\\d+').test(id)) {
            return '引数は整数値で入力してください : ' + id
        }
        scrapper.init()
        const text = await  scrapper.getText(id)
        console.log(text)
        return text
    } catch (e) {
        console.error(e)
        return e.toString()
    } finally {
        scrapper.init()
    }
}


app.post('/api',  async (req, res) => {
    console.log(req.body.id)
    res.send(await getBody(req.body.id))
})

// 後ろに持ってこないとexpressのルーティングが効かない？
app.use(nuxt.render)

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
  });