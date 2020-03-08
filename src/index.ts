#!/usr/bin/env node

import program from 'commander'
import path from 'path'
import request from 'superagent'
import config from './config'
import { writeQuestion } from './utils'

program
  .name('leetcode-problem-crawler')
  .usage('-s 1 -e 10')
  .option('-s, --start <number>', 'problem start index', v => parseInt(v, 10))
  .option('-e, --end <number>', 'problem end index', v => parseInt(v, 10))
  .option('-d, --dir <string>', 'download dirname')
program.parse(process.argv)

if (program.start && program.end) {
  main(program)
} else {
  program.help()
}

async function main({ start, end, dir }: any) {
  const { text } = await request
    .get(config.API_PROBLEMS)
    .set('Accept', 'text/html')
  const data = JSON.parse(text)
  data.stat_status_pairs.forEach(async pair => {
    const {
      difficulty: { level },
      stat: { frontend_question_id, question__title_slug }
    } = pair
    if (start > frontend_question_id || end < frontend_question_id) {
      return
    }
    const {
      body: {
        data: { question }
      }
    } = await request
      .post(config.API_GRAPHQL)
      .send(config.questionDataQL(question__title_slug))
    const dirname = path.join(
      process.cwd(),
      dir || config.DEFAULT_DIRNAME,
      `${frontend_question_id}.${question__title_slug}.${config.levelMap[level]}`
    )
    writeQuestion(dirname, question)
  })
}
