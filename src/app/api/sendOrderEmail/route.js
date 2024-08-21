import { NextResponse } from 'next/server';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });

export async function POST(req) {
    console.log('API route hit');

    try {
        const { order } = await req.json();  // Destructure the order object from the request body
        console.log('Received request body:', order);

        const { barId, tableNumber, items, status, totalAmount, createdAt, shipped } = order || {};

        // Log each field individually
        console.log('tableNumber:', tableNumber);
        console.log('items:', items);
        console.log('status:', status);
        console.log('totalAmount:', totalAmount);
        console.log('createdAt:', createdAt);

        if (!tableNumber || !items || !status || !totalAmount || !createdAt) {
            throw new Error('Missing required fields in the request');
        }

        const fromEmail = `no-reply@${process.env.MAILGUN_DOMAIN}`;

        // Generate a string for the items ordered, including their quantities
        const itemsList = items.map(item => `- ${item.name}: ${item.quantity}`).join('\n');

        const data = {
            from: `Notifica Ordine <${fromEmail}>`,
            to: 'pietro.fantini1998@gmail.com',  // Replace with the desired email address
            subject: `Ricevuto Nuovo Ordine`,
            text: `
            Un nuovo ordine è stato piazzato. 

            Numero Tavolo: ${tableNumber}
            Prodotti Ordinati:
            ${itemsList}
            
            Totale: ${totalAmount} EUR
            Status: ${status}
            Creato il: ${new Date(createdAt.seconds * 1000).toLocaleString()}
            `,
        };

        const response = await mg.messages.create(process.env.MAILGUN_DOMAIN, data);
        console.log('Email sent successfully:', response);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error.message);
        return NextResponse.json({ error: error.message || 'Error sending email' }, { status: 500 });
    }
}