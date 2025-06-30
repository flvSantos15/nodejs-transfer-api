import { IEmailService } from "./interfaces/IEmailService";

export class EmailServiceMock implements IEmailService {
  async sendWelcomeEmail(to: string, name: string): Promise<void> {
    console.log(`Welcome email sent to ${to}`);
  }
}
