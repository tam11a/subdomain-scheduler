// src/subdomains/subdomains.service.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { writeFile } from 'fs/promises';
import { nanoid } from 'nanoid';
import * as nodemailer from 'nodemailer';
import * as twilio from 'twilio';

@Injectable()
export class SubdomainsService {
  constructor(private readonly configService: ConfigService) {}

  async generateSubdomain(): Promise<string> {
    return nanoid();
  }

  async updateNginxConfig(subdomain: string): Promise<void> {
    const nginxConfig = `
      server {
          listen 80;
          server_name ${subdomain}.example.com;

          location / {
              proxy_pass http://backend-server;
              proxy_set_header Host $host;
              proxy_set_header X-Real-IP $remote_addr;
              proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
              proxy_set_header X-Forwarded-Proto $scheme;
          }
      }
    `;

    await writeFile(`/etc/nginx/sites-available/${subdomain}`, nginxConfig);
  }

  async sendNotification(subdomain: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: this.configService.get('email.service'),
      auth: {
        user: this.configService.get('email.auth.user'),
        pass: this.configService.get('email.auth.pass'),
      },
    });

    const message = {
      from: 'your-email@example.com',
      to: 'recipient@example.com',
      subject: 'Subdomain Update Notification',
      text: `New subdomain ${subdomain} has been activated.`,
    };

    await transporter.sendMail(message);

    const client = twilio(
      this.configService.get('twilio.accountSid'),
      this.configService.get('twilio.authToken'),
    );
    await client.messages.create({
      body: `New subdomain ${subdomain} has been activated.`,
      from: this.configService.get('twilio.fromNumber'),
      to: 'recipient-phone-number',
    });
  }
}
