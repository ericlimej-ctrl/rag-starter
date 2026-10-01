/**
 * Health check monitor endpoint for Vercel and Node.js
 * Path: /api/health
 */

import apihealthHandler from '../apihealth.js';

export default async function handler(req, res) {
  return apihealthHandler(req, res);
}
