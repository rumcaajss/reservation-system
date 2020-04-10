const axios = require('axios');
const qs = require('qs');
const { app, db } = require("../firestore");

module.exports = async (req, res) => {
  const {host} = req.headers;
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  const {code} = req.query;
  const redirect_uri = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/authorize' : 'https://reservation-system.now.sh/api/authorize' // `http://${host}/api/authorize`;
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

      app.auth().createCustomToken(id)
        .then(function(fireBaseToken) {
          res.setHeader("Set-Cookie", [`token=${access_token};path=/`, `fb_token=${fireBaseToken};path=/; max-age=${60 * 60 * 24 * 365 * 5}`, `name=${encodeURIComponent(name)};path=/; max-age=${60 * 60 * 24 * 365 * 5}`, `avatar=${image_192};path=/; max-age=${3600 * 24 * 365 * 5}`]);
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