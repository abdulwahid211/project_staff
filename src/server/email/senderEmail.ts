import * as nodemailer from 'nodemailer';
import * as nodemailerSendgrid from 'nodemailer-sendgrid';

const transport = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: process.env.SENDGRID_API_KEY,
  }),
);

export const SendEmail = (
  from: string,
  to: string,
  subject: string,
  text: string,
  html: string,
) => {
  transport.sendMail(
    {
      from: from, // verified sender email
      to: to, // recipient email
      subject: subject, // Subject line
      text: text, // plain text body
      html: html, // html body
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(info);
      }
    },
  );
};
