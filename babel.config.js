module.exports = {
	presets: ['module:metro-react-native-babel-preset', '@babel/preset-typescript'],
	plugins: [
		'@babel/plugin-syntax-dynamic-import',
		[
			'module-resolver',
			{
				root: ['./src'],
				extensions: [
					'.ios.ts',
					'.android.ts',
					'.ts',
					'.ios.tsx',
					'.android.tsx',
					'.tsx',
					'.jsx',
					'.js',
					'.json',
				],
				alias: {
					src: './src',
					Components: './src/Components',
					helper: './src/helper',
					config: './src/config',
					images: './src/Assets/Images',
					api: './src/api',
					screen: './src/screens',
					theme: './src/theme',
					Assets: './src/Assets',
				},
			},
		],
		[
			'import',
			{
				libraryName: 'react-use',
				libraryDirectory: 'lib',
				camel2DashComponentName: false,
			},
		],
		[
			'@babel/plugin-proposal-decorators',
			{
				legacy: true,
			},
		],
		'macros',
		'@babel/plugin-proposal-optional-chaining',
	],
};
