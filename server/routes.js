const router = require('express').Router();
const mongoose = require('mongoose')
const watson = require('./data-abs/watson.dal');
const ms = require('mediaserver');
const { createApplication, getApplications, getApplicationsByID } =require('./data-abs/applications.dal')
const { getApplicantsByAppID, createApplicant, getApplicantID } =require('./data-abs/applicant.dal');

const multer = require('multer');
const upload = multer();


/* GET - Contacts by requester.email */
router.get('/applicants/', (req, res) => {
    Applicants.find({}).then(data => res.status(200).json(data));
    console.log(process.env.DB_PW);
});


/* GET - Contacts by requester.email */
router.get('/recruiters/', (req, res) => {
    Recruiters.find({}).then(data => res.status(200).json(data));
});


/* GET - GET TTS */
router.get('/watson/tts/:id/:qNumber', (req, res) => {
    watson.TTS(req.query.text, req.params.id, req.params.qNumber).then(data => res.status(200).json(data));
});

/* GET - POST STT */
router.put('/watson/stt', upload.single('blobData'), (req, res) => {
    watson.STT(req.file).then(data => res.status(200).json(data));
});

/* GET - GET TA */
router.get('/watson/ta', (req, res) => {
    watson.NLP(req.query.text).then(data => res.status(200).json(data));
});

/* GET - GET TA */
router.get('/watson/nlu/:text', (req, res) => {
    watson.NLU(req.params.text).then(data => res.status(200).json(data));
});


/* GET - GET TTS AUDIO */
router.get('/audio/:id/:qNumber', function (req, res) {
    ms.pipe(req, res, `./audio/${req.params.id}_${req.params.qNumber}.wav`);
});


/* GET - POST STT */
router.put('/application/add', (req, res) => {
    createApplication(req.body).then(data => res.status(200).json(data));
});

/* GET - POST STT */
router.put('/applicant/add', (req, res) => {
    createApplicant(req.body).then(data => res.status(200).json(data));
});


/* GET - POST STT */
router.get('/applications', (req, res) => {
    getApplications().then(data => res.status(200).json(data));
});

/* GET - POST STT */
router.get('/applications/:id', (req, res) => {
    getApplicationsByID(req.params.id).then(data => res.status(200).json(data));
});

/* GET - POST STT */
router.get('/applicants/:id', (req, res) => {
    getApplicantsByAppID(req.params.id).then(data => res.status(200).json(data));
});

/* GET - POST STT */
router.get('/applicant/:id', (req, res) => {
    getApplicantID(req.params.id).then(data => res.status(200).json(data));
});

module.exports = router;
