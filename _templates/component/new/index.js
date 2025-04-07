/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

module.exports = {
  prompt: async ({ inquirer }) => {
    const projectRoot = path.resolve(__dirname, '../../../');

    const rootDirMap = {
      components: path.join(projectRoot, 'components'),
      features: path.join(projectRoot, 'features'),
    };

    const targetRoots = Object.keys(rootDirMap);

    // ステップ1: components or features を選ぶ
    const { rootDir } = await inquirer.prompt([
      {
        type: 'select',
        name: 'rootDir',
        message: 'ディレクトリを選択:',
        choices: targetRoots,
      },
    ]);

    const fullRootPath = rootDirMap[rootDir];

    // フォルダがなければ作成しておく
    if (!fs.existsSync(fullRootPath)) {
      fs.mkdirSync(fullRootPath, { recursive: true });
    }

    // サブディレクトリ一覧を取得
    let subDirs = fs.readdirSync(fullRootPath).filter(name => {
      const subPath = path.join(fullRootPath, name);
      return fs.statSync(subPath).isDirectory();
    });

    let subDir = null;

    if (subDirs.length === 0) {
      const { newFolder } = await inquirer.prompt([
        {
          type: 'input',
          name: 'newFolder',
          message: `新規に "${rootDir}"にディレクトリを作成:`,
        },
      ]);
      subDir = newFolder;
      fs.mkdirSync(path.join(fullRootPath, newFolder), { recursive: true });
    } else {
      subDirs.push('[ディレクトリの作成]');
      const { selected } = await inquirer.prompt([
        {
          type: 'select',
          name: 'selected',
          message: `ディレクトリ選択:`,
          choices: subDirs,
        },
      ]);

      if (selected === '[ディレクトリの作成]') {
        const { newFolder } = await inquirer.prompt([
          {
            type: 'input',
            name: 'newFolder',
            message: 'ディレクトリ名:',
          },
        ]);
        subDir = newFolder;
        fs.mkdirSync(path.join(fullRootPath, newFolder), { recursive: true });
      } else {
        subDir = selected;
      }
    }

    // コンポーネント名の入力
    const { name } = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'コンポーネント名:',
      },
    ]);

    return {
      targetDir: `${rootDir}/${subDir}`,
      name,
    };
  },
};
