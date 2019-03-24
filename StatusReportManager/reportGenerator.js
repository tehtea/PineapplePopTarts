"use strict";
var dateTimeGenerator = require('./dateTime.js');
var keyIncidentFetcher = require('./KeyIncidentFetcher.js');
var apiDataFetcher = require('./apiDataFetcher.js');
var NewIncident = require('./NewIncident.js');
var UpdatedIncident = require('./UpdatedIncident.js');
var ChangeRespondent = require('./ChangeRespondent.js');

const docx = require("docx");
const fs = require("fs");
const { WidthType } = docx;

module.exports = {
    generateReport: function () {
        //fetch incidents
        var newIncidents = [], updatedIncidents = [], changeRespondent = [];
        var incidents = keyIncidentFetcher.fetchIncidents();
        incidents.then((result) => {
            for (var i = 0; i < result[0].length; i++)
                newIncidents[i] = new NewIncident(result[0][i].RecordID, result[0][i].Name, result[0][i].Contact, result[0][i].Location, result[0][i].UnitNum, result[0][i].Descr, result[0][i].Resolved, result[0][i].InsTime, result[0][i].InsName);
            for (var i = 0; i < result[1].length; i++)
                updatedIncidents[i] = new UpdatedIncident(result[1][i].RecordID, result[1][i].Respondent, result[1][i].UpdTime, result[1][i].UpdName, result[1][i].Descr);
            for (var i = 0; i < result[2].length; i++)
                changeRespondent[i] = new ChangeRespondent(result[2][i].RecordID, result[2][i].Respondent, result[2][i].InsTime);
            console.log('Incidents fetched!');

            // Create empty document
            console.log('Creating Empty Document...');
            let doc = new docx.Document();

            // Add some content in the document
            console.log('Adding Content...');

            //Define a break between paragraphs
            let blankPara = new docx.Paragraph();

            //Define default heading para
            let headingPara = new docx.Paragraph().heading1().left();

            //Add title
            let titlePara = new docx.Paragraph().title().center();
            titlePara.addRun(new docx.TextRun("Status Summary Report").bold());
            doc.addParagraph(titlePara);
            doc.addParagraph(blankPara);
            let subtitlePara = new docx.Paragraph().left();
            subtitlePara.addRun(new docx.TextRun("For the period ").size(24));
            subtitlePara.addRun(new docx.TextRun(dateTimeGenerator.getDateTime30MinAgo()).size(24));
            subtitlePara.addRun(new docx.TextRun(" till ").size(24));
            subtitlePara.addRun(new docx.TextRun(dateTimeGenerator.getDateTimeNow()).size(24));
            doc.addParagraph(subtitlePara);
            doc.addParagraph(blankPara);


            //Past 30 minutes only TODO
            headingPara.addRun(new docx.TextRun("Incident(s) Summary:").bold());
            doc.addParagraph(headingPara);

            let newIncidentPara = new docx.Paragraph();
            newIncidentPara.addRun(new docx.TextRun("New incidents in the past 30 minutes:").bold());
            doc.addParagraph(newIncidentPara);

            //NEW INCIDENTS
            var newIncidentTable = doc.createTable(newIncidents.length + 1, 9);
            newIncidentTable.setWidth(WidthType.DXA, 9000);

            for (var j = 0; j < 9; j++) {
                var cell = newIncidentTable.getCell(0, j);
                switch (j) {
                    case 0: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Record ID').bold())); break;
                    case 1: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Name').bold())); break;
                    case 2: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Contact').bold())); break;
                    case 3: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Location').bold())); break;
                    case 4: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Unit Number').bold())); break;
                    case 5: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Description').bold())); break;
                    case 6: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Resolved?').bold())); break;
                    case 7: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Insert Time').bold())); break;
                    case 8: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Inserted By').bold())); break;
                }
            }

            for (var i = 0; i < result[0].length; i++) {
                for (var j = 0; j < 9; j++) {
                    cell = newIncidentTable.getCell(i + 1, j);
                    switch (j) {
                        case 0: cell.addContent(new docx.Paragraph(newIncidents[i].recordID.toString())); break;
                        case 1: cell.addContent(new docx.Paragraph(newIncidents[i].name)); break;
                        case 2: cell.addContent(new docx.Paragraph(newIncidents[i].contact)); break;
                        case 3: cell.addContent(new docx.Paragraph(newIncidents[i].location)); break;
                        case 4: cell.addContent(new docx.Paragraph(newIncidents[i].unitNum)); break;
                        case 5: cell.addContent(new docx.Paragraph(newIncidents[i].desc)); break;
                        case 6: cell.addContent(new docx.Paragraph(newIncidents[i].res.toString())); break;
                        case 7: cell.addContent(new docx.Paragraph(newIncidents[i].insTime)); break;
                        case 8: cell.addContent(new docx.Paragraph(newIncidents[i].insName)); break;
                    }

                }
            }
            doc.addParagraph(blankPara);

            //UPDATED INCIDENTS
            let updatedIncidentPara = new docx.Paragraph();
            updatedIncidentPara.addRun(new docx.TextRun("Updated incidents in the past 30 minutes:").bold());
            doc.addParagraph(updatedIncidentPara);

            var updateIncidentTable = doc.createTable(updatedIncidents.length + 1, 6);
            updateIncidentTable.setWidth(WidthType.DXA, 9000);

            for (var j = 0; j < 6; j++) {
                var cell = updateIncidentTable.getCell(0, j);
                switch (j) {
                    case 0: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Record ID').bold())); break;
                    case 1: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Respondent Type').bold())); break;
                    case 2: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Update Time').bold())); break;
                    case 3: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Updated By').bold())); break;
                    case 4: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Description Update').bold())); break;
                    case 5: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Resolved?').bold())); break;
                }
            }

            for (var i = 0; i < result[1].length; i++) {
                for (var j = 0; j < 6; j++) {
                    cell = updateIncidentTable.getCell(i + 1, j);
                    switch (j) {
                        case 0: cell.addContent(new docx.Paragraph(updatedIncidents[i].recordID.toString())); break;
                        case 1: cell.addContent(new docx.Paragraph(updatedIncidents[i].respondent)); break;
                        case 2: cell.addContent(new docx.Paragraph(updatedIncidents[i].updTime)); break;
                        case 3: cell.addContent(new docx.Paragraph(updatedIncidents[i].updName)); break;
                        case 4: cell.addContent(new docx.Paragraph(updatedIncidents[i].desc)); break;
                        case 5: cell.addContent(new docx.Paragraph(updatedIncidents[i].res)); break;
                    }

                }
            }
            doc.addParagraph(blankPara);

            //UPDATED RESPONDENTS
            let respondentIncidentPara = new docx.Paragraph();
            respondentIncidentPara.addRun(new docx.TextRun("Incidents with Updated Respondent Type(s) in the past 30 minutes:").bold());
            doc.addParagraph(respondentIncidentPara);

            var respondentIncidentTable = doc.createTable(changeRespondent.length + 1, 3);
            respondentIncidentTable.setWidth(WidthType.DXA, 9000);

            for (var j = 0; j < 3; j++) {
                var cell = respondentIncidentTable.getCell(0, j);
                switch (j) {
                    case 0: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Record ID').bold())); break;
                    case 1: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('New Respondent Type').bold())); break;
                    case 2: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Insert Time').bold())); break;
                }
            }

            for (var i = 0; i < result[2].length; i++) {
                for (var j = 0; j < 3; j++) {
                    cell = respondentIncidentTable.getCell(i + 1, j);
                    switch (j) {
                        case 0: cell.addContent(new docx.Paragraph(changeRespondent[i].recordID.toString())); break;
                        case 1: cell.addContent(new docx.Paragraph(changeRespondent[i].respondent)); break;
                        case 2: cell.addContent(new docx.Paragraph(changeRespondent[i].insTime)); break;
                    }

                }
            }
            doc.addParagraph(blankPara);

            //Retrieve key indicators
            //var keyIndicators = apiDataFetcher.fetchData();

            //Add Key Indicators TODO
            headingPara = new docx.Paragraph().heading1().left();
            headingPara.addRun(new docx.TextRun("Key Indicator(s) Summary:").bold());
            doc.addParagraph(headingPara);

            let indicatorPara = new docx.Paragraph();
            indicatorPara.addRun(new docx.TextRun(""));
            doc.addParagraph(indicatorPara);
            doc.addParagraph(blankPara);

            //Add Trend(s) TODO
            headingPara = new docx.Paragraph().heading1().left();
            headingPara.addRun(new docx.TextRun("Trend(s) Summary:").bold());
            doc.addParagraph(headingPara);

            let trendPara = new docx.Paragraph();
            trendPara.addRun(new docx.TextRun(""));
            doc.addParagraph(trendPara);
            doc.addParagraph(blankPara);

            //Add Date Time stamp in footer
            let timestampPara = doc.Footer.createParagraph("Report generated on ").right();
            timestampPara.addRun(new docx.TextRun(dateTimeGenerator.getDateTimeNow()));

            // Used to export the file into a .docx file
            console.log('Exporting Document...');
            let packer = new docx.Packer();
            try {
                packer.toBuffer(doc).then((buffer) => {
                    fs.writeFileSync("Status Summary Report.docx", buffer);
                });
                console.log('Document Exported!');
            }
            catch (error) {
                throw error;
            }

        });



    }
};