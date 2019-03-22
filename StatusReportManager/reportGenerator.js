"use strict";
var dateTimeGenerator = require('./dateTime.js');
var keyIncidentFetcher = require('./KeyIncidentFetcher.js');
var apiDataFetcher = require('./apiDataFetcher.js');

const docx = require("docx");
const fs = require("fs");

module.exports = {
    generateReport: function () {
        //fetch incidents
        var incidents = keyIncidentFetcher.fetchIncidents();
        incidents.then((result) => {
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
            incidentPara.addRun(new docx.TextRun("New incidents in the past 30 minutes:\n"));
            //incidentPara.addRun(new docx.TextRun());
            doc.addParagraph(incidentPara);

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