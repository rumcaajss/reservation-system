const axios = require('axios');
const qs = require('qs');
const { admin, db } = require("../firestore");

module.exports = async (req, res) => {
  const {host} = req.headers;
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  const {code} = req.query;
  const redirect_uri = `http://${host}/api/authorize`;
  const params = { client_id, client_secret, code, redirect_uri };
  const authUrl = 'https://slack.com/api/oauth.access';
  
  let url = authUrl + '?' + qs.stringify(params);

  axios.get(url).then(async function(response) {
      const {name, id} = response.data.user
      const {image_24, image_32, image_48, image_192, image_512, image_1024} = response.data.user;
      const avatars = {image_24, image_32, image_48, image_192, image_512, image_1024};
      const {access_token} = response.data;
      let data = {name, id, avatars};

      try {
        await db.collection('sessions').doc(access_token).set(data);
      } catch(e) {
        console.log('fail :(')
      }

      admin.auth().createCustomToken(id)
        .then(function(fireBaseToken) {
          res.setHeader("Set-Cookie", [`token=${access_token};path=/`, `fb_token=${fireBaseToken};path=/`, `name=${encodeURIComponent(name)};path=/`, `avatar=${image_192};path=/`]);
          res.setHeader("Content-type", "text/html");
          res.status(200).send(`<head><meta http-equiv="refresh" content="0; url=/"/></head>`)
        }).catch(function(error) {
          res.status(403).send(`<head><meta http-equiv="refresh" content="0; url=/login"/></head>`)
        });
  }).catch((error) => {
    res.status(403).send(`<head><meta http-equiv="refresh" content="0; url=/login"/></head>`)
    console.log(`got error: ${error}`);
  })
}