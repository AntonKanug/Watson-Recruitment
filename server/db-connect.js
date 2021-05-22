const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb+srv://manager:${process.env.DB_PW}@watson-hiring-assistant.qbenz.mongodb.net/Watson-Hiring-Assistant?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
})

const RecruiterModel = {
    TEST: {
        type: String,
    }
}


const ApplicantModel = {
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    number: {
        type: String,
    },
    email: {
        type: String,
    },
    country: {
        type: String,
    },
    skills: {
        type: String,
    },
    interviewAnswers: {
        type: [String],
    },
    techAnswer: {
        type: String,
    },
    techAnsText: {
        type: String,
    },
    interviewAnalysis: {
        type: [Object],
    },
    personalityInsights:{
        type: Object
    },
    techAnalysis: {
        type: Object,
    },
    applicationID: {
        type: String,
    }
}

const ApplicationModel = {
    title: {
        type: String,
    },
    questions: {
        type: [String],
    },
    keywords: {
        type: [String],
    }
}

const Recruiters = mongoose.model("recruiters", RecruiterModel)
const Applicants = mongoose.model("applicants", ApplicantModel)
const Applications = mongoose.model("applications", ApplicationModel)

module.exports = {
    Recruiters: Recruiters,
    Applicants: Applicants,
    Applications: Applications
};