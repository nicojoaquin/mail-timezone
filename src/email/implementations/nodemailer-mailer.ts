import { Injectable } from '@nestjs/common';

import { Mailer } from '../interfaces/mailer';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NodeMailerMailer implements Mailer {
  constructor(private readonly mailService: MailerService) {}

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    try {
      console.log({ to, subject, text });

      await this.mailService.sendMail({
        to,
        subject,
        text,
      });
    } catch (error: unknown) {
      console.log(error);
      throw new Error('Error sending email');
    }
  }
}
