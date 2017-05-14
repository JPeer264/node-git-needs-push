import currentBranch from 'current-git-branch';
import execa from 'execa';
import isGit from 'is-git-repository';
import { platform } from 'os';
import path from 'path';
import pathIsAbsolute from 'path-is-absolute';

const cwd = process.cwd();

const gitNeedsPush = (altPath = cwd) => {
  const thisPath = pathIsAbsolute(altPath) ? altPath : path.join(cwd, altPath);

  if (!isGit(thisPath)) {
    return false;
  }

  try {
    let exec;

    if (platform() === 'win32') {
      exec = execa.shellSync(`pushd ${thisPath} & git push --dry-run --no-verify`);
    } else {
      exec = execa.shellSync(`(cd ${thisPath} ; git push --dry-run --no-verify)`);
    }

    // check if the current branch will be in the git output
    if (exec.stderr.match('up-to-date')) {
      return false;
    }

    return true;
  } catch (e) {
    // check if the current branch will be in the git output
    if (e.message.match(currentBranch(thisPath))) {
      return true;
    }

    return false;
  }
};

export default gitNeedsPush;
