const { welcome, goodbye, tell } = require("../utils/fortune-teller");

function getFortune(question) {
  
  let fortune = tell(question).then(response => {
    return [`Your question was: ${question}`,`Your fortune is: ${response}`]
  })
  .catch(err => `There was an error: ${err}`)
  
  return fortune;
  
  
}

/*function fullSession(question) {
  

 let session = welcome()
  .then((welcomeMessage) => {
    goodbye().then((goodByeMessage) => {
      return [welcomeMessage,goodByeMessage]
    })
  })

  return session;
}*/
function fullSession(question) {
  let session = []

  welcome(question)
  .then((welcomeMessage) => {session.push((welcomeMessage))})
  .then(() => getFortune(question))
  .then((fortuneMessage => {
    if (Array.isArray(session)){
    session.concat(fortuneMessage);
  }else{
    session.push(fortuneMessage)
  }
  }))
  .then(goodbye(question))
  .then((goodByeMessage => session.push(goodByeMessage)))
  
  return session;
}
module.exports = { getFortune, fullSession };
