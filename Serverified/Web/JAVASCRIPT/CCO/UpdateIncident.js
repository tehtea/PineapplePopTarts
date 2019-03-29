// Entity Class - UpdateIncident 

	class UpdateIncident{
		constructor(recordID, respondentReporting, respondentRequested, updateDescr, updateName) {
			this.recordID = recordID;
			this.respondentReporting = respondentReporting;
			this.respondentRequested = respondentRequested;
			this.updateDescr = updateDescr;
			// Time generated in db
			this.updateTime;
			this.updateName = updateName;
		}
		
		// Accessor
		getRecordID() {return this.recordID;}
		getRespondentReporting() {return this.respondentReporting;}
		getRespondentRequested() {return this.respondentRequested;}
		getUpdateDescr() {return this.updateDescr;}
		getUpdateName() {return this.updateName;}
		getUpdateTime() {return this.updateTime;}
		
		// Mutator
		setRecordID(recordID) {this.recordID = recordID;}
		setRespondentReporting(respondentReporting) {this.respondentReporting=respondentReporting;}
		setRespondentRequested(respondentRequested) {this.respondentRequested=respondentRequested;}
		setUpdateDescr(updateDescr) {this.updateDescr=updateDescr;}
		setUpdateName(updateName) {this.updateName=updateName;}
		setUpdateTime(updateTime) {this.updateTime=updateTime;}
	}
