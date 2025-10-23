import { GetServerSideProps } from 'next';
import { parse } from 'cookie';
import { verifyToken } from '../lib/auth';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
    const token = cookies[process.env.COOKIE_NAME || 'token'];
    if (!token) return { redirect: { destination: '/', permanent: false } };
    try {
        verifyToken(token);
        return { props: {} };
    } catch (e) {
        return { redirect: { destination: '/', permanent: false } };
    }
};

export default function Dashboard() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="max-w-md w-full p-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 ease-in-out">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
                    Dashboard
                </h1>
                <p className="text-gray-700 dark:text-gray-300 text-center">
                    Ini halaman protected. Hanya bisa diakses jika JWT valid.
                </p>

                <form action="/api/logout" method="POST" className="mt-6">
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:cursor-pointer"
                    >
                        Logout
                    </button>
                </form>
            </div>
        </div>
    );
}
