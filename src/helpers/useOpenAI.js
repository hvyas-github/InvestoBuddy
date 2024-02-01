import {OpenAI} from 'openai'
const key = ''

const configuration = {
    apiKey: key,
    dangerouslyAllowBrowser: true
}

const openai = new OpenAI(configuration)

export default openai