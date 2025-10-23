import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { prisma } from '../../lib/prisma';
import { signToken, setTokenCookie } from '../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end();

    const { identifier, password } = req.body;
    if (!identifier || !password) return res.status(400).json({ error: 'Email/Username dan password wajib diisi.' });

    const user = await prisma.user.findFirst({
        where: {
            OR: [{ email: identifier }, { username: identifier }],
        },
    });

    if (!user) return res.status(401).json({ error: 'User tidak ditemukan.' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ error: 'Password salah.' });

    const token = signToken({ sub: user.id, email: user.email });
    setTokenCookie(res, token);

    return res.status(200).json({ ok: true });
}
