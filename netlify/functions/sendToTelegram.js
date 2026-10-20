export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const {
      source,
      name,
      email,
      phone,
      businessName,
      employees,
      fundingInterest,
      message,
    } = JSON.parse(event.body);

    const telegramMessage = `
📩 New Lead Submission
━━━━━━━━━━━━━━━━━━

🔎 Source: ${source || "Website"}

👤 Name: ${name || "N/A"}
📧 Email: ${email || "N/A"}
📞 Phone: ${phone || "N/A"}

🏢 Business: ${businessName || "N/A"}
👥 Employees: ${employees || "N/A"}
💰 Funding Interest: ${fundingInterest || "N/A"}

📝 Message:
${message || "N/A"}

━━━━━━━━━━━━━━━━━━
`.trim();

    const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

    await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: telegramMessage,
      }),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send message" }),
    };
  }
}