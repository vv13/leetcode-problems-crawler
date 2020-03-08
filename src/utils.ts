import fs from 'fs';
import path from 'path';
import config from './config'

export function createDirectory(dirname: string) {
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

export function writeQuestion(dirname: string, content: any) {
  const filePath = path.join(dirname, 'README.md');
  // tslint:disable-next-line: no-console
  console.log('create: ' + filePath);
  fs.writeFileSync(filePath, content.content);
}

export function writeSolution(dirname: string, langSlug: string, code: any) {
  const filePath = path.join(dirname, `solution.${config.langSlugMap[langSlug]}`,);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, code);
  }
}
