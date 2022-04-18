const express = require("express");
const axios = require("axios");
var cors = require("cors");
const app = express();
app.use(cors({ credentials: true, origin: true }));
var router = express.Router();
var FormData = require("form-data");
const fs = require("fs");
const os = require("os");
require("dotenv").config();
function setEnvValue(key, value) {
  const ENV_VARS = fs.readFileSync("./.env", "utf8").split(os.EOL);

  const target = ENV_VARS.indexOf(
    ENV_VARS.find((line) => {
      return line.match(new RegExp(key));
    })
  );

  ENV_VARS.splice(target, 1, `${key}=${value}`);

  fs.writeFileSync("./.env", ENV_VARS.join(os.EOL));
}

router.get("/login/callback", (req, res) => {
  var bodyFormData = new FormData();
  bodyFormData.append("grant_type", "authorization_code");
  bodyFormData.append("client_id", process.env.client_id);
  bodyFormData.append("client_secret", process.env.client_secret);
  bodyFormData.append("redirect_uri", "http://localhost:9000/login/callback");
  bodyFormData.append("code", req.query.code);
  axios({
    method: "POST",
    url: "https://accounts.zoho.com/oauth/v2/token",
    data: bodyFormData,
    headers: { ...bodyFormData.getHeaders() },
  })
    .then((response) => {
      console.log(response.data);
      setEnvValue("access_token", response.data.access_token);
      //fs.writeFileSync(".env", `access_token = ${response.data.access_token}`);
      res.redirect(`http://localhost:3000?login=true`);
    })
    .catch(function (error) {
      console.log(error);
      res.redirect(`http://localhost:3000`);
    });
});

router.post("/", (req, res) => {
  var token = process.env.access_token;
  var org = req.body.org;
  var data = JSON.stringify({
    select_query: `select Account_Name , Email from Accounts where Email like '%@${org}.%'`,
  });
  var config = {
    method: "POST",
    url: "https://www.zohoapis.com/crm/v2/coql",
    headers: {
      Authorization: `Zoho-oauthtoken ${token}`,
      "Content-Type": "application/json",
    },

    data: data,
  };
  axios(config)
    .then(function (response) {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
      res.send(error);
    });
});

router.post("/post", (req, res) => {
  var token = process.env.access_token;
  var data = JSON.stringify({
    data: [
      {
        Account_Name: req.body.name,
        Industry: req.body.company,
        Email: req.body.email,
      },
    ],
  });

  var config = {
    method: "post",
    url: "https://www.zohoapis.com/crm/v2/Accounts",
    headers: {
      Authorization: `Zoho-oauthtoken ${token}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
      res.send(error);
    });
});
module.exports = router;
