import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Briefcase, 
  FileText, 
  Star, 
  HelpCircle, 
  Send, 
  Image as ImageIcon, 
  Globe, 
  Settings, 
  Activity, 
  ShieldCheck, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { AdminLogin } from './AdminLogin';
import { DashboardView } from './views/DashboardView';
import { LeadsView } from './views/LeadsView';
import { MessagesView } from './views/MessagesView';
import { ServicesView } from './views/ServicesView';
import { BlogView } from './views/BlogView';
import { TestimonialsView } from './views/TestimonialsView';
import { FaqsView } from './views/FaqsView';
import { NewsletterView } from './views/NewsletterView';
import { MediaView } from './views/MediaView';
import { SeoView } from './views/SeoView';
import { SettingsView } from './views/SettingsView';
import { ActivityLogView } from './views/ActivityLogView';
import { UsersView } from './views/UsersView';
import { adminGetMe, adminLogout } from '../utils/api';

interface AdminLayoutProps {
  onBackToWebsite: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onBackToWebsite }) => {
  const [adminUser, setAdminUser] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    setIsCheckingAuth(true);
    try {
      const res = await adminGetMe();
      if (res.success && res.data) {
        setAdminUser(res.data);
      }
    } catch (e) {
      console.warn('Session check failed', e);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const handleLogout = async () => {
    try {
      await adminLogout();
    } catch {
      // Ignore
    } finally {
      setAdminUser(null);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#0F0C20] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 border-3 border-violet-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-neutral-400">Verifying Administrator Session...</p>
        </div>
      </div>
    );
  }

  if (!adminUser) {
    return (
      <AdminLogin
        onSuccess={(user) => setAdminUser(user)}
        onBackToSite={onBackToWebsite}
      />
    );
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leads', label: 'Leads CRM', icon: Users },
    { id: 'messages', label: 'Inquiries', icon: MessageSquare },
    { id: 'services', label: 'Services (21)', icon: Briefcase },
    { id: 'blog', label: 'Blog CMS', icon: FileText },
    { id: 'testimonials', label: 'Testimonials', icon: Star },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
    { id: 'newsletter', label: 'Newsletter', icon: Send },
    { id: 'media', label: 'Media Library', icon: ImageIcon },
    { id: 'seo', label: 'SEO & Metadata', icon: Globe },
    { id: 'settings', label: 'Site Settings', icon: Settings },
    { id: 'activity', label: 'Activity Logs', icon: Activity },
    { id: 'users', label: 'Admin Users', icon: ShieldCheck, superOnly: true }
  ];

  return (
    <div className="min-h-screen bg-[#F8F7FF] flex font-sans text-neutral-900 antialiased selection:bg-purple-100 selection:text-[#6D28D9]">
      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-neutral-900/60 backdrop-blur-xs lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0F0C20] text-neutral-300 flex flex-col justify-between transition-transform duration-300 ease-in-out border-r border-violet-950/40 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="p-5 border-b border-violet-950/50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#6D28D9] to-[#2563EB] flex items-center justify-center text-white shadow-[0_4px_14px_rgba(109,40,217,0.4)]">
                <span className="font-extrabold text-sm tracking-tighter">H</span>
              </div>
              <div>
                <div className="text-base font-extrabold text-white tracking-tight font-['Space_Grotesk'] leading-none">
                  House<span className="text-[#A78BFA]">Robotics</span>
                </div>
                <div className="text-[10px] text-neutral-400 font-mono mt-0.5">Admin CMS v2.6</div>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1 overflow-y-auto max-h-[calc(100vh-230px)]">
            {navItems.map((item) => {
              if (item.superOnly && adminUser.role !== 'SUPER_ADMIN') return null;
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#6D28D9] to-[#5B21B6] text-white shadow-md'
                      : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/70" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile & Actions */}
        <div className="p-4 border-t border-violet-950/50 space-y-3 bg-[#0A0718]">
          <button
            onClick={onBackToWebsite}
            className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </button>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                {adminUser.name?.charAt(0) || 'A'}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">{adminUser.name}</div>
                <div className="text-[10px] text-violet-300 font-mono uppercase">{adminUser.role}</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E9E7F2] py-3.5 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">House Robotics CMS</span>
              <h1 className="text-base sm:text-lg font-extrabold text-neutral-900 capitalize font-['Space_Grotesk'] leading-tight">
                {activeTab.replace('-', ' ')}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToWebsite}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E9E7F2] bg-white text-xs font-semibold text-neutral-700 hover:bg-neutral-50 shadow-xs transition-colors"
            >
              <span>Live Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Production Live</span>
            </div>
          </div>
        </header>

        {/* View Router */}
        <main className="flex-1">
          {activeTab === 'dashboard' && <DashboardView onNavigateTab={(tab) => setActiveTab(tab)} />}
          {activeTab === 'leads' && <LeadsView />}
          {activeTab === 'messages' && <MessagesView />}
          {activeTab === 'services' && <ServicesView />}
          {activeTab === 'blog' && <BlogView />}
          {activeTab === 'testimonials' && <TestimonialsView />}
          {activeTab === 'faqs' && <FaqsView />}
          {activeTab === 'newsletter' && <NewsletterView />}
          {activeTab === 'media' && <MediaView />}
          {activeTab === 'seo' && <SeoView />}
          {activeTab === 'settings' && <SettingsView />}
          {activeTab === 'activity' && <ActivityLogView />}
          {activeTab === 'users' && <UsersView />}
        </main>
      </div>
    </div>
  );
};
