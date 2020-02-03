import axios from "axios";
 

const _baseUrl = "https://localhost:44321/api/React/Chat";


const sendMessageToApi = async (messageViewModel) => {
    const result = await axios.post(`${_baseUrl}hey/send`, messageViewModel );
    return await result;
};

const getMessages = async (UserID) => {
    const result =  await axios.post(`${_baseUrl}?=${UserID}`, {})  
    return await result;
};


export {getMessages,sendMessageToApi};