import AuthForm from '../components/AuthForm';

export default function Home() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center 
                     transition-colors 
                     bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-500
                     relative overflow-hidden">

            <div className="absolute inset-0">
            </div>

            <div className="relative z-10">
                <AuthForm />
            </div>
        </main>
    );
}
