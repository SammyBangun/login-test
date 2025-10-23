const attempts = new Map();
const WINDOW_MS = 60 * 1000;
const MAX_ATTEMPTS = 5;

export function isRateLimited(ip: string) {
    const now = Date.now();
    const entry = attempts.get(ip) || { count: 0, first: now };
    if (now - entry.first > WINDOW_MS) {
        attempts.set(ip, { count: 1, first: now });
        return false;
    }
    entry.count += 1;
    attempts.set(ip, entry);
    return entry.count > MAX_ATTEMPTS;
}

setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of attempts) {
        if (now - entry.first > WINDOW_MS * 5) attempts.delete(ip);
    }
}, 5 * 60 * 1000);