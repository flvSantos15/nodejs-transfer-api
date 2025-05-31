// src/services/interfaces/IEmailService.ts
export interface IEmailService {
  sendWelcomeEmail(to: string, name: string): Promise<void>;
}
