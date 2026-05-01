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

    // Reduce font sizes inside inputs
    content = content.replace(/text-lg/g, 'text-sm');
    content = content.replace(/text-xl/g, 'text-lg');
    content = content.replace(/text-2xl/g, 'text-xl');

    // Reduce massive paddings and margins
    content = content.replace(/p-6/g, 'p-4');
    content = content.replace(/p-8/g, 'p-5');
    content = content.replace(/px-6/g, 'px-3');
    content = content.replace(/px-5/g, 'px-3');
    content = content.replace(/py-3/g, 'py-2');
    content = content.replace(/py-4/g, 'py-2');
    
    // Reduce massive gaps
    content = content.replace(/gap-x-6/g, 'gap-x-4');
    content = content.replace(/gap-y-6/g, 'gap-y-4');
    content = content.replace(/gap-6/g, 'gap-4');
    content = content.replace(/space-y-6/g, 'space-y-4');
    content = content.replace(/space-y-4/g, 'space-y-3');
    content = content.replace(/space-y-5/g, 'space-y-3');

    // Change hardcoded grid-cols-2 to grid-cols-1 md:grid-cols-2 so it flows better
    content = content.replace(/grid-cols-2/g, 'grid-cols-1 md:grid-cols-2');

    // Make inputs smaller
    content = content.replace(/h-16/g, 'h-12');
    content = content.replace(/h-14/g, 'h-10');

    // Drop icons to be normal sized
    content = content.replace(/w-12 h-12/g, 'w-8 h-8');
    content = content.replace(/size=\{24\}/g, 'size={18}');
    content = content.replace(/size=\{20\}/g, 'size={16}');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Squeezed: ' + filePath);
    }
}

walkDir(path.join(__dirname, 'src', 'app'), replaceInFile);
walkDir(path.join(__dirname, 'src', 'components'), replaceInFile);
console.log('Done squeezing sizes.');
