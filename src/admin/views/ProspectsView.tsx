import React, { useEffect, useState, useId } from 'react';
import { 
  Building2, 
  Search, 
  Filter, 
  ExternalLink, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Download, 
  Upload, 
  Sparkles, 
  Send, 
  Copy, 
  Check, 
  UserPlus, 
  ShieldAlert, 
  Target, 
  BarChart3, 
  Layers, 
  ChevronRight, 
  X, 
  MessageSquare,
  RefreshCw,
  Trash2,
  FileText
} from 'lucide-react';
import { 
  adminGetProspects, 
  adminCreateProspect, 
  adminUpdateProspect, 
  adminDeleteProspect, 
  adminExportProspectsCsv, 
  adminImportProspectsCsv, 
  adminAddProspectNote, 
  adminScheduleProspectFollowUp, 
  adminCompleteProspectFollowUp, 
  adminLogProspectActivity, 
  adminGenerateProspectDraft, 
  adminConvertProspectToLead, 
  adminGetProspectReportsSummary, 
  adminGetProspectCampaigns, 
  adminCreateProspectCampaign, 
  adminGetSuppressions, 
  adminAddSuppression 
} from '../../utils/api';

export const ProspectsView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'prospects' | 'campaigns' | 'reports'>('prospects');
  
  // Prospects list state
  const [prospects, setProspects] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>({ total: 0, page: 1, limit: 20 });
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [followUpFilter, setFollowUpFilter] = useState('ALL');
  const [serviceFilter, setServiceFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [confidenceFilter, setConfidenceFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Selected prospect for detail drawer
  const [selectedProspect, setSelectedProspect] = useState<any | null>(null);
  const [newNote, setNewNote] = useState('');
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);

  // Follow-up scheduling
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleNote, setScheduleNote] = useState('');
  const [isScheduling, setIsScheduling] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  // Draft Outreach generator state
  const [draftChannel, setDraftChannel] = useState<'EMAIL' | 'CONTACT_FORM' | 'LINKEDIN'>('EMAIL');
  const [draftTone, setDraftTone] = useState<'CONSULTATIVE' | 'VALUE_FOCUSED' | 'PROFESSIONAL'>('CONSULTATIVE');
  const [customOpportunity, setCustomOpportunity] = useState('');
  const [customProposedValue, setCustomProposedValue] = useState('');
  const [customNextStep, setCustomNextStep] = useState('');
  const [generatedDraft, setGeneratedDraft] = useState<any | null>(null);
  const [isGeneratingDraft, setIsGeneratingDraft] = useState(false);
  const [draftCopied, setDraftCopied] = useState(false);

  // Manual Activity Logger state
  const [activityType, setActivityType] = useState('EMAIL_SENT_MANUAL');
  const [activityChannel, setActivityChannel] = useState('EMAIL');
  const [activitySubject, setActivitySubject] = useState('');
  const [activityContent, setActivityContent] = useState('');
  const [activityOutcome, setActivityOutcome] = useState('NO_REPLY');
  const [activityNextFollowUp, setActivityNextFollowUp] = useState('');
  const [isLoggingActivity, setIsLoggingActivity] = useState(false);

  // Convert to Lead state
  const [isConverting, setIsConverting] = useState(false);

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isSuppressionModalOpen, setIsSuppressionModalOpen] = useState(false);
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);

  // New Prospect form
  const [newBusinessName, setNewBusinessName] = useState('');
  const [newWebsiteUrl, setNewWebsiteUrl] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newContactPage, setNewContactPage] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newServiceFit, setNewServiceFit] = useState('Web Development');
  const [newBenefitReason, setNewBenefitReason] = useState('');
  const [newPriority, setNewPriority] = useState<'HIGH' | 'MEDIUM' | 'LOW'>('MEDIUM');
  const [newConfidence, setNewConfidence] = useState<'VERIFIED' | 'NEEDS_REVIEW' | 'INFERRED'>('INFERRED');
  const [newInternalNotes, setNewInternalNotes] = useState('');
  const [isCreatingProspect, setIsCreatingProspect] = useState(false);
  const [createErrorMsg, setCreateErrorMsg] = useState('');

  // CSV Import state
  const [csvText, setCsvText] = useState('');
  const [duplicateHandling, setDuplicateHandling] = useState<'SKIP' | 'FLAG' | 'OVERWRITE'>('SKIP');
  const [isImporting, setIsImporting] = useState(false);
  const [importResults, setImportResults] = useState<any | null>(null);

  // Suppression list state
  const [suppressions, setSuppressions] = useState<any[]>([]);
  const [suppressEmail, setSuppressEmail] = useState('');
  const [suppressDomain, setSuppressDomain] = useState('');
  const [suppressReason, setSuppressReason] = useState('DO_NOT_CONTACT_REQUEST');
  const [isAddingSuppression, setIsAddingSuppression] = useState(false);

  // Campaigns list state
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [newCampName, setNewCampName] = useState('');
  const [newCampService, setNewCampService] = useState('Web Development');
  const [newCampCity, setNewCampCity] = useState('');
  const [newCampState, setNewCampState] = useState('');
  const [newCampGoal, setNewCampGoal] = useState('');
  const [newCampAudience, setNewCampAudience] = useState('');
  const [newCampTemplate, setNewCampTemplate] = useState('');
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);

  // Reports state
  const [reportsData, setReportsData] = useState<any | null>(null);

  useEffect(() => {
    if (activeSubTab === 'prospects') {
      fetchProspects(1);
    } else if (activeSubTab === 'campaigns') {
      fetchCampaigns();
    } else if (activeSubTab === 'reports') {
      fetchReports();
    }
  }, [activeSubTab, statusFilter, followUpFilter, serviceFilter, priorityFilter, confidenceFilter, search]);

  const fetchProspects = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await adminGetProspects({
        status: statusFilter,
        service: serviceFilter,
        priority: priorityFilter,
        confidence: confidenceFilter,
        followUp: followUpFilter,
        search,
        page,
        limit: 20
      });
      if (res.success && res.data) {
        setProspects(res.data);
        if (res.pagination) {
          setPagination(res.pagination);
        }
      }
    } catch (e) {
      console.error('Failed to fetch prospects', e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCampaigns = async () => {
    try {
      const res = await adminGetProspectCampaigns();
      if (res.success && res.data) {
        setCampaigns(res.data);
      }
    } catch (e) {
      console.error('Failed to fetch campaigns', e);
    }
  };

  const fetchReports = async () => {
    try {
      const res = await adminGetProspectReportsSummary();
      if (res.success && res.data) {
        setReportsData(res.data);
      }
    } catch (e) {
      console.error('Failed to fetch reports', e);
    }
  };

  const fetchSuppressions = async () => {
    try {
      const res = await adminGetSuppressions();
      if (res.success && res.data) {
        setSuppressions(res.data);
      }
    } catch (e) {
      console.error('Failed to fetch suppressions', e);
    }
  };

  const handleOpenProspectDetail = (p: any) => {
    setSelectedProspect(p);
    setNewNote('');
    setScheduleDate(p.followUpDate ? p.followUpDate.slice(0, 10) : '');
    setScheduleNote(p.followUpNote || '');
    setGeneratedDraft(null);
    setActionSuccessMsg('');
    setCustomOpportunity(p.benefitReason || '');
  };

  const handleCreateProspect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBusinessName || !newWebsiteUrl) return;

    setIsCreatingProspect(true);
    setCreateErrorMsg('');
    try {
      const res = await adminCreateProspect({
        businessName: newBusinessName,
        websiteUrl: newWebsiteUrl,
        category: newCategory,
        city: newCity,
        state: newState,
        contactPageUrl: newContactPage,
        email: newEmail,
        phone: newPhone,
        potentialServiceFit: newServiceFit,
        benefitReason: newBenefitReason,
        priority: newPriority,
        confidence: newConfidence,
        internalNotes: newInternalNotes
      });

      if (res.success) {
        setIsCreateModalOpen(false);
        // Reset form
        setNewBusinessName('');
        setNewWebsiteUrl('');
        setNewCategory('');
        setNewCity('');
        setNewState('');
        setNewContactPage('');
        setNewEmail('');
        setNewPhone('');
        setNewBenefitReason('');
        setNewInternalNotes('');
        fetchProspects(1);
      }
    } catch (err: any) {
      setCreateErrorMsg(err?.message || 'Failed to create prospect.');
    } finally {
      setIsCreatingProspect(false);
    }
  };

  const handleImportCsv = async () => {
    if (!csvText.trim()) return;
    setIsImporting(true);
    setImportResults(null);

    try {
      // Basic client-side CSV parser
      const lines = csvText.trim().split('\n');
      if (lines.length < 2) {
        throw new Error('CSV must contain a header row and at least one data row.');
      }

      const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, '').toLowerCase());
      const parsedItems: any[] = [];

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        // Simple comma split handling quotes
        const match = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || line.split(',');
        const row = match.map(c => c.trim().replace(/^["']|["']$/g, ''));

        const item: any = {};
        headers.forEach((h, idx) => {
          const val = row[idx] || '';
          if (h.includes('name') || h.includes('business')) item.businessName = val;
          else if (h.includes('website') || h.includes('url') || h.includes('domain')) item.websiteUrl = val;
          else if (h.includes('cat') || h.includes('industry')) item.category = val;
          else if (h.includes('city')) item.city = val;
          else if (h.includes('state')) item.state = val;
          else if (h.includes('mail')) item.email = val;
          else if (h.includes('phone')) item.phone = val;
          else if (h.includes('service')) item.potentialServiceFit = val;
          else if (h.includes('benefit') || h.includes('reason') || h.includes('opportunity')) item.benefitReason = val;
          else if (h.includes('priority')) item.priority = val;
        });

        if (item.businessName && item.websiteUrl) {
          parsedItems.push(item);
        }
      }

      const res = await adminImportProspectsCsv(parsedItems, duplicateHandling);
      if (res.success) {
        setImportResults(res.data);
        fetchProspects(1);
      }
    } catch (err: any) {
      alert(err.message || 'CSV Import failed');
    } finally {
      setIsImporting(false);
    }
  };

  const handleGenerateDraft = async () => {
    if (!selectedProspect) return;
    setIsGeneratingDraft(true);
    setDraftCopied(false);
    try {
      const res = await adminGenerateProspectDraft(selectedProspect.id, {
        service: selectedProspect.potentialServiceFit,
        channel: draftChannel,
        tone: draftTone,
        observedOpportunity: customOpportunity,
        proposedValue: customProposedValue,
        desiredNextStep: customNextStep
      });
      if (res.success && res.data) {
        setGeneratedDraft(res.data);
      }
    } catch (e: any) {
      alert(e.message || 'Failed to generate draft.');
    } finally {
      setIsGeneratingDraft(false);
    }
  };

  const handleCopyDraft = () => {
    if (!generatedDraft) return;
    navigator.clipboard.writeText(generatedDraft.fullDraft);
    setDraftCopied(true);
    setTimeout(() => setDraftCopied(false), 2500);
  };

  const handleLogManualActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProspect) return;
    setIsLoggingActivity(true);
    try {
      const res = await adminLogProspectActivity(selectedProspect.id, {
        activityType,
        channel: activityChannel,
        subject: activitySubject || `${activityType.replace(/_/g, ' ')} for ${selectedProspect.businessName}`,
        content: activityContent,
        outcome: activityOutcome,
        nextFollowUp: activityNextFollowUp || undefined
      });

      if (res.success) {
        setActionSuccessMsg('Activity recorded successfully.');
        setActivitySubject('');
        setActivityContent('');
        // Refresh prospect details
        fetchProspects(pagination.page);
        const updated = await adminGetProspects({ search: selectedProspect.websiteUrl });
        if (updated.data && updated.data[0]) {
          setSelectedProspect(updated.data[0]);
        }
      }
    } catch (err: any) {
      alert(err.message || 'Failed to log activity');
    } finally {
      setIsLoggingActivity(false);
    }
  };

  const handleScheduleFollowUp = async () => {
    if (!selectedProspect || !scheduleDate) return;
    setIsScheduling(true);
    setActionSuccessMsg('');
    try {
      const res = await adminScheduleProspectFollowUp(selectedProspect.id, scheduleDate, scheduleNote);
      if (res.success) {
        setActionSuccessMsg('Follow-up scheduled.');
        fetchProspects(pagination.page);
        setSelectedProspect({
          ...selectedProspect,
          followUpDate: scheduleDate,
          followUpStatus: 'PENDING',
          followUpNote: scheduleNote
        });
      }
    } catch (e: any) {
      alert(e.message || 'Failed to schedule follow-up.');
    } finally {
      setIsScheduling(false);
    }
  };

  const handleCompleteFollowUp = async () => {
    if (!selectedProspect) return;
    try {
      const res = await adminCompleteProspectFollowUp(selectedProspect.id);
      if (res.success) {
        setActionSuccessMsg('Follow-up marked as completed.');
        fetchProspects(pagination.page);
        setSelectedProspect({
          ...selectedProspect,
          followUpStatus: 'COMPLETED'
        });
      }
    } catch (e: any) {
      alert(e.message || 'Failed to complete follow-up');
    }
  };

  const handleConvertLead = async () => {
    if (!selectedProspect) return;
    if (!window.confirm(`Convert ${selectedProspect.businessName} into an active qualified CRM Lead?`)) return;

    setIsConverting(true);
    try {
      const res = await adminConvertProspectToLead(selectedProspect.id, {
        service: selectedProspect.potentialServiceFit,
        notes: `Converted directly from USA Prospect Manager.`
      });
      if (res.success) {
        alert(`Success! Converted into CRM Lead ${res.data.inquiryId}. Record linked.`);
        fetchProspects(pagination.page);
        setSelectedProspect({
          ...selectedProspect,
          convertedLeadId: res.data.id,
          status: 'QUALIFIED'
        });
      }
    } catch (e: any) {
      alert(e.message || 'Failed to convert prospect');
    } finally {
      setIsConverting(false);
    }
  };

  const handleMarkDoNotContact = async () => {
    if (!selectedProspect) return;
    if (!window.confirm(`Mark ${selectedProspect.businessName} as DO NOT CONTACT and add to the suppression list?`)) return;

    try {
      await adminUpdateProspect(selectedProspect.id, { status: 'DO_NOT_CONTACT' });
      alert('Prospect status updated to DO NOT CONTACT and added to suppression list.');
      fetchProspects(pagination.page);
      setSelectedProspect({
        ...selectedProspect,
        status: 'DO_NOT_CONTACT'
      });
    } catch (e: any) {
      alert(e.message || 'Failed to update status');
    }
  };

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampName) return;
    setIsCreatingCampaign(true);
    try {
      const res = await adminCreateProspectCampaign({
        name: newCampName,
        service: newCampService,
        city: newCampCity,
        state: newCampState,
        goal: newCampGoal,
        targetAudience: newCampAudience,
        messageTemplate: newCampTemplate,
        status: 'DRAFT'
      });
      if (res.success) {
        setIsCampaignModalOpen(false);
        setNewCampName('');
        setNewCampGoal('');
        setNewCampAudience('');
        setNewCampTemplate('');
        fetchCampaigns();
      }
    } catch (e: any) {
      alert(e.message || 'Failed to create campaign');
    } finally {
      setIsCreatingCampaign(false);
    }
  };

  const handleAddSuppressionItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!suppressEmail && !suppressDomain) return;
    setIsAddingSuppression(true);
    try {
      const res = await adminAddSuppression({
        email: suppressEmail || undefined,
        domain: suppressDomain || undefined,
        reason: suppressReason
      });
      if (res.success) {
        setSuppressEmail('');
        setSuppressDomain('');
        fetchSuppressions();
      }
    } catch (e: any) {
      alert(e.message || 'Failed to add suppression');
    } finally {
      setIsAddingSuppression(false);
    }
  };

  const priorityColor = (p: string) => {
    if (p === 'HIGH') return 'bg-rose-50 text-rose-700 border-rose-200';
    if (p === 'MEDIUM') return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-blue-50 text-blue-700 border-blue-200';
  };

  const confidenceBadge = (c: string) => {
    if (c === 'VERIFIED') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (c === 'NEEDS_REVIEW') return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-neutral-100 text-neutral-600 border-neutral-200';
  };

  const statusBadge = (s: string) => {
    switch (s) {
      case 'NEW': return 'bg-purple-50 text-[#6D28D9] border-purple-200';
      case 'RESEARCHED': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'QUALIFIED': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'READY_FOR_OUTREACH': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'CONTACTED': return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'REPLIED': return 'bg-teal-50 text-teal-800 border-teal-200';
      case 'MEETING_REQUESTED': return 'bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200';
      case 'PROPOSAL_SENT': return 'bg-violet-50 text-violet-800 border-violet-200';
      case 'WON': return 'bg-green-100 text-green-900 border-green-300';
      case 'LOST': return 'bg-neutral-100 text-neutral-600 border-neutral-200';
      case 'DO_NOT_CONTACT': return 'bg-rose-100 text-rose-900 border-rose-300 font-bold';
      default: return 'bg-neutral-50 text-neutral-600 border-neutral-200';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Module Title & Top Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-purple-100 text-[#6D28D9]">
              Phase 5 Active
            </span>
            <span className="text-xs font-semibold text-neutral-500">Lawful USA B2B Outreach</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight font-['Space_Grotesk'] mt-1">
            USA Prospect Manager & Client Outreach
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Research legitimate US business prospects, compose personalized compliant drafts, manage follow-ups, and convert enquiries into the CRM.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#6D28D9] text-white text-xs font-bold shadow-[0_4px_14px_rgba(109,40,217,0.35)] hover:bg-[#5B21B6] transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Prospect</span>
          </button>

          <button
            onClick={() => setIsImportModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-neutral-200 bg-white text-xs font-bold text-neutral-700 hover:bg-neutral-50 shadow-xs transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-neutral-500" />
            <span>Import CSV</span>
          </button>

          <button
            onClick={() => adminExportProspectsCsv({
              status: statusFilter,
              service: serviceFilter,
              priority: priorityFilter,
              confidence: confidenceFilter,
              followUp: followUpFilter,
              search
            })}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-neutral-200 bg-white text-xs font-bold text-neutral-700 hover:bg-neutral-50 shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-neutral-500" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => {
              setIsSuppressionModalOpen(true);
              fetchSuppressions();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-rose-200 bg-rose-50 text-xs font-bold text-rose-700 hover:bg-rose-100 shadow-xs transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span>Suppression List</span>
          </button>
        </div>
      </div>

      {/* Primary Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
        <button
          onClick={() => setActiveSubTab('prospects')}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'prospects'
              ? 'bg-[#6D28D9] text-white shadow-xs'
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Prospects Database ({pagination.total || 0})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('campaigns')}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'campaigns'
              ? 'bg-[#6D28D9] text-white shadow-xs'
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Outreach Campaigns</span>
        </button>

        <button
          onClick={() => setActiveSubTab('reports')}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'reports'
              ? 'bg-[#6D28D9] text-white shadow-xs'
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Outreach Analytics & Reports</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SUBTAB 1: PROSPECTS DATABASE VIEW                                         */}
      {/* ========================================================================= */}
      {activeSubTab === 'prospects' && (
        <div className="space-y-4">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-neutral-500 mr-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-violet-600" />
              <span>Follow-Ups:</span>
            </span>
            {[
              { id: 'ALL', label: 'All Records' },
              { id: 'TODAY', label: 'Due Today', badge: 'bg-amber-100 text-amber-800' },
              { id: 'OVERDUE', label: 'Overdue', badge: 'bg-rose-100 text-rose-800' },
              { id: 'UPCOMING', label: 'Upcoming', badge: 'bg-indigo-100 text-indigo-800' },
              { id: 'COMPLETED', label: 'Done', badge: 'bg-emerald-100 text-emerald-800' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFollowUpFilter(f.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                  followUpFilter === f.id
                    ? 'bg-[#0F0C20] text-white border-[#0F0C20]'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Search & Dropdown Filters Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 p-3.5 rounded-2xl bg-white border border-neutral-200 shadow-xs">
            {/* Search */}
            <div className="relative lg:col-span-2">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search business name, website, city, state, or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-neutral-200 text-xs text-neutral-800 focus:outline-hidden focus:border-[#6D28D9]"
              />
            </div>

            {/* Status Filter */}
            <div>
              <select
                aria-label="Filter by prospect pipeline status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 bg-white"
              >
                <option value="ALL">Status: All</option>
                <option value="NEW">New</option>
                <option value="RESEARCHED">Researched</option>
                <option value="QUALIFIED">Qualified</option>
                <option value="READY_FOR_OUTREACH">Ready for Outreach</option>
                <option value="CONTACTED">Contacted</option>
                <option value="REPLIED">Replied</option>
                <option value="MEETING_REQUESTED">Meeting Requested</option>
                <option value="PROPOSAL_SENT">Proposal Sent</option>
                <option value="WON">Won (Deal Closed)</option>
                <option value="LOST">Lost</option>
                <option value="DO_NOT_CONTACT">Do Not Contact (Suppressed)</option>
              </select>
            </div>

            {/* Service Fit Filter */}
            <div>
              <select
                aria-label="Filter by target service fit"
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 bg-white"
              >
                <option value="ALL">Service: All</option>
                <option value="Web Development">Web Development</option>
                <option value="SEO">SEO Services</option>
                <option value="AI Automation">AI Automation</option>
                <option value="E-Commerce">E-Commerce</option>
                <option value="Digital Marketing">Digital Marketing</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <select
                aria-label="Filter by prospect priority level"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 bg-white"
              >
                <option value="ALL">Priority: All</option>
                <option value="HIGH">High Priority</option>
                <option value="MEDIUM">Medium Priority</option>
                <option value="LOW">Low Priority</option>
              </select>
            </div>
          </div>

          {/* Prospects Table */}
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
            {isLoading ? (
              <div className="p-12 text-center">
                <div className="w-8 h-8 border-3 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-xs font-semibold text-neutral-500">Loading USA Prospect Intelligence...</p>
              </div>
            ) : prospects.length === 0 ? (
              <div className="p-12 text-center">
                <Building2 className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-neutral-800">No Prospects Matching Filter</h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                  Add prospects gathered through lawful research or import a qualified CSV list to begin outreach.
                </p>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="mt-4 px-3.5 py-1.5 rounded-xl bg-[#6D28D9] text-white text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add First Prospect</span>
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-neutral-50/80 border-b border-neutral-200 text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                      <th className="py-3 px-4">Business & Domain</th>
                      <th className="py-3 px-4">Location & Category</th>
                      <th className="py-3 px-4">Service Fit</th>
                      <th className="py-3 px-4">Priority & Confidence</th>
                      <th className="py-3 px-4">Pipeline Status</th>
                      <th className="py-3 px-4">Follow-Up</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 text-xs">
                    {prospects.map((p) => (
                      <tr 
                        key={p.id} 
                        className="hover:bg-violet-50/30 transition-colors cursor-pointer"
                        onClick={() => handleOpenProspectDetail(p)}
                      >
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                            <span>{p.businessName}</span>
                            {p.convertedLeadId && (
                              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-emerald-100 text-emerald-800">
                                CRM Lead
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 text-neutral-500 text-[11px] mt-0.5">
                            <Globe className="w-3 h-3 text-neutral-400" />
                            <a
                              href={p.websiteUrl.startsWith('http') ? p.websiteUrl : `https://${p.websiteUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="hover:text-violet-600 underline"
                            >
                              {p.normalizedDomain || p.websiteUrl}
                            </a>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-neutral-600">
                          <div className="flex items-center gap-1 font-medium text-neutral-800">
                            <MapPin className="w-3 h-3 text-neutral-400" />
                            <span>{p.city && p.state ? `${p.city}, ${p.state}` : (p.city || p.state || 'USA')}</span>
                          </div>
                          <span className="text-[11px] text-neutral-400">{p.category || 'General Business'}</span>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="font-bold text-neutral-800">{p.potentialServiceFit}</span>
                          {p.benefitReason && (
                            <p className="text-[10px] text-neutral-400 truncate max-w-[180px]" title={p.benefitReason}>
                              {p.benefitReason}
                            </p>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${priorityColor(p.priority)}`}>
                              {p.priority}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${confidenceBadge(p.confidence)}`}>
                              {p.confidence}
                            </span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold border ${statusBadge(p.status)}`}>
                            {p.status.replace(/_/g, ' ')}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          {p.followUpDate ? (
                            <div>
                              <div className="font-semibold text-neutral-700">
                                {new Date(p.followUpDate).toLocaleDateString()}
                              </div>
                              <span className={`text-[10px] font-bold ${
                                p.followUpStatus === 'OVERDUE' ? 'text-rose-600' :
                                p.followUpStatus === 'TODAY' ? 'text-amber-600' :
                                p.followUpStatus === 'COMPLETED' ? 'text-emerald-600' : 'text-indigo-600'
                              }`}>
                                {p.followUpStatus}
                              </span>
                            </div>
                          ) : (
                            <span className="text-neutral-400 text-[11px]">None</span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleOpenProspectDetail(p)}
                            className="px-2.5 py-1 rounded-lg border border-neutral-200 text-xs font-bold text-neutral-700 hover:bg-neutral-50 inline-flex items-center gap-1"
                          >
                            <span>Manage</span>
                            <ChevronRight className="w-3 h-3 text-neutral-400" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination footer */}
            <div className="p-3.5 bg-neutral-50/60 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-600">
              <span>Showing {prospects.length} of {pagination.total} prospects</span>
              <div className="flex items-center gap-1.5">
                <button
                  disabled={pagination.page <= 1}
                  onClick={() => fetchProspects(pagination.page - 1)}
                  className="px-2.5 py-1 rounded-lg border border-neutral-200 bg-white font-semibold disabled:opacity-40"
                >
                  Prev
                </button>
                <span className="px-2 font-bold text-neutral-700">{pagination.page} / {pagination.totalPages || 1}</span>
                <button
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => fetchProspects(pagination.page + 1)}
                  className="px-2.5 py-1 rounded-lg border border-neutral-200 bg-white font-semibold disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 2: OUTREACH CAMPAIGNS VIEW                                         */}
      {/* ========================================================================= */}
      {activeSubTab === 'campaigns' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-neutral-900">Structured Outreach Campaigns</h2>
              <p className="text-xs text-neutral-500">Organize prospects by service, geographic hub, and strategic message template.</p>
            </div>
            <button
              onClick={() => setIsCampaignModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#6D28D9] text-white text-xs font-bold shadow-xs hover:bg-[#5B21B6]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Campaign</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {campaigns.length === 0 ? (
              <div className="col-span-full p-8 text-center bg-white rounded-2xl border border-neutral-200">
                <Target className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-neutral-800">No Outreach Campaigns Yet</h4>
                <p className="text-xs text-neutral-500 mt-1">Create your first campaign to group prospects for focused manual outreach.</p>
              </div>
            ) : (
              campaigns.map((c) => (
                <div key={c.id} className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-purple-50 text-[#6D28D9] border border-purple-200">
                        {c.service || 'Web Development'}
                      </span>
                      <h3 className="text-sm font-extrabold text-neutral-900 mt-1">{c.name}</h3>
                      {c.city && c.state && (
                        <p className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-neutral-400" />
                          <span>{c.city}, {c.state}</span>
                        </p>
                      )}
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-100 text-neutral-700">
                      {c.status}
                    </span>
                  </div>

                  {c.goal && <p className="text-xs text-neutral-600 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">{c.goal}</p>}

                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                    <span>{c._count?.members || 0} Target Prospects</span>
                    <span className="text-[11px] text-neutral-400">{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 3: REPORTS & ANALYTICS VIEW                                        */}
      {/* ========================================================================= */}
      {activeSubTab === 'reports' && (
        <div className="space-y-6">
          {reportsData ? (
            <>
              {/* Stat Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                {[
                  { label: 'Total Researched', val: reportsData.total || 0, color: 'text-neutral-900' },
                  { label: 'Qualified Fit', val: reportsData.statusMap?.QUALIFIED || 0, color: 'text-emerald-700' },
                  { label: 'Ready for Outreach', val: reportsData.statusMap?.READY_FOR_OUTREACH || 0, color: 'text-indigo-700' },
                  { label: 'Contacted', val: reportsData.statusMap?.CONTACTED || 0, color: 'text-amber-700' },
                  { label: 'Replies Received', val: reportsData.statusMap?.REPLIED || 0, color: 'text-teal-700' },
                  { label: 'Won Deals', val: reportsData.statusMap?.WON || 0, color: 'text-green-700' }
                ].map((s, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white border border-neutral-200 shadow-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">{s.label}</span>
                    <div className={`text-xl font-extrabold ${s.color} font-['Space_Grotesk'] mt-0.5`}>
                      {s.val}
                    </div>
                  </div>
                ))}
              </div>

              {/* Service & Geographic Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs">
                  <h3 className="text-sm font-extrabold text-neutral-900 mb-3">Service Fit Distribution</h3>
                  <div className="space-y-2">
                    {Object.entries(reportsData.serviceMap || {}).map(([srv, count]: any) => (
                      <div key={srv} className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-neutral-700">{srv}</span>
                        <span className="px-2 py-0.5 rounded-md bg-neutral-100 font-bold text-neutral-800">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs">
                  <h3 className="text-sm font-extrabold text-neutral-900 mb-3">Top US State Targets</h3>
                  <div className="space-y-2">
                    {(reportsData.topStates || []).map((st: any) => (
                      <div key={st.state} className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-neutral-700">{st.state}</span>
                        <span className="px-2 py-0.5 rounded-md bg-purple-50 text-[#6D28D9] font-bold">{st.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Outreach Activity Log Feed */}
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs">
                <h3 className="text-sm font-extrabold text-neutral-900 mb-3">Recent Outreach Actions Logged</h3>
                {reportsData.recentActivities?.length === 0 ? (
                  <p className="text-xs text-neutral-400">No manual outreach activities recorded yet.</p>
                ) : (
                  <div className="divide-y divide-neutral-100">
                    {reportsData.recentActivities?.map((a: any) => (
                      <div key={a.id} className="py-2.5 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-neutral-900">{a.businessName}</span>
                          <span className="text-neutral-500 mx-2">—</span>
                          <span className="font-semibold text-violet-700">{a.activityType.replace(/_/g, ' ')}</span>
                          {a.outcome && <span className="text-neutral-400 ml-2">({a.outcome})</span>}
                        </div>
                        <span className="text-[11px] text-neutral-400">{new Date(a.performedAt).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-neutral-200">
              <BarChart3 className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
              <p className="text-xs text-neutral-500">Loading aggregate reports...</p>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* PROSPECT DETAIL & OUTREACH DRAWER                                         */}
      {/* ========================================================================= */}
      {selectedProspect && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-neutral-900/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col overflow-y-auto border-l border-neutral-200">
            {/* Drawer Header */}
            <div className="p-5 border-b border-neutral-200 flex items-start justify-between sticky top-0 bg-white z-10">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusBadge(selectedProspect.status)}`}>
                    {selectedProspect.status.replace(/_/g, ' ')}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${priorityColor(selectedProspect.priority)}`}>
                    {selectedProspect.priority} Priority
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${confidenceBadge(selectedProspect.confidence)}`}>
                    {selectedProspect.confidence}
                  </span>
                </div>
                <h2 className="text-lg font-extrabold text-neutral-900 font-['Space_Grotesk'] mt-1">
                  {selectedProspect.businessName}
                </h2>
                <div className="flex items-center gap-2 text-xs text-neutral-500 mt-0.5">
                  <Globe className="w-3.5 h-3.5 text-neutral-400" />
                  <a
                    href={selectedProspect.websiteUrl.startsWith('http') ? selectedProspect.websiteUrl : `https://${selectedProspect.websiteUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-600 underline font-semibold flex items-center gap-1"
                  >
                    <span>{selectedProspect.websiteUrl}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <button
                onClick={() => setSelectedProspect(null)}
                className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-5 space-y-6 flex-1">
              {actionSuccessMsg && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{actionSuccessMsg}</span>
                </div>
              )}

              {/* Action Buttons Toolbar */}
              <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-wrap items-center gap-2">
                <button
                  onClick={handleConvertLead}
                  disabled={isConverting || !!selectedProspect.convertedLeadId}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 disabled:opacity-50 inline-flex items-center gap-1.5 shadow-xs"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>{selectedProspect.convertedLeadId ? 'Converted to CRM Lead' : 'Convert to CRM Lead'}</span>
                </button>

                <button
                  onClick={handleMarkDoNotContact}
                  className="px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-100 inline-flex items-center gap-1.5"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                  <span>Do Not Contact</span>
                </button>
              </div>

              {/* Verified Profile & Context */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white border border-neutral-200 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400">Location</span>
                  <p className="font-semibold text-neutral-800 mt-0.5">
                    {selectedProspect.city && selectedProspect.state ? `${selectedProspect.city}, ${selectedProspect.state}` : (selectedProspect.city || selectedProspect.state || 'USA')}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400">Business Category</span>
                  <p className="font-semibold text-neutral-800 mt-0.5">{selectedProspect.category || 'Not specified'}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400">Public Contact Email</span>
                  <p className="font-semibold text-neutral-800 mt-0.5">{selectedProspect.email || 'None on public record'}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400">Public Phone</span>
                  <p className="font-semibold text-neutral-800 mt-0.5">{selectedProspect.phone || 'None on record'}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] uppercase font-bold text-neutral-400">Observed Opportunity / Benefit Rationale</span>
                  <p className="font-medium text-neutral-700 mt-0.5 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                    {selectedProspect.benefitReason || 'General engineering improvement & performance modernization.'}
                  </p>
                </div>
              </div>

              {/* Outreach Draft Generator Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-50/50 to-purple-50/20 border border-purple-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#6D28D9]">
                    <Sparkles className="w-4 h-4 text-violet-600" />
                    <span>Personalized Outreach Draft Generator</span>
                  </div>
                  <span className="text-[10px] font-semibold text-neutral-400">Review Before Sending</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] font-bold text-neutral-500">Channel</label>
                    <select
                      value={draftChannel}
                      onChange={(e: any) => setDraftChannel(e.target.value)}
                      className="w-full mt-0.5 px-2 py-1.5 rounded-xl border border-neutral-200 bg-white text-xs"
                    >
                      <option value="EMAIL">Email Draft</option>
                      <option value="CONTACT_FORM">Contact Form Note</option>
                      <option value="LINKEDIN">LinkedIn Message</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-neutral-500">Tone</label>
                    <select
                      value={draftTone}
                      onChange={(e: any) => setDraftTone(e.target.value)}
                      className="w-full mt-0.5 px-2 py-1.5 rounded-xl border border-neutral-200 bg-white text-xs"
                    >
                      <option value="CONSULTATIVE">Consultative & Technical</option>
                      <option value="VALUE_FOCUSED">Value-Focused</option>
                      <option value="PROFESSIONAL">Professional Corporate</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleGenerateDraft}
                  disabled={isGeneratingDraft}
                  className="w-full py-2 rounded-xl bg-[#6D28D9] text-white text-xs font-bold shadow-xs hover:bg-[#5B21B6] transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isGeneratingDraft ? 'Synthesizing Draft...' : 'Generate Personalized Draft'}</span>
                </button>

                {generatedDraft && (
                  <div className="mt-3 space-y-2 pt-3 border-t border-purple-200">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-neutral-700">Subject: {generatedDraft.subject}</span>
                      <button
                        onClick={handleCopyDraft}
                        className="px-2 py-1 rounded-lg bg-white border border-neutral-200 text-[11px] font-bold text-neutral-700 hover:bg-neutral-50 inline-flex items-center gap-1 shadow-xs"
                      >
                        {draftCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{draftCopied ? 'Copied!' : 'Copy Draft'}</span>
                      </button>
                    </div>

                    <textarea
                      rows={10}
                      readOnly
                      value={generatedDraft.fullDraft}
                      className="w-full p-3 rounded-xl border border-purple-200 bg-white text-xs text-neutral-800 font-mono leading-relaxed focus:outline-hidden"
                    />
                    <p className="text-[10px] text-neutral-400 italic">
                      * Includes mandatory House Robotics sender identification, official remote collaboration disclosure, and CAN-SPAM compliant opt-out footer.
                    </p>
                  </div>
                )}
              </div>

              {/* Log Manual Outreach Activity */}
              <div className="p-4 rounded-2xl bg-white border border-neutral-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-800">Log Manual Outreach Activity</span>
                  <span className="text-[10px] font-medium text-neutral-400">Audit Trail</span>
                </div>

                <form onSubmit={handleLogManualActivity} className="space-y-2.5">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-[10px] font-bold text-neutral-500">Activity Type</label>
                      <select
                        value={activityType}
                        onChange={(e) => setActivityType(e.target.value)}
                        className="w-full mt-0.5 px-2 py-1.5 rounded-xl border border-neutral-200 bg-white text-xs"
                      >
                        <option value="EMAIL_SENT_MANUAL">Email Sent Manually</option>
                        <option value="CONTACT_FORM_SUBMITTED">Contact Form Submitted</option>
                        <option value="PHONE_CALL">Phone Call Completed</option>
                        <option value="LINKEDIN_INTERACTION">LinkedIn Interaction</option>
                        <option value="REPLY_RECEIVED">Reply Received</option>
                        <option value="MEETING_BOOKED">Meeting Booked</option>
                        <option value="PROPOSAL_SENT">Proposal Sent</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-neutral-500">Outcome</label>
                      <select
                        value={activityOutcome}
                        onChange={(e) => setActivityOutcome(e.target.value)}
                        className="w-full mt-0.5 px-2 py-1.5 rounded-xl border border-neutral-200 bg-white text-xs"
                      >
                        <option value="NO_REPLY">No Reply / Awaiting</option>
                        <option value="INTERESTED">Interested in Services</option>
                        <option value="NOT_INTERESTED">Not Interested</option>
                        <option value="MEETING_SCHEDULED">Meeting Scheduled</option>
                        <option value="DO_NOT_CONTACT">Requested Do Not Contact</option>
                      </select>
                    </div>
                  </div>

                  <input
                    type="text"
                    placeholder="Subject or conversation summary..."
                    value={activitySubject}
                    onChange={(e) => setActivitySubject(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-neutral-200 text-xs"
                  />

                  <textarea
                    rows={2}
                    placeholder="Notes on conversation or exact response received..."
                    value={activityContent}
                    onChange={(e) => setActivityContent(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs"
                  />

                  <button
                    type="submit"
                    disabled={isLoggingActivity}
                    className="w-full py-2 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 transition-colors"
                  >
                    {isLoggingActivity ? 'Recording...' : 'Record Outreach Activity'}
                  </button>
                </form>
              </div>

              {/* Follow-Up Management */}
              <div className="p-4 rounded-2xl bg-white border border-neutral-200 space-y-3">
                <span className="text-xs font-bold text-neutral-800">Follow-Up Reminder</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] font-bold text-neutral-500">Follow-Up Date</label>
                    <input
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="w-full mt-0.5 px-2.5 py-1.5 rounded-xl border border-neutral-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-neutral-500">Action Plan Note</label>
                    <input
                      type="text"
                      placeholder="e.g. Discovery call follow-up"
                      value={scheduleNote}
                      onChange={(e) => setScheduleNote(e.target.value)}
                      className="w-full mt-0.5 px-2.5 py-1.5 rounded-xl border border-neutral-200 text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleScheduleFollowUp}
                    disabled={isScheduling}
                    className="flex-1 py-1.5 rounded-xl bg-violet-600 text-white text-xs font-bold hover:bg-violet-700 disabled:opacity-50"
                  >
                    Save Follow-Up
                  </button>

                  {selectedProspect.followUpStatus !== 'COMPLETED' && selectedProspect.followUpDate && (
                    <button
                      onClick={handleCompleteFollowUp}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold hover:bg-emerald-100"
                    >
                      Mark Done
                    </button>
                  )}
                </div>
              </div>

              {/* Notes & Activity Timeline */}
              <div className="p-4 rounded-2xl bg-white border border-neutral-200 space-y-3">
                <span className="text-xs font-bold text-neutral-800">Timeline Notes</span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Add an internal prospect note..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl border border-neutral-200 text-xs"
                  />
                  <button
                    onClick={async () => {
                      if (!newNote.trim()) return;
                      setIsSubmittingNote(true);
                      await adminAddProspectNote(selectedProspect.id, newNote);
                      setNewNote('');
                      setIsSubmittingNote(false);
                      const updated = await adminGetProspects({ search: selectedProspect.websiteUrl });
                      if (updated.data && updated.data[0]) setSelectedProspect(updated.data[0]);
                    }}
                    disabled={isSubmittingNote}
                    className="px-3 py-1.5 rounded-xl bg-[#6D28D9] text-white text-xs font-bold"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selectedProspect.notes?.map((n: any) => (
                    <div key={n.id} className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-100 text-xs">
                      <p className="text-neutral-800">{n.note}</p>
                      <span className="text-[10px] text-neutral-400 mt-1 block">
                        {n.authorName} • {new Date(n.createdAt).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: ADD PROSPECT MANUALLY                                            */}
      {/* ========================================================================= */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-neutral-900 font-['Space_Grotesk']">Add USA Prospect</h3>
                <p className="text-xs text-neutral-500">Record a manually researched business opportunity.</p>
              </div>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-neutral-400 hover:text-neutral-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {createErrorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-800">
                {createErrorMsg}
              </div>
            )}

            <form onSubmit={handleCreateProspect} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-neutral-700">Business Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Industrial Solutions"
                    value={newBusinessName}
                    onChange={(e) => setNewBusinessName(e.target.value)}
                    className="w-full mt-1 px-3 py-1.5 rounded-xl border border-neutral-200 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-neutral-700">Website URL *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. https://apexindustrial.com"
                    value={newWebsiteUrl}
                    onChange={(e) => setNewWebsiteUrl(e.target.value)}
                    className="w-full mt-1 px-3 py-1.5 rounded-xl border border-neutral-200 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-neutral-700">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Logistics"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full mt-1 px-2.5 py-1.5 rounded-xl border border-neutral-200 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-neutral-700">City</label>
                  <input
                    type="text"
                    placeholder="Houston"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full mt-1 px-2.5 py-1.5 rounded-xl border border-neutral-200 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-neutral-700">State (US)</label>
                  <input
                    type="text"
                    placeholder="TX"
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                    className="w-full mt-1 px-2.5 py-1.5 rounded-xl border border-neutral-200 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-neutral-700">Public Business Email</label>
                  <input
                    type="email"
                    placeholder="info@business.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full mt-1 px-3 py-1.5 rounded-xl border border-neutral-200 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-neutral-700">Public Contact Page URL</label>
                  <input
                    type="text"
                    placeholder="https://business.com/contact"
                    value={newContactPage}
                    onChange={(e) => setNewContactPage(e.target.value)}
                    className="w-full mt-1 px-3 py-1.5 rounded-xl border border-neutral-200 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-neutral-700">Service Fit</label>
                  <select
                    value={newServiceFit}
                    onChange={(e) => setNewServiceFit(e.target.value)}
                    className="w-full mt-1 px-2 py-1.5 rounded-xl border border-neutral-200 text-xs bg-white"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="SEO">SEO Services</option>
                    <option value="AI Automation">AI Automation</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-neutral-700">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e: any) => setNewPriority(e.target.value)}
                    className="w-full mt-1 px-2 py-1.5 rounded-xl border border-neutral-200 text-xs bg-white"
                  >
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-neutral-700">Confidence</label>
                  <select
                    value={newConfidence}
                    onChange={(e: any) => setNewConfidence(e.target.value)}
                    className="w-full mt-1 px-2 py-1.5 rounded-xl border border-neutral-200 text-xs bg-white"
                  >
                    <option value="INFERRED">Inferred</option>
                    <option value="NEEDS_REVIEW">Needs Review</option>
                    <option value="VERIFIED">Verified</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-neutral-700">Observed Opportunity / Reason to Benefit</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Website lacks mobile optimization and quote request form..."
                  value={newBenefitReason}
                  onChange={(e) => setNewBenefitReason(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-200 text-neutral-700 font-bold hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingProspect}
                  className="px-4 py-2 rounded-xl bg-[#6D28D9] text-white font-bold hover:bg-[#5B21B6] disabled:opacity-50"
                >
                  {isCreatingProspect ? 'Saving...' : 'Add Prospect'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: BULK CSV IMPORT WITH DUPLICATE HANDLING                          */}
      {/* ========================================================================= */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-3xl p-6 shadow-2xl border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-neutral-900 font-['Space_Grotesk']">Import Prospects from CSV</h3>
                <p className="text-xs text-neutral-500">Paste legitimate B2B CSV data with duplicate detection & suppression validation.</p>
              </div>
              <button onClick={() => setIsImportModalOpen(false)} className="text-neutral-400 hover:text-neutral-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-neutral-700">Duplicate Handling Strategy</label>
                <select
                  value={duplicateHandling}
                  onChange={(e: any) => setDuplicateHandling(e.target.value)}
                  className="w-full mt-1 px-3 py-1.5 rounded-xl border border-neutral-200 text-xs bg-white"
                >
                  <option value="SKIP">Skip Duplicates (Recommended)</option>
                  <option value="FLAG">Flag for Manual Review</option>
                  <option value="OVERWRITE">Update Existing Record</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-neutral-700">Paste CSV Contents</label>
                <p className="text-[10px] text-neutral-400">Header row required. Recognized columns: businessName, websiteUrl, category, city, state, email, phone, potentialServiceFit, benefitReason</p>
                <textarea
                  rows={8}
                  placeholder={`businessName,websiteUrl,category,city,state,email,potentialServiceFit\nApex Logistics,https://apexlogistics.com,Logistics,Houston,TX,info@apexlogistics.com,Web Development`}
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                  className="w-full mt-1 p-3 rounded-xl border border-neutral-200 text-xs font-mono"
                />
              </div>

              {importResults && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800">
                  <p className="font-bold">Import Processed!</p>
                  <p className="text-[11px] mt-0.5">
                    {importResults.insertedCount} inserted, {importResults.skippedCount} skipped, {importResults.flaggedCount} flagged.
                  </p>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsImportModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-200 text-neutral-700 font-bold hover:bg-neutral-50"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleImportCsv}
                  disabled={isImporting}
                  className="px-4 py-2 rounded-xl bg-[#6D28D9] text-white font-bold hover:bg-[#5B21B6] disabled:opacity-50"
                >
                  {isImporting ? 'Processing Import...' : 'Import Prospects'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: SUPPRESSION & DO NOT CONTACT LIST                                */}
      {/* ========================================================================= */}
      {isSuppressionModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-3xl p-6 shadow-2xl border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-neutral-900 font-['Space_Grotesk']">Outreach Suppression List</h3>
                <p className="text-xs text-neutral-500">Emails and domains prohibited from receiving outreach messages.</p>
              </div>
              <button onClick={() => setIsSuppressionModalOpen(false)} className="text-neutral-400 hover:text-neutral-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSuppressionItem} className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2 text-xs">
              <span className="font-bold text-neutral-800">Add Email or Domain to Suppression</span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={suppressEmail}
                  onChange={(e) => setSuppressEmail(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-neutral-200 text-xs bg-white"
                />
                <input
                  type="text"
                  placeholder="domain.com"
                  value={suppressDomain}
                  onChange={(e) => setSuppressDomain(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-neutral-200 text-xs bg-white"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Reason (e.g. Opt-out request, internal exclusion)..."
                  value={suppressReason}
                  onChange={(e) => setSuppressReason(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-xl border border-neutral-200 text-xs bg-white"
                />
                <button
                  type="submit"
                  disabled={isAddingSuppression}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 disabled:opacity-50"
                >
                  Suppress
                </button>
              </div>
            </form>

            <div className="max-h-60 overflow-y-auto space-y-1.5 divide-y divide-neutral-100">
              {suppressions.length === 0 ? (
                <p className="text-xs text-neutral-400 text-center py-4">Suppression list is empty.</p>
              ) : (
                suppressions.map((s) => (
                  <div key={s.id} className="pt-2 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-neutral-800">{s.email || s.domain}</span>
                      <p className="text-[10px] text-neutral-400">{s.reason} • {s.source}</p>
                    </div>
                    <span className="text-[10px] text-neutral-400">{new Date(s.createdAt).toLocaleDateString()}</span>
                  </div>
                ))
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsSuppressionModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: CREATE OUTREACH CAMPAIGN                                         */}
      {/* ========================================================================= */}
      {isCampaignModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-neutral-900 font-['Space_Grotesk']">Create Outreach Campaign</h3>
                <p className="text-xs text-neutral-500">Group prospects by service and target geography.</p>
              </div>
              <button onClick={() => setIsCampaignModalOpen(false)} className="text-neutral-400 hover:text-neutral-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-neutral-700">Campaign Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Texas Logistics Web Platform Modernization"
                  value={newCampName}
                  onChange={(e) => setNewCampName(e.target.value)}
                  className="w-full mt-1 px-3 py-1.5 rounded-xl border border-neutral-200 text-xs"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-neutral-700">Service</label>
                  <select
                    value={newCampService}
                    onChange={(e) => setNewCampService(e.target.value)}
                    className="w-full mt-1 px-2 py-1.5 rounded-xl border border-neutral-200 text-xs bg-white"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="SEO">SEO Services</option>
                    <option value="AI Automation">AI Automation</option>
                    <option value="E-Commerce">E-Commerce</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-neutral-700">City Target</label>
                  <input
                    type="text"
                    placeholder="Houston"
                    value={newCampCity}
                    onChange={(e) => setNewCampCity(e.target.value)}
                    className="w-full mt-1 px-2 py-1.5 rounded-xl border border-neutral-200 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-neutral-700">State</label>
                  <input
                    type="text"
                    placeholder="TX"
                    value={newCampState}
                    onChange={(e) => setNewCampState(e.target.value)}
                    className="w-full mt-1 px-2 py-1.5 rounded-xl border border-neutral-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-neutral-700">Campaign Goal</label>
                <input
                  type="text"
                  placeholder="e.g. Schedule 5 technical discovery calls with regional fleet managers"
                  value={newCampGoal}
                  onChange={(e) => setNewCampGoal(e.target.value)}
                  className="w-full mt-1 px-3 py-1.5 rounded-xl border border-neutral-200 text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-neutral-700">Target Audience Description</label>
                <textarea
                  rows={2}
                  placeholder="e.g. B2B distributors and manufacturers with legacy websites..."
                  value={newCampAudience}
                  onChange={(e) => setNewCampAudience(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl border border-neutral-200 text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCampaignModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-200 text-neutral-700 font-bold hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingCampaign}
                  className="px-4 py-2 rounded-xl bg-[#6D28D9] text-white font-bold hover:bg-[#5B21B6] disabled:opacity-50"
                >
                  {isCreatingCampaign ? 'Creating...' : 'Create Campaign'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
