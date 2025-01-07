module.exports = {
    plugins: ['commitlint-plugin-jira-rules'],
    extends: ['jira'],
    rules: {
        'references-empty': [2, 'never']
    },
    parserPreset: {
        parserOpts: {
            referenceActions: null,
            issuePrefixes: ['PMS-']
        }
    }
};
