const Scrapper = require('./scrapper').Scrapper
const scrapper = new Scrapper()

const fs = require('fs')

;(async () => {
    try {
        console.time('timer')
        scrapper.init()
        const text = await  scrapper.getText(367799) // 主に取りたいまとめの一例
        //const text = await  scrapper.getText(123456) // 続きを読むは存在するが、次ページがなくページャーが存在しない例
        //const text = await  scrapper.getText(123457) // 削除されたまとめの例
        console.log(text)
        fs.writeFileSync('log.txt', text)

        scrapper.init()
        console.timeEnd('timer')
    } catch (e) {
        console.log(e)
        //console.log(await scrapper.page.content())
        scrapper.init()
    }
})()