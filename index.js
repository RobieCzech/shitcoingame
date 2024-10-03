const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

const TELEGRAM_API = 'https://api.telegram.org/bot7967598068:AAF95Xrkt81ms9i2_R3P2VNbqyoJwfeMTxU/'; // Sem vlož svůj API token
const GAME_URL = 'https://github.com/RobieCzech/shitcoingame.git'; // URL tvé webové hry

// Funkce na odeslání zprávy uživateli
const sendMessage = async (chatId, text) => {
  await fetch(`${TELEGRAM_API}sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
};

// Webhook pro přijímání zpráv od Telegramu
app.post('/webhook', (req, res) => {
  const message = req.body.message;
  const chatId = message.chat.id;
  const text = message.text;

  if (text === '/start') {
    sendMessage(chatId, 'Vítej v Ribblum! Klikni na tento odkaz pro spuštění hry: ' + GAME_URL);
  }

  res.sendStatus(200);
});

// Server poslouchá na portu 3000
app.listen(3000, () => {
  console.log('Server běží na portu 3000');
});
