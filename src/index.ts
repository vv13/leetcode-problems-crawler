#!/usr/bin/env node

import program from 'commander'
import path from 'path'
import request from 'superagent'
import config from './config'
import { IPair } from './types'
import { createDirectory, writeInformation, writeQuestion, writeSolution } from './utils'

program
  .name('leetcode-problem-crawler')
  .option('-r, --rule <string>', 'crawling rule, eg1: 1-10, eg2: 1,2,3, eg3: 5')
  .option(
    '-l, --lang <string>',
    'generate code snippet with language, default is python3.',
    'python3'
  )
program.parse(process.argv)

const rule = program.rule as string
if (rule) {
  const ids = []
  if (rule.includes('-')) {
    const [start, end] = rule.split('-').map(idnumber => Number(idnumber))
    for (let i = start; i <= end; i++) {
      ids.push(i)
    }
  } else if (rule.includes(',')) {
    ids.push(...rule.split(',').map(Number))
  } else {
    ids.push(Number(rule))
  }
  main(ids, program.lang)
} else {
  program.help()
}

async function main(ids: number[], langSlug: string) {
  const { text } = await request
    .get(config.API_PROBLEMS)
    .set('Accept', 'text/html')
  const data = JSON.parse(text)
  data.stat_status_pairs.forEach(async (pair: IPair) => {
    const {
      difficulty: { level },
      stat: { frontend_question_id, question__title_slug }
    } = pair
    if (!ids.includes(frontend_question_id)) {
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
      `${frontend_question_id
        .toString()
        .padStart(3, '0')}.${question__title_slug}`
    )
    createDirectory(dirname)
    writeQuestion(dirname, question)
    if (langSlug) {
      const { codeSnippets } = question
      const snippet = codeSnippets.find(
        (s: { langSlug: string }) => s.langSlug === langSlug
      )
      if (!snippet) {
        return
      }
      writeSolution(dirname, langSlug, snippet.code)
    }
    writeInformation(dirname, {question, difficulty: config.levelMap[level]})
  })
}
