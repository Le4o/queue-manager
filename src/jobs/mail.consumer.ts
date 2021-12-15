import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { UserDTO } from 'src/user/user.dto';

@Processor('sendMail-queue')
export class MailConsumerProcessor {
  constructor(private mailService: MailerService) {}

  @Process('sendMail-job')
  async sendMailJob(job: Job<UserDTO>) {
    const { data } = job;
    await this.mailService.sendMail({
      to: data.email,
      from: 'Leleo da massa <leleodamassa@gmail.com>',
      subject: 'Seja bem vindo(a)',
      text: `Olá ${data.name}, seu cadastro foi realizado com sucesso!`,
    });
  }
}
