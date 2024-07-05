import model from "./config/gemini-ai.js";
// import readlineSync from 'readline-sync'; //comment out when using at backend
// import colors from 'colors';


const StartChat = async (userInput, chatHistory = []) => { //comment it when using at backend
    // const StartChat = async () => {  //comment out when using at backend
    // const chatHistory = []; //stores chat history // comment out when using at backend

    // while (true) {   //comment out when using at backend
    // const userInput = readlineSync.question("you: "); //comment out when using at backend

    const messages = chatHistory.map(([role, parts]) => ({ role, parts })); //creating the actual format of chat history according to gemini-ai 
    messages.push({ role: 'user', parts: [{ text: userInput }] });

    try {
        //using model to create a chat

        const chat = model.startChat({
            history: messages,
            generationConfig: {
                maxOutputTokens: 1000
            }
        });

        const result = await chat.sendMessage(userInput);
        const response = await result.response;
        const text = response.text();


        //exit input //comment out when using at backend
        // if (userInput.toLowerCase === 'exit') {
        //     console.log("bot: " + text); 
        //     // return text; //comment when using at backend
        //     return ; 
        // }

        //updating history
        chatHistory.push(['user', [{ text: userInput }]]);
        chatHistory.push(['model', [{ text: text }]]);

        console.log("bot: " + text);
        return text; //comment it when using at backend

    } catch (error) {
        console.error(error);
    }
    // } //comment out when using at backend
}

// StartChat(); //comment out when using at backend
export default StartChat;

