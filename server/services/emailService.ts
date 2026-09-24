import nodemailer from 'nodemailer';
import { config } from '../config';

let transporter: any = null;

if (config.smtp.user && config.smtp.pass) {
  transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.port === 465,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass
    }
  });
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  try {
    if (!transporter) {
      console.log(`[EMAIL DISPATCH (MOCK/DEV)] To: ${options.to} | Subject: ${options.subject}`);
      console.log(`[EMAIL BODY PREVIEW]:\n${options.text || options.html.replace(/<[^>]+>/g, ' ').slice(0, 300)}...`);
      return true;
    }

    await transporter.sendMail({
      from: config.smtp.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text
    });

    return true;
  } catch (err) {
    console.error('[EMAIL ERROR] Failed to deliver email:', err);
    return false;
  }
};

export const sendContactNotificationEmail = async (data: {
  inquiryId: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  budget?: string | null;
  message: string;
}): Promise<void> => {
  const subject = `[House Robotics New Lead] ${data.service || 'Inquiry'} - ${data.name} (${data.inquiryId})`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF9FF; color: #1e1b4b; padding: 24px; }
        .card { background: #ffffff; border-radius: 16px; border: 1px solid #E9E7F2; padding: 32px; max-width: 600px; margin: 0 auto; box-shadow: 0 10px 30px rgba(109,40,217,0.06); }
        .header { border-bottom: 2px solid #F3F0FF; padding-bottom: 16px; margin-bottom: 24px; }
        .badge { background: #EDE9FE; color: #6D28D9; font-weight: bold; font-size: 12px; padding: 4px 10px; border-radius: 12px; display: inline-block; }
        .field { margin-bottom: 16px; }
        .label { font-size: 11px; text-transform: uppercase; color: #6b7280; font-weight: bold; margin-bottom: 4px; }
        .value { font-size: 15px; color: #111827; font-weight: 500; }
        .message-box { background: #FAF9FF; border: 1px solid #E9E7F2; border-radius: 12px; padding: 16px; margin-top: 20px; font-size: 14px; line-height: 1.6; }
        .cta-btn { display: inline-block; background: #6D28D9; color: #ffffff !important; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 13px; margin-top: 24px; }
        .footer { text-align: center; font-size: 11px; color: #9ca3af; margin-top: 24px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <span class="badge">Inquiry ID: ${data.inquiryId}</span>
          <h2 style="margin: 12px 0 0 0; color: #0f172a; font-size: 22px;">New Client Lead Received</h2>
        </div>

        <div class="field">
          <div class="label">Contact Name</div>
          <div class="value">${data.name}</div>
        </div>

        <div class="field">
          <div class="label">Email Address</div>
          <div class="value"><a href="mailto:${data.email}" style="color: #6D28D9;">${data.email}</a></div>
        </div>

        ${data.phone ? `
        <div class="field">
          <div class="label">Phone / WhatsApp</div>
          <div class="value"><a href="tel:${data.phone}" style="color: #6D28D9;">${data.phone}</a></div>
        </div>` : ''}

        ${data.company ? `
        <div class="field">
          <div class="label">Company / Brand</div>
          <div class="value">${data.company}</div>
        </div>` : ''}

        ${data.service ? `
        <div class="field">
          <div class="label">Requested Service</div>
          <div class="value" style="color: #6D28D9; font-weight: bold;">${data.service}</div>
        </div>` : ''}

        ${data.budget ? `
        <div class="field">
          <div class="label">Target Budget</div>
          <div class="value">${data.budget}</div>
        </div>` : ''}

        <div class="message-box">
          <div class="label">Project Scope / Inbound Message</div>
          <p style="margin: 8px 0 0 0;">${data.message}</p>
        </div>

        <div style="text-align: center;">
          <a href="mailto:${data.email}?subject=Re:%20House%20Robotics%20Discovery%20-${encodeURIComponent(data.service || 'Growth')}" class="cta-btn">
            Reply Directly to Prospect
          </a>
        </div>

        <div class="footer">
          House Robotics Growth Engine &bull; Official Agency Notification &bull; ${config.officialEmail}
        </div>
      </div>
    </body>
    </html>
  `;

  await sendEmail({
    to: config.adminEmail,
    subject,
    html,
    text: `New Lead from ${data.name} (${data.email}, ${data.phone || 'no phone'}): Service: ${data.service}, Budget: ${data.budget}. Message: ${data.message}`
  });
};
