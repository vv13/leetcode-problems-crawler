import path from 'path'
import request from 'superagent'
import config from './config'
import { InputParams, IPair } from './types'
import {
  writeDirectory,
  writeInformation,
  writeQuestion,
  writeSolution,
} from './file'

export async function main(
  ids: number[],
  langSlugs: string[],
  i18n: InputParams['i18n']
) {
  const { domain } = config[i18n]
  const problems = await getAllProblems(domain)

  problems.stat_status_pairs.forEach(async (pair: IPair) => {
    const {
      difficulty: { level },
      stat: { frontend_question_id, question__title_slug },
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
      i18n,
    }
    writeQuestion(dirname, questionConfig)

    const { codeSnippets } = question
    for (const lang of langSlugs) {
      const snippet = codeSnippets.find((s) => s.langSlug === lang)
      if (!snippet) {
        continue
      }
      writeSolution(dirname, lang, snippet.code)
    }

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
      data: { question },
    },
  } = await request
    .post(`${domain}/graphql`)
    .send(config.questionDataQL(titleSlug))
  return question
}
