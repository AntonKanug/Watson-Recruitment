const { Applications } = require('../db-connect');
const { TTS } = require('./watson.dal');

module.exports = {
    getApplications() {
        return new Promise((resolve, reject) => {
            Applications.find({})
                .lean()
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },


    getApplicationsByID(id) {
        return new Promise((resolve, reject) => {
            Applications
                .findById(id.toLowerCase())
                .lean()
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    createApplication(request) {
        return new Promise((resolve, reject) => {
            // Parameter validaiton
            if (!request) {
                logger.error('Attributes are missing.');
                reject(new Error('Attributes are missing.'));
            }

            const application = new Applications(request);
            const id = application._id;
            const questions = application.questions;
            application
                .save()
                .then((data) => {
                    resolve(data);
                }).catch((error) => {
                    reject(error);
                }).finally(() => {
                    questions.forEach((question, i) => {
                        TTS(question, id, i);
                    });
                });
        });
    },

}