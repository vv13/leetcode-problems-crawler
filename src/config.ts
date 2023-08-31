import path from 'path'

export default {
  cn: {
    domain: 'https://leetcode-cn.com'
  },
  en: {
    domain: 'https://leetcode.com'
  },
  DEFAULT_DIRNAME: 'problems',
  langSlugMap: {
    csharp: '.cs',
    java: '.java',
    javascript: '.js',
    php: '.php',
    python: '.py',
    python3: '.py',
    cpp: '.cpp',
    c: '.c',
    ruby: '.rb',
    swift: '.swift',
    golang: '.go',
    scala: '.scala',
    kotlin: '.kt',
    rust: '.rs',
    typescript: '.ts',
    racket: '.rkt',
    erlang: '.erl',
    elixir: '.ex',
    dart: '.dart'
  },
  levelMap: {
    1: 'easy',
    2: 'medium',
    3: 'hard'
  },
  questionDataQL: (titleSlug: any) => ({
    operationName: 'questionData',
    query: `
    query questionData($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        translatedTitle
        translatedContent
        content
        similarQuestions
        stats
        hints
        title
        titleSlug
        questionFrontendId
        codeSnippets {
          lang
          langSlug
          code
          __typename
        }
      }
    }
`,
    variables: { titleSlug }
  })
}
