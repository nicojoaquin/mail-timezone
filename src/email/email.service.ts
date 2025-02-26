import { Inject, Injectable } from '@nestjs/common';

import { SendEmaiLDto } from './dto/send-email.dto';
import { Mailer } from './interfaces/mailer';

@Injectable()
export class EmailService {
  constructor(@Inject('Mailer') private mailer: Mailer) {}

  async sendMail({ to, subject, text }: SendEmaiLDto): Promise<void> {
    console.log('sending email', to);

    await this.mailer.sendEmail(to, subject, text);
  }
}
