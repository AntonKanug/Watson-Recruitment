const express = require('express');
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config();
const app = express();
const { IamTokenManager } = require('ibm-watson/auth');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
	limit:'10mb',
	extended: false,
}));

app.use('/api', routes);

const ttsAuthenticator = new IamTokenManager({
    apikey: '_mB1YhMtvUBWkpvXEl_V1LNg9jo6ldO6VfwdUE5lv_M5'
  });
  
app.use('/api/speech-to-text/token', function(req, res) {
    return ttsAuthenticator
      .requestToken()
      .then(({ result }) => {
        res.json({ accessToken: result.access_token, url: 'https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/955a7df2-87c1-432f-9ead-0cc68d68e717' });
      })
      .catch(console.error);
  });

// Page does not exist
app.use((req, res) => {
	res.status(404).json({
		message: `${req.originalUrl} is not a valid route.`,
	});
});


app.listen(8080, function () {
	console.log('Example app listening on port  !');
  });


module.exports = app;
