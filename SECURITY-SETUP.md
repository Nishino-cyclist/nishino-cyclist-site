# YouTube APIキーの更新と公開手順

修正前は `src/data/youtubeApi.js` にGoogle APIキーが直接記載され、ブラウザーへ配信されていました。修正ではVercel Function (`api/youtube.js`) に処理を移し、サーバー環境変数 `YOUTUBE_API_KEY` のみを利用します。

## 本番反映

1. Google Cloud Consoleで対象プロジェクトの「APIとサービス → 認証情報」を開く。公開された古いキーは漏洩済みとして扱い、無効化・削除する。他のサービスでも使用している場合は、それらも新しいキーへ移行する。
2. 新しいAPIキーを作成し、APIの制限を **YouTube Data API v3** のみに設定する。ブラウザーのHTTPリファラー制限はサーバーからの呼び出しには適さない。固定送信元IPを用意できる環境ではIP制限も検討する。
3. Vercelの対象プロジェクトの **Settings → Environment Variables** に `YOUTUBE_API_KEY` を追加し、新しいキーを設定する。Productionおよび必要なPreview環境へ適用する。キーをチャットやGitHubへ貼り付けない。
4. 旧 `VITE_YOUTUBE_API_KEY` が登録されていれば削除する。`VITE_` 付きの変数はブラウザーへ公開されるため、秘密情報には使用しない。
5. 修正コードをGitHubに反映し、Vercelを再デプロイする。環境変数の変更だけでは既存のデプロイは更新されない。
6. `/api/youtube?kind=latest` と `/api/youtube?kind=playlist` が動画JSONを返し、トップページの動画が表示されることを確認する。ブラウザーの通信にGoogle APIキーが含まれないことも確認する。

キー未設定・APIエラー時は既存の固定動画データを表示します。古いキーはGit履歴や過去のデプロイに残るため、コード削除だけで対応完了にはなりません。履歴書き換えは実施していません。

## ローカル検証

Node.js 22.12以降（または対応する新しいLTS）を使用します。

```sh
npm ci
npm run build
npm run lint
node --test tests/youtube.test.mjs
```

`npm run dev` はViteの画面のみを起動し、APIは動作しないため固定動画が表示されます。サーバー連携の確認にはVercel Preview、またはVercel CLIの `vercel dev` とローカルの `.env.local` を使用します。

APIはこのサイトのチャンネル・プレイリストから4件取得する用途に限定し、成功結果を1時間キャッシュします。キャッシュは利用枠の消費を抑えますが、公開APIの濫用を完全に防ぐものではありません。Google Cloudの利用枠と使用状況を確認してください。

参考: https://vite.dev/guide/env-and-mode 、https://vercel.com/docs/functions/runtimes/node-js 、https://docs.cloud.google.com/docs/authentication/api-keys-best-practices
