import fs from 'fs';
import path from 'path';

const sourceFile = path.resolve('../data.json');
const destDir = path.resolve('./dist');
const destFile = path.join(destDir, 'data.json');

fs.mkdir(destDir, { recursive: true }, (err) => {
    if (err) {
        console.error('Error creating destination directory:', err);
        return;
    }

    fs.copyFile(sourceFile, destFile, (err) => {
        if (err) {
            console.error('Error copying file:', err);
        } else {
            console.log('File copied successfully.');
        }
    });
});