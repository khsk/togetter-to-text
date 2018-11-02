const puppeteer = require('puppeteer')
const url = require('url')
const path = require('path')

class Scrapper {
    init() {
        this.id = null
        this.page = null
        this.title = null
        // 各tweetを整形した配列。出力時にJOINしてtextにする
        this.tweets = []
        if (this.browser) {
            this.browser.close()
        }
        this.browser = null
    }

    async getText(id) {
        this.init()
        this.id = id
        await this.initBrowser()
        return await this.scraping()
    }

    async initBrowser() {
        // 表示しながらよりheadlessのほうが異常に遅かったので不要なリクエストのabortを追加で改善

        this.browser = await puppeteer.launch({ headless: true, })
        this.page = await this.browser.newPage()
        await this.page.setDefaultNavigationTimeout(60 * 5 * 1000)
        // 不要なリクエストは中断して読み込みを高速化する https://qiita.com/unhurried/items/56ea099c895fa437b56e
        await this.page.setRequestInterception(true)
        this.page.on('request', interceptedRequest => {
            const reqUrl = url.parse(interceptedRequest.url())
            const reqExt = path.extname(reqUrl.pathname)
            const reqHost = reqUrl.hostname

            if (RegExp('\.(css|png|jpe?g|gif)', 'i').test(reqExt)) {
                interceptedRequest.abort()
            } else if (reqHost.endsWith('togetter.com') || reqHost.endsWith('ajax.googleapis.com')) {
                // 続きを読むはJSでDOM構築なのでjQueryのCDNを許可する
                // console.log(interceptedRequest.url())
                interceptedRequest.continue()
            } else {
                interceptedRequest.abort()
            }
        })
    }

    async scraping() {
        const URL = this.getTogetterURL()
        await this.page.goto(URL)

        this.title =  await this.page.$eval('a.info_title', a => a.textContent)
        do {
            await this.loadMoreTweet()
            this.tweets = this.tweets.concat(await this.getTweet())
        } while (await this.gotoNextPage())
        return this.title + '\n\n' + this.tweets.join('\n\n')
    }

    getTogetterURL() {
        return 'https://togetter.com/li/' + this.id
    }

    async loadMoreTweet() {
        const moreTweetId = '#more_tweet_btn'
        if (await this.page.$(moreTweetId)) {
            await Promise.all([this.page.waitFor((moreTweetId) => !document.querySelector(moreTweetId), moreTweetId), this.page.click(moreTweetId),])
        }
    }

    async getTweet() {
        // コメント欄(も同名クラス)は要らないので親(祖先)指定で絞っておく
        const tweet = await this.page.$$eval('.tweet_box .list_tweet_box', list => {
            return list.map(tweet => {
                const q = (s) => {
                    return tweet.querySelector(s).textContent
                }
                // 表示名 ID 投稿日時 \n 内容 の形式にする。parentのtextContentでは余計な空白が多くなるので一つずつ取得する (投稿日時やアカウントは忍殺において実際重要なので外さない 9割不要なんですがピンクいのとか3/11がですね)
                return q('strong') + ' ' + q('span') + ' ' + q('.status_right').trim() + '\n' + q('.tweet')
            })
        })
        return tweet
    }

    async gotoNextPage() {
        const selector = '.pagenation > a:last-child'
        // evalは存在しないとErrorになるので$で事前にnullチェックする
        if (!await this.page.$(selector)) {
            return false
        }
        if (await this.page.$eval(selector, a => a.textContent !== '次へ')) {
            return false
        }
        return Promise.all([
            this.page.click(selector),
            this.page.waitForNavigation(),
        ])
    }
}

module.exports = { Scrapper }
