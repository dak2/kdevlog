---
title: 'Debian バージョンについて'
date: '2023-01-09'
excerpt: 'Debian のバージョンを知った'
categories: 'Linux'
---

## 概要

DockerのRubyイメージを上げた時にpostgresql-client 11が見つからなかった
その際にDebianバージョンを知ったのでそのまとめ

## 詳細

解決策の詳細は[**Railsアップグレードをした際の知見**](https://kdevlog.com/posts/7oo2u06co){:target="\_blank"}という記事に譲るとして、ここではDebianバージョンの全体感についてまとめる。

### Debianのリリースカテゴリについて

[**https://www.debian.org/releases/**](https://www.debian.org/releases/){:target="\_blank"}によると、Debianはstable(安定版)、testing(テスト版)、unstable(不安定版)の3つのカテゴリに分けてリリースを管理している。

unstableで開発をしていき、testingで動作確認を行い、stableでプロダクションリリースを行う形とのこと。

現在のstableバージョンは`bullseye`であると[**公表**](https://www.debian.org/releases/stable/){:target="\_blank"}されている。現在のtestingバージョンは`bookworm`とのこと。

### DebianのLTS

DebianのLTSはそれぞれのリリースで3年間の全面サポートと LTS による2年間の延長サポートを想定できる。

例えば、現在のstableである`bullseye`は2021/8/14に初版リリースされたので、そこから約5年程度はサポートがあるということ。

詳しくはこちら[**https://wiki.debian.org/LTS**](https://wiki.debian.org/LTS){:target="\_blank"}

## まとめ

意識する回数は少ないかもしれないが、知識として知れたことは良かったと思う。
