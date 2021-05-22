const { Applicants } = require('../db-connect');
const { NLP, PI } = require('./watson.dal');

module.exports = {

    getApplicantsByAppID(id) {
        return new Promise((resolve, reject) => {
            Applicants
                .find({ applicationID: new RegExp(id, 'i') })
                .lean()
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    getApplicantID(id) {
        return new Promise((resolve, reject) => {
            Applicants
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

    createApplicant(request) {
        return new Promise((resolve, reject) => {
            // Parameter validaiton
            if (!request) {
                logger.error('Attributes are missing.');
                reject(new Error('Attributes are missing.'));
            }

            const applicant = new Applicants(request);
            const interviewAnswers = applicant.interviewAnswers;

            applicant.interviewAnalysis = Array(interviewAnswers.length).fill(0);
            promises = [];
            personalityInsights = '';

            interviewAnswers.forEach((question, i) => {
                promises.push(new Promise((resolve) => {
                    NLP(question).then((data) => {
                        applicant.interviewAnalysis[i] = data;
                        console.log(JSON.stringify(data, null, 2));
                        resolve(data);
                    })
                }),
                );
                personalityInsights += question + ' ';
            });

            promises.push(new Promise((resolve) => {
                NLP(applicant.techAnswer).then((data) => {
                    applicant.techAnalysis = data;
                    console.log(JSON.stringify(data, null, 2));
                    resolve(data);
                })
            }));

            personalityInsights += applicant.techAnswer + ' ';
            personalityInsights1 = personalityInsights;
            while (personalityInsights.split(' ').length < 300) {
                personalityInsights += personalityInsights1 + ' ';
            }

            promises.push(new Promise((resolve) => {
                PI(personalityInsights).then((data) => {
                    let personalities = [];
                    data.forEach(personality => {
                        personalities = personalities.concat(personality.children)
                    });
                    applicant.personalityInsights = personalities.sort((a, b) => b.raw_score - a.raw_score).slice(0, 5);
                    console.log(JSON.stringify(applicant.personalityInsights, null, 2));
                    resolve(data);
                })
            }));

            Promise.all(promises).then(() => {
                applicant
                    .save()
                    .then((data) => {
                        resolve(data);
                    }).catch((error) => {
                        reject(error);
                    })
            });
        });
    },

}