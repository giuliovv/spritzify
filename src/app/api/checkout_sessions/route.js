// src/app/api/checkout_session/route.js

import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { items, barId, tableNumber } = await req.json();
    console.log('Received items:', items);

    const { nextUrl } = req;
    const origin = nextUrl.origin || 'http://localhost:3000'; // Fallback to localhost in development

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,  // Stripe expects the amount in cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&barId=${barId}&tableNumber=${tableNumber}`,
      cancel_url: `${origin}/cancel?barId=${barId}&tableNumber=${tableNumber}`,
      metadata: {
        barId,
        tableNumber,
        items: JSON.stringify(items), // Convert items to JSON string
      },
    });

    console.log('Stripe session created:', session.id);

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error('Error creating Stripe session:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}