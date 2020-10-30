const vscode = require('vscode');

const setRandomTheme = async () => {
	const allExtensions = vscode.extensions.all;
	const configuration = vscode.workspace.getConfiguration();
	const themes = [];

	allExtensions.forEach(ext => {
		if (ext.isActive) {
			const packageJSON = ext.packageJSON;

			if (packageJSON.contributes.themes && packageJSON.contributes.themes.length > 0) {
				packageJSON.contributes.themes.forEach(item => {
					themes.push(item.label);
				});
			}
		}
	});

	const random = Math.floor(Math.random() * Math.floor(themes.length));
	await configuration.update('workbench.colorTheme', themes[random]);
};

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "vscodeRandomTheme" is now active!');
	const configuration = vscode.workspace.getConfiguration();
	const isEnableRandomTheme = configuration.get('gitImprovements.enableRandomTheme');

	if (isEnableRandomTheme) {
		setTimeout(setRandomTheme, 2000);
	}

	let disposable = vscode.commands.registerCommand('vscodeRandomTheme.randomTheme', function () {
		setRandomTheme();
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
