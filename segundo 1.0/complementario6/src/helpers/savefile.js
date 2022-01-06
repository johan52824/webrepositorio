const { SECRET_CONVERT_API, PUBLIC_PATH } = require('../config');
const path = require('path');
const fs = require('fs');
const convertApi = require('convertapi')(SECRET_CONVERT_API);

module.exports = async document => {
    const pdfFilePath = path.join(PUBLIC_PATH, 'document/' + document.md5 + '.pdf');
    const thumbnailFolder = path.join(PUBLIC_PATH, 'thumbnail/');

    if (document.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const wordFilePath = path.join(PUBLIC_PATH, '/document/' + document.md5 + '.docx');

        await document.mv(wordFilePath);
        const pdf = await convertApi.convert('pdf', { File: wordFilePath });
        await pdf.file.save(pdfFilePath);

        fs.unlinkSync(wordFilePath); // Delete .docx file
    }

    if (document.mimetype === 'application/pdf') {
        await document.mv(pdfFilePath);
    }

    const thumbnail = await convertApi.convert('jpg', {
        File: pdfFilePath,
        PageRange: '1'
    }, 'pdf');

    thumbnail.saveFiles(thumbnailFolder);

    return {
        documentUrl: '/document/' + document.md5 + '.pdf',
        imageThumbnailUrl: '/thumbnail/' + document.md5 + '.jpg'
    };
};
