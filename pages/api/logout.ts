import { NextApiRequest, NextApiResponse } from 'next';
import { unsetTokenCookie } from '../../lib/auth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    unsetTokenCookie(res);
    res.writeHead(302, { Location: '/' });
    res.end();
}
