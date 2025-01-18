const { Configuration } = require('openai');

module.exports.configureOpenAI = () => {
    return new Configuration({
        apiKey: process.env.OPEN_AI_SECRET,
        organization: process.env.OPENAI_ORGANIZATION_ID,
    });
}