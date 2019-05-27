// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

type dirData = {
	[index: string]: string[];
};

type framesConfig = {
	name: string,
	directions: string[],
	length: number
};

type framesJsonFile = {
	struct: framesConfig[]
};

type dirConstructFile = {
	"playerDir": dirData,
	"npcDir": dirData,
	"monsterDir": dirData,
	"mountDir": dirData,
	"douhunDir": dirData,
	"shbbDir": dirData,

};

function makeDirRecursively(dir: string) {
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

function loopMakingDir(data: dirData, base_path: string) {
	for (const dir of Object.keys(data)) {
		if (data[dir].length === 0) {
			let path: string = base_path + '/' + dir;
			console.log('Making Dir :' + path);
			makeDirRecursively(path);
			break;
		}
		for (const direction of data[dir]) {
			let path: string = base_path + '/' + dir + '/' + direction;
			console.log('Making Dir :' + path);
			makeDirRecursively(path);
		}
	}
}

function ReadFramesConfig(path: string): framesJsonFile {
	let fileContent = fs.readFileSync(path, { encoding: "utf-8" });
	try {
		return JSON.parse(fileContent);
	} catch (error) {
		vscode.window.showErrorMessage(path + ' json解析失败\n' + error);
		throw error;
	}
}

function ReadDirConstructConfig(path: string): dirConstructFile {
	let fileContent = fs.readFileSync(path, { encoding: "utf-8" });
	try {
		return JSON.parse(fileContent);
	} catch (error) {
		vscode.window.showErrorMessage(path + ' json解析失败\n' + error);
		throw error;
	}
}

function GetFramesArray(base_path: string): string[] | null {
	let framesReg = new RegExp('^\\d{5}.png$');
	let configReg = new RegExp('^config.json$');
	let hasConfigJson = false;
	let frames: string[] = [];

	if (fs.existsSync(base_path)) {
		let files = fs.readdirSync(base_path);
		files.forEach(element => {
			let fullname = path.join(base_path, element);
			let stats = fs.statSync(fullname);
			// 把序列帧依次塞进队列
			if (stats.isFile() && framesReg.test(element)) {
				frames.push(element);
			}
			if (configReg.test(element)) {
				hasConfigJson = true;
			}
		});
		if (!hasConfigJson) {
			vscode.window.showErrorMessage('请先配置config.json');
			return null;
		}
		return frames;
	} else {
		return null;
	}

}

function ClassifyFrames(base_path: string, frames: string[], json_config: framesJsonFile) {
	let frameCount: number = 0;
	json_config.struct.forEach(dir => {
		let length = dir.length;
		dir.directions.forEach(direction => {
			for (let i = 0; i < length; i++ , frameCount++) {
				let old_file = path.join(base_path, frames[frameCount]);
				let new_file = path.join(base_path, dir.name, direction, frames[frameCount]);
				fs.rename(old_file, new_file, (err) => {
					if (err) {
						throw err;
					}
				});
			}
		});
	});
}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('easymakingdir is now active!');

	let disposable7 = vscode.commands.registerCommand('extension.quickClassifyFrames', async (fileUri) => {
		let frames: string[] | null = GetFramesArray(fileUri.fsPath);
		if (!frames) {
			return;
		}
		// 检查一下Json配置的序列帧数量是否正确
		let config = ReadFramesConfig(path.join(fileUri.fsPath, 'config.json'));
		let count = 0;
		config.struct.forEach(element => {
			count += element.directions.length * element.length;
		});
		if (count > frames.length) {
			vscode.window.showWarningMessage('请检查config.json配置中序列帧的数量与文件夹下序列帧数量是否一致，当前配置会导致遍历越界');
			return;
		}
		ClassifyFrames(fileUri.fsPath, frames, config);
	});

	context.subscriptions.push(disposable7);
	vscode.window.showInformationMessage('快速归类序列帧功能已启用');

	// Read Default Directory Construction from JSON
	const dirConstructFilePath: string = "d:\\dirConstruct.json";

	if (fs.existsSync(dirConstructFilePath)) {
		let config: dirConstructFile = ReadDirConstructConfig(dirConstructFilePath);
		const playerDir: dirData = config.playerDir;
		const npcDir: dirData = config.npcDir;
		const monsterDir: dirData = config.monsterDir;
		const mountDir: dirData = config.mountDir;
		const douhunDir: dirData = config.douhunDir;
		const shbbDir: dirData = config.shbbDir;

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

		context.subscriptions.push(disposable, disposable2,
			disposable3, disposable4, disposable5, disposable6);
		vscode.window.showInformationMessage('快速创建模板文件夹功能已启用');
	} else {
		vscode.window.showErrorMessage('找不到d:\\dirConstruct.json \n快速创建文件夹功能不会启用。请在该路径下添加json配置后重启VS Code以启用快速创建文件夹功能');
		return;
	}

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

}

// this method is called when your extension is deactivated
export function deactivate() { }