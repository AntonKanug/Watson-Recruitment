const fs = require('fs');
const { IamAuthenticator } = require('ibm-watson/auth');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const PersonalityInsightsV3 = require('ibm-watson/personality-insights/v3');

require('dotenv').config();

module.exports = {
    TTS(text, id, qNum) {
        return new Promise((resolve, reject) => {
            const textToSpeech = new TextToSpeechV1({
                authenticator: new IamAuthenticator({
                    apikey: process.env.API_TTS,
                }),
                url: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/b3e45c62-0dbd-4c87-bba6-413639d8db5e',
            });
            const synthesizeParams = {
                text: text,
                accept: 'audio/wav',
                voice: 'en-US_AllisonV3Voice',
            };

            console.log('started')
            textToSpeech.synthesize(synthesizeParams)
                .then(response => {
                    return textToSpeech.repairWavHeaderStream(response.result);
                })
                .then(buffer => {
                    console.log(buffer);
                    fs.writeFileSync(`audio/${id}_${qNum}.wav`, buffer);
                    resolve({ audio: "Questions Added" });
                })
                .catch(err => {
                    console.log('error:', err);
                    reject();
                });
        });

    },


    STT(blob) {
        return new Promise((resolve, reject) => {

            fs.writeFileSync(`audio/temp.wav`, blob.buffer);

            const speechToText = new SpeechToTextV1({
                authenticator: new IamAuthenticator({
                    apikey: process.env.API_STT,
                }),
                url: 'https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/c1d62aad-843d-4128-8954-67d602065106',
            });

            var params = {
                objectMode: true,
                contentType: 'audio/wav',
                model: 'en-US_BroadbandModel',
                keywords: ['colorado', 'tornado', 'tornadoes'],
                keywordsThreshold: 0.5,
                maxAlternatives: 3
            };

            // Create the stream.
            var recognizeStream = speechToText.recognizeUsingWebSocket(params);
            // Pipe in the audio.
            fs.createReadStream(`audio/temp.wav`).pipe(recognizeStream);

            // Listen for events.
            recognizeStream.on('data', function (event) { onEvent('Data:', event); });
            recognizeStream.on('error', function (event) { onEvent('Error:', event); });
            recognizeStream.on('close', function (event) { onEvent('Close:', event); });

            // Display events on the console.
            function onEvent(name, event) {
                resolve(event);
            };
        });
    },

    NLP(text) {
        return new Promise((resolve, reject) => {
            const toneAnalyzer = new ToneAnalyzerV3({
                version: '2017-09-21',
                authenticator: new IamAuthenticator({
                    apikey: process.env.API_TA,
                }),
                url: 'https://api.us-south.tone-analyzer.watson.cloud.ibm.com/instances/b05758b3-b1f3-42b3-8796-89f30a3f4214',
            });

            const toneParams = {
                toneInput: { 'text': text },
                contentType: 'application/json',
            };

            toneAnalyzer.tone(toneParams)
                .then(toneAnalysis => {
                    resolve(toneAnalysis.result);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },

    PI(text) {
        return new Promise((resolve, reject) => {
            const personalityInsights = new PersonalityInsightsV3({
                version: '2017-10-13',
                authenticator: new IamAuthenticator({
                    apikey: process.env.API_PI,
                }),
                url: 'https://api.us-south.personality-insights.watson.cloud.ibm.com/instances/ccfae5bf-6b73-4035-b037-8bbbf6b5504f',
            });

            const profileParams = {
                // Get the content from the JSON file.
                content: text,
                contentType: 'text/plain',
                consumptionPreferences: false,
                rawScores: true,
            };

            personalityInsights.profile(profileParams)
                .then(profile => {
                    resolve(profile.result.personality)
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}