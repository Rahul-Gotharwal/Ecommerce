import pincodes from '../../pincodes.json';
import { runCors } from '../lib/cors';

export default async function handler(req, res) {
  try {
    // Run the CORS middleware (now it returns a Promise)
    await runCors(req, res);
    
    // Send the pincodes data as a response
    res.status(200).json(pincodes);
  } catch (error) {
    // Handle errors if any
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
