import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as moment from 'moment-timezone';
import { EmailService } from 'src/email/email.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    const users = await this.prisma.user.findMany();
    const now = moment();
    for (const user of users) {
      const userTime = moment().tz(user.timezone).hour(11).minute(31).second(0);
      console.log({ userTime: userTime.format() });

      if (now.tz(user.timezone).isSameOrAfter(userTime)) {
        await this.sendDailyEmail(user.email, user.timezone);
      }
    }
  }

  private async sendDailyEmail(email: string, timezone: string) {
    await this.emailService.sendMail({
      to: email,
      subject: 'Daily Update',
      text: timezone,
    });
  }
}
