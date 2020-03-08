import fs from 'fs';
import path from 'path';

export function createDirectory(dirname: string) {
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

export function writeQuestion(dirname: string, content: any) {
  createDirectory(dirname)
  const filePath = path.join(dirname, 'README.md');
  // tslint:disable-next-line: no-console
  console.log('create: ' + filePath);
  fs.writeFileSync(filePath, content.content);
}
