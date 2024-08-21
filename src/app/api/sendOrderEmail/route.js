import { NextResponse } from 'next/server';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });

export async function POST(req) {
    console.log('API route hit');

    try {
        const { order } = await req.json();

        console.log('Order received for email:', order);

        const fromEmail = `no-reply@${process.env.MAILGUN_DOMAIN}`;

        const data = {
            from: `Notifica Ordine <${fromEmail}>`,
            to: 'pietro.fantini1998@gmail.com',  // Replace with the desired email address
            subject: `New Order Received: ${order.id}`,
            text: `A new order has been placed. Details: \n\n Order ID: ${order.id} \n Order Status: ${order.status} \n Created At: ${order.createdAt}`,
        };

        const response = await mg.messages.create(process.env.MAILGUN_DOMAIN, data);
        console.log('Email sent successfully:', response);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
    }
}