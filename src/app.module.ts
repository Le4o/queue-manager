import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailConsumerProcessor } from './jobs/mail.consumer';
import { MailProducerService } from './jobs/mail.producer.service';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT, 10) || 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'sendMail-queue',
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAILER_HOST,
        port: parseInt(process.env.MAILER_PORT, 10),
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASS,
        },
      },
    }),
  ],
  controllers: [UserController],
  providers: [MailProducerService, MailConsumerProcessor],
})
export class AppModule {}
