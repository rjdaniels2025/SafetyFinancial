// Receives website form submissions and forwards them to the firm's Telegram chat.
// Required environment variables: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID.

const MAX_FIELDS = 30;
const MAX_VALUE_LENGTH = 1500;
// Telegram rejects messages longer than 4096 characters
const MAX_MESSAGE_LENGTH = 4000;

const clean = (value, max = MAX_VALUE_LENGTH) => String(value ?? "").trim().slice(0, max);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let data;
  try {
    data = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  } catch {
    return res.status(400).json({ error: "Invalid request" });
  }

  // Hidden "website" field is invisible to people; bots that fill it get a silent success.
  if (data.website) {
    return res.status(200).json({ success: true });
  }

  const fields = Array.isArray(data.fields)
    ? data.fields
        .slice(0, MAX_FIELDS)
        .map((f) => ({ label: clean(f?.label, 80), value: clean(f?.value) }))
        .filter((f) => f.label && f.value)
    : [];
  const valueOf = (label) => fields.find((f) => f.label.toLowerCase() === label)?.value;

  if (!valueOf("name") || !valueOf("email") || data.consent !== true) {
    return res.status(400).json({ error: "Missing required information" });
  }

  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
    console.error("Inquiry received but Telegram environment variables are not configured");
    return res.status(500).json({ error: "Inquiries are temporarily unavailable" });
  }

  const timestamp = new Date().toLocaleString("en-CA", { timeZone: "America/Toronto" });
  const message = [
    "📩 NEW WEBSITE INQUIRY",
    `📋 ${clean(data.formType, 80) || "Website form"}`,
    `🕐 ${timestamp}`,
    "━━━━━━━━━━━━━━━━━━━━━━",
    ...fields.map((f) => `${f.label}: ${f.value}`),
    "━━━━━━━━━━━━━━━━━━━━━━",
    "WeWin Consulting Group · website",
  ].join("\n");

  try {
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Plain text: user input is not escaped for Telegram's HTML/Markdown modes
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: message.slice(0, MAX_MESSAGE_LENGTH),
          disable_web_page_preview: true,
        }),
      }
    );

    if (!telegramResponse.ok) {
      console.error("Telegram API error:", telegramResponse.status, await telegramResponse.text());
      return res.status(502).json({ error: "Could not deliver inquiry" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error delivering inquiry:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
