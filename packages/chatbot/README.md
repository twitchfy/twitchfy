# TWITCHAPI/CHATBOT

***

This powerful node module allows you to customize your own Twitch Bot.

### **FIRST STEPS** </h3>

***

First of all you have to create a new [Twitch Developer Application](https://dev.twitch.tv/console). Later you have to [generate a user access token](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#implicit-grant-flow) with the account you want to make a bot and include the scopes **chat:edit** and **chat:read** to be able to read and send messages. You can also include other scopes that are needed to be able to execute some actions like ban users, delete messages, etc...

Then you can build your own **TWITCH BOT**

### **EXAMPLE CODE**
###### This is an example about how to build your first bot and make a dice command!

    ```js
    import { ChatBot, EventNames } from "@twitchapi/chatbot"

    const chatbot = new ChatBot({ capabilities: { membership: true, commands: true, tags: true }, clientID: "clientID", channels: ["mychannel"], oauth: "token", nick: "chatbotUsername" }) // You have to include the ChatBot capabilities, is recommended to include both three and the channels the bot will join at the start of the application.

    chatbot.on(EventNames.Ready, () => {
        console.log(`Welcome ${chatbot.user.login} to the ChatBot!`)
    })

    chatbot.on(EventNames.PrivMsg, (message) => {
        if(message.content === "!dice"){
            return message.reply(`The dice point to the number ${Math.floor(Math.random() * 6)}`)
        }
    })

    chatbot.login()
    ```
    

You can search for the package's documentation in https://pablornc.github.io/twitchapi/

You are free of making a pull request in the [official github repository](https://github.com/PabloRNC/twitchapi)!


</div>