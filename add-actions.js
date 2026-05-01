const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

function processPage(filePath) {
    if (!filePath.endsWith('page.tsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // 1. Add missing imports
    if (content.includes('lucide-react')) {
        if (!content.includes('Printer,')) content = content.replace(/import {([^}]+)} from "lucide-react";/, 'import {$1, Printer, Download, Edit} from "lucide-react";');
    }

    // 2. Replace the single Add button with a group of buttons (Print, Export, Add)
    // We look for: <button onClick={() => setIsModalOpen(true)} ...> ... إضافة ... </button>
    // Or similar variations
    
    const headerRegex = /<button\s+onClick=\{\(\)\s*=>\s*setIsModalOpen\(true\)\}[\s\S]*?<\/button>/;
    
    if (headerRegex.test(content) && !content.includes('window.print()')) {
        const match = content.match(headerRegex)[0];
        
        // Extract the exact text of the Add button to keep it
        let addText = "إضافة جديدة";
        if (match.includes("إضافة")) {
            const lines = match.split('\n');
            for (let l of lines) {
                if (l.includes("إضافة")) {
                    addText = l.replace(/<[^>]*>?/gm, '').trim();
                }
            }
        }
        
        const newButtons = `<div className="flex items-center gap-3">
          <button onClick={() => window.print()} className="bg-white/5 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-white/10 transition-all">
            <Printer size={18} /> طباعة
          </button>
          <button className="bg-white/5 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-white/10 transition-all">
            <Download size={18} /> تصدير
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-secondary text-primary px-4 py-2 rounded-xl font-black text-sm flex items-center gap-2 shadow-2xl shadow-secondary/20 hover:scale-105 transition-all"
          >
            <Plus size={18} />
            ${addText}
          </button>
        </div>`;
        
        content = content.replace(headerRegex, newButtons);
    }

    // 3. Add Edit button next to Delete button
    // Look for: <button onClick={() => removeItem(...)} ...> ... <Trash2 ... /> ... </button>
    const deleteRegex = /<button onClick=\{\(\)\s*=>\s*removeItem\(([^)]+)\)\}[\s\S]*?<\/button>/g;
    
    content = content.replace(deleteRegex, (match, idArg) => {
        if (match.includes("Edit") || match.includes("تعديل")) return match; // already injected
        
        // We will put the Edit button right before the Delete button in the same flow, or as a new button next to it.
        // Actually, let's just replace the delete button with a wrapper div containing both Edit and Delete.
        const editButton = `
                  <button className="p-3 text-secondary opacity-0 group-hover:opacity-100 transition-all hover:bg-secondary/10 rounded-xl" title="تعديل">
                     <Edit size={16} />
                  </button>`;
        
        // Find if it has absolute positioning
        if (match.includes('absolute')) {
            // Replace the delete button class to remove absolute, and wrap them in an absolute div
            let newDel = match.replace(/absolute top-\d+ left-\d+/, '');
            return `<div className="absolute top-5 left-5 flex gap-2">
${editButton}
${newDel}
</div>`;
        } else {
            return `<div className="flex gap-2">
${editButton}
${match}
</div>`;
        }
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Added actions to: ' + filePath);
    }
}

walkDir(path.join(__dirname, 'src', 'app'), processPage);
console.log('Done adding actions.');
