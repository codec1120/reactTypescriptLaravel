require('dotenv').config();
const env = require('env-var');

interface envConfigI {
    REACT_APP_API?: string,
    REACT_APP_HEADER_AUTH?: string
}

const envConfig: envConfigI = {
    REACT_APP_API: env.get('REACT_APP_API').asString(),
    REACT_APP_HEADER_AUTH: env.get('REACT_APP_HEADER_AUTH').asString()
}


export default envConfig