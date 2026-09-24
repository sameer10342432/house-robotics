import React, { useEffect, useState } from 'react';
import { 
  Settings, 
  Save, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Building, 
  Share2, 
  ShieldCheck 
} from 'lucide-react';
import { adminGetSettings, adminUpdateSettings } from '../../utils/api';

export const SettingsView: React.FC = () => {
  const [settings, setSettings] = useState<Record<string, string>>({
    company_name: 'House Robotics',
    company_tagline: 'Smart Digital Solutions. Powerful Business Growth.',
    company_description: 'House Robotics combines digital marketing, AI automation and technology to help ambitious businesses grow faster and smarter.',
    contact_whatsapp: '+92 347 4542881',
    contact_email: 'sameerliaqat81@gmail.com',
    contact_address: 'Lahore, Pakistan / Remote Global Client Delivery',
    social_linkedin: 'https://linkedin.com/company/house-robotics',
    social_instagram: 'https://instagram.com/houserobotics',
    social_facebook: 'https://facebook.com/houserobotics',
    analytics_ga_id: 'G-HOUSEROBOTICS'
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const res = await adminGetSettings();
      if (res.success && res.data) {
        const data = res.data;
        if (data.settings) {
          setSettings(prev => ({ ...prev, ...data.settings }));
        }
      }
    } catch (e) {
      console.error('Failed to load settings', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const res = await adminUpdateSettings(settings);
      if (res.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (e) {
      console.error('Failed to save settings', e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6 p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-neutral-900 font-['Space_Grotesk']">
            Agency Site Settings
          </h2>
          <p className="text-xs text-neutral-500">
            Configure official brand identities, verified contact channels, and system endpoints.
          </p>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Site settings successfully updated in PostgreSQL database.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Section 1: Official Verified Contact Info */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E9E7F2] shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#E9E7F2] pb-3 text-sm font-bold text-neutral-900">
            <Phone className="w-4 h-4 text-[#6D28D9]" />
            <span>Official Client Communication Desk</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-neutral-700 mb-1">
                Official WhatsApp Desk *
              </label>
              <input
                type="text"
                required
                value={settings.contact_whatsapp || ''}
                onChange={(e) => handleChange('contact_whatsapp', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 font-mono font-bold focus:outline-none focus:border-[#6D28D9]"
              />
              <span className="text-[10px] text-neutral-400 mt-1 block">Production default: +92 347 4542881</span>
            </div>

            <div>
              <label className="block font-bold text-neutral-700 mb-1">
                Direct Administrative Email *
              </label>
              <input
                type="email"
                required
                value={settings.contact_email || ''}
                onChange={(e) => handleChange('contact_email', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 font-mono font-bold focus:outline-none focus:border-[#6D28D9]"
              />
              <span className="text-[10px] text-neutral-400 mt-1 block">Production default: sameerliaqat81@gmail.com</span>
            </div>
          </div>

          <div>
            <label className="block font-bold text-neutral-700 mb-1">Office / Delivery Location</label>
            <input
              type="text"
              value={settings.contact_address || ''}
              onChange={(e) => handleChange('contact_address', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
            />
          </div>
        </div>

        {/* Section 2: Brand Identity */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E9E7F2] shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#E9E7F2] pb-3 text-sm font-bold text-neutral-900">
            <Building className="w-4 h-4 text-[#6D28D9]" />
            <span>Brand Positioning</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-neutral-700 mb-1">Agency Name</label>
              <input
                type="text"
                value={settings.company_name || ''}
                onChange={(e) => handleChange('company_name', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
              />
            </div>
            <div>
              <label className="block font-bold text-neutral-700 mb-1">Tagline</label>
              <input
                type="text"
                value={settings.company_tagline || ''}
                onChange={(e) => handleChange('company_tagline', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-neutral-700 mb-1">Brand Description</label>
            <textarea
              rows={3}
              value={settings.company_description || ''}
              onChange={(e) => handleChange('company_description', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
            />
          </div>
        </div>

        {/* Section 3: Social & Analytics */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E9E7F2] shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#E9E7F2] pb-3 text-sm font-bold text-neutral-900">
            <Share2 className="w-4 h-4 text-[#6D28D9]" />
            <span>Social &amp; Measurement Tags</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-neutral-700 mb-1">LinkedIn URL</label>
              <input
                type="text"
                value={settings.social_linkedin || ''}
                onChange={(e) => handleChange('social_linkedin', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
              />
            </div>
            <div>
              <label className="block font-bold text-neutral-700 mb-1">Instagram URL</label>
              <input
                type="text"
                value={settings.social_instagram || ''}
                onChange={(e) => handleChange('social_instagram', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
              />
            </div>
            <div>
              <label className="block font-bold text-neutral-700 mb-1">Google Analytics ID</label>
              <input
                type="text"
                value={settings.analytics_ga_id || ''}
                onChange={(e) => handleChange('analytics_ga_id', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-bold flex items-center gap-2 shadow-lg disabled:opacity-50 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Persisting Changes...' : 'Save All Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
