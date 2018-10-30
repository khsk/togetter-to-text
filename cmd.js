const Scrapper = require('./scrapper').Scrapper
const scrapper = new Scrapper()

const fs = require('fs')


const argv = process.argv

if (argv.length < 2) {
    console.info('取得するtogetterのアイテムidを引数にしてください')
}


;(async () => {
    try {
        for (let i = 2; i < argv.length; i++) {

            if (!RegExp('\\d+').test(argv[i])) {
                console.error('引数は整数値で入力してください : ' + argv[i])
            }

            scrapper.init()
            console.log(argv[i] + 'を取得中…')
            const text = await  scrapper.getText(argv[i])
            console.log(scrapper.title + '.txt へ出力します')
            fs.writeFileSync(scrapper.title + '.txt', text)
        }
    } catch (e) {
        console.error(e)
    } finally {
        scrapper.init()
    }
})()