function randomEmail() {
  return `qa_${Date.now()}@test.com`;
}


module.exports = {
  randomEmail,
  
};
