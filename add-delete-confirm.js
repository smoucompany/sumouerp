const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

function addDeleteConfirmation(filePath) {
    if (!filePath.endsWith('page.tsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Search for onClick={() => removeItem(...)}
    const regex = /onClick=\{\(\)\s*=>\s*removeItem\(([^)]+)\)\}/g;
    content = content.replace(regex, `onClick={() => { if(window.confirm('هل أنت متأكد من الحذف؟ لا يمكن التراجع عن هذا الإجراء.')) removeItem($1); }}`);

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Added delete confirmation to: ' + filePath);
    }
}

walkDir(path.join(__dirname, 'src', 'app'), addDeleteConfirmation);
console.log('Done adding delete confirmations.');
