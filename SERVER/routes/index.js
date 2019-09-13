var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send(`
    <h1>Welcome</h1>

    <ul class="nav">
  <li class="nav-item">
    <a class="nav-link" href="/vacation">vacation</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/users">users</a>
  </li>
    </ul>

    <form action="http://localhost:4000/users/signin" method="post">
      <p>signup</p>
      <input type="text" id="name"/>name 
      <br>
      <input type="text" id="username"/>username
      <br>
      <input type="text" id="lname"/>lname
      <br>
      <input type="text" id="userpassword"/>userpassword
      <br>
      <input type="text" id="email"/>email
      <br>
      <input type="text" value="user" id="roles"/>roles
      <br>

      <button type="submit">submit</button>
    </form>
        `)



});

module.exports = router;
