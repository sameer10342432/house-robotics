import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import { adminLogin } from '../utils/api';

interface AdminLoginProps {
  onSuccess: (admin: any) => void;
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onBackToSite }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await adminLogin(email, password);
      if (res.success && res.data) {
        onSuccess(res.data.user || res.data);
      } else {
        setError(res.message || 'Authentication failed. Please verify credentials.');
      }
    } catch (err: any) {
      setError(err.message || 'Unable to connect to the authentication server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0C20] via-[#161233] to-[#0A0718] flex items-center justify-center p-4 sm:p-6 text-neutral-100 font-sans">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#6D28D9] to-[#2563EB] flex items-center justify-center text-white mx-auto shadow-[0_10px_30px_rgba(109,40,217,0.5)]">
            <span className="font-extrabold text-2xl tracking-tighter">H</span>
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-['Space_Grotesk']">
              House<span className="text-[#A78BFA]">Robotics</span>
            </h1>
            <p className="text-xs text-neutral-400 font-medium">
              Enterprise Command &amp; Content Management System
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-[#1C1838]/80 backdrop-blur-xl border border-violet-900/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-violet-900/30 pb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#A78BFA]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Secure Administrator Access</span>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-violet-950/60 border border-violet-800/40 text-neutral-400">
              v2.6 Prod
            </span>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/50 text-red-300 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  autoComplete="username"
                  className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#120F24] border border-violet-900/50 text-xs text-white placeholder-neutral-500 focus:border-[#8B5CF6] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#120F24] border border-violet-900/50 text-xs text-white placeholder-neutral-500 focus:border-[#8B5CF6] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 text-xs font-semibold"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-neutral-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-neutral-700 bg-neutral-900 text-[#6D28D9] focus:ring-0"
                />
                <span>Remember session</span>
              </label>
              <span className="text-[11px] text-neutral-500">Secure Access</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#2563EB] hover:from-[#5B21B6] hover:to-[#1D4ED8] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(109,40,217,0.4)] transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <span>Authenticating Credentials...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Secure return link */}
          <div className="pt-2 border-t border-violet-900/20 text-center space-y-2">
            <p className="text-[11px] text-neutral-500">
              Authorized administrative personnel only.
            </p>
            <button
              type="button"
              onClick={onBackToSite}
              className="text-xs text-neutral-400 hover:text-white transition-colors underline font-medium"
            >
              ← Return to House Robotics Public Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
