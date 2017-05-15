# git-needs-push

[![Build Status](https://travis-ci.org/JPeer264/node-git-needs-push.svg?branch=master)](https://travis-ci.org/JPeer264/node-git-needs-push)

Check synchronously if a git repository needs to push. If a branch is just local it will be `true` (as a push is required)

## Installation

```sh
$ npm i git-needs-push --save
```
or
```sh
$ yarn add git-needs-push
```

## Usage

```js
const needsPush = require('git-needs-push');

needsPush(); // true or false of process.cwd()
needsPush('any/git/repo'); // true or false
```

## LICENSE

MIT © [Jan Peer Stöcklmair](https://www.jpeer.at)
