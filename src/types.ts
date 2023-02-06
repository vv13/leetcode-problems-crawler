export interface IPair {
  difficulty: { level: number },
  stat: {
    frontend_question_id: number,
    question__title_slug: string
  }
}


export interface InputParams {
  i18n?: 'cn' | 'en';
  lang?: string;
  rule?: number[];
}
