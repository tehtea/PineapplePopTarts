"use strict";
const docx = require("docx");
const fs = require("fs");

module.exports = {
    generateReport: function() {
        // Create attachment
        let doc = new docx.Document();
        console.log('Creating Empty Document...');
        // Add some content in the document
        let paragraph = new docx.Paragraph("Some cool text here.");
        // Add more text into the paragraph if you wish
        paragraph.addRun(new docx.TextRun("Lorem Ipsum Foo Bar"));
        doc.addParagraph(paragraph);
        console.log('Adding Content...');
        // Used to export the file into a .docx file
        let packer = new docx.Packer();
        packer.toBuffer(doc).then((buffer) => {
            fs.writeFileSync("Status Summary Report.docx", buffer);
        });
        console.log('Document Exported...');
    }
};