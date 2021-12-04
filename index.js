const mammoth = require("mammoth");
const fs = require("fs");

mammoth.extractRawText({path: "project_proposal.docx"})
.then(function(result){
    const text = result.value; // The raw text
    // const messages = result.messages;
    // console.log(messages);
    console.log(text)
})
.done();

// console.log({  })
// mammoth.images.imgElement(function(image) {
//     return image.read("base64").then(function(imageBuffer) {
//         console.log(imageBuffer);
//         return {
//             src: "data:" + image.contentType + ";base64," + imageBuffer
//         };
//     });
// });

const options = {
    styleMap: [
        "comment-reference => sup"
    ]
};
setTimeout(async () => {
    const html = await mammoth.convertToHtml({ path: "project_proposal.docx" }, options);
    // console.log({ html: html.value });
    const htmlTemplate = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            ${html.value}
        </body>
        </html>
    `;
    fs.writeFile('demo.html', htmlTemplate, 'ascii', (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;
    
        // success case, the file was saved
        console.log('Html content saved!');
    });
}, 0);