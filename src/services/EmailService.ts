// src/services/EmailService.ts
import nodemailer from "nodemailer";
import { emailConfig } from "../config/email";

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      ...emailConfig,
    });
  }

  async sendWelcomeEmail(to: string, name: string): Promise<void> {
    const mailOptions = {
      from: emailConfig.from,
      to,
      subject: "Welcome to Our App!",
      html: `
        <h1>Welcome to Our App, ${name}!</h1>
        <p>Thank you for signing up. We're excited to have you on board.</p>
        <p>Start exploring all the amazing features we have to offer.</p>
        <p>Best regards,<br/>The Team</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Welcome email sent to ${to}`);
    } catch (error) {
      console.error("Error sending welcome email:", error);
      // Consider logging this to an error tracking service
      throw new Error("Failed to send welcome email");
    }
  }
}
