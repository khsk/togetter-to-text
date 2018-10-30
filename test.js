const Scrapper = require('./scrapper').Scrapper
const scrapper = new Scrapper()

const fs = require('fs')

;(async () => {
    try {
        console.time('timer')
        scrapper.init()
        const text = await  scrapper.getText(367799)

        console.log(text)
        fs.writeFileSync('log.txt', text)

        scrapper.init()
        console.timeEnd('timer')
    } catch (e) {
        console.log(e)
        scrapper.init()
    }
})()