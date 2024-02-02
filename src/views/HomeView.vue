<script>
import { VueBotUI } from "vue-bot-ui";
import BotIcon from '../assets/bot-logo.webp'
export default {
  components: {
    VueBotUI,
  },
  data() {
    return {
      botTyping: false,
      botOptions: {
        botTitle: 'InvestoBuddy',
        colorScheme: '#5b7ce8',
        botAvatarImg: BotIcon
      },
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
    msgSend(value) {
      this.messages.push({
        agent: "user",
        type: "text",
        text: value.text,
      });
      this.getResponse(value);
    },
    getResponse(value) {
      let reply = {};
      console.log("value", value);
      let inputValue = value.text;

       if(inputValue ===  "hello") {
          console.log("matched");
          reply = {
            text: "Hi I am InvestoBuddy. How can I help you ?",
            agent: "bot",
            type: "text",
          };
       }
       if(inputValue === "What is ETF?") {
        console.log('matched')
          reply = {
            type: "button",
            text: "An ETF, or Exchange-Traded Fund, is a type of investment fund and exchange-traded product, with shares that are tradeable on a stock exchange. To know more visit: ",
            agent: 'bot',
            options: [
              {
                text: "Click to learn about ETF",
                value: "https://www.investopedia.com/terms/e/etf.asp",
                action: "url",
              },
            ]
          };
      }
       if(inputValue === "I want to learn options trading") {
        console.log('matched')
          reply = {
            type: "button",
            text: "Here are the results from our knowledgebase.",
            agent: 'bot',
            options: [
              {
                text: "Click to learn about options",
                value: "https://www.investopedia.com/terms/o/option.asp",
                action: "url",
              },
            ]
          };
      }
      if(inputValue === "How can I see my order status?") {
        console.log('matched')
          reply = {
            type: "button",
            text: "Go to https://www.investopedia.com/simulator/ and login using your credentials. Select your game from dropdown on left top corner. Click on Trade -> Order Status.",
            agent: 'bot',
            options: [
              {
                text: "Click to see your order status:",
                value: "https://www.investopedia.com/simulator/trade/order-status",
                action: "url",
              },
            ]
          };
      }
      if(inputValue === "What is the current price of AAPL?") {
        console.log('matched')
          reply = {
            type: "button",
            text: "Market is closed now but last closing price for AAPL (Apple) was 186.86 USD",
            agent: 'bot',
            options: [
              {
                text: "Click to search stock symbols:",
                value: "https://www.investopedia.com/simulator/trade/stocks",
                action: "url",
              },
            ]
          };
        }
          if(inputValue === "What are the popular stocks today?") {
          console.log('matched')
          reply = {
            type: "button",
            text: "Market is closed now but you can find Most Traded Stocks here: ",
            agent: 'bot',
            options: [
              {
                text: "Click to find Most Traded Stocks:",
                value: "https://www.investopedia.com/simulator/research",
                action: "url",
              },
            ]
          };
        }
        if(inputValue === "Where can I trade real time?") {
          console.log('matched')
          reply = {
            type: "button",
            text: "Investopedia Simulator is a paper trading application that allows users to learn about investing and experiment using different strategies without risking real money. For real time trading, Go and vist our sponsered partner: ",
            agent: 'bot',
            options: [
              {
                text: "Click to do real time trading:",
                value: "www.trading-sponser.com",
                action: "url",
              },
            ]
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
      :options="this.botOptions"
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
