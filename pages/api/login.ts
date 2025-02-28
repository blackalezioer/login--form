import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/db';
import User from '../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    // const isMatch = password === user.password ? true : false;
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return res.status(200).json({ success: true, redirect: '/dashboard' });
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}