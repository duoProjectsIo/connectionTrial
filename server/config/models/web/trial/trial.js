let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    objSchema = new mongoose.Schema({
        trialID: Schema.ObjectId,
        userID : { type: Schema.ObjectId, required: true, ref : 'userAdmin'},
        dateCreate : { type : Date, default: Date.now },

        keywords : [{ type : String }],

        //Tracking information
        firstSubmittedDate : { value : {type : Date, default: Date.now }, status : { type : Boolean } },
        firstPostedDate : { value : {type : Date, default: Date.now }, status : { type : Boolean } },
        lastUpdatePostedDate : { value : {type : Date, default: Date.now }, status : { type : Boolean } },
        startDate : { value : {type : Date, default: Date.now }, status : { type : Boolean } },
        estimatedPrimaryCompletionDate : { value : {type : Date, default: Date.now }, status : { type : Boolean } },
        currentPrimaryOutcomeMeasures : { value : {type: String }, status : { type : Boolean } },
        originalPrimaryOutcomeMeasures : { value : {type: String }, status : { type : Boolean } },
        changeHistory : { value : {type: String }, status : { type : Boolean } },
        currentSecondaryOutcomeMeasures : { value : {type: String }, status : { type : Boolean } },
        originalSecondaryOutcomeMeasures : { value : {type: String }, status : { type : Boolean } },
        currentOtherOutcomeMeasures : { value : {type: String }, status : { type : Boolean } },
        originalOtherOutcomeMeasures : { value : {type: String }, status : { type : Boolean } },

        //Descriptive Information
        briefTitle : { value : {type: String }, status : { type : Boolean } },
        officialTitle : { value : {type: String }, status : { type : Boolean } },
        briefSummary : { value : {type: String }, status : { type : Boolean } },
        detailedDescription : { value : {type: String }, status : { type : Boolean } },
        studyType : { value : {type: String }, status : { type : Boolean } },
        studyPhase : { value : {type: String }, status : { type : Boolean } },
        studyDesign : { value : {type: String }, status : { type : Boolean } },
        condition : { value : {type: String }, status : { type : Boolean } },
        intervention : { value : {type: String }, status : { type : Boolean } },
        studyArms : { value : {type: String }, status : { type : Boolean } },
        publications : { value : {type: String }, status : { type : Boolean } },

        //Recruitment Information
        recruitmentStatus : { value : {type: String }, status : { type : Boolean } },
        estimatedEnrollment : { value : {type: String }, status : { type : Boolean } },
        eligibilityCriteria : { value : {type: String }, status : { type : Boolean } },
        gender : { value : {type: String }, status : { type : Boolean } },
        ages : { value : {type: String }, status : { type : Boolean } },
        acceptsHealthyVolunteers : { value : {type: String }, status : { type : Boolean } },
        contacts : { value : {type: String }, status : { type : Boolean } },
        listedLocationCountries : { value : {type: String }, status : { type : Boolean } },
        removedLocationCountries : { value : {type: String }, status : { type : Boolean } },

        //Administrative Information
        NCTNumber : { value : {type: String }, status : { type : Boolean } },
        otherStudyIDNumbers : { value : {type: String }, status : { type : Boolean } },
        hasDataMonitoringCommittee : { value : {type: String }, status : { type : Boolean } },
        USFDARegulatedProduct : { value : {type: String }, status : { type : Boolean } },
        IPDSharingStatement : { value : {type: String }, status : { type : Boolean } },
        responsibleParty : { value : {type: String }, status : { type : Boolean } },
        studySponsor : { value : {type: String }, status : { type : Boolean } },
        collaborators : { value : {type: String }, status : { type : Boolean } },
        investigators : { value : {type: String }, status : { type : Boolean } },
        PRSAccount : { value : {type: String }, status : { type : Boolean } },
        verificationDate : { value : {type : Date, default: Date.now }, status : { type : Boolean } },
});

module.exports = mongoose.model('trial', objSchema);