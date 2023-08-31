#!/usr/bin/env node

import { program } from 'commander'
import * as helpers from './helper'
import { InputParams } from './types'
import { main } from './main'

program
  .name('leetcode-problem-crawler')
  .option(
    '-r, --rule <string>',
    'crawling rule, eg1: 1-10, eg2: 1,2,3, eg3: 5',
    helpers.parseIds
  )
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
    ['python3']
  )
program.parse()

const options: InputParams = program.opts()
main(options.rule, options.lang, options.i18n)
