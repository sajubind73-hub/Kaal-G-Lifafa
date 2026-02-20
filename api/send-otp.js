export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    const { telegramId, otp } = req.body;
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const text = `🔐 *KGL REGISTRATION*\n\nYour OTP is: ${otp}`;
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${telegramId}&text=${encodeURIComponent(text)}&parse_mode=Markdown`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json({ success: data.ok });
    } catch (err) {
        res.status(500).json({ success: false });
    }
}

