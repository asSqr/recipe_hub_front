## ローカルでの実行方法
```bash
git clone https://github.com/asSqr/recipe_hub_front.git
cd recipe_hub_front
yarn install
yarn dev
```
Hot Reload といって，この状態のまま VSCode 等でコードをいじると自動で反映されます．

## URL パス・ページ間のつながり・叩いている API 等
![フロー図](https://imgur.com/kDwjfHI.jpg)

左の灰色のボックスがページを表しています．オレンジはリンクの貼られたテキスト・ボタンを示しており，クリックすると矢印のように遷移します．

(index) や (recipes) のようなものは，https://recipe-hub-front.vercel.app/ の末尾につくパスです．ただ一点注意が必要なのは，各レシピページで，`https://recipe-hub-front.vercel.app/recipe/{id}` となります．この id は DB 上でふられている id に対応しており，各テーブルの各レコードに同様にユニークな id があります．

赤い矢印は叩いている API を表します．API を叩く関数群は `utils/api_request.js` に定義されています．

https://recipe-hub-back.herokuapp.com/swagger/ にバックエンドの API 情報があるのですが，これを見ながら関数を追加してみましょう．

試しに `https://recipe-hub-back.herokuapp.com/admin/v1/mrepository` の `GET` メソッドに注目します．

![mrepository](https://imgur.com/9ZbXRNX.jpg)

swagger 上では API を試しに叩くこともできて Try it out → Execute で実行できます．レスポンスとしてどのような形態で帰ってくるか確認しましょう：

![mrepository_resp](https://imgur.com/GVXnf96.jpg)

さて，`utils/api_request.js` に以下を追加しましょう．

```js
export const fetchRecipes = async () => {
  return axios.get(`${apiUrl}admin/v1/mrepository/`);
}
```

`apiUrl` は，
```js
export const apiUrl = 'https://recipe-hub-back.herokuapp.com/';
```
です．

`GET` メソッドなので `axios.get` となります．あとは使いそうなところで `POST`, `PATCH`, `DELETE` であり，それぞれ 作成，部分更新，削除と思っていただければ良いです．(特に `PATCH` は変更するフィールドだけポストすればそこだけ変えてくれます) ポストする系の API は swagger でポストするリクエストパラメーターを別途指定します．

![mrepository_post](https://imgur.com/wzYbaBe.jpg)

`email` には有効なメールアドレス (例えば `test@gmail.com` など) を入れないとエラーになります．

テーブル操作系は `admin/v1/` 以下，その他カスタムな API 系は `api/v1/` 以下としています．

また，重要な注意点として，**末尾の / 有無等は swagger の表記を正確に守ってください．でないとエラーになります．**

一番右の灰色のボックスは DB のテーブルを表します．`MRepository` や `MUser` がテーブル名で，`id_fork_from` とかしたに箇条書きになっているのがカラムです．以下に説明を書きます．

# MRepository
- id: id
- id_fork_from: フォーク元のレポジトリの id (null ならフォーク元なし)
- name: 料理名
- title: レシピ名
- recipe: レシピ本体 (これは文字列としているが，どう保つかは検討)
- genre: ジャンル
- thumbnail: サムネイル画像 (input file で入力)
- id_author: 作ったユーザーの id
- create_date: 作成日時
- update_date: 更新日時

# MUser (今は機能していない)
- id: id
- name: ユーザー名
- pass: パスワード
- email: メールアドレス
- create_date: 作成日時
- update_date: 更新日時

最新情報は swagger の末尾にあります．

![model](https://imgur.com/HINWwr9.jpg)

## Fork について
fork する時は，`api/v1/fork` に以下を `POST` してください．よしなにやってくれます．

```js
{
  id_user: "フォークするユーザーの id (仮．今は機能していないのでどんな文字列でも良い)",
  id_repo: "フォーク元のレポジトリ id",
  name: "料理名",
  title: "レシピタイトル",
  recipe: "レシピ内容",
  genre: "ジャンル",
  thumbnail: "サムネイル画像"
}
```

あるレポジトリに関する Fork Tree を取得するには `api/v1/fork-tree/{id}` を `GET` すればよく，レスポンスは例えば以下のようになる：

```js
{
  "id": "6515e02c-d456-40b0-9ad7-1f6d4b481cb0",
  "title": "ラーメン",
  "name": "ラーメン",
  "recipe": "豚骨",
  "genre": "ラーメン",
  "next": [
    {
      "id": "2701b114-57c4-4ada-bcda-8a7993bcb9f7",
      "title": "醤油ラーメン",
      "name": "醤油ラーメン",
      "recipe": "醤油の方がうまい",
      "genre": "醤油ラーメン",
      "next": []
    },
    {
      "id": "fdc4a390-5411-478b-b5bc-1100ac6823db",
      "title": "醤油ラーメン2",
      "name": "醤油ラーメン",
      "recipe": "これの方がさらうまい",
      "genre": "醤油ラーメン",
      "next": [
        {
          "id": "c3ca37c5-9f46-4916-a70a-381d87dd2f81",
          "title": "ラーメン 〜匠の味〜",
          "name": "ラーメン",
          "recipe": "ラーメンの決定版",
          "genre": "ラーメン",
          "next": []
        }
      ]
    }
  ]
}
```

これが表す木を図示すると以下のようになる：

![fork-tree](https://imgur.com/43UEjPR.jpg)

`next` プロパティに子オブジェクトのリスト (木上の隣接する子孫) が来る．難しくいうと，以下のように再帰的に定義される．

```ts
type Tree = {
  id: string,
  title: string,
  name: string,
  recipe: string,
  genre: string,
  next: [Tree]
}
```

`next` が空リストなら葉 (子孫がない末端) であることを示す．親を遡り根を見つける → 再帰的に木を構築 としているので，この木上のどのレポジトリ id で `api/v1/fork-tree` に投げても同じものが帰ってくる．

## ページを編集するには
Next.js ではファイルシステムによるパス指定を行うので，`pages/` 以下の URL のパスに対応した位置にある js ファイルにページの定義があります．例えば，`/create` であれば `pages/create.js` に定義があります．デザイン等は `styles/` 以下の css を参照していたり，`_document.js` に直書きしたりしていますが，tailwind-css や chakura-ui 等を用いるのも手だと思います．

## その他 Next.js 情報
React はコンポーネントとしてページの部品を独立に切り出して定義してそれを組み合わせるように作ります．今回は，レシピに対応するカードだけをコンポーネントとして切り出していて，`components/RecipeItem.js` に定義があります．

また，どのページでも共通して参照するものとして，`_app.js` と `_document.js` があります．特に `_document.js` に共通する部分 (meta タグやスタイルなど) を書いています．

## デフォルトの文章

以下は Next.js がデフォルトで吐き出す説明です．

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
