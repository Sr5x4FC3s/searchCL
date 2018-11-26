const axios = require('axios');
const tools = require('./utility/index');

const application = async () => {
  let answers = [];
  return new Promise (async resolve => {
    for (let i = 0; i < tools.questions.questions.length; i++) {
      let temp = await tools.questions.readline(tools.questions.questions[i], answers);
      answers.push(temp);
    };
    resolve(answers);
  }).then(result => {
    if (result[1] === '') {
      answers[1] = 'sfbay';
    } else {
      let removedSpaces = tools.prep(answers[1]);
      answers[1] = removedSpaces;
    }
    return answers;
  }).then(result => {
    return new Promise (resolve => {
      let page = tools.fetch(result[1], result[0]);
      resolve(page);
    }).then(result => {
      let results = tools.filter(result, answers[0]);
      return results;
    }).then(result => {
      return new Promise (resolve => {
        let write = tools.write(result);
        resolve(write);
      })
    }).then(result => {
      tools.questions.readlineClose();
    }).catch(error => {
      console.log(error);
      tools.questions.readlineClose();
    })
  })
};

application();