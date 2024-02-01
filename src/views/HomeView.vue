<script>
import { VueBotUI } from "vue-bot-ui";
import openai from "../helpers/useOpenAI";
export default {
  components: {
    VueBotUI,
  },
  data() {
    return {
      botTyping: false,
      messages: [
        // {
        //   agent: 'user', // Required. 'bot' or 'user'
        //   type: 'text', // Required. Bubble message component type: 'text' / 'button'
        //   text: 'Hello. How can I help you', // Required. The message
        //   disableInput: false, // Disable message input or not
        // },
        // {
        //   agent: 'user',
        //   type: 'text', // always
        //   text: 'I need a new laptop',
        // },
        // {
        // agent: 'bot',
        // type: 'button',
        // text: 'Select the option below',
        // disableInput: true,
        // options: [
        //   {
        //     text: 'Open Google',
        //     value: 'https://google.com',
        //     action: 'url'
        //   },
        //   {
        //     text: 'Submit Support Ticket',
        //     value: 'submit_ticket',
        //     action: 'postback' // Request to API
        //   },
        // ]
        // }
      ],
    };
  },
  methods: {
    botStart() {
      // Get token if you want to build a private bot
      // Request first message here

      // Fake typing for the first message
      this.botTyping = true;
      setTimeout(() => {
        this.botTyping = false;
        this.messages.push({
          agent: "bot",
          type: "text",
          text: "Hello",
        });
      }, 1000);
    },
    async msgSend(value) {
      this.messages.push({
        agent: "user",
        type: "text",
        text: value.text,
      });
      this.getResponseFromChatGPT(value);
      // this.getResponse(value);
    },
    async getResponseFromChatGPT(value) {
      const chat = await openai.chat.completions.create({
        messages: [{ role: "user", content: value.text }],
        model: "gpt-3.5-turbo",
      });
      console.log("answer", chat.choices[0].message);
      this.messages.push({
        agent: "bot",
        type: "text",
        text: chat.choices[0].message.content,
      });
    },
    getResponse(value) {
      let reply = {};
      console.log("value", value);
      let inputValue = value.text;

      if (inputValue === "hello") {
        console.log("matched");
        reply = {
          text: "Welcome to Simulator Learn section. How can I help you ?",
          agent: "bot",
          type: "text",
        };
      }
      if (inputValue === "learn options trading") {
        console.log("matched");
        reply = {
          type: "button",
          text: "Here are the results from our knowledgebase.",
          agent: "bot",
          options: [
            {
              text: "Click to learn about options",
              value: "https://www.investopedia.com/terms/o/option.asp",
              action: "url",
            },
          ],
        };
      }
      this.messages = [...this.messages, reply];
      console.log("this.mess", this.messages);
    },
  },
};
</script>

<template>
  <div class="learn">
    <img src="../assets/learn.png" />
    <VueBotUI
      :messages="this.messages"
      :bot-typing="this.botTyping"
      @init="this.botStart"
      @msg-send="msgSend"
    />
  </div>
</template>

<style>
.learn {
  height: 100vh;
}
.learn img {
  width: 100%;
  height: 100%;
}
</style>
