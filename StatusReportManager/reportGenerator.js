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
        return new Promise(function (resolve, reject) {
            //fetch incidents
            var newIncidents = [], updatedIncidents = [], changeRespondent = [];
            var incidents = keyIncidentFetcher.fetchIncidents();
            incidents.then((result) => {
				for (var i = 0; i < result[0].length; i++) {
					newIncidents[i] = new NewIncident(result[0][i].RecordID, result[0][i].Name, result[0][i].Contact, result[0][i].Location, result[0][i].UnitNum, result[0][i].Descr, result[0][i].Resolved, result[0][i].InsTime, result[0][i].InsName);
                }
                for (var i = 0; i < result[1].length; i++) {
                    updatedIncidents[i] = new UpdatedIncident(result[1][i].RecordID, result[1][i].Respondent, result[1][i].UpdTime, result[1][i].UpdName, result[1][i].Descr);
                }
                for (var i = 0; i < result[2].length; i++) {
                    changeRespondent[i] = new ChangeRespondent(result[2][i].RecordID, result[2][i].Respondent, result[2][i].InsTime);
                }
                console.log('Incidents fetched!');

                // Create empty document
                console.log('Creating Empty Document...');
                let doc = new docx.Document();

                // Add some content in the document
                console.log('Adding Content...');

                //Define a break between paragraphs
                const blankPara = new docx.Paragraph();

                //Define default heading para
                let headingPara = new docx.Paragraph().heading1().left();

                //Add title
                let titlePara = new docx.Paragraph().title().center();
                titlePara.addRun(new docx.TextRun("Status Summary Report").bold());
                doc.addParagraph(titlePara);
                doc.addParagraph(blankPara);
                let subtitlePara = new docx.Paragraph().left();
                subtitlePara.addRun(new docx.TextRun("For the period ").size(24).bold());
                subtitlePara.addRun(new docx.TextRun(dateTimeGenerator.getDateTime30MinAgo()).size(24).bold());
                subtitlePara.addRun(new docx.TextRun(" till ").size(24).bold());
                subtitlePara.addRun(new docx.TextRun(dateTimeGenerator.getDateTimeNow()).size(24).bold());
                doc.addParagraph(subtitlePara);
                doc.addParagraph(blankPara);

                //NEW INCIDENTS
                headingPara.addRun(new docx.TextRun("Incident(s) Summary:").bold());
                doc.addParagraph(headingPara);

                //Check if any new incidents
                let newIncidentPara = new docx.Paragraph();
                if (newIncidents.length == 0) {
                    newIncidentPara.addRun(new docx.TextRun("There are no new incidents in the past 30 minutes.").size(24).bold());
                    doc.addParagraph(newIncidentPara);
                }
                else {
                    newIncidentPara.addRun(new docx.TextRun("New incidents in the past 30 minutes:").size(24).bold());
                    doc.addParagraph(newIncidentPara);

                    //NEW INCIDENTS
                    var newIncidentTable = doc.createTable(newIncidents.length + 1, 9);
                    newIncidentTable.setWidth(WidthType.DXA, 9000);

                    for (var j = 0; j < 9; j++) {
                        var cell = newIncidentTable.getCell(0, j);
                        switch (j) {
                            case 0: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Record ID').size(24).bold())); break;
                            case 1: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Name').size(24).bold())); break;
                            case 2: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Contact').size(24).bold())); break;
                            case 3: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Location').size(24).bold())); break;
                            case 4: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Unit Number').size(24).bold())); break;
                            case 5: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Description').size(24).bold())); break;
                            case 6: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Resolved?').size(24).bold())); break;
                            case 7: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Insert Time').size(24).bold())); break;
                            case 8: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Inserted By').size(24).bold())); break;
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
                }
                doc.addParagraph(blankPara);

                //UPDATED INCIDENTS
                //Check if any updated incidents
                let updatedIncidentPara = new docx.Paragraph();
                if (updatedIncidents.length == 0) {
                    updatedIncidentPara.addRun(new docx.TextRun("There are no updated incidents in the past 30 minutes.").size(24).bold());
                    doc.addParagraph(updatedIncidentPara);
                }
                else {
                    updatedIncidentPara.addRun(new docx.TextRun("Updated incidents in the past 30 minutes:").size(24).bold());
                    doc.addParagraph(updatedIncidentPara);

                    var updateIncidentTable = doc.createTable(updatedIncidents.length + 1, 6);
                    updateIncidentTable.setWidth(WidthType.DXA, 9000);

                    for (var j = 0; j < 6; j++) {
                        var cell = updateIncidentTable.getCell(0, j);
                        switch (j) {
                            case 0: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Record ID').size(24).bold())); break;
                            case 1: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Respondent Type').size(24).bold())); break;
                            case 2: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Update Time').size(24).bold())); break;
                            case 3: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Updated By').size(24).bold())); break;
                            case 4: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Description Update').size(24).bold())); break;
                            case 5: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Resolved?').size(24).bold())); break;
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
                }
                doc.addParagraph(blankPara);

                //UPDATED RESPONDENTS
                //Check if any changed respondents
                let respondentIncidentPara = new docx.Paragraph();
                if (changeRespondent.length == 0) {
                    respondentIncidentPara.addRun(new docx.TextRun("There is no change of respondents in the past 30 minutes.").size(24).bold());
                    doc.addParagraph(respondentIncidentPara);
                }
                else {
                    respondentIncidentPara.addRun(new docx.TextRun("Incidents with Updated Respondent Type(s) in the past 30 minutes:").size(24).bold());
                    doc.addParagraph(respondentIncidentPara);

                    var respondentIncidentTable = doc.createTable(changeRespondent.length + 1, 3);
                    respondentIncidentTable.setWidth(WidthType.DXA, 9000);

                    for (var j = 0; j < 3; j++) {
                        var cell = respondentIncidentTable.getCell(0, j);
                        switch (j) {
                            case 0: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Record ID').size(24).bold())); break;
                            case 1: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('New Respondent Type').size(24).bold())); break;
                            case 2: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Insert Time').size(24).bold())); break;
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
                }
                doc.addParagraph(blankPara);

                //Retrieve key indicators
                var weatherData = {};
                var weatherCoords = [];
                console.log('Retrieving key indicators...');
                var keyIndicators = apiDataFetcher.fetchData();
                keyIndicators.then((data) => {
                    weatherData = data;
                    for (let i = 0; i < data["area_metadata"].length; i++) {
                        weatherCoords[i] = data["area_metadata"][i];
                    }

                    //console.log(weatherData);
                    //console.log(weatherCoords[46]["name"] + weatherData['items'][0]['forecasts'][46]['forecast']);
                    console.log('Weather data received!');

                    //Add Key Indicators 
                    headingPara = new docx.Paragraph().heading1().left();
                    headingPara.addRun(new docx.TextRun("Key Indicator(s) Summary:").size(24).bold());
                    doc.addParagraph(headingPara);

                    let weatherPara = new docx.Paragraph();
                    weatherPara.addRun(new docx.TextRun("2-hour Weather Forecasts:").size(24).bold());
                    doc.addParagraph(weatherPara);

                    var weatherTable = doc.createTable(weatherCoords.length + 1, 2);
                    weatherTable.setWidth(WidthType.DXA, 9000);

                    for (var j = 0; j < 2; j++) {
                        var cell = weatherTable.getCell(0, j);
                        switch (j) {
                            case 0: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('Location').size(24).bold())); break;
                            case 1: cell.addContent(new docx.Paragraph().addRun(new docx.TextRun('2hr Weather Forecast').size(24).bold())); break;
                        }
                    }

                    for (var i = 0; i < weatherCoords.length; i++) {
                        for (var j = 0; j < 2; j++) {
                            cell = weatherTable.getCell(i + 1, j);
                            switch (j) {
                                case 0: cell.addContent(new docx.Paragraph(weatherCoords[i]["name"])); break;
                                case 1: cell.addContent(new docx.Paragraph(weatherData['items'][0]['forecasts'][i]['forecast'])); break;
                            }
                        }
                    }
                    var weatherLastUpdate = weatherData['items'][0]['update_timestamp'];
                    weatherLastUpdate = weatherLastUpdate.replace('T', ', ');
                    weatherLastUpdate = weatherLastUpdate.substring(0, weatherLastUpdate.length - 9);

                    weatherPara = new docx.Paragraph();
                    weatherPara.addRun(new docx.TextRun("API data last updated on " + weatherLastUpdate).bold());
                    doc.addParagraph(weatherPara);
                    doc.addParagraph(blankPara);


                    //Add Date Time stamp in footer
                    let timestampPara = doc.Footer.createParagraph("Report generated on ").right();
                    timestampPara.addRun(new docx.TextRun(dateTimeGenerator.getDateTimeNow()));

                    // Used to export the file into a .docx file
                    console.log('Exporting Document...');
                    let packer = new docx.Packer();
                    try {
                        packer.toBuffer(doc).then((buffer) => {
                            fs.writeFileSync("./StatusReportManager/Status Summary Report.docx", buffer);
							console.log('Document Exported!');
							resolve(true);
						});
                    }
                    catch (error) {
						console.log(error);
                        throw error;
                    }
                })
            });
        });
    }
};