exports.saveTrial = function(req, res) {
    let mongoose = require('mongoose'),
        trial = mongoose.model('trial');

    trial.update({
        _id : mongoose.Types.ObjectId(req.body._id)
    }, {
        userID : mongoose.Types.ObjectId(req.body.profile.id),

        //Tracking information
        firstSubmittedDate : { value : req.body.firstSubmittedDate.value, status : req.body.firstSubmittedDate.status },
        firstPostedDate : { value : req.body.firstPostedDate.value, status : req.body.firstPostedDate.status },
        lastUpdatePostedDate : { value : req.body.lastUpdatePostedDate.value, status : req.body.lastUpdatePostedDate.status },
        startDate : { value : req.body.startDate.value, status : req.body.startDate.status },
        estimatedPrimaryCompletionDate : { value : req.body.estimatedPrimaryCompletionDate.value, status : req.body.estimatedPrimaryCompletionDate.status },
        currentPrimaryOutcomeMeasures : { value : req.body.currentPrimaryOutcomeMeasures.value, status : req.body.currentPrimaryOutcomeMeasures.status },
        originalPrimaryOutcomeMeasures : { value : req.body.originalPrimaryOutcomeMeasures.value, status : req.body.originalPrimaryOutcomeMeasures.status },
        changeHistory : { value : req.body.changeHistory.value, status : req.body.changeHistory.status },
        currentSecondaryOutcomeMeasures : { value : req.body.currentSecondaryOutcomeMeasures.value, status : req.body.currentSecondaryOutcomeMeasures.status },
        originalSecondaryOutcomeMeasures : { value : req.body.originalSecondaryOutcomeMeasures.value, status : req.body.originalSecondaryOutcomeMeasures.status },
        currentOtherOutcomeMeasures : { value : req.body.currentOtherOutcomeMeasures.value, status : req.body.currentOtherOutcomeMeasures.status },
        originalOtherOutcomeMeasures : { value : req.body.originalOtherOutcomeMeasures.value, status : req.body.originalOtherOutcomeMeasures.status },

        //Descriptive Information
        briefTitle : { value : req.body.briefTitle.value, status : req.body.briefTitle.status },
        officialTitle : { value : req.body.officialTitle.value, status : req.body.officialTitle.status },
        briefSummary : { value : req.body.briefSummary.value, status : req.body.briefSummary.status },
        detailedDescription : { value : req.body.detailedDescription.value, status : req.body.detailedDescription.status },
        studyType : { value : req.body.studyType.value, status : req.body.studyType.status },
        studyPhase : { value : req.body.studyPhase.value, status : req.body.studyPhase.status },
        studyDesign : { value : req.body.studyDesign.value, status : req.body.studyDesign.status },
        condition : { value : req.body.condition.value, status : req.body.condition.status },
        intervention : { value : req.body.intervention.value, status : req.body.intervention.status },
        studyArms : { value : req.body.studyArms.value, status : req.body.studyArms.status },
        publications : { value : req.body.publications.value, status : req.body.publications.status },

        //Recruitment Information
        recruitmentStatus : { value : req.body.recruitmentStatus.value, status : req.body.recruitmentStatus.status },
        estimatedEnrollment : { value : req.body.estimatedEnrollment.value, status : req.body.estimatedEnrollment.status },
        eligibilityCriteria : { value : req.body.eligibilityCriteria.value, status : req.body.eligibilityCriteria.status },
        gender : { value : req.body.gender.value, status : req.body.gender.status },
        ages : { value : req.body.ages.value, status : req.body.ages.status },
        acceptsHealthyVolunteers : { value : req.body.acceptsHealthyVolunteers.value, status : req.body.acceptsHealthyVolunteers.status },
        contacts : { value : req.body.contacts.value, status : req.body.contacts.status },
        listedLocationCountries : { value : req.body.listedLocationCountries.value, status : req.body.listedLocationCountries.status },
        removedLocationCountries : { value : req.body.removedLocationCountries.value, status : req.body.removedLocationCountries.status },

        //Administrative Information
        NCTNumber : { value : req.body.NCTNumber.value, status : req.body.NCTNumber.status },
        otherStudyIDNumbers : { value : req.body.otherStudyIDNumbers.value, status : req.body.otherStudyIDNumbers.status },
        hasDataMonitoringCommittee : { value : req.body.hasDataMonitoringCommittee.value, status : req.body.hasDataMonitoringCommittee.status},
        USFDARegulatedProduct : { value : req.body.USFDARegulatedProduct.value, status : req.body.USFDARegulatedProduct.status },
        IPDSharingStatement : { value : req.body.IPDSharingStatement.value, status : req.body.IPDSharingStatement.status },
        responsibleParty : { value : req.body.responsibleParty.value, status : req.body.responsibleParty.status },
        studySponsor : { value : req.body.studySponsor.value, status : req.body.studySponsor.status },
        collaborators : { value : req.body.collaborators.value, status : req.body.collaborators.status },
        investigators : { value : req.body.investigators.value, status : req.body.investigators.status },
        PRSAccount : { value : req.body.PRSAccount.value, status : req.body.PRSAccount.status },
        verificationDate : { value : req.body.verificationDate.value, status : req.body.verificationDate.status },
    }, {
        multi : false,
        upsert : true
    }, function (err, data) {
        if(err) {
            console.log(err);
            res.json({status: false});
        }else{
            res.json({status: true});
        }
    })
};