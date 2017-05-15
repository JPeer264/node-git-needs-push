import test from 'ava';
import fs from 'fs-extra';
import { homedir } from 'os';
import path from 'path';

import isGit from './index';

const fixtures = path.join(process.cwd(), 'test', 'fixtures');

const folders = [
  'squashed',
  'needsPushJustLocal',
  'needsPush',
  'upToDate',
  'detached',
];

test.before('rename git folders', () => {
  folders.map(folder => fs.renameSync(path.join(fixtures, folder, 'git'), path.join(fixtures, folder, '.git')));
});

test.after.always('rename .git folders', () => {
  folders.map(folder => fs.renameSync(path.join(fixtures, folder, '.git'), path.join(fixtures, folder, 'git')));
});

test('up to date', (t) => {
  t.false(isGit(path.join(fixtures, 'upToDate')));
});

test('needs to push', (t) => {
  t.true(isGit(path.join(fixtures, 'needsPush')));
});

test('squashed', (t) => {
  t.true(isGit(path.join(fixtures, 'squashed')));
});

test('detached', (t) => {
  t.false(isGit(path.join(fixtures, 'detached')));
});

test('a local branch needs to get pushed', (t) => {
  t.true(isGit(path.join(fixtures, 'needsPushJustLocal')));
});

test('homedir should not be a git repo', (t) => {
  t.false(isGit(homedir()));
});
