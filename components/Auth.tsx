
import React from 'react';
import { GoogleIcon, GithubIcon } from './Icons';

const InputField: React.FC<{ type: string; placeholder: string }> = ({ type, placeholder }) => (
    <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-theme-secondary p-3 text-theme-primary placeholder-theme-text/50 focus:outline-none focus:ring-2 focus:ring-theme-primary transition-all"
    />
);

const AuthButton: React.FC<{ children: React.ReactNode; primary?: boolean }> = ({ children, primary = false }) => (
    <button className={`w-full p-3 flex items-center justify-center gap-2 transition-colors ${
        primary ? 'bg-theme-primary text-theme-bg hover:bg-theme-primary-dark' : 'bg-theme-secondary text-theme-primary hover:bg-theme-secondary/50'
    }`}>
        {children}
    </button>
);

const Auth: React.FC = () => {
    return (
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-16">
            {/* Register */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl text-theme-primary mb-4">register</h3>
                <InputField type="text" placeholder="username" />
                <InputField type="email" placeholder="email" />
                <InputField type="email" placeholder="verify email" />
                <InputField type="password" placeholder="password" />
                <InputField type="password" placeholder="verify password" />
                <AuthButton primary>sign up</AuthButton>
            </div>

            {/* Login */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl text-theme-primary mb-4">login</h3>
                <div className="grid grid-cols-2 gap-4">
                    <AuthButton><GoogleIcon className="w-5 h-5" /> Google</AuthButton>
                    <AuthButton><GithubIcon className="w-5 h-5" /> GitHub</AuthButton>
                </div>
                <div className="text-center my-2 text-theme-text">or</div>
                <InputField type="email" placeholder="email" />
                <InputField type="password" placeholder="password" />
                <div className="flex items-center gap-2 text-theme-text">
                    <input type="checkbox" id="remember" className="accent-theme-primary" />
                    <label htmlFor="remember">remember me</label>
                </div>
                <AuthButton primary>sign in</AuthButton>
                <a href="#" className="text-right text-sm text-theme-text hover:text-theme-primary">forgot password?</a>
            </div>
        </div>
    );
};

export default Auth;
