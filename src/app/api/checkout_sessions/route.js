// src/app/api/checkout_session/route.js

import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { items, barId, tableNumber, deliveryFee } = await req.json();
    console.log('Received items:', items);

    const { nextUrl } = req;
    const origin = nextUrl.origin || 'http://localhost:3000'; // Fallback to localhost in development

    // Prepare the line items for Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,  // Stripe expects the amount in cents
      },
      quantity: item.quantity,
    }));

    // Add delivery fee as a line item if applicable
    if (deliveryFee > 0) {
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Delivery Fee',
          },
          unit_amount: deliveryFee * 100,
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&barId=${barId}&tableNumber=${tableNumber}`,
      cancel_url: `${origin}/cancel?barId=${barId}&tableNumber=${tableNumber}`,
      metadata: {
        barId,
        tableNumber,
        items: JSON.stringify(items),
        deliveryFee: deliveryFee.toFixed(2),
      },
    });

    console.log('Stripe session created:', session.id);

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error('Error creating Stripe session:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
