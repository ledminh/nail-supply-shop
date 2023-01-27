type ResponseType = ['error', string] | ['success', any];

type getErrMessagesType = (...responses: ResponseType[]) => string[];

const getErrMessages:getErrMessagesType = (...responses) => {
    return responses.filter(response => response[0] === 'error').map(response => response[1] as string);

}

export default getErrMessages;