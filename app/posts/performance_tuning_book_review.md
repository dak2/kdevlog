---
title: '<書評> 達人が教えるWebパフォーマンスチューニング 〜ISUCONから学ぶ高速化の実践'
date: '2022-10-10'
excerpt: 'パフォーマンスチューニングのエッセンスを知りたくて読んだ。キャッシュは用法用量を守って正しくお使いください。'
categories: 'Book'
---

## 概要

発売前から気になっていたこの書籍を読んだので学びをつらつらと書いていく。

自分が業務で担当しているアプリケーションもパフォーマンスがボトルネックとなることがあるので、少しでも何か吸収できれば。

## 1章: チューニングの基礎知識

本書ではリクエストレスポンス一連の動作が完了するまでの時間（RTT: Round Trip
Time）が短いWebサービスを高速なWebサービスと定義している。

Webサービスのキャパシティは単純化すると個々の性能×数になり、それを調整するアプローチは**垂直スケーリング（スケールアップ:
性能UP）**か**水平スケーリング(スケールアウト: 数増やす)**の2種類がある。

パフォーマンスチューニングの基本は下記2点

- ボトルネックだけにアプローチする
- ボトルネックの特定は外側から順番に
  - 2021年の一般的なWebサービスにおいてボトルネックになりがちな箇所はCPU、メモリ、ディスクI/O、ネットワークI/Oとのこと

負荷試験を実施して改善してのサイクルになる。負荷試験と言えるほどちゃんとしたものをやったことが無いな。

## 2章: モニタリング

モニタリングは外形監視と内部監視の2種類がある。

- 外部監視
  - アプリケーションの外側からモニタリングする手法。
  - 外部からリクエストを行って期待通りのレスポンスが返ってくるか確認。
- 内部監視
  - アプリケーション内部からモニタリングする手法。
  - CPU利用率やメモリなどの状態をウォッチ。

本書では[Prometheus](https://prometheus.io/)というPull側のモニタリングツールを使用している。

基本的には内部監視の方が多いんじゃないかなと考える。外部監視だとネットワークの状態に左右されるから再現性が低そう。

## 3章: 基礎的な負荷試験

各種指標をどう見るかが大事。
本書では下記の数値が紹介されており、MySQLのボトルネックになっている箇所を調査していく流れ。
（スロークエリの発見。実行計画を見ていく）

- CPU2コアのうち50%程度が利用されている
- MySQLのプロセス(mysqld) がCPUを100%(1コア)程度利用
- WebアプリケーションのプロセスはCPU1% / Webサーバーのプロセスは0.3%

実務でもスロークエリログがあってCPU使用率が跳ね上がった経験がある。

あのような事象はかなりインシデントにつながるので、普段からパフォーマンスをより意識したい。

## 4章: シナリオを持った負荷試験

この章の内容は自分の勤務先でもやりたい...！

どの画面表示時に遅いのかをシナリオを使って調査して可視化できるのはとても良い。

よりユーザー目線に立ったテコ入れができると感じる。

テスト環境ではデータ量が足りず、どうしてもクライアントのボトルネックに気付けないという問題がある。

ローカルだと開発生産性に影響するのでやりたくないから、それ用の環境を作るとかになるのかな。
コスパとの相談かも

それを事前に検知できる仕組みが欲しい。

書籍だとOSSの[k6](https://k6.io/open-source/)というツールを紹介している。

## 5章: データベースのチューニング

特に印象に残ったのはインデックス周りのこと。二分探索に適した構造であるBツリーについて。

インデックスの走査についてかなり丁寧に説明されていた。

- `Covering Index`
- インデックスを貼る基準として頻繁に使われるカラム。それ以外は「ORDER BY」で並び替えを行うカラムに貼る

### Covering Index について

ref. [https://dev.mysql.com/doc/refman/5.6/ja/glossary.html#glos_covering_index](https://dev.mysql.com/doc/refman/5.6/ja/glossary.html#glos_covering_index)

> クエリーによって取得されたすべてのカラムを含むインデックス。完全なテーブル行を見つけるためのポインタとしてインデックス値を使用する代わりに、クエリーはインデックス構造から値を返し、ディスク I/O
> を節約します。InnoDB セカンダリインデックスには主キーカラムも含まれるので、InnoDB は MyISAM よりも多くのインデックスにこの最適化方法を適用できます。InnoDB
> は、トランザクションが終わるまで、そのトランザクションによって変更されたテーブルに対するクエリーにこの方法を適用できません。正しいクエリーの場合、どのカラムインデックスまたは複合インデックスでも、カバリングインデックスとして機能できます。可能な場合は必ず、この最適化方法を活用するようにインデックスおよびクエリーを設計してください。

usersテーブルのnameカラムにindexが貼ってあるとする。

これだとidがプライマリーインデックス / nameがセカンダリインデックスとなる。

下記のSQLクエリ結果セットで利用しているカラムはidとnameだけなので`Covering Index`が有効になる。（EXPLAIN結果のExtraにUsing
Indexが付与される。）

これにより、テーブルフルスキャンでなくインデックススキャンのみで結果を返すのでパフォーマンスが良くなる。

`SELECT *`の場合は、全てのカラムにインデックスを貼っていないので `Covering Index` は無効となる。

```sql
SELECT id
FROM users
WHERE users.name = 'hoge'
```

## 6章: リバースプロキシの利用

リバースプロキシが必要な理由としてアプリケーション側のHTTPコネクションでは捌ききれないというものがある。

本書では例としてunicornを利用したRubyアプリケーションのマルチプロセス・シングルスレッドを紹介している。

- クライアントからの1リクエストを1プロセスが処理する。
  - そのプロセスは処理を行なっている間に他のリクエストを処理できない。（プロセス数 = 最大リクエスト数）
    - 大量リクエストの場合、パフォーマンスが極端に低下するC10K問題を抱えている（1万リクエストを受け取ると処理が急激に悪化する問題）
      - プロセス切り替え時のコンテキストスイッチが大量発生。新しいプロセス用のキャッシュ切り替え => 処理悪化
      - 異なるプロセス同士では通常メモリ共有ができないためメモリ使用量が多くなる

このように大量のリクエストを捌くのが難しいので、リバースプロキシでクライアントとのHTTPコネクションを解決する。

代表的なものとしてNginxがある。

マルチプロセス・シングルスレッドは同じだがイベント駆動アーキテクチャであるため、1プロセスが複数クライアントのリクエストを処理できる。

ノンブロッキングI/O（他の処理でのファイル読み書きが完了するまで待たない）と多重I/Oを活用し、イベント駆動でリクエスト・レスポンスを大量に捌くことでC10Kを解決している。

業務でもNginxを利用しているがあまり触っていないため色々と忘れがちなので、適宜振り返っていきたいと思う。

## 7章: キャッシュの活用

この章を読んでキャッシュは慎重に利用したいと感じた。

- 古いデータが表示されるリスク
- 想定外データを表示して情報流出のリスク
- キャッシュミドルウェアがシステムの障害点に
- プログラムの実装が複雑になる

本書ではこのような問題があるのでまずはキャッシュを使わない方法を模索してみようと記述されている。

確かに扱い方によってはリスクを孕んでいる。

また、アプリケーションのインメモリで管理するか外部のミドルウェア（Redis等）で管理するかも考慮ポイント。

- キャッシュの生存時間（TTL）
- Thundering herd problem
  - キャッシュ無い状態で大量リクエスト
    - => キャッシュ生成するまで処理が続くかつ大量リクエスト
    - => パフォーマンス悪化

などの問題をちゃんと考慮しないといけないということを認識できた。

## 8章: 抑えておきたい高速化手法

特に印象深かったものだけ

- 同一ホストへのコネクションを使い回す
  - イテレーションで毎回コネクションを作るなどナンセンス。毎度TCPのハンドシェイクが必要になり大量のオーバーヘッドが発生してしまう。確立したコネクションを変数に入れて使い回すなどの対応が必要
- 適切なタイムアウトを設定
  - 常に通信が成功するとは限らないので、ネットワーク障害などに備えて処理時間上限を設けておかないとそこがボトルネックになる。
- HTTPヘッダーを活用してクライアント側にキャッシュさせる
  - 画像ファイルやCSSファイルなどは更新頻度が低く、参照頻度が高いためCache-Controlヘッダーを活用してキャッシュデータを使いまわせるようにする
  - Cache-Controlヘッダーの期限切れの場合にのみリクエストを行うことで、無駄なリクエストを減らせる
- 静的ファイル配信をリバースプロキシから直接配信する
  - RDBMSに画像データを持たずに静的ファイルにしてNginxから配信させると、無駄な処理を省ける（RDBMSの場合大きなデータを読み込むのでMySQLのメモリを圧迫したり、ネットワーク帯域を圧迫するなど）
- CDN上にHTTPレスポンスをキャッシュする
  - キャッシュしたレスポンスを返すことでアプリケーションサーバーへのリクエストを減らせる。
  - クライアントから近いCDNエッジからレスポンスを直接返せるので、高速な処理が実現できる

最近、CDN周り（特にCloudflare Workers）をちゃんと触ってみたい欲がすごい。

## 9章: OSの基本知識とチューニング

割とOS周りが詳しく記述されているがポイントだけ。Linux周りがまだ分からないことだらけなのでもっと学びたい。

- Linux Kernelの基礎知識
  - カーネル空間 / ユーザー空間
    - System Callを発行する側（アプリケーションやブラウザなど）: ユーザー空間
    - System Callを受け取ってハードウェアを制御する側: カーネル空間
  - プロセス
    - ユーザー空間で実行中のプログラム単位（Webサーバー等）
  - init / systemd
    - Linuxにはinitという親プロセスがありその下に子プロセスが紐づく（initの実装は最近systemdが多い）
  - コンテキストスイッチ
    - 複数のプロセスを動作させるため、超高速でプロセスを切り替えることで擬似的に複数プロセスが同時に動作しているように見せる => コンテキストスイッチ
  - ディスクI/O
    - 逐次読み書き: シーケンシャルリード / ライト
    - 現代では保存領域を上から逐次読み書きするのは現実的ではなくランダムリード/ライトが重視
  - I/Oスケジューラ
    - ディスク読み書き制御用パラメータ
    - Ubuntu20.04では、mq-deadlineスケジューラが採用
  - ファイルディスクリプタ
    - プログラムがアクセスするファイルや標準入出力などをOSが識別するために用いる識別子
    - プロセス側からOSに対してこの識別子を指定することで読み書きできる
  - UNIX domain socket
    - 同じホスト内の別プロセスに対して高速にデータを送受信する仕組み
    - 同じホスト内であることが前提のためネットを介さないことを活かした高効率な通信。

## まとめ

パフォーマンスチューニングの書籍だけれど、ミドルウェアの設計やアーキテクチャの基礎知識に対する説明が丁寧にされていたのが好印象。

`Covering Index`の概念を知れたのはよかった。Linux周りがまだ分からないことだらけなのでもっと学びたい。あとCDNも。