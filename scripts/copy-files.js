const path = require('path');
const fs = require('fs');
const glob = require('glob');

function copyFile(file) {
    const buildPath = path.resolve(__dirname, '../dist/', path.basename(file));
    const filePath = path.resolve(__dirname, file);
    fs.copyFileSync(filePath, buildPath);
    console.log(`Copied ${file} to ${buildPath}`);
}

function createPackageFile() {
    const packageData = fs.readFileSync(path.resolve(__dirname, '../package.json'), "utf8");
    const { nyc, scripts, devDependencies, workspaces, ...packageDataOther } = JSON.parse(
        packageData,
    );
    const newPackageData = {
        ...packageDataOther,
        main: './index.js',
        types: './index.d.ts',
        private: false,
    };
    const buildPath = path.resolve(__dirname, '../dist/package.json');

    fs.writeFileSync(buildPath, JSON.stringify(newPackageData, null, 2), 'utf8');
    console.log(`Created package.json in ${buildPath}`);

    return newPackageData;
}

function copyTypings() {
    const buildPath = path.resolve(__dirname, '../build/');
    const distPath = path.resolve(__dirname, '../dist/');
    const files = glob.sync('**/*.d.ts', {cwd: buildPath});
    files.forEach((file) => {
        fs.copyFileSync(path.resolve(buildPath, file), path.resolve(distPath, file));
        console.log(`Copied ${file} to ${buildPath}`);
    });
}

function run() {
    ['../LICENSE'].map(file => copyFile(file));
    copyTypings();
    createPackageFile();
}

run();