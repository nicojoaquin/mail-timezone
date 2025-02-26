import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as moment from 'moment-timezone';
import { EmailService } from 'src/email/email.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TaskService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    const MAIL_HOUR = this.configService.get<number>('MAIL_HOUR') || 17;

    const users = await this.prisma.user.findMany();
    const now = moment();

    for (const user of users) {
      //Get the specific time at user's timezone
      const userSelectedTime = moment()
        .tz(user.timezone)
        .hour(MAIL_HOUR)
        .minute(0)
        .second(0);

      const userCurrentTime = now.tz(user.timezone);

      if (userCurrentTime.isSameOrAfter(userSelectedTime)) {
        await this.sendDailyEmail(user.email);
      }
    }
  }

  private async sendDailyEmail(email: string) {
    console.log('Sending email to', email);

    await this.emailService.sendMail({
      to: email,
      subject: 'Daily Update',
      text: 'This is your daily update',
    });
  }
}
