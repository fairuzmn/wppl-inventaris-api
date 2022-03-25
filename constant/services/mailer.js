import nodemailer from "nodemailer";

const SMTP_EMAIL = "";
const SMTP_PASS = "";

export const mailer = nodemailer.createTransport({
  auth: {
    user: SMTP_EMAIL,
    pass: SMTP_PASS,
  },
  service: "gmail",
});

export const sendEmail = (app, email, subject, html) => {
  return new Promise(async (resolve, reject) => {
    try {
      await mailer.sendMail({
        from: app + `<${SMTP_EMAIL}>`,
        to: email,
        subject: subject,
        html: html,
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export const generateTemplateOtp = (app, name, otp) => {
  return `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">${app} Verification</a>
              </div>
              <p style="font-size:1.1em">Hi ${name},</p>
              <p>Kode OTP kamu adalah ${otp} , masukkan kode tersebut untuk melanjutkan verifikasi aplikasi kamu</p>
              <h2 style="background: #00466a;margin: 0;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;letter-spacing: 2px;">${otp}</h2>
              <p style="font-size:0.9em;">Regards,<br />${app}</p>
              <hr style="border:none;border-top:1px solid #eee" />
            </div>
          </div>`;
};
