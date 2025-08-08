import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'yohannestsegaye1212@gmail.com',
        pass: 'bwgb wtze eefj zjqm', // Gmail App Password
      },
    });
  }

  // Add default template
  private getDefaultTemplate(
    candidateName: string,
    jobTitle: string,
    status: string,
  ): string {
    return `Application Status Update\nDear ${candidateName},\n\nWe hope this email finds you well. We are writing to inform you about your application for the ${jobTitle} position.\n\nYour application status has been updated to: ${status}\n\n${this.getStatusSpecificMessage(status, jobTitle)}\n\nBest regards,\nSmart Recruit Team`;
  }

  private getStatusSpecificMessage(status: string, jobTitle?: string): string {
    switch (status) {
      case 'Accepted':
        return 'Congratulations! We are pleased to inform you that your application has been successful. Our HR team will contact you shortly with further details.';
      case 'Rejected':
        return `Thank you for taking the time to apply for the ${jobTitle} position at Smart Recruit. We truly appreciate the effort you put into your application and the interest you showed in joining our team.\n\nAfter careful consideration, we regret to inform you that we will not be moving forward with your application at this time.\n\nThis decision was not easy, as we received many strong applications. We encourage you to apply for future opportunities that match your skills and experience—we would be happy to consider your profile again.\n\nWe wish you all the best in your job search and future endeavors.`;
      case 'Interview':
        return 'We are pleased to invite you for an interview. Our HR team will contact you shortly to schedule a convenient time.\n\nPlease be prepared to discuss your experience and qualifications in detail.';
      case 'Call for exam':
        return 'You have been selected to take part in our assessment examination. We will send you the details about the exam schedule and requirements shortly.\n\nPlease ensure you review the relevant materials and come prepared.';
      case 'Under Review':
        return 'Your application is currently under review by our team. We appreciate your patience during this process.\n\nWe will notify you of any updates regarding your application status.';
      default:
        return 'We appreciate your interest in joining our team and thank you for taking the time to apply. We will keep your profile in our database for future opportunities.';
    }
  }

  async getEmailPreview(
    candidateEmail: string,
    candidateName: string,
    status: string,
    jobTitle: string,
  ): Promise<string> {
    return this.getDefaultTemplate(candidateName, jobTitle, status);
  }

  async sendStatusUpdateEmail(
    candidateEmail: string,
    candidateName: string,
    status: string,
    jobTitle: string,
    customEmailContent?: string,
  ): Promise<{ success: boolean; message: string }> {
    const mailOptions = {
      from: 'Smart Recruit <yohannestsegaye1212@gmail.com>',
      to: candidateEmail,
      subject: `Application Status Update - ${status}`,
      text:
        customEmailContent ||
        this.getDefaultTemplate(candidateName, jobTitle, status),
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return {
        success: true,
        message: `Email sent successfully to ${candidateEmail}`,
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        success: false,
        message: 'Failed to send email notification',
      };
    }
  }

  async sendAdminWelcomeEmail(email: string, temporaryPassword: string, role: string): Promise<void> {
    const mailOptions = {
      from: 'Smart Recruit <yohannestsegaye1212@gmail.com>',
      to: email,
      subject: 'Welcome to Smart Recruit Admin Panel',
      text: `Hello,

You have been added as an ${role} to the Smart Recruit admin panel.

Your temporary password is: ${temporaryPassword}

Please log in and change your password as soon as possible.

Best regards,
Smart Recruit Team`,
    };
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending admin welcome email:', error);
    }
  }

  async sendTemporaryPasswordEmail(email: string, temporaryPassword: string): Promise<void> {
    const mailOptions = {
      from: 'Smart Recruit <yohannestsegaye1212@gmail.com>',
      to: email,
      subject: 'Temporary Password - Smart Recruit',
      text: `Hello,

You have requested a password reset for your Smart Recruit account.

Your temporary password is: ${temporaryPassword}

This password will expire in 24 hours. Please log in and change your password immediately.

Best regards,
Smart Recruit Team`,
    };
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending temporary password email:', error);
    }
  }
}
