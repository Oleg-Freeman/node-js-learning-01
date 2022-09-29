const jwt = require("jsonwebtoken");
require("dotenv").config();

const { JWT_SECRET } = process.env;

const token = jwt.sign({ id: 1, role: "admin" }, JWT_SECRET, { expiresIn: '7 days' });
console.log(token);
// const decoded = jwt.decode(token)
// console.log(decoded);

try {
const decoded = jwt.verify(token, JWT_SECRET)
console.log(decoded);
} catch (error) {
    console.log(error);
}
