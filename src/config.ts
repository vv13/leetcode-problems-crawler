import path from 'path'

export default {
  API_GRAPHQL: 'https://leetcode.com/graphql',
  API_PROBLEMS: 'https://leetcode.com/api/problems/all/',
  DEFAULT_DIRNAME: 'problems',
  langSlugMap: {
    csharp: '.cs',
    java: '.java',
    javascript: '.js',
    php: '.php',
    python: '.py',
    python3: '.py'
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
        content
        similarQuestions
        stats
        hints
        title
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
