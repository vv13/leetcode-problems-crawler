import path from 'path';

export default {
  API_GRAPHQL: 'https://leetcode.com/graphql',
  API_PROBLEMS: 'https://leetcode.com/api/problems/all/',
  DEFAULT_DIRNAME: 'problems',
  levelMap: {
    1: 'easy',
    2: 'medium',
    3: 'hard'
  },
  questionDataQL: (titleSlug: any) => ({
    operationName: 'questionData',
    query:
      'query questionData($titleSlug: String!) { question(titleSlug: $titleSlug) { likes dislikes content similarQuestions stats }}',
    variables: { titleSlug }
  })
};
