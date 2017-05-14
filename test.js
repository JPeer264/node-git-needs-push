import test from 'ava';
import fs from 'fs-extra';
import { homedir } from 'os';
import path from 'path';

import isGit from './index';

const fixtures = path.join(process.cwd(), 'test', 'fixtures');

test.before('rename git folders', () => {
  fs.renameSync(path.join(fixtures, 'needsPushJustLocal', 'git'), path.join(fixtures, 'needsPushJustLocal', '.git'));
  fs.renameSync(path.join(fixtures, 'needsPush', 'git'), path.join(fixtures, 'needsPush', '.git'));
  fs.renameSync(path.join(fixtures, 'upToDate', 'git'), path.join(fixtures, 'upToDate', '.git'));
});

test.after.always('rename .git folders', () => {
  fs.renameSync(path.join(fixtures, 'needsPushJustLocal', '.git'), path.join(fixtures, 'needsPushJustLocal', 'git'));
  fs.renameSync(path.join(fixtures, 'needsPush', '.git'), path.join(fixtures, 'needsPush', 'git'));
  fs.renameSync(path.join(fixtures, 'upToDate', '.git'), path.join(fixtures, 'upToDate', 'git'));
});

test('up to date', (t) => {
  t.false(isGit(path.join(fixtures, 'upToDate')));
});

test('needs to push', (t) => {
  t.true(isGit(path.join(fixtures, 'needsPush')));
});

test('a local branch needs to get pushed', (t) => {
  t.true(isGit(path.join(fixtures, 'needsPushJustLocal')));
});

test('another dir needs to push', (t) => {
  t.false(isGit(homedir()));
});
