import * as TelegramBot from 'node-telegram-bot-api';

const TOKEN = '';

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on('message', (msg) => {
  console.log('User input: ', msg.text);

  if (msg?.text?.includes('/help')) {
    bot.sendMessage(
      msg.chat.id,
      'The BetterSaveMessagesBot is created to give a better experience using a Telegram for notes & reminders. The Bot can help you not to forget an important task or even send you a reminder at desired time.',
    );
  }

  if (msg?.text?.includes('Remind me at')) {
    const date = msg.text.split('Remind me at')[1].trim();

    const scheduledTime = new Date(date).getTime();
    let currentTime = new Date().getTime();

    while (scheduledTime > currentTime) {
      currentTime = new Date().getTime();

      if (scheduledTime === currentTime) {
        bot.sendMessage(msg.chat.id, 'Time to remind you!', {});
      }
    }

    bot.sendMessage(msg.chat.id, `I'll remind you this at ${date}`, {});
  }
});

bot.on('polling_error', console.log);
