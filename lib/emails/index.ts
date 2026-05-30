import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "Yetihomes <concierge@yetihomes.com>";
const ADMIN_EMAIL = "spitfiregg02@gmail.com";

export interface EmailData {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  category?: string;
  inquiryType?: string;
  propertyId?: string;
  propertySlug?: string;
}

function renderTemplate(content: string, data: Record<string, unknown>): string {
  let result = content;
  for (const [key, value] of Object.entries(data)) {
    result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), String(value ?? ""));
  }
  return result;
}

const NEWSLETTER_WELCOME_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Yetihomes</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="background:linear-gradient(135deg,#1a237e 0%,#0d47a1 100%);padding:40px 40px 30px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;">Yetihomes</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;letter-spacing:2px;text-transform:uppercase;">Premium Real Estate</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;text-align:center;">
              <div style="width:60px;height:60px;background:#e8f5e9;border-radius:50%;margin:0 auto 24px;display:flex;align-items:center;justify-content:center;">
                <span style="font-size:28px;">✓</span>
              </div>
              <h2 style="margin:0 0 16px;color:#1a237e;font-size:24px;font-weight:600;">Welcome to Yetihomes!</h2>
              <p style="margin:0;color:#546e7a;font-size:16px;line-height:1.6;">
                Thank you for subscribing to our newsletter. You'll now receive exclusive updates on premium properties, market insights, and investment opportunities.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 40px;text-align:center;">
              <a href="https://yetihomes.com" style="display:inline-block;padding:14px 32px;background:#1a237e;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">Browse Properties</a>
            </td>
          </tr>
          <tr>
            <td style="background:#f5f5f5;padding:24px 40px;text-align:center;border-top:1px solid #e0e0e0;">
              <p style="margin:0;color:#78909c;font-size:12px;">
                © 2026 Yetihomes. All rights reserved.<br>
                Kathmandu, Nepal
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const SUPPORT_TICKET_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Support Ticket Confirmation</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="background:linear-gradient(135deg,#1a237e 0%,#0d47a1 100%);padding:40px 40px 30px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;">Yetihomes</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;letter-spacing:2px;text-transform:uppercase;">Support Desk</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;text-align:center;">
              <div style="width:60px;height:60px;background:#e3f2fd;border-radius:50%;margin:0 auto 24px;display:flex;align-items:center;justify-content:center;">
                <span style="font-size:28px;">🎫</span>
              </div>
              <h2 style="margin:0 0 16px;color:#1a237e;font-size:24px;font-weight:600;">Support Ticket Received</h2>
              <p style="margin:0 0 24px;color:#546e7a;font-size:16px;line-height:1.6;">
                Thank you for contacting us. We've received your inquiry and will respond within 24 hours.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;border-radius:8px;margin:20px 0;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0 0 8px;color:#78909c;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Ticket Reference</p>
                    <p style="margin:0;color:#1a237e;font-size:18px;font-weight:600;">{{ticketId}}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 20px 16px;">
                    <p style="margin:0 0 8px;color:#78909c;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Subject</p>
                    <p style="margin:0;color:#37474f;font-size:14px;">{{subject}}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#f5f5f5;padding:24px 40px;text-align:center;border-top:1px solid #e0e0e0;">
              <p style="margin:0;color:#78909c;font-size:12px;">
                © 2026 Yetihomes. All rights reserved.<br>
                Kathmandu, Nepal
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const NEW_TICKET_ADMIN_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Support Ticket</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="background:linear-gradient(135deg,#c62828 0%,#d32f2f 100%);padding:40px 40px 30px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;">Yetihomes</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;letter-spacing:2px;text-transform:uppercase;">New Support Ticket</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              <div style="background:#ffebee;border-left:4px solid #c62828;padding:16px;border-radius:0 8px 8px 0;margin-bottom:24px;">
                <p style="margin:0;color:#c62828;font-size:14px;font-weight:600;">New ticket from {{name}} ({{email}})</p>
              </div>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #eceff1;">
                    <p style="margin:0 0 4px;color:#78909c;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Ticket ID</p>
                    <p style="margin:0;color:#37474f;font-size:14px;">{{ticketId}}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #eceff1;">
                    <p style="margin:0 0 4px;color:#78909c;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Category</p>
                    <p style="margin:0;color:#37474f;font-size:14px;">{{category}}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #eceff1;">
                    <p style="margin:0 0 4px;color:#78909c;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Phone</p>
                    <p style="margin:0;color:#37474f;font-size:14px;">{{phone}}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0 0;">
                    <p style="margin:0 0 4px;color:#78909c;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Message</p>
                    <p style="margin:0;color:#37474f;font-size:14px;line-height:1.6;white-space:pre-wrap;">{{message}}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#f5f5f5;padding:24px 40px;text-align:center;border-top:1px solid #e0e0e0;">
              <p style="margin:0;color:#78909c;font-size:12px;">
                © 2026 Yetihomes. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const INQUIRY_CONFIRMATION_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inquiry Confirmation</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="background:linear-gradient(135deg,#1a237e 0%,#0d47a1 100%);padding:40px 40px 30px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;">Yetihomes</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;letter-spacing:2px;text-transform:uppercase;">Private Consultations</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;text-align:center;">
              <div style="width:60px;height:60px;background:#e8f5e9;border-radius:50%;margin:0 auto 24px;display:flex;align-items:center;justify-content:center;">
                <span style="font-size:28px;">&#10004;</span>
              </div>
              <h2 style="margin:0 0 16px;color:#1a237e;font-size:24px;font-weight:600;">Inquiry Received</h2>
              <p style="margin:0 0 24px;color:#546e7a;font-size:16px;line-height:1.6;">
                Thank you for your interest. A dedicated portfolio director will contact you within 24 hours.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;border-radius:8px;margin:20px 0;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0 0 8px;color:#78909c;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Inquiry Type</p>
                    <p style="margin:0;color:#1a237e;font-size:18px;font-weight:600;">{{inquiryType}}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 40px;text-align:center;">
              <a href="https://yetihomes.com/contact" style="display:inline-block;padding:14px 32px;background:#1a237e;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">Contact Us Directly</a>
            </td>
          </tr>
          <tr>
            <td style="background:#f5f5f5;padding:24px 40px;text-align:center;border-top:1px solid #e0e0e0;">
              <p style="margin:0;color:#78909c;font-size:12px;">
                © 2026 Yetihomes. All rights reserved.<br>
                Kathmandu, Nepal
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const NEW_INQUIRY_ADMIN_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Property Inquiry</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="background:linear-gradient(135deg,#2e7d32 0%,#388e3c 100%);padding:40px 40px 30px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;">Yetihomes</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;letter-spacing:2px;text-transform:uppercase;">New Property Inquiry</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              <div style="background:#e8f5e9;border-left:4px solid #2e7d32;padding:16px;border-radius:0 8px 8px 0;margin-bottom:24px;">
                <p style="margin:0;color:#2e7d32;font-size:14px;font-weight:600;">New inquiry from {{name}} ({{email}})</p>
              </div>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #eceff1;">
                    <p style="margin:0 0 4px;color:#78909c;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Inquiry ID</p>
                    <p style="margin:0;color:#37474f;font-size:14px;">{{inquiryId}}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #eceff1;">
                    <p style="margin:0 0 4px;color:#78909c;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Inquiry Type</p>
                    <p style="margin:0;color:#37474f;font-size:14px;">{{inquiryType}}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #eceff1;">
                    <p style="margin:0 0 4px;color:#78909c;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Property</p>
                    <p style="margin:0;color:#37474f;font-size:14px;">{{property}}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0; border-bottom:1px solid #eceff1;">
                    <p style="margin:0 0 4px;color:#78909c;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Phone</p>
                    <p style="margin:0;color:#37474f;font-size:14px;">{{phone}}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0 0;">
                    <p style="margin:0 0 4px;color:#78909c;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Message</p>
                    <p style="margin:0;color:#37474f;font-size:14px;line-height:1.6;white-space:pre-wrap;">{{message}}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#f5f5f5;padding:24px 40px;text-align:center;border-top:1px solid #e0e0e0;">
              <p style="margin:0;color:#78909c;font-size:12px;">
                © 2026 Yetihomes. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export async function sendNewsletterWelcome(email: string): Promise<void> {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Welcome to Yetihomes - You're Subscribed!",
    html: NEWSLETTER_WELCOME_HTML,
  });
}

export async function sendSupportTicketConfirmation(
  email: string,
  name: string,
  ticketId: string,
  subject: string
): Promise<void> {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `Ticket Received - ${ticketId}`,
    html: renderTemplate(SUPPORT_TICKET_HTML, {
      name,
      ticketId,
      subject,
    }),
  });
}

export async function sendNewTicketAdminNotification(
  data: EmailData,
  ticketId: string
): Promise<void> {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Support Ticket: ${data.subject || "General"}`,
    html: renderTemplate(NEW_TICKET_ADMIN_HTML, {
      name: data.name,
      email: data.email,
      ticketId,
      category: data.category || "General",
      phone: data.phone || "Not provided",
      message: data.message,
    }),
  });
}

export async function sendInquiryConfirmation(
  email: string,
  name: string,
  inquiryId: string,
  inquiryType: string
): Promise<void> {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "We've Received Your Inquiry - Yetihomes",
    html: renderTemplate(INQUIRY_CONFIRMATION_HTML, {
      name,
      inquiryId,
      inquiryType,
    }),
  });
}

export async function sendNewInquiryAdminNotification(
  data: EmailData,
  inquiryId: string
): Promise<void> {
  const property = data.propertySlug
    ? `https://yetihomes.com/${data.propertySlug}`
    : data.propertyId || "N/A";

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Property Inquiry: ${data.inquiryType || "General"}`,
    html: renderTemplate(NEW_INQUIRY_ADMIN_HTML, {
      name: data.name,
      email: data.email,
      inquiryId,
      inquiryType: data.inquiryType || "General",
      property,
      phone: data.phone || "Not provided",
      message: data.message,
    }),
  });
}