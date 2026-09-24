import React, { useEffect, useState } from 'react';
import { 
  Clock, 
  Activity, 
  Search, 
  User, 
  ShieldCheck 
} from 'lucide-react';
import { adminGetActivityLogs } from '../../utils/api';

export const ActivityLogView: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    setIsLoading(true);
    try {
      const res = await adminGetActivityLogs({ limit: 50 });
      if (res.success && res.data) {
        setLogs(res.data);
      }
    } catch (e) {
      console.error('Failed to load audit logs', e);
    } finally {
      setIsLoading(false);
    }
  };

  const actionColors: Record<string, string> = {
    LOGIN: 'bg-emerald-100 text-emerald-800',
    CREATE_SERVICE: 'bg-blue-100 text-blue-800',
    UPDATE_SERVICE: 'bg-violet-100 text-violet-800',
    UPDATE_LEAD_STATUS: 'bg-purple-100 text-purple-800',
    LEAD_NOTE_ADD: 'bg-amber-100 text-amber-800',
    SETTINGS_UPDATE: 'bg-indigo-100 text-indigo-800'
  };

  return (
    <div className="space-y-6 p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-neutral-900 font-['Space_Grotesk']">
          System Activity &amp; Audit Trail
        </h2>
        <p className="text-xs text-neutral-500">
          Immutable audit record of all administrative logins, pipeline transitions, and content updates.
        </p>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-3xl border border-[#E9E7F2] shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#FAF9FF] text-neutral-500 uppercase tracking-wider font-semibold border-b border-[#E9E7F2]">
            <tr>
              <th className="py-3.5 px-4">Action</th>
              <th className="py-3.5 px-4">Administrator</th>
              <th className="py-3.5 px-4">Entity</th>
              <th className="py-3.5 px-4">Details</th>
              <th className="py-3.5 px-4 text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-neutral-700">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-neutral-400">
                  <div className="w-6 h-6 border-2 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  Loading audit logs...
                </td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-neutral-400">
                  No audit logs recorded yet.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-[#FAF9FF]/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      actionColors[log.action] || 'bg-neutral-100 text-neutral-700'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-neutral-900">{log.adminName || 'System'}</div>
                    {log.admin?.email && (
                      <div className="text-[10px] text-neutral-400 font-mono">{log.admin.email}</div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-neutral-800">
                    {log.entity || 'System'}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-500 max-w-xs truncate">
                    {log.metadata || '—'}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-neutral-400 text-right text-[11px]">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
