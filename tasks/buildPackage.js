import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import mkdirp from 'mkdirp';
import rimraf from 'rimraf';
import _ from 'lodash';
import manifest from '../package.json';

const arch = 64;
const target = 'deb';
const buildDir = path.join(__dirname, '..', 'tmp');
const distdDir = path.join(__dirname, '..', 'dist');
const usrShare = path.join(buildDir, 'usr', 'share');
const usrShareApp = path.join(usrShare, 'applications');
const hicolor = path.join(usrShare, 'icons', 'hicolors');
const opt = path.join(buildDir, 'opt');
const appBuildPath = path.join(__dirname, '..', 'electron', 'linux', `${manifest.name}-linux-x64`);
const resources = path.join(__dirname, '..', 'resources', 'linux');
const manifestTemplate = path.join(resources, 'app.desktop');
const afterInstallTemplate = path.join(resources, 'after-install.sh');
const afterRemoveTemplate = path.join(resources, 'after-remove.sh');

const clean = () => {
	rimraf.sync(buildDir);
	rimraf.sync(distdDir);
};

const createFolders = () => {
	mkdirp.sync(distdDir);
	mkdirp.sync(usrShareApp);
	mkdirp.sync(hicolor);
	mkdirp.sync(opt);
};

const buildManisfest = () => {
	const data = {
		productName: manifest.name,
		description: manifest.description,
		genericName: manifest.name,
		name: manifest.name
	};
	const tplFile = fs.readFileSync(manifestTemplate, 'utf8');
	const tpl = _.template(tplFile);
	const merge = tpl(data);
	fs.writeFileSync(path.join(usrShareApp, `${manifest.name}.desktop`), merge, 'utf8');
};

const buildScripts = () => {
	const data = { name: manifest.name };
	let tplFile = fs.readFileSync(afterInstallTemplate, 'utf8');
	let tpl = _.template(tplFile);
	let merge = tpl(data);
	fs.writeFileSync(path.join(buildDir, 'after-install.sh'), merge, 'utf8');
	tplFile = fs.readFileSync(afterRemoveTemplate, 'utf8');
	tpl = _.template(tplFile);
	merge = tpl(data);
	fs.writeFileSync(path.join(buildDir, 'after-remove.sh'), merge, 'utf8');
};

const copyIcons = () => {
	execSync(`cp -R ${path.join(resources, 'icons')} ${hicolor}`);
};

const copyApp = () => {
	execSync(`cp -R ${appBuildPath} ${path.join(opt, manifest.name)}`);
};

const buildPackage = (buildArch, buildTarget) => {
	let archName;
	if (buildArch === 32) {
		archName = 'i386';
	}
	else if (buildTarget === 'deb') {
		archName = 'amd64';
	}
	else {
		archName = 'x86_64';
	}
	let packageName;
	if (process.env.TRAVIS_TAG) {
		packageName = `${path.join(distdDir, manifest.name)}-${process.env.TRAVIS_TAG}.${target}`;
	}
	else {
		packageName = `${path.join(distdDir, manifest.name)}-DEBUG.${target}`;
	}

	const args = [
		'-s dir',
		`-t ${target}`,
		`--architecture ${archName}`,
		'--rpm-os linux',
		`--name ${manifest.name}`,
		'--force',
		`--after-install ${path.join(buildDir, 'after-install.sh')}`,
		`--after-remove ${path.join(buildDir, 'after-remove.sh')}`,
		`--license ${manifest.license}`,
		`--description "${manifest.description}"`,
		`--url "${manifest.homepage}"`,
		`--maintainer "${manifest.author}"`,
		`--version "${manifest.version}"`,
		`--package ${packageName}`,
		`-C ${buildDir}`,
		'.'
	];

	fs.writeFileSync(path.join(opt, manifest.name, 'pkgtarget'), target, 'utf8');
	execSync(`fpm ${args.join(' ')}`);
};

clean();
createFolders();
buildManisfest();
buildScripts();
copyIcons();
copyApp();
buildPackage(arch, target);
