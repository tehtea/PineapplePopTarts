"use strict";
var dateTimeGenerator = require('./dateTime.js');
var keyIncidentFetcher = require('./KeyIncidentFetcher.js');
var apiDataFetcher = require('./apiDataFetcher.js');
var NewIncident = require('./NewIncident.js');

const docx = require("docx");
const fs = require("fs");
const { Document, Packer, Paragraph, RelativeHorizontalPosition, RelativeVerticalPosition, TableAnchorType, WidthType } = docx;

module.exports = {
    generateReport: function () {
        //fetch incidents
        var newIncidents = [];
        var incidents = keyIncidentFetcher.fetchIncidents();
        incidents.then((result) => {
            for (var i = 0; i < result[0].length; i++)
                newIncidents[i] = new NewIncident(result[0][i].RecordID, result[0][i].Name, result[0][i].Contact, result[0][i].Location, result[0][i].UnitNum, result[0][i].Descr, result[0][i].Resolved, result[0][i].InsTime, result[0][i].InsName);

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


            //Add New/Unresolved incidents TODO
            headingPara.addRun(new docx.TextRun("Incident(s) Summary:").bold());
            doc.addParagraph(headingPara);

            let incidentPara = new docx.Paragraph();
            incidentPara.addRun(new docx.TextRun("New incidents in the past 30 minutes:"));
            doc.addParagraph(incidentPara);

            var incidentTable = doc.createTable(result[0].length + 1, 9);
            incidentTable.setWidth(WidthType.DXA, 9000);

            for (var j = 0; j < 9; j++) {
                var cell = incidentTable.getCell(0, j);
                switch (j) {
                    case 0: cell.addContent(new docx.Paragraph('Record ID')); break;
                    case 1: cell.addContent(new docx.Paragraph('Name')); break;
                    case 2: cell.addContent(new docx.Paragraph('Contact')); break;
                    case 3: cell.addContent(new docx.Paragraph('Location')); break;
                    case 4: cell.addContent(new docx.Paragraph('Unit Number')); break;
                    case 5: cell.addContent(new docx.Paragraph('Description')); break;
                    case 6: cell.addContent(new docx.Paragraph('Resolved?')); break;
                    case 7: cell.addContent(new docx.Paragraph('Ins Time')); break;
                    case 8: cell.addContent(new docx.Paragraph('Ins Name')); break;
                }
            }
            
            for (var i = 0; i < result[0].length; i++) {
                for (var j = 0; j < 9; j++) {
                    cell = incidentTable.getCell(i + 1, j);
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