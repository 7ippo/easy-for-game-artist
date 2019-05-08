// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

type dirData = {
	[index: string]: string[];
};

function makeDirRecursively(dir:string) {
	if (fs.existsSync(dir)) { return; }
	if (!fs.existsSync(path.dirname(dir))) {
		makeDirRecursively(path.dirname(dir));
	}
	try {
		fs.mkdirSync(dir);
	} catch (error) {
		vscode.window.showErrorMessage(error);	
	}
}

function loopMakingDir(data:dirData, base_path:string){
	for (const dir of Object.keys(data)) {
		if (data[dir].length === 0) {
			let path: string = base_path + '/' + dir;
			console.log('Making Dir :'+path);
			makeDirRecursively(path);
			break;
		}
		for (const direction of data[dir]) {
			let path: string = base_path + '/' + dir + '/' + direction;
			console.log('Making Dir :'+path);
			makeDirRecursively(path);
		}
	}
}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('easymakingdir is now active!');

	const playerDir: dirData = {
		'stat': ['0', '45', '90', '135', '180'],
		'behit': ['45', '135'],
		'dead': ['45', '135'],
		'run': ['0', '45', '90', '135', '180'],
		'ride_stat': ['45', '135'],
		'ride_run': ['45', '135'],
		'attack': ['45', '135'],
		'skill': ['45', '135'],
		'jump': ['0', '45', '90', '135', '180'],
		'hitdown': ['45', '135'],
		'htskill1': ['at/45', 'at/135', 'hit/45', 'hit/135'],
		'htskill2': ['at/45', 'at/135', 'hit/45', 'hit/135'],
		'htskill3': ['at/45', 'at/135', 'hit/45', 'hit/135']
	};

	const npcDir: dirData = {
		'stat': ['45', '135']
	};

	const monsterDir: dirData = {
		'stat': ['45', '135'],
		'behit': ['45', '135'],
		'dead': ['45', '135'],
		'run': ['45', '135'],
		'attack': ['45', '135']
	};

	const mountDir: dirData = {
		'stat': ['45', '135'],
		'stat_up': ['45', '135'],
		'run': ['45', '135'],
		'run_up': ['45', '135']
	};

	const douhunDir: dirData = {
		'stat': ['0', '45', '90', '135', '180'],
		'run': ['0', '45', '90', '135', '180']
	};

	const shbbDir: dirData = {
		'stat': ['0', '45', '90', '135', '180'],
		'run': ['0', '45', '90', '135', '180'],
		'attack': ['45', '135']
	};

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.quickMakePlayerDir', async (fileUri) => {
		loopMakingDir(playerDir, fileUri.fsPath);
	});

	let disposable2 = vscode.commands.registerCommand('extension.quickMakeNpcDir', async (fileUri) => {
		loopMakingDir(npcDir, fileUri.fsPath);
	});

	let disposable3 = vscode.commands.registerCommand('extension.quickMakeMonsterDir', async (fileUri) => {
		loopMakingDir(monsterDir, fileUri.fsPath);
	});

	let disposable4 = vscode.commands.registerCommand('extension.quickMakeMountDir', async (fileUri) => {
		loopMakingDir(mountDir, fileUri.fsPath);
	});

	let disposable5 = vscode.commands.registerCommand('extension.quickMakeDouhunDir', async (fileUri) => {
		loopMakingDir(douhunDir, fileUri.fsPath);
	});

	let disposable6 = vscode.commands.registerCommand('extension.quickMakeShbbDir', async (fileUri) => {
		loopMakingDir(shbbDir, fileUri.fsPath);
	});

	let disposable7 = vscode.commands.registerCommand('extension.quickClassifyFrames', async (fileUri) => {
		console.log(fileUri.fsPath);
	});
	
	context.subscriptions.push(disposable, disposable2, disposable3, disposable4, disposable5, disposable6, disposable7);
}

// this method is called when your extension is deactivated
export function deactivate() { }
