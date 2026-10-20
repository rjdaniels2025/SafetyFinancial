export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const data = JSON.parse(event.body);

    const {
      formType,
      name,
      email,
      phone,
      message,
      businessName,
      employees,
      fundingInterest,
      form_answers,
      // Lead Capture specific
      interest,
      timeline,
      current_coverage,
      budget,
      // Credit Repair specific
      current_credit_score,
      credit_concerns,
      financial_goals,
      // Final Expense specific
      age,
      coverage_amount,
      health_conditions,
      current_insurance,
      smoker,
      how_soon,
      // Credit Counselling specific
      debt_amount,
      debt_types,
      credit_score_range,
      // Quote Form specific
      service_type,
      coverage_type,
      quote_details,
    } = data;

    const timestamp = new Date().toLocaleString("en-CA", {
      timeZone: "America/Toronto",
    });

    let formattedMessage = `
📩 NEW WEBSITE INQUIRY
━━━━━━━━━━━━━━━━━━━━━━
📋 Form Type: ${formType || 'General Contact'}
🕐 Submitted: ${timestamp}

👤 Contact Information:
━━━━━━━━━━━━━━━━━━━━━━
Name: ${name || "N/A"}
Email: ${email || "N/A"}
Phone: ${phone || "N/A"}
`;

    // Add form-specific details based on form type
    if ((formType === 'lead_capture' || interest) && !form_answers) {
      formattedMessage += `
💼 Lead Capture Details:
━━━━━━━━━━━━━━━━━━━━━━
Interest: ${interest || "N/A"}
Timeline: ${timeline || "N/A"}
Current Coverage: ${current_coverage || "N/A"}
Budget: ${budget || "N/A"}
`;
    }

    if (formType === 'credit_repair' || current_credit_score) {
      formattedMessage += `
🔧 Credit Repair Details:
━━━━━━━━━━━━━━━━━━━━━━
Current Credit Score: ${current_credit_score || "N/A"}
Credit Concerns: ${Array.isArray(credit_concerns) ? credit_concerns.join(', ') : credit_concerns || "N/A"}
Financial Goals: ${Array.isArray(financial_goals) ? financial_goals.join(', ') : financial_goals || "N/A"}
Timeline: ${timeline || "N/A"}
`;
    }

    if (formType === 'final_expense' || age) {
      formattedMessage += `
💚 Final Expense Details:
━━━━━━━━━━━━━━━━━━━━━━
Age: ${age || "N/A"}
Coverage Amount: ${coverage_amount || "N/A"}
Health Conditions: ${health_conditions || "N/A"}
Current Insurance: ${current_insurance || "N/A"}
Smoker: ${smoker || "N/A"}
How Soon: ${how_soon || "N/A"}
`;
    }

    if (formType === 'credit_counselling' || debt_amount) {
      formattedMessage += `
💳 Credit Counselling Details:
━━━━━━━━━━━━━━━━━━━━━━
Debt Amount: ${debt_amount || "N/A"}
Debt Types: ${Array.isArray(debt_types) ? debt_types.join(', ') : debt_types || "N/A"}
Credit Score Range: ${credit_score_range || "N/A"}
`;
    }

    if (formType === 'quote_form' || service_type) {
      formattedMessage += `
📊 Quote Request Details:
━━━━━━━━━━━━━━━━━━━━━━
Service Type: ${service_type || "N/A"}
Coverage Type: ${coverage_type || "N/A"}
Quote Details: ${quote_details || "N/A"}
`;
    }

    if (businessName || employees || fundingInterest) {
      formattedMessage += `
🏢 Business Information:
━━━━━━━━━━━━━━━━━━━━━━
Business Name: ${businessName || "N/A"}
Number of Employees: ${employees || "N/A"}
Funding Interest: ${fundingInterest || "N/A"}
`;
    }

    if (form_answers) {
      formattedMessage += `
📋 Form Answers:
━━━━━━━━━━━━━━━━━━━━━━
${form_answers}
`;
    }

    if (message) {
      formattedMessage += `
💬 Message:
━━━━━━━━━━━━━━━━━━━━━━
${message}
`;
    }

    formattedMessage += `
━━━━━━━━━━━━━━━━━━━━━━
🏆 We Win Consultancy Group
📚 Website Inquiry
`;

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: formattedMessage,
          parse_mode: "HTML",
        }),
      }
    );

    if (!telegramResponse.ok) {
      const errorText = await telegramResponse.text();
      console.error("Telegram API error:", errorText);
      throw new Error("Telegram API failed");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("Error in telegram function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
}