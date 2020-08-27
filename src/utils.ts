import fs from 'fs'
import path from 'path'
import config from './config'

export function createDirectory(dirname: string) {
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true })
  }
}

export function writeQuestion(dirname: string, content: any) {
  const filePath = path.join(dirname, 'README.md')
  // tslint:disable-next-line: no-console
  console.log('created: ' + filePath)
  let fileContent =
    `## [${content.questionFrontendId}. ${content.title}](https://leetcode.com/problems/${content.titleSlug}/)\n` +
    content.content
  if (content.hints && content.hints.length) {
    fileContent += '\n\n## Hints\n'
    content.hints.forEach((hint: string, index: number) => {
      fileContent += `${index + 1}. ${hint}\n`
    })
  }
  fileContent += fs.writeFileSync(filePath, fileContent)
}

export function writeSolution(dirname: string, langSlug: string, code: any) {
  const filePath = path.join(dirname, `solution${config.langSlugMap[langSlug]}`)
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, code)
  }
}

export function writeInformation(
  dirname: string,
  { question, difficulty }: any
) {
  const { similarQuestions } = question
  const data = { difficulty, similarQuestions: JSON.parse(similarQuestions) }
  const filePath = path.join(dirname, `information.json`)
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(data, undefined, 4))
  } else {
    let jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    jsonData = { ...jsonData, ...data }
    fs.writeFileSync(filePath, JSON.stringify(jsonData, undefined, 4))
  }
}
