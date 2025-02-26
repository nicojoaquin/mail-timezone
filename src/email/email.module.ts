import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

import { EmailService } from './email.service';
import { NodeMailerMailer } from './implementations/nodemailer-mailer';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.getOrThrow('EMAIL_SMTP_HOST'),
          auth: {
            user: configService.getOrThrow('EMAIL_SMTP_USER'),
            pass: configService.getOrThrow('EMAIL_SMTP_PASSWORD'),
          },
        },
        defaults: {
          from: `${configService.get('EMAIL_FROM') || 'nicojoaquin1998@gmail.com'}`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    EmailService,
    {
      provide: 'Mailer',
      useClass: NodeMailerMailer,
    },
  ],
  exports: [EmailService],
})
export class EmailModule {}
