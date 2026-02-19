require('dotenv').config();
const express = require('express');
const admin = require('firebase-admin');
const TelegramBot = require('node-telegram-bot-api');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const serviceAccount = JSON.parse(process.env.FIREBASE_JSON);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const bot = new TelegramBot(process.env.BOT_TOKEN);
bot.setWebHook("https://kaal-g-lifafa.onrender.com/bot");

app.get('/', (req, res) => {
  res.send("Kaal G Lifafa Backend Running 🚀");
});
app.post('/bot', (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

bot.onText(/\/start/, async (msg) => {

  const chatId = msg.chat.id;
  const username = msg.from.username || "no_username";

  await db.collection('telegram_users').doc(username).set({
    chatId: chatId
  });

  bot.sendMessage(chatId, "Telegram Connected Successfully ✅");
});
