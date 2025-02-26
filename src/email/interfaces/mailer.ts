export interface Mailer {
  sendEmail(to: string, subject: string, text: string): Promise<void>;
}
