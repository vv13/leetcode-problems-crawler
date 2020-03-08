import fs from 'fs';
import path from 'path';
import config from './config';

export function writeQuestionDictionary(dirname: string) {
  const dirPath = path.join(config.PATH_QUESTION, dirname);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export function writeQuestionDescription(dirname: string, content: any) {
  const filePath = path.join(config.PATH_QUESTION, dirname, 'README.md');
  // tslint:disable-next-line: no-console
  console.log('create: ' + filePath);
  fs.writeFileSync(filePath, content.content);
}
