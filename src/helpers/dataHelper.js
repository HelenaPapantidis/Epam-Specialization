// generiše random email da svaki put može nova registracija
function randomEmail() {
  const timestamp = Date.now();
  return `qa.user.${timestamp}@test.com`;
}

module.exports = { randomEmail };
