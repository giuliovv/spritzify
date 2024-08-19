import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

const db = getFirestore();

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  let event;
  
  try {
    // Convert the request body to an ArrayBuffer
    const body = await req.arrayBuffer();
    const buf = Buffer.from(body);
    const sig = req.headers.get('stripe-signature');

    // Verify the event using the raw body and signature
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the checkout session completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { barId, tableNumber, items } = session.metadata || {};

    try {
      await db.collection('orders').add({
        barId,
        tableNumber,
        items: items ? JSON.parse(items) : [],
        status: 'pagato',
        totalAmount: session.amount_total / 100, // Convert from cents to EUR
        createdAt: FieldValue.serverTimestamp(), // Use Firestore server timestamp
      });
      console.log(`Order added to Firestore for session ${session.id}`);
    } catch (error) {
      console.error('Error saving order to Firestore:', error);
      return new Response('Error saving order to Firestore.', { status: 500 });
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
