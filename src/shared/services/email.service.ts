import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async mailer(email: string, content: string): Promise<number> {
    let res;
    await this.mailerService
      .sendMail({
        to: email, // list of receivers
        // to: 'luwan@konnectdigital.io', // list of receivers
        from: 'luwankonnect@outlook.com', // sender address
        subject: 'Testing Nest MailerModule :heavy_check_mark:', // Subject line
        text: 'Hi, nodemailer is working', // plaintext body
        // html: '<b>welcome, this is steppen</b>', // HTML body content
        html: content, // HTML body content
      })
      .then((success) => {
        res = 200;
      })
      .catch((err) => {
        res = 400;
      });
    return res;
  }
}
