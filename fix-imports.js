const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

function fixImports(filePath) {
    if (!filePath.endsWith('.tsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    const lucideImportRegex = /import\s+\{([^}]+)\}\s+from\s+"lucide-react";/g;
    content = content.replace(lucideImportRegex, (match, importsStr) => {
        let imports = importsStr.split(',').map(s => s.trim()).filter(s => s !== '');
        let uniqueImports = [...new Set(imports)];
        return `import { ${uniqueImports.join(', ')} } from "lucide-react";`;
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed imports in: ' + filePath);
    }
}

walkDir(path.join(__dirname, 'src', 'app'), fixImports);
walkDir(path.join(__dirname, 'src', 'components'), fixImports);
console.log('Done fixing imports.');
