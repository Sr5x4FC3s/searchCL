const axios = require('axios');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const questions = {
  questions: ['Enter item you want to search: ', 'Enter area to be searched. Default will be San Francisco Bay Area. Press "Enter" to skip: '],
  readline: (Qelement) => {
    return new Promise (resolve => {
      rl.question(Qelement, (answer) => {
        resolve(answer);
      });
    })
  },
  readlineClose: () => {
    rl.close();
  }
}

const fetch = (param1, param2) => {
    let promiseArray = [
      axios.get(`https://${param1}.craigslist.org/search/sss?s=${0}&query=${param2}&sort=rel`),
      axios.get(`https://${param1}.craigslist.org/search/sss?s=${120}&query=${param2}&sort=rel`),
      axios.get(`https://${param1}.craigslist.org/search/sss?s=${240}&query=${param2}&sort=rel`),
      axios.get(`https://${param1}.craigslist.org/search/sss?s=${360}&query=${param2}&sort=rel`),
      axios.get(`https://${param1}.craigslist.org/search/sss?s=${480}&query=${param2}&sort=rel`),
      axios.get(`https://${param1}.craigslist.org/search/sss?s=${500}&query=${param2}&sort=rel`),
      axios.get(`https://${param1}.craigslist.org/search/sss?s=${620}&query=${param2}&sort=rel`),
      axios.get(`https://${param1}.craigslist.org/search/sss?s=${740}&query=${param2}&sort=rel`),
      axios.get(`https://${param1}.craigslist.org/search/sss?s=${860}&query=${param2}&sort=rel`),
      axios.get(`https://${param1}.craigslist.org/search/sss?s=${940}&query=${param2}&sort=rel`),
      axios.get(`https://${param1}.craigslist.org/search/sss?s=${1060}&query=${param2}&sort=rel`),
      axios.get(`https://${param1}.craigslist.org/search/sss?s=${1180}&query=${param2}&sort=rel`),
      axios.get(`https://${param1}.craigslist.org/search/sss?s=${1300}&query=${param2}&sort=rel`),
      axios.get(`https://${param1}.craigslist.org/search/sss?s=${1420}&query=${param2}&sort=rel`),
      axios.get(`https://${param1}.craigslist.org/search/sss?s=${1540}&query=${param2}&sort=rel`),
      axios.get(`https://${param1}.craigslist.org/search/sss?s=${1660}&query=${param2}&sort=rel`),
      axios.get(`https://${param1}.craigslist.org/search/sss?s=${1880}&query=${param2}&sort=rel`),
      axios.get(`https://${param1}.craigslist.org/search/sss?s=${2000}&query=${param2}&sort=rel`),
      axios.get(`https://${param1}.craigslist.org/search/sss?s=${2120}&query=${param2}&sort=rel`),
      axios.get(`https://${param1}.craigslist.org/search/sss?s=${2240}&query=${param2}&sort=rel`),
      axios.get(`https://${param1}.craigslist.org/search/sss?s=${2360}&query=${param2}&sort=rel`),
      axios.get(`https://${param1}.craigslist.org/search/sss?s=${2480}&query=${param2}&sort=rel`),
      axios.get(`https://${param1}.craigslist.org/search/sss?s=${2600}&query=${param2}&sort=rel`),
      axios.get(`https://${param1}.craigslist.org/search/sss?s=${2720}&query=${param2}&sort=rel`),
      axios.get(`https://${param1}.craigslist.org/search/sss?s=${2840}&query=${param2}&sort=rel`),
      axios.get(`https://${param1}.craigslist.org/search/sss?s=${2960}&query=${param2}&sort=rel`),
    ];

    return axios.all(promiseArray)
    .then(result => {
      return result;
    }).then(result => {
      let dataArray = [];
      result.map(element => {
        let urlRegex = /https:\/\/sfbay\.craigslist\.org\/\w{3}\/\w{3}\/\w{1}\/([a-z-0-9\/]){0,}\.html/gi;
        let paramsMatched = element.data.match(urlRegex);
        if (paramsMatched !== undefined) {
          dataArray.push(paramsMatched);
        }
      });
      return dataArray;
    })
    .catch(error => {
      console.log(error)
    });
};

const filter = async (array, filter) => {
  let results = [];
  array.forEach(element => {
    if (element !== null) {
      element.map(item => {
        let regex = new RegExp(filter, 'gi');
        if (item.match(regex)) {
          results.push(item);
        }
      })
    }
  })
  return results;
}

const write = (array) => {
  let writeStream = fs.createWriteStream('./list/items.txt');
  return new Promise (resolve => {
    let write = array.map(item => {
      writeStream.write(item + "\n");
    })
    resolve(write);
  }).then(result => {
    writeStream.end();
  }).catch(err => {
    console.log(err);
  })
}

module.exports = {
  fetch: fetch,
  questions: questions,
  filter: filter,
  write: write
};