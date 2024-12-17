import { env } from '$env/dynamic/private';
import nodemailer from "nodemailer";
import fs from 'fs';
import path from 'path';

type mailOptions = {
  from: string,
  to: string,
  subject: string,
  html: string
}

export const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.eu',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: env.NODEMAILER_USER,
        pass: env.NODEMAILER_PASS
      },
      tls: {
          rejectUnauthorized: false
      }
});

async function sendMail(mailOptions: mailOptions) {
  await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error enviando el email:', err);
    } else {
      console.log('Email enviado:', info.response);
    }
  }) 
}

//Signup
export async function sendClientSignupMail(clientName: string, clientMail: string) {

  const placeholders = [
    {placeholder: '{{name}}', replaceValue: clientName},
  ]
  
 const emailBody = prepareEmail('userSignupEmail', placeholders)

  const mailOptions = {
      from: '"Pulso de Nieve" <admin@pulsodenieve.com>',
      to: clientMail,
      subject: 'Ya formas parte de Pulso de Nieve',
      html: emailBody
    };
  
    await sendMail(mailOptions)

}
//Password Reset
export async function sendPasswordResetTokenEmail(email: string, verificationLink: string) {
  const placeholders = [{placeholder: '{{resetUrl}}', replaceValue: verificationLink}]
  const emailBody = prepareEmail('resetPasswordEmail', placeholders)

  const mailOptions = {
    from: '"Pulso de Nieve" <admin@pulsodenieve.com>',
    to: email,
    subject: 'Restablecer Contraseña',
    html: emailBody
  }
  await sendMail(mailOptions)
}

//HELPERS
function prepareEmail(fileName: string, placeholders: { placeholder: string | RegExp; replaceValue: string ; }[]) {
  const emailTemplate =  getEmailTemplate(fileName)
  const emailContent = replacePlaceholders(emailTemplate, placeholders)

  return emailContent
}

function getEmailTemplate (fileName: string) {
  
  const emailTemplatePath = path.resolve(`src/lib/nodemailer/templates/${fileName}.html`);
  const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf-8');
  return emailTemplate
}

function replacePlaceholders(
  emailTemplate: string, 
  placeholdersArray: { placeholder: string | RegExp; replaceValue: string; }[]
): string {
  return placeholdersArray.reduce((template, placeholder) => {
    return template.replace(placeholder.placeholder, placeholder.replaceValue);
  }, emailTemplate); 
}
  

