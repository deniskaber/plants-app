module.exports = {
    printWidth: 120,
    tabWidth: 4,
    singleQuote: true,
    trailingComma: 'all',
    bracketSpacing: false,
    arrowParens: 'always',
    endOfLine: 'lf',
    overrides: [
        {
            files: '*.scss',
            options: {
                'single-quote': false,
            },
        },
    ],
};
