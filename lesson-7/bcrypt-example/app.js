const bcrypt = require("bcryptjs");

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  const hash = await bcrypt.hash(password, salt);
  console.log(hash);

//   const match = await bcrypt.compare(password, hash);
  const match = await bcrypt.compare('sfsfrgerhg', hash);
  console.log(match);
}

hashPassword("123456");
