#!/usr/bin/env node

import program from 'commander'
import path from 'path'
import request from 'superagent'
import config from './config'
import { IPair } from './types'
import { createDirectory, writeQuestion, writeSolution } from './utils'

program
  .name('leetcode-problem-crawler')
  .usage('-s 1 -e 10')
  .option('-s, --start <number>', 'problem start index', v =>
    v ? parseInt(v, 10) : 0
  )
  .option('-e, --end <number>', 'problem end index', v =>
    v ? parseInt(v, 10) : 0
  )
  .option('-d, --dir <string>', 'download dirname', config.DEFAULT_DIRNAME)
  .option('-i, --initial <string>', 'generate code snippet in solution.[language_file_suffix]')
program.parse(process.argv)

if (program.start && program.end) {
  main(program)
} else {
  program.help()
}

async function main({ start, end, dir, initial }: any) {
  const { text } = await request
    .get(config.API_PROBLEMS)
    .set('Accept', 'text/html')
  const data = JSON.parse(text)
  data.stat_status_pairs.forEach(async (pair: IPair) => {
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
      dir,
      `${frontend_question_id
        .toString()
        .padStart(3, '0')}.${question__title_slug}.${config.levelMap[level]}`
    )
    createDirectory(dirname)
    writeQuestion(dirname, question)
    if (initial) {
      const { codeSnippets } = question
      const snippet = codeSnippets.find(
        (s: { langSlug: string }) => s.langSlug === initial
      )
      if (!snippet || !config.langSlugMap[initial]) {
        return
      }
      writeSolution(dirname, initial, snippet.code)
    }
  })
}
