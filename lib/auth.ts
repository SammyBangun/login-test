import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';


const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const COOKIE_NAME = process.env.COOKIE_NAME || 'token';
const MAX_AGE = 60 * 60 * 24 * 7;

export function signToken(payload: object) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: MAX_AGE });
}

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
}

export function setTokenCookie(res: { setHeader: (arg0: string, arg1: string) => void; }, token: string) {
    const cookie = serialize(COOKIE_NAME, token, {
        maxAge: MAX_AGE,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax'
    });
    res.setHeader('Set-Cookie', cookie);
}

export function unsetTokenCookie(res: { setHeader: (arg0: string, arg1: string) => void; }) {
    const cookie = serialize(COOKIE_NAME, '', {
        maxAge: 0,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax'
    });
    res.setHeader('Set-Cookie', cookie);
}