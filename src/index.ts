#!/usr/bin/env node

import { program } from 'commander'
import path from 'path'
import request from 'superagent'
import config from './config'
import * as helpers from './helper'
import { InputParams, IPair } from './types'
import {
  writeDirectory,
  writeInformation,
  writeQuestion,
  writeSolution
} from './utils'

(async () => {
  program
    .name('leetcode-problem-crawler')
    .option('-r, --rule <string>', 'crawling rule, eg1: 1-10, eg2: 1,2,3, eg3: 5', helpers.parseIds)
    .option(
      '-i, --i18n <string>',
      'currently support en and cn, default is en.',
      helpers.parseI18ns,
      'en'
    )
    .option(
      '-l, --lang <string>',
      'generate code snippet with language, default is python3.',
      helpers.parseLang,
      'python3'
    )
  program.parse()

  const options: InputParams = program.opts();
  main(options.rule, options.lang, options.i18n)
})()



async function main(ids: number[], langSlug: string, i18n: InputParams['i18n']) {
  const { domain } = config[i18n]
  const problems = await getAllProblems(domain)

  problems.stat_status_pairs.forEach(async (pair: IPair) => {
    const {
      difficulty: { level },
      stat: { frontend_question_id, question__title_slug }
    } = pair
    if (!ids.includes(Number(frontend_question_id))) {
      return
    }

    const dirname = path.join(
      process.cwd(),
      `${frontend_question_id
        .toString()
        .padStart(3, '0')}.${question__title_slug}`
    )
    writeDirectory(dirname)

    const question = await getQuestion(domain, question__title_slug)
    const questionConfig = {
      title: i18n === 'en' ? question.title : question.translatedTitle,
      content: i18n === 'en' ? question.content : question.translatedContent,
      questionFrontendId: question.questionFrontendId,
      titleSlug: question.titleSlug,
      hints: question.hints,
      domain,
      i18n
    }
    writeQuestion(dirname, questionConfig)

    const { codeSnippets } = question
    const snippet = codeSnippets.find(
      (s: { langSlug: string }) => s.langSlug === langSlug
    )
    if (!snippet) {
      return
    }
    writeSolution(dirname, langSlug, snippet.code)

    writeInformation(dirname, { question, difficulty: config.levelMap[level] })
  })
}

async function getAllProblems(domain: string) {
  const { text } = await request.get(`${domain}/api/problems/all/`)
  return JSON.parse(text)
}

async function getQuestion(domain: string, titleSlug: string) {
  const {
    body: {
      data: { question }
    }
  } = await request
    .post(`${domain}/graphql`)
    .send(config.questionDataQL(titleSlug))
  return question
}
