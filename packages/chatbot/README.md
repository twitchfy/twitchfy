# @TWITCHAPI/CHATBOT

<hr>

This powerful node module allows you to customize your own Twitch Bot.

<h3><strong>FIRST STEPS</strong></h3>

<hr>

<div>
  <p>First of all you have to create a new <a href="https://dev.twitch.tv/console">Twitch Developer Application</a>. Later you have to <a href="https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#implicit-grant-flow">generate a user access token</a>with the account you want to make a bot and include the scopes <strong>chat:edit</strong> and <strong>chat:read</strong> to be able to read and send messages. You can also include other scopes that are needed to be able to execute some actions like ban users, delete messages, etc...<br>Then you can build your own <strong>TWITCH BOT</strong></p>
</div>

<h3>EXAMPLE CODE<h3>
<div>
   <p>This is an example about how to build your first bot and make a dice command!</p>
   <br>
   <p>

    import { ChatBot, EventNames } from "@twitchapi/chatbot"

    const chatbot = new ChatBot({ capabilities: { membership: true, commands: true, tags: true }, clientID: "clientID", channels: ["mychannel"], oauth: "token" }) // You have to include the ChatBot capabilities, is recommended to include all the capabilities to be able to receive events and additional and important information. You can include the channels that you want the ChatBot to join at the start of your application by include their username.

    chatbot.on(EventNames.Ready, () => {
        console.log(`Welcome ${chatbot.user.login} to the ChatBot!`)
    })

    chatbot.on(EventNames.PrivMsg, (message) => {
        if(message.content === "!dice"){
            return message.reply(`The dice point to the number ${Math.floor(Math.random() * 6)}`)
        }
    })

    chatbot.login("username") //you have to include the username of the user
    
   </p>
<div>