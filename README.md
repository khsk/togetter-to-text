# togetter-to-text
TogetterをPuppeteerでスクレイピングする

![tttweb](https://user-images.githubusercontent.com/10125386/48048132-c8578100-e1dd-11e8-869c-cba415486907.gif)
![ttt](https://user-images.githubusercontent.com/10125386/48048125-c392cd00-e1dd-11e8-8ffa-6ff076e4d4bd.gif)

# 何ができますか？
TogetetrのまとめからTweet部分だけをrawtextにして出力します。  
個人利用の範囲でお楽しみください。

# 何のために作られましたか？
[ニンジャスレイヤー Wiki*](https://wikiwiki.jp/njslyr/)  
で紹介されているエピソードのTogetterを縦書きリーダーで読むためにテキスト化したいです。  
過去には手動のコピペを手助けするUserScriptを書いていましたが、より簡便に取得するためにpuppeteerを使った自動化を目指しました。

# TogetterのIDについて

取得するまとめは  
`https://togetter.com/li/\d+`  
の`\d+`部分を指定します。

# Install方法

GitHubから取得してください。

`npm install khsk/togetter-to-text`  
`yarn add khsk/togetter-to-text`

(Puppeteerもインストールされるため、サイズが大きいです)  

# 出力形式

```
まとめタイトル

Tweetアカウント名 @アカウントID 投稿日時
Tweet内容

Tweetアカウント名 @アカウントID 投稿日時
Tweet内容
```

# CLI版の使い方

`node ./node_modules/togetter-to-text/cmd.js 123 456 [...args]`

引数で渡されたIDを順番に取得し、`各まとめタイトル.txt`として出力します。

# Webアプリケーション版の使い方

CLIは煩わしいという場合のために、Nuxtで構成されたWebアプリケーションを用意しました。  
`express.js`を実行すると、`localhost:3000`にサーバーが建ちます。  
`input`にIDを入力すると、`<pre>`として結果が出力されます。  
その状態から、クリップボードへのコピーとtxtファイルとしてダウンロードが選択できます。

# nowデプロイ方法

使いたいPCにnode環境がない場合を想定し、nowにデプロイしWebアプリケーション版を公開する方法を用意しました。  
`now.json`の`alias`を設定したいURLに変更し、`now --pubic`相当のデプロイを行ってください。

# 使用技術

* Puppeteer
* Nuxt.js
* Bulma
* Axios
* Express
