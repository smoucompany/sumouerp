const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

function replaceInFile(filePath) {
    if (!filePath.endsWith('page.tsx') && !filePath.endsWith('Modal.tsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Reduce font sizes
    content = content.replace(/text-5xl/g, 'text-2xl');
    content = content.replace(/text-4xl/g, 'text-xl');
    content = content.replace(/text-3xl/g, 'text-xl');
    
    // Reduce massive paddings and margins
    content = content.replace(/p-10/g, 'p-6');
    content = content.replace(/p-12/g, 'p-6');
    content = content.replace(/p-16/g, 'p-6');
    content = content.replace(/px-12/g, 'px-5');
    content = content.replace(/py-7/g, 'py-3');
    content = content.replace(/py-8/g, 'py-4');
    content = content.replace(/py-5/g, 'py-3');
    content = content.replace(/px-10/g, 'px-5');
    
    // Reduce massive gaps
    content = content.replace(/gap-x-16/g, 'gap-x-6');
    content = content.replace(/gap-y-12/g, 'gap-y-6');
    content = content.replace(/gap-16/g, 'gap-6');
    content = content.replace(/gap-12/g, 'gap-6');
    content = content.replace(/gap-10/g, 'gap-6');
    content = content.replace(/space-y-14/g, 'space-y-6');
    content = content.replace(/space-y-12/g, 'space-y-6');
    content = content.replace(/space-y-10/g, 'space-y-6');
    content = content.replace(/space-y-8/g, 'space-y-4');

    // Reduce border radius
    content = content.replace(/rounded-\[4rem\]/g, 'rounded-3xl');
    content = content.replace(/rounded-\[3rem\]/g, 'rounded-3xl');
    content = content.replace(/rounded-\[2\.5rem\]/g, 'rounded-2xl');
    content = content.replace(/rounded-\[2rem\]/g, 'rounded-xl');

    // Reduce icons/divs sizing
    content = content.replace(/w-24 h-24/g, 'w-12 h-12');
    content = content.replace(/size=\{48\}/g, 'size={24}');
    content = content.replace(/size=\{32\}/g, 'size={20}');
    content = content.replace(/size=\{28\}/g, 'size={18}');

    // Reduce input heights
    content = content.replace(/h-40/g, 'h-24'); // for textareas

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated: ' + filePath);
    }
}

walkDir(path.join(__dirname, 'src', 'app'), replaceInFile);
walkDir(path.join(__dirname, 'src', 'components'), replaceInFile);
console.log('Done replacing sizing utilities.');
