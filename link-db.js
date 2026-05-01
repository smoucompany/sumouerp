const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

function processLinking(filePath) {
    if (!filePath.endsWith('page.tsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    const isEmployeeRelated = filePath.includes(path.join('employees', 'iqama')) || 
                              filePath.includes(path.join('employees', 'passport')) || 
                              filePath.includes(path.join('employees', 'contracts')) || 
                              filePath.includes(path.join('employees', 'visas')) || 
                              filePath.includes(path.join('employees', 'tickets')) || 
                              filePath.includes(path.join('employees', 'health')) || 
                              filePath.includes(path.join('tasks'));

    const isEmployeePage = filePath.includes(path.join('employees', 'page.tsx'));
    const isLicensePage = filePath.includes(path.join('licenses', 'page.tsx'));

    if (isEmployeeRelated) {
        // Needs employees
        if (!content.includes('const { data: employeesList }')) {
            content = content.replace(/const \[isModalOpen/g, `const { data: employeesList } = useFirestore<any>("employees");\n  const [isModalOpen`);
        }
        
        // Replace hardcoded dummy options with dynamic options
        content = content.replace(/options=\{\[\s*\{\s*value:\s*"اختر الموظف\.\.\."[\s\S]*?\]\}/g, 
            `options={[{ value: "اختر الموظف...", label: "اختر الموظف..." }, ...(employeesList || []).map((emp: any) => ({ value: emp.fullName || emp.id, label: emp.fullName || emp.id }))]}`);
    }

    if (isEmployeePage) {
        // Employees link to CRs
        if (!content.includes('const { data: crsList }')) {
            content = content.replace(/const \[isModalOpen/g, `const { data: crsList } = useFirestore<any>("crs");\n  const [isModalOpen`);
        }
        content = content.replace(/options=\{\[\s*\{\s*value:\s*"بدون ربط"[\s\S]*?\]\}/g, 
            `options={[{ value: "بدون ربط", label: "بدون ربط (مؤسسة رئيسية)" }, ...(crsList || []).map((cr: any) => ({ value: cr.companyName || cr.id, label: cr.companyName || cr.id }))]}`);
    }

    if (isLicensePage) {
        // Licenses link to CRs
        if (!content.includes('const { data: crsList }')) {
            content = content.replace(/const \[isModalOpen/g, `const { data: crsList } = useFirestore<any>("crs");\n  const [isModalOpen`);
        }
        content = content.replace(/options=\{\[\s*\{\s*value:\s*"اختر السجل التجاري\.\.\."[\s\S]*?\]\}/g, 
            `options={[{ value: "اختر السجل التجاري...", label: "اختر السجل التجاري..." }, ...(crsList || []).map((cr: any) => ({ value: cr.companyName || cr.id, label: cr.companyName || cr.id }))]}`);
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Processed links in: ' + filePath);
    }
}

walkDir(path.join(__dirname, 'src', 'app'), processLinking);
console.log('Done processing linking.');
