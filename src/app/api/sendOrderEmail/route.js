import { NextResponse } from 'next/server';
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { initializeApp, cert, getApps } from 'firebase-admin/app';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY, url: 'https://api.eu.mailgun.net', });

// Initialize Firebase Admin SDK with service account
if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
    });
  }

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

        const recipientEmail = process.env.NODE_ENV === 'development' 
                ? 'io@giuliovaccari.it'
                : (() => {
                    switch (barId) {
                        case '100beach':
                            return 'bagnorenata100@gmail.com';
                        case 'micamar':
                            return 'micamar2018@gmail.com';
                        default:
                            return 'pietro.fantini1998@gmail.com';
                    }
                })();

        const data = {
            from: `Nuovo Ordine <${fromEmail}>`,
            to: recipientEmail,
            subject: `Ricevuto Nuovo Ordine`,
            text: `
            Un nuovo ordine è stato piazzato. 

            Numero Tavolo: ${tableNumber}
            Prodotti Ordinati:
            ${itemsList}
            
            Totale: ${totalAmount} EUR
            Status: ${status}

            Controlla l'ordine:
            https://app.spiaggiato.it/dashboard/${barId}
            `,
        };

        const response = await mg.messages.create(process.env.MAILGUN_DOMAIN, data);
        console.log('Email sent successfully:', response);
        

        const usersRef = admin.firestore().collection('users');
        const snapshot = await usersRef.where('barId', '==', barId).get();

        if (!snapshot.empty) {
            const tokens = [];
            snapshot.forEach(doc => {
                const userData = doc.data();
                if (userData.fcmToken) {
                    tokens.push(userData.fcmToken);
                }
            });

            if (tokens.length > 0) {
                const message = {
                    notification: {
                        title: 'Nuovo Ordine Ricevuto',
                        body: `Un nuovo ordine è stato piazzato per il tavolo ${tableNumber}. Totale: ${totalAmount} EUR.`,
                    },
                    tokens: tokens, // Send to multiple device tokens
                };

                const response = await admin.messaging().sendMulticast(message);
                console.log('Notifications sent successfully:', response);
            } else {
                console.log('No FCM tokens found for the given barId.');
            }
        } else {
            console.log('No users found for the given barId.');
        }

        return NextResponse.json({ message: 'Email and notifications sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error.message);
        return NextResponse.json({ error: error.message || 'Error sending email' }, { status: 500 });
    }
}