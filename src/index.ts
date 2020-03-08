import request from 'superagent';
import config from './config';
import { writeQuestionDescription, writeQuestionDictionary } from './utils';

(async () => {
  const { text } = await request
    .get(config.API_PROBLEMS)
    .set('Accept', 'text/html');
  const data = JSON.parse(text);
  data.stat_status_pairs.forEach(async pair => {
    const {
      difficulty: { level },
      stat: { frontend_question_id, question__title_slug }
    } = pair;
    const start = process.argv[2];
    const end = process.argv[3];
    if (!(start <= frontend_question_id && end >= frontend_question_id)) {
      return;
    }
    const {
      body: {
        data: { question }
      }
    } = await request
      .post(config.API_GRAPHQL)
      .send(config.questionDataQL(question__title_slug));
    const dirname = `${frontend_question_id}.${question__title_slug}.${config.levelMap[level]}`;
    writeQuestionDictionary(dirname);
    writeQuestionDescription(dirname, question);
  });
})();
