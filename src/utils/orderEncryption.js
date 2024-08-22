// src/utils/orderEncryption.js
import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.ORDER_ENCRYPTION_KEY || 'spritzify-is-a-nice-key';

export function encryptOrder(order) {
  const orderString = JSON.stringify(order);
  return CryptoJS.AES.encrypt(orderString, SECRET_KEY).toString();
}

export function decryptOrder(encryptedOrder) {
  const bytes = CryptoJS.AES.decrypt(encryptedOrder, SECRET_KEY);
  const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedString);
}