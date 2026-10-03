import React, { useEffect, useState, useRef, useCallback } from 'react';
import { 
  FileText, 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Calendar, 
  User, 
  Clock, 
  X, 
  Save, 
  Tag, 
  Folder,
  Eye,
  Copy,
  Check,
  AlertCircle,
  Sparkles,
  Image as ImageIcon,
  Link2,
  Share2,
  History,
  CheckCircle2,
  Globe,
  Upload,
  RotateCcw,
  Sliders,
  Filter,
  BarChart3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Code,
  Table as TableIcon,
  Minus,
  Undo2,
  Redo2,
  ExternalLink,
  ChevronDown,
  Loader2,
  UserPlus,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { 
  adminGetBlogPosts, 
  adminGetBlogPost,
  adminCreateBlogPost, 
  adminUpdateBlogPost, 
  adminDuplicateBlogPost,
  adminDeleteBlogPost,
  adminGetBlogCategories,
  adminCreateBlogCategory,
  adminGetBlogTags,
  adminCreateBlogTag,
  adminGetAuthors,
  adminCreateAuthor,
  adminGetBlogRevisions,
  adminRestoreBlogRevision,
  adminUploadFile
} from '../../utils/api';
import { MediaLibraryModal } from '../components/blog/MediaLibraryModal';
import { InternalLinkModal } from '../components/blog/InternalLinkModal';
import { InlineImageModal } from '../components/blog/InlineImageModal';
import { SeoChecklist } from '../components/blog/SeoChecklist';
import { BlogPreviewModal } from '../components/blog/BlogPreviewModal';

type ActiveTab = 'basic' | 'featured-image' | 'content' | 'seo' | 'social' | 'taxonomy' | 'publishing' | 'revisions';

class BlogErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Blog CMS Error Caught by Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 max-w-2xl mx-auto my-12 bg-white rounded-3xl border border-red-200 shadow-xl text-center space-y-4">
          <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900 font-['Space_Grotesk']">
            Blog Editor Encountered an Error
          </h2>
          <p className="text-sm text-neutral-600">
            {this.state.error?.message || 'An unexpected rendering error occurred.'}
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-5 py-2.5 bg-[#6D28D9] text-white text-xs font-bold rounded-xl hover:bg-[#5B21B6] transition-colors"
            >
              Reload Page
            </button>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-5 py-2.5 bg-neutral-100 text-neutral-700 text-xs font-bold rounded-xl hover:bg-neutral-200 transition-colors"
            >
              Try Recovering
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const BlogViewInner: React.FC = () => {
  // Main listing states
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [authorFilter, setAuthorFilter] = useState('ALL');
  const [featuredOnly, setFeaturedOnly] = useState(false);

  // Aux data
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);

  // Editor states
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('basic');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [revisions, setRevisions] = useState<any[]>([]);

  // Modals
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [mediaModalTarget, setMediaModalTarget] = useState<'featured' | 'og'>('featured');
  const [isInternalLinkModalOpen, setIsInternalLinkModalOpen] = useState(false);
  const [isInlineImageModalOpen, setIsInlineImageModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newTagName, setNewTagName] = useState('');

  // Autosave status
  const [autosaveStatus, setAutosaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [recoveredDraft, setRecoveredDraft] = useState<any | null>(null);

  // Slug validation
  const [slugStatus, setSlugStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');

  // Featured image direct upload
  const [isUploadingFeatured, setIsUploadingFeatured] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const featuredFileRef = useRef<HTMLInputElement>(null);

  // Author creation inline form
  const [showAuthorForm, setShowAuthorForm] = useState(false);
  const [newAuthor, setNewAuthor] = useState({ name: '', role: '', bio: '', avatar: '', email: '' });
  const [isSavingAuthor, setIsSavingAuthor] = useState(false);

  // Content editor ref for rich commands
  const editorRef = useRef<HTMLDivElement | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '<p>Write your technical analysis, case study, or strategic frameworks here...</p>',
    author: '',
    authorRole: '',
    authorBio: '',
    authorAvatar: '/images/avatar-marcus.svg',
    readTime: '5 min read',
    categoryId: '',
    status: 'DRAFT',
    featured: false,
    featuredImage: '',
    featuredImageAlt: '',
    featuredImageCaption: '',
    featuredImageTitle: '',
    seoTitle: '',
    metaDescription: '',
    focusKeyword: '',
    canonicalUrl: '',
    noIndex: false,
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: '',
    scheduledDate: '',
    scheduledTime: '09:00',
    tagIds: [] as string[],
    relatedPostIds: [] as string[]
  });

  // Calculate live statistics safely
  const safeContent = formData.content || '';
  const wordCount = safeContent.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  const charCount = safeContent.replace(/<[^>]*>/g, '').length;
  const estimatedReadTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

  // Synchronize editor innerHTML when content tab is opened or editing post changes
  useEffect(() => {
    if (activeTab === 'content' && editorRef.current) {
      const currentHtml = editorRef.current.innerHTML;
      const targetHtml = formData.content || '<p></p>';
      if (currentHtml !== targetHtml) {
        editorRef.current.innerHTML = targetHtml;
      }
    }
  }, [activeTab, editingPost?.id, isCreating]);

  useEffect(() => {
    loadBlogData();
    loadTaxonomies();
  }, []);

  // Autosave every 35 seconds to localStorage
  useEffect(() => {
    if (!editingPost && !isCreating) return;

    const timer = setInterval(() => {
      saveDraftToLocalStorage();
    }, 35000);

    return () => clearInterval(timer);
  }, [formData, editingPost, isCreating]);

  const saveDraftToLocalStorage = () => {
    try {
      const storageKey = editingPost ? `hr_blog_draft_${editingPost.id}` : 'hr_blog_draft_new';
      localStorage.setItem(storageKey, JSON.stringify({
        ...formData,
        savedAt: new Date().toISOString()
      }));
      setAutosaveStatus('saved');
      setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch {
      // Ignore
    }
  };

  const loadBlogData = async () => {
    setIsLoading(true);
    try {
      const res = await adminGetBlogPosts({
        status: statusFilter,
        categoryId: categoryFilter,
        author: authorFilter,
        featured: featuredOnly
      });
      if (res.success && res.data) {
        setPosts(res.data);
      }
    } catch (e) {
      console.error('Failed to load blog posts', e);
    } finally {
      setIsLoading(false);
    }
  };

  const loadTaxonomies = async () => {
    try {
      const [catsRes, tagsRes, authorsRes] = await Promise.all([
        adminGetBlogCategories(),
        adminGetBlogTags(),
        adminGetAuthors()
      ]);

      if (catsRes.success && catsRes.data) setCategories(catsRes.data);
      if (tagsRes.success && tagsRes.data) setTags(tagsRes.data);
      if (authorsRes.success && authorsRes.data) setAuthors(authorsRes.data);
    } catch (e) {
      console.error('Failed to load taxonomies', e);
    }
  };

  // Slug generator
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Check slug uniqueness (debounced on blur)
  const checkSlugAvailability = useCallback(async (slug: string) => {
    if (!slug || slug.length < 3) { setSlugStatus('idle'); return; }
    setSlugStatus('checking');
    try {
      const res = await adminGetBlogPosts({ search: slug, limit: 10 });
      if (res.success && res.data) {
        const arr = res.data as any[];
        const conflict = arr.find((p: any) => p.slug === slug && p.id !== (editingPost as any)?.id);
        setSlugStatus(conflict ? 'taken' : 'available');
      } else { setSlugStatus('idle'); }
    } catch { setSlugStatus('idle'); }
  }, [(editingPost as any)?.id]);

  // Featured image direct upload handler
  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) { setUploadError('Only JPG, PNG, WEBP images are supported.'); return; }
    if (file.size > 10 * 1024 * 1024) { setUploadError('File size must be under 10MB.'); return; }
    setIsUploadingFeatured(true);
    setUploadError(null);
    try {
      const res = await adminUploadFile(file, {
        altText: formData.featuredImageAlt || formData.title || file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        title: formData.featuredImageTitle || formData.title || file.name.replace(/\.[^/.]+$/, ''),
        caption: formData.featuredImageCaption || ''
      });
      if (res.success && (res.data || res.url)) {
        const imgUrl = res.url || (res.data as any)?.url;
        setFormData(prev => ({
          ...prev,
          featuredImage: imgUrl,
          featuredImageAlt: prev.featuredImageAlt || (res.data as any)?.altText || '',
          featuredImageTitle: prev.featuredImageTitle || (res.data as any)?.title || ''
        }));
        setSaveMessage('Featured image uploaded successfully!');
        setTimeout(() => setSaveMessage(null), 3000);
      } else { setUploadError(res.message || 'Upload failed.'); }
    } catch (err: any) { setUploadError(err.message || 'Upload failed.'); }
    finally {
      setIsUploadingFeatured(false);
      if (featuredFileRef.current) featuredFileRef.current.value = '';
    }
  };

  // Inline author creation
  const handleCreateAuthor = async () => {
    if (!newAuthor.name.trim()) return;
    setIsSavingAuthor(true);
    try {
      const res = await adminCreateAuthor(newAuthor);
      const data = res.data as any;
      if (res.success && data) {
        setAuthors(prev => [...prev, data]);
        setFormData(prev => ({
          ...prev,
          author: data.name,
          authorRole: data.role || '',
          authorBio: data.bio || '',
          authorAvatar: data.avatar || '/images/avatar-marcus.svg'
        }));
        setNewAuthor({ name: '', role: '', bio: '', avatar: '', email: '' });
        setShowAuthorForm(false);
      }
    } catch (e) { console.error(e); }
    finally { setIsSavingAuthor(false); }
  };

  const handleTitleChange = (val: string) => {
    setFormData(prev => {
      const shouldUpdateSlug = !prev.slug || prev.slug === generateSlug(prev.title);
      return {
        ...prev,
        title: val,
        slug: shouldUpdateSlug ? generateSlug(val) : prev.slug,
        seoTitle: prev.seoTitle ? prev.seoTitle : val,
        ogTitle: prev.ogTitle ? prev.ogTitle : val
      };
    });
  };

  const handleOpenCreate = () => {
    const draftKey = 'hr_blog_draft_new';
    const saved = localStorage.getItem(draftKey);
    let initialDraft = null;
    if (saved) {
      try {
        initialDraft = JSON.parse(saved);
      } catch (e) {}
    }

    setEditingPost(null);
    setIsCreating(true);
    setActiveTab('basic');
    setErrorMessage(null);
    setSaveMessage(null);
    setRevisions([]);

    const defaultCategory = categories[0]?.id || '';
    const defaultAuthor = authors[0] || {
      name: 'House Robotics Strategy Team',
      role: 'Head of Growth & AI Strategy',
      bio: '12+ years pioneering algorithmic growth, technical SEO infrastructure, and enterprise AI automation systems.',
      avatar: '/images/avatar-marcus.svg'
    };

    setSlugStatus('idle');
    setUploadError(null);
    setShowAuthorForm(false);

    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '<p>Write your technical analysis, case study, or strategic frameworks here...</p>',
      author: defaultAuthor.name,
      authorRole: defaultAuthor.role || '',
      authorBio: defaultAuthor.bio || '',
      authorAvatar: defaultAuthor.avatar || '/images/avatar-marcus.svg',
      readTime: '5 min read',
      categoryId: defaultCategory,
      status: 'DRAFT',
      featured: false,
      featuredImage: '',
      featuredImageAlt: '',
      featuredImageCaption: '',
      featuredImageTitle: '',
      seoTitle: '',
      metaDescription: '',
      focusKeyword: '',
      canonicalUrl: '',
      noIndex: false,
      ogTitle: '',
      ogDescription: '',
      ogImage: '',
      twitterTitle: '',
      twitterDescription: '',
      twitterImage: '',
      scheduledDate: '',
      scheduledTime: '09:00',
      tagIds: [],
      relatedPostIds: []
    });

    if (initialDraft && initialDraft.title) {
      setRecoveredDraft(initialDraft);
    } else {
      setRecoveredDraft(null);
    }
  };

  const handleOpenEdit = async (post: any) => {
    setIsCreating(false);
    setEditingPost(post);
    setActiveTab('basic');
    setErrorMessage(null);
    setSaveMessage(null);
    setRecoveredDraft(null);
    setSlugStatus('idle');
    setUploadError(null);
    setShowAuthorForm(false);

    // Parse related posts
    let parsedRelated: string[] = [];
    if (post.relatedPostIds) {
      try {
        parsedRelated = JSON.parse(post.relatedPostIds);
      } catch (e) {}
    }

    // Parse tag IDs
    const currentTagIds = post.postTags ? post.postTags.map((pt: any) => pt.tagId) : [];

    setFormData({
      title: post.title || '',
      slug: post.slug || '',
      excerpt: post.excerpt || '',
      content: post.content || '<p></p>',
      author: post.author || '',
      authorRole: post.authorRole || '',
      authorBio: post.authorBio || '',
      authorAvatar: post.authorAvatar || '/images/avatar-marcus.svg',
      readTime: post.readTime || '5 min read',
      categoryId: post.categoryId || '',
      status: post.status || 'DRAFT',
      featured: Boolean(post.featured),
      featuredImage: post.featuredImage || '',
      featuredImageAlt: post.featuredImageAlt || '',
      featuredImageCaption: post.featuredImageCaption || '',
      featuredImageTitle: (post as any).featuredImageTitle || '',
      seoTitle: post.seoTitle || '',
      metaDescription: post.metaDescription || '',
      focusKeyword: post.focusKeyword || '',
      canonicalUrl: post.canonicalUrl || '',
      noIndex: Boolean(post.noIndex),
      ogTitle: post.ogTitle || '',
      ogDescription: post.ogDescription || '',
      ogImage: post.ogImage || '',
      twitterTitle: post.twitterTitle || '',
      twitterDescription: post.twitterDescription || '',
      twitterImage: post.twitterImage || '',
      scheduledDate: (() => {
        if (!post.scheduledAt) return '';
        try {
          const d = new Date(post.scheduledAt);
          return isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0];
        } catch (e) {
          return '';
        }
      })(),
      scheduledTime: (() => {
        if (!post.scheduledAt) return '09:00';
        try {
          const d = new Date(post.scheduledAt);
          return isNaN(d.getTime()) ? '09:00' : d.toTimeString().substring(0, 5);
        } catch (e) {
          return '09:00';
        }
      })(),
      tagIds: currentTagIds,
      relatedPostIds: parsedRelated
    });

    // Load revisions
    try {
      const revRes = await adminGetBlogRevisions(post.id);
      if (revRes.success && revRes.data) {
        setRevisions(revRes.data);
      }
    } catch (e) {}

    // Check localStorage for unsaved edits
    const draftKey = `hr_blog_draft_${post.id}`;
    const saved = localStorage.getItem(draftKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.savedAt && new Date(parsed.savedAt) > new Date(post.updatedAt)) {
          setRecoveredDraft(parsed);
        }
      } catch (e) {}
    }
  };

  const handleApplyDraft = () => {
    if (recoveredDraft) {
      setFormData(prev => ({
        ...prev,
        ...recoveredDraft
      }));
      if (editorRef.current && recoveredDraft.content) {
        editorRef.current.innerHTML = recoveredDraft.content;
      }
      setRecoveredDraft(null);
      setSaveMessage('Draft restored from previous browser session.');
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  const handleSavePost = async (statusOverride?: string) => {
    // Basic validation
    if (!formData.title.trim()) {
      setErrorMessage('Please provide an article title.');
      setActiveTab('basic');
      return;
    }
    if (!formData.slug.trim()) {
      setErrorMessage('Please provide a URL-friendly slug.');
      setActiveTab('basic');
      return;
    }
    if (!formData.excerpt.trim()) {
      setErrorMessage('Please provide a short summary/excerpt.');
      setActiveTab('basic');
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);
    setSaveMessage(null);

    const postStatus = statusOverride || formData.status;

    let scheduledAt = null;
    if (postStatus === 'SCHEDULED' && formData.scheduledDate) {
      scheduledAt = new Date(`${formData.scheduledDate}T${formData.scheduledTime}:00`).toISOString();
    }

    const { featuredImageTitle: _unusedTitle, ...cleanFormData } = formData as any;
    const payload = {
      ...cleanFormData,
      readTime: formData.readTime || estimatedReadTime,
      status: postStatus,
      scheduledAt,
      // Fallbacks for SEO
      seoTitle: formData.seoTitle || formData.title,
      metaDescription: formData.metaDescription || formData.excerpt,
      canonicalUrl: formData.canonicalUrl || `/blog/${formData.slug}`
    };

    try {
      if (isCreating) {
        const res = await adminCreateBlogPost(payload);
        if (res.success && res.data) {
          localStorage.removeItem('hr_blog_draft_new');
          setSaveMessage('Article created successfully!');
          await loadBlogData();
          setIsCreating(false);
          setEditingPost(null);
        } else {
          setErrorMessage(res.message || 'Failed to create article.');
        }
      } else if (editingPost) {
        const res = await adminUpdateBlogPost(editingPost.id, payload);
        if (res.success && res.data) {
          localStorage.removeItem(`hr_blog_draft_${editingPost.id}`);
          setSaveMessage('Article updated and saved!');
          await loadBlogData();
          setEditingPost(res.data);
          // Reload revisions
          const revRes = await adminGetBlogRevisions(editingPost.id);
          if (revRes.success && revRes.data) setRevisions(revRes.data);
        } else {
          setErrorMessage(res.message || 'Failed to update article.');
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred while saving.');
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(null), 4000);
    }
  };

  const handleDuplicate = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await adminDuplicateBlogPost(id);
      if (res.success) {
        await loadBlogData();
        setSaveMessage('Draft copy created with unique slug!');
        setTimeout(() => setSaveMessage(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await adminDeleteBlogPost(id);
      if (res.success) {
        setPosts(prev => prev.filter(p => p.id !== id));
        setDeleteConfirmId(null);
        if (editingPost?.id === id) {
          setEditingPost(null);
          setIsCreating(false);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRestoreRevision = async (revId: string) => {
    if (!editingPost) return;
    try {
      const res = await adminRestoreBlogRevision(editingPost.id, revId);
      const data = res.data as any;
      if (res.success && data) {
        setFormData(prev => ({
          ...prev,
          title: data.title,
          content: data.content,
          excerpt: data.excerpt,
          author: data.author
        }));
        if (editorRef.current) {
          editorRef.current.innerHTML = data.content || '';
        }
        setSaveMessage('Article restored to previous version!');
        setTimeout(() => setSaveMessage(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Rich Text Exec Commands
  const executeCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setFormData(prev => ({ ...prev, content: editorRef.current?.innerHTML || '' }));
    }
  };

  const handleInsertInlineImage = (data: {
    url: string;
    altText: string;
    caption: string;
    alignment: 'left' | 'center' | 'right' | 'full';
    widthPercent: number;
  }) => {
    let alignClass = 'mx-auto block my-6 rounded-2xl shadow-md max-w-full';
    if (data.alignment === 'left') {
      alignClass = 'float-left mr-6 mb-4 rounded-xl shadow-md';
    } else if (data.alignment === 'right') {
      alignClass = 'float-right ml-6 mb-4 rounded-xl shadow-md';
    } else if (data.alignment === 'full') {
      alignClass = 'w-full block my-6 rounded-2xl shadow-md';
    }

    const captionHtml = data.caption
      ? `<figcaption style="text-align: center; font-size: 12px; color: #6B7280; font-style: italic; margin-top: 6px;">${data.caption}</figcaption>`
      : '';

    const imgSnippet = `
      <figure style="display: block; width: ${data.widthPercent}%; margin-left: auto; margin-right: auto; clear: both;" class="my-4">
        <img src="${data.url}" alt="${data.altText}" class="${alignClass}" style="width: 100%; height: auto;" />
        ${captionHtml}
      </figure>
      <p></p>
    `;

    document.execCommand('insertHTML', false, imgSnippet);
    if (editorRef.current) {
      setFormData(prev => ({ ...prev, content: editorRef.current?.innerHTML || '' }));
    }
  };

  const handleInsertInternalLink = (data: { url: string; text: string; openInNewTab: boolean }) => {
    const target = data.openInNewTab ? ' target="_blank" rel="noopener noreferrer"' : '';
    const linkSnippet = `<a href="${data.url}"${target} class="text-[#6D28D9] font-semibold underline hover:text-[#5B21B6]">${data.text}</a> `;
    document.execCommand('insertHTML', false, linkSnippet);
    if (editorRef.current) {
      setFormData(prev => ({ ...prev, content: editorRef.current?.innerHTML || '' }));
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      const slug = generateSlug(newCategoryName);
      const res = await adminCreateBlogCategory({ name: newCategoryName.trim(), slug });
      const data = res.data as any;
      if (res.success && data) {
        setCategories(prev => [...prev, data]);
        setFormData(prev => ({ ...prev, categoryId: data.id }));
        setNewCategoryName('');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateTag = async () => {
    if (!newTagName.trim()) return;
    try {
      const res = await adminCreateBlogTag({ name: newTagName.trim() });
      const data = res.data as any;
      if (res.success && data) {
        setTags(prev => [...prev, data]);
        if (!formData.tagIds.includes(data.id)) {
          setFormData(prev => ({ ...prev, tagIds: [...prev.tagIds, data.id] }));
        }
        setNewTagName('');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleTag = (tagId: string) => {
    setFormData(prev => {
      const exists = prev.tagIds.includes(tagId);
      return {
        ...prev,
        tagIds: exists ? prev.tagIds.filter(id => id !== tagId) : [...prev.tagIds, tagId]
      };
    });
  };

  const toggleRelatedPost = (postId: string) => {
    setFormData(prev => {
      const exists = prev.relatedPostIds.includes(postId);
      return {
        ...prev,
        relatedPostIds: exists ? prev.relatedPostIds.filter(id => id !== postId) : [...prev.relatedPostIds, postId]
      };
    });
  };

  // AI Suggestions Helpers
  const handleAiSuggestSeoTitle = () => {
    if (!formData.title) return;
    const suggested = `${formData.title} | House Robotics Strategy`;
    setFormData(prev => ({ ...prev, seoTitle: suggested }));
  };

  const handleAiSuggestMetaDesc = () => {
    if (formData.excerpt) {
      setFormData(prev => ({ ...prev, metaDescription: formData.excerpt.slice(0, 155) }));
    }
  };

  // Filtered listing items
  const filteredPosts = posts.filter(post => {
    const matchSearch = 
      post.title?.toLowerCase().includes(search.toLowerCase()) ||
      post.slug?.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter === 'ALL' || post.status === statusFilter;
    const matchCat = categoryFilter === 'ALL' || post.categoryId === categoryFilter;
    const matchAuthor = authorFilter === 'ALL' || post.author?.toLowerCase().includes(authorFilter.toLowerCase());
    const matchFeatured = !featuredOnly || post.featured;

    return matchSearch && matchStatus && matchCat && matchAuthor && matchFeatured;
  });

  // Calculate Metrics
  const totalPosts = posts.length;
  const publishedPosts = posts.filter(p => p.status === 'PUBLISHED').length;
  const draftPosts = posts.filter(p => p.status === 'DRAFT').length;
  const scheduledPosts = posts.filter(p => p.status === 'SCHEDULED').length;
  const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-neutral-900 font-['Space_Grotesk']">
              Blog &amp; Publishing CMS
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-100 text-[#6D28D9]">
              SEO Engine v2.0
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-0.5">
            Full-lifecycle publishing system: Technical writing, media management, rich schema, and live SERP validation.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleOpenCreate}
            className="btn-micro px-4 py-2.5 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Article</span>
          </button>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white p-3.5 rounded-2xl border border-[#E9E7F2] shadow-xs">
          <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Total Articles</div>
          <div className="text-xl font-extrabold text-neutral-900 mt-1">{totalPosts}</div>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border border-[#E9E7F2] shadow-xs">
          <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Published</div>
          <div className="text-xl font-extrabold text-emerald-700 mt-1">{publishedPosts}</div>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border border-[#E9E7F2] shadow-xs">
          <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Drafts</div>
          <div className="text-xl font-extrabold text-amber-700 mt-1">{draftPosts}</div>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border border-[#E9E7F2] shadow-xs">
          <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Scheduled</div>
          <div className="text-xl font-extrabold text-blue-700 mt-1">{scheduledPosts}</div>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border border-[#E9E7F2] shadow-xs col-span-2 sm:col-span-1">
          <div className="text-[10px] font-bold text-[#6D28D9] uppercase tracking-wider flex items-center gap-1">
            <BarChart3 className="w-3 h-3" /> Total Views
          </div>
          <div className="text-xl font-extrabold text-[#6D28D9] mt-1">{totalViews.toLocaleString()}</div>
        </div>
      </div>

      {/* Search & Filters Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E9E7F2] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, keyword, or slug..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-xs text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-xs font-semibold text-neutral-700 focus:outline-none focus:border-[#6D28D9]"
          >
            <option value="ALL">All Statuses</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="ARCHIVED">Archived</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-xs font-semibold text-neutral-700 focus:outline-none focus:border-[#6D28D9]"
          >
            <option value="ALL">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {/* Featured Toggle */}
          <button
            onClick={() => setFeaturedOnly(!featuredOnly)}
            className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
              featuredOnly 
                ? 'bg-violet-100 border-[#6D28D9] text-[#6D28D9]' 
                : 'border-[#E9E7F2] bg-[#FAF9FF] text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Only</span>
          </button>
        </div>
      </div>

      {/* Main Articles Table */}
      <div className="bg-white rounded-3xl border border-[#E9E7F2] overflow-hidden shadow-xs">
        {isLoading ? (
          <div className="py-20 text-center text-neutral-400">
            <div className="w-6 h-6 border-2 border-[#6D28D9] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            Loading blog database...
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-20 text-center text-neutral-400">
            <FileText className="w-10 h-10 mx-auto mb-2 text-neutral-300" />
            <p className="text-sm font-bold text-neutral-700">No blog posts found</p>
            <p className="text-xs text-neutral-400 mt-1">Try refining your search or click "Create New Article" to write one.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E9E7F2] bg-[#FAF9FF] text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Article</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Author</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Views</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-xs">
                {filteredPosts.map((post) => {
                  const statusStyles: any = {
                    PUBLISHED: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                    DRAFT: 'bg-neutral-100 text-neutral-700 border-neutral-200',
                    SCHEDULED: 'bg-blue-50 text-blue-800 border-blue-200',
                    ARCHIVED: 'bg-purple-50 text-purple-800 border-purple-200'
                  };

                  return (
                    <tr key={post.id} className="hover:bg-[#FAF9FF]/80 transition-colors group">
                      {/* Title & Thumbnail */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-9 rounded-lg overflow-hidden bg-neutral-100 border border-[#E9E7F2] shrink-0">
                            <img
                              src={post.featuredImage || '/assets/blog-ai-search.webp'}
                              alt={post.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/assets/blog-ai-search.webp';
                              }}
                            />
                          </div>
                          <div className="max-w-md">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-neutral-900 text-sm group-hover:text-[#6D28D9] transition-colors line-clamp-1">
                                {post.title}
                              </span>
                              {post.featured && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-violet-100 text-[#6D28D9]">
                                  Featured
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-neutral-400 font-mono line-clamp-1">
                              /blog/{post.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-semibold text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded text-[11px]">
                          {post.category?.name || 'General'}
                        </span>
                      </td>

                      {/* Author */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-neutral-600">
                        <span className="font-medium text-xs">{post.author}</span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${statusStyles[post.status] || statusStyles.PUBLISHED}`}>
                          {post.status}
                        </span>
                      </td>

                      {/* Views */}
                      <td className="py-3.5 px-4 whitespace-nowrap font-mono text-neutral-600">
                        {(post.views || 0).toLocaleString()}
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-neutral-400 text-[11px] font-mono">
                        {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(post)}
                            className="p-1.5 rounded-lg bg-neutral-100 hover:bg-violet-100 hover:text-[#6D28D9] text-neutral-700 transition-colors"
                            title="Edit Article"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                title: post.title,
                                slug: post.slug,
                                excerpt: post.excerpt,
                                content: post.content,
                                author: post.author,
                                authorRole: post.authorRole,
                                authorBio: post.authorBio,
                                authorAvatar: post.authorAvatar,
                                readTime: post.readTime,
                                category: post.category,
                                status: post.status,
                                featuredImage: post.featuredImage,
                                featuredImageAlt: post.featuredImageAlt,
                                featuredImageCaption: post.featuredImageCaption
                              }));
                              setIsPreviewModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
                            title="Preview Public Render"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleDuplicate(post.id, e)}
                            className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
                            title="Duplicate as Draft"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(post.id)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                            title="Delete Article"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-[#E9E7F2]">
            <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-neutral-900">Delete Blog Article?</h3>
              <p className="text-xs text-neutral-500">
                Are you sure you want to delete this article? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 rounded-xl border border-[#E9E7F2] text-xs font-semibold text-neutral-600 hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== FULL PUBLISHING CMS MODAL ===================== */}
      {(editingPost || isCreating) && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-neutral-900/70 backdrop-blur-sm"
          onClick={() => {
            if (window.confirm('Close editor? Any unsaved changes are saved in your local draft.')) {
              setEditingPost(null);
              setIsCreating(false);
            }
          }}
        >
          <div 
            className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col border border-[#E9E7F2]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Sticky Header */}
            <div className="p-4 sm:px-6 border-b border-[#E9E7F2] bg-[#FAF9FF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-violet-100 text-[#6D28D9] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 font-['Space_Grotesk'] leading-tight">
                    {isCreating ? 'Create New Blog Post' : `Editing: ${editingPost.title}`}
                  </h3>
                  <div className="flex items-center gap-3 text-[11px] text-neutral-500 font-mono mt-0.5">
                    <span>{wordCount} words</span>
                    <span>·</span>
                    <span>{charCount} chars</span>
                    <span>·</span>
                    <span>{estimatedReadTime}</span>
                    {lastSavedTime && (
                      <>
                        <span>·</span>
                        <span className="text-emerald-600 flex items-center gap-1 font-sans">
                          <Check className="w-3 h-3" /> Autosaved {lastSavedTime}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPreviewModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl border border-[#E9E7F2] bg-white text-xs font-bold text-neutral-700 hover:bg-neutral-50 flex items-center gap-1.5 shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSavePost('DRAFT')}
                  disabled={isSaving}
                  className="px-3 py-1.5 rounded-xl border border-[#E9E7F2] bg-white text-xs font-bold text-neutral-700 hover:bg-neutral-50 shadow-xs"
                >
                  Save Draft
                </button>

                <button
                  type="button"
                  onClick={() => handleSavePost()}
                  disabled={isSaving}
                  className="btn-micro px-4 py-1.5 rounded-xl bg-[#6D28D9] text-white text-xs font-bold hover:bg-[#5B21B6] shadow-sm flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? 'Saving...' : formData.status === 'PUBLISHED' ? 'Publish Changes' : 'Publish Now'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditingPost(null);
                    setIsCreating(false);
                  }}
                  className="w-8 h-8 rounded-full bg-white border border-[#E9E7F2] text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Notification Bar */}
            {saveMessage && (
              <div className="px-6 py-2 bg-emerald-50 text-emerald-800 text-xs font-semibold border-b border-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{saveMessage}</span>
              </div>
            )}
            {errorMessage && (
              <div className="px-6 py-2 bg-red-50 text-red-800 text-xs font-semibold border-b border-red-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}
            {recoveredDraft && (
              <div className="px-6 py-2.5 bg-amber-50 text-amber-900 text-xs font-semibold border-b border-amber-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Unsaved changes recovered from a previous browser session. Would you like to restore them?</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleApplyDraft}
                    className="px-2.5 py-1 rounded-lg bg-amber-600 text-white text-[11px] font-bold hover:bg-amber-700"
                  >
                    Restore Draft
                  </button>
                  <button
                    onClick={() => setRecoveredDraft(null)}
                    className="px-2 py-1 text-neutral-500 text-[11px] hover:text-neutral-900"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}

            {/* Tabs Navigation */}
            <div className="px-6 border-b border-[#E9E7F2] bg-white flex items-center gap-1 overflow-x-auto">
              {[
                { id: 'basic', label: '1. Basic Info' },
                { id: 'featured-image', label: '2. Featured Image' },
                { id: 'content', label: '3. Content Editor' },
                { id: 'seo', label: '4. SEO Settings' },
                { id: 'social', label: '5. Social Sharing' },
                { id: 'taxonomy', label: '6. Categories & Tags' },
                { id: 'publishing', label: '7. Publishing & Schedule' },
                { id: 'revisions', label: '8. Revisions' }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as ActiveTab)}
                  className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-[#6D28D9] text-[#6D28D9]'
                      : 'border-transparent text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents Panel */}
            <div className="flex-1 overflow-y-auto p-6 bg-[#FAF9FF]/40">
              {/* TAB 1: BASIC INFORMATION */}
              {activeTab === 'basic' && (
                <div className="max-w-4xl mx-auto space-y-6 bg-white p-6 rounded-3xl border border-[#E9E7F2] shadow-xs">
                  <div>
                    <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block mb-1.5">
                      Blog Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g. How Generative AI Search Models Are Reshaping Technical SEO"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E9E7F2] text-sm font-semibold text-neutral-900 focus:outline-none focus:border-[#6D28D9] bg-[#FAF9FF]"
                    />
                  </div>

                  {/* Slug with validation */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                        SEO-Friendly Slug *
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const s = generateSlug(formData.title);
                          setFormData(p => ({ ...p, slug: s }));
                          checkSlugAvailability(s);
                        }}
                        className="text-[11px] font-bold text-[#6D28D9] hover:underline"
                      >
                        Auto-generate from Title
                      </button>
                    </div>
                    <div className={`flex items-center rounded-xl border overflow-hidden focus-within:border-[#6D28D9] bg-[#FAF9FF] ${
                      slugStatus === 'taken' ? 'border-red-400' : slugStatus === 'available' ? 'border-emerald-400' : 'border-[#E9E7F2]'
                    }`}>
                      <span className="px-3.5 py-2 text-xs text-neutral-400 font-mono bg-neutral-100 border-r border-[#E9E7F2] whitespace-nowrap">
                        /blog/
                      </span>
                      <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={(e) => {
                          setFormData({ ...formData, slug: generateSlug(e.target.value) });
                          setSlugStatus('idle');
                        }}
                        onBlur={() => checkSlugAvailability(formData.slug)}
                        placeholder="how-generative-ai-search-reshapes-seo"
                        className="flex-1 px-3 py-2 text-xs font-mono text-neutral-900 bg-transparent focus:outline-none"
                      />
                      <div className="px-3">
                        {slugStatus === 'checking' && <Loader2 className="w-3.5 h-3.5 text-neutral-400 animate-spin" />}
                        {slugStatus === 'available' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                        {slugStatus === 'taken' && <AlertTriangle className="w-3.5 h-3.5 text-red-500" />}
                      </div>
                    </div>
                    {slugStatus === 'taken' && <p className="text-[11px] text-red-600 mt-1 font-semibold">⚠ Slug already in use. Please choose a unique slug.</p>}
                    {slugStatus === 'available' && <p className="text-[11px] text-emerald-600 mt-1 font-semibold">✓ Slug is available.</p>}
                    {slugStatus === 'idle' && <p className="text-[11px] text-neutral-400 mt-1">Must be lowercase, URL-safe, hyphenated, and unique.</p>}
                  </div>

                  {/* Excerpt with Character Counter */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                        Short Excerpt / Summary *
                      </label>
                      <span className={`text-[11px] font-mono font-bold ${
                        formData.excerpt.length > 165 ? 'text-amber-600' : 'text-neutral-500'
                      }`}>
                        {formData.excerpt.length} / 160 chars (Recommended)
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      required
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      placeholder="Concise, high-impact summary displayed on blog cards, search snippet defaults, and social sharing previews..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E9E7F2] text-xs text-neutral-900 focus:outline-none focus:border-[#6D28D9] bg-[#FAF9FF]"
                    />
                    <p className="text-[10px] text-neutral-400 mt-1">Used in blog listing cards, Open Graph previews, and search snippets.</p>
                  </div>

                  {/* Author, Category, Status */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#E9E7F2]">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                          Author *
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowAuthorForm(!showAuthorForm)}
                          className="text-[11px] font-bold text-[#6D28D9] hover:underline flex items-center gap-1"
                        >
                          <UserPlus className="w-3 h-3" />
                          <span>New Author</span>
                        </button>
                      </div>
                      <select
                        value={formData.author}
                        onChange={(e) => {
                          const selected = authors.find(a => a.name === e.target.value);
                          if (selected) {
                            setFormData(prev => ({
                              ...prev,
                              author: selected.name,
                              authorRole: selected.role || '',
                              authorBio: selected.bio || '',
                              authorAvatar: selected.avatar || '/images/avatar-marcus.svg'
                            }));
                          } else {
                            setFormData(prev => ({ ...prev, author: e.target.value }));
                          }
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] text-xs font-semibold text-neutral-900 focus:outline-none focus:border-[#6D28D9] bg-[#FAF9FF]"
                      >
                        <option value="">Select author...</option>
                        {authors.map(a => (
                          <option key={a.id} value={a.name}>{a.name}{a.role ? ` (${a.role})` : ''}</option>
                        ))}
                      </select>
                      {formData.author && (
                        <div className="mt-2 p-2 rounded-xl bg-violet-50 border border-violet-100 flex items-center gap-2">
                          <img src={formData.authorAvatar || '/images/avatar-marcus.svg'} alt={formData.author} className="w-7 h-7 rounded-full object-cover border border-violet-200" onError={(e) => { (e.target as HTMLImageElement).src = '/images/avatar-marcus.svg'; }} />
                          <div>
                            <p className="text-[11px] font-bold text-neutral-900">{formData.author}</p>
                            <p className="text-[10px] text-neutral-500">{formData.authorRole}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block mb-1.5">
                        Primary Category *
                      </label>
                      <select
                        value={formData.categoryId}
                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] text-xs font-semibold text-neutral-900 focus:outline-none focus:border-[#6D28D9] bg-[#FAF9FF]"
                      >
                        <option value="">Select category...</option>
                        {categories.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block mb-1.5">
                        Publishing Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] text-xs font-bold text-neutral-900 focus:outline-none focus:border-[#6D28D9] bg-[#FAF9FF]"
                      >
                        <option value="DRAFT">Draft</option>
                        <option value="PUBLISHED">Published</option>
                        <option value="SCHEDULED">Scheduled</option>
                        <option value="ARCHIVED">Archived</option>
                      </select>
                    </div>
                  </div>

                  {/* Inline author creation form */}
                  {showAuthorForm && (
                    <div className="p-4 rounded-2xl bg-violet-50 border border-violet-200 space-y-3">
                      <h4 className="text-xs font-bold text-violet-900 flex items-center gap-1.5"><UserPlus className="w-3.5 h-3.5" />Create New Author</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-bold text-neutral-700 uppercase block mb-1">Full Name *</label>
                          <input type="text" value={newAuthor.name} onChange={(e) => setNewAuthor(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Sarah Chen" className="w-full px-3 py-1.5 rounded-xl border border-[#E9E7F2] text-xs bg-white text-neutral-900 focus:outline-none focus:border-[#6D28D9]" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-neutral-700 uppercase block mb-1">Role / Title</label>
                          <input type="text" value={newAuthor.role} onChange={(e) => setNewAuthor(p => ({ ...p, role: e.target.value }))} placeholder="e.g. SEO Lead" className="w-full px-3 py-1.5 rounded-xl border border-[#E9E7F2] text-xs bg-white text-neutral-900 focus:outline-none focus:border-[#6D28D9]" />
                        </div>
                        <div className="col-span-2">
                          <label className="text-[10px] font-bold text-neutral-700 uppercase block mb-1">Short Bio</label>
                          <textarea rows={2} value={newAuthor.bio} onChange={(e) => setNewAuthor(p => ({ ...p, bio: e.target.value }))} placeholder="Professional background..." className="w-full px-3 py-1.5 rounded-xl border border-[#E9E7F2] text-xs bg-white text-neutral-900 focus:outline-none focus:border-[#6D28D9]" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-neutral-700 uppercase block mb-1">Email</label>
                          <input type="email" value={newAuthor.email} onChange={(e) => setNewAuthor(p => ({ ...p, email: e.target.value }))} placeholder="author@houserobotics.com" className="w-full px-3 py-1.5 rounded-xl border border-[#E9E7F2] text-xs bg-white text-neutral-900 focus:outline-none focus:border-[#6D28D9]" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-neutral-700 uppercase block mb-1">Avatar URL</label>
                          <input type="text" value={newAuthor.avatar} onChange={(e) => setNewAuthor(p => ({ ...p, avatar: e.target.value }))} placeholder="/images/avatar.svg" className="w-full px-3 py-1.5 rounded-xl border border-[#E9E7F2] text-xs bg-white text-neutral-900 focus:outline-none focus:border-[#6D28D9]" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <button type="button" onClick={handleCreateAuthor} disabled={!newAuthor.name.trim() || isSavingAuthor} className="btn-micro px-4 py-1.5 rounded-xl bg-[#6D28D9] text-white text-xs font-bold hover:bg-[#5B21B6] disabled:opacity-50">{isSavingAuthor ? 'Saving...' : 'Create Author'}</button>
                        <button type="button" onClick={() => { setShowAuthorForm(false); setNewAuthor({ name: '', role: '', bio: '', avatar: '', email: '' }); }} className="px-3 py-1.5 rounded-xl border border-[#E9E7F2] text-xs font-semibold text-neutral-600 hover:bg-neutral-50">Cancel</button>
                      </div>
                    </div>
                  )}

                  {/* Featured Post Toggle */}
                  <div className="pt-2 flex items-center justify-between border-t border-[#E9E7F2]">
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900">Featured Article</h4>
                      <p className="text-[11px] text-neutral-500">Showcase this post prominently in the hero section and homepage.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6D28D9]" />
                    </label>
                  </div>
                </div>
              )}

              {/* TAB 2: FEATURED IMAGE */}
              {activeTab === 'featured-image' && (
                <div className="max-w-4xl mx-auto space-y-6 bg-white p-6 rounded-3xl border border-[#E9E7F2] shadow-xs">
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 font-['Space_Grotesk']">Featured Image &amp; Media Asset</h3>
                    <p className="text-xs text-neutral-500">
                      High-resolution visual shown in article cards, header banner, and Open Graph social embeds. Recommended: 1200×630px, JPG/PNG/WEBP, max 10MB.
                    </p>
                  </div>

                  {/* Upload Error */}
                  {uploadError && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                      {uploadError}
                    </div>
                  )}

                  {/* Image Preview & Controls */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    <div className="md:col-span-6 space-y-3">
                      <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-[#E9E7F2] bg-neutral-100 relative shadow-sm">
                        {formData.featuredImage ? (
                          <img
                            src={formData.featuredImage}
                            alt={formData.featuredImageAlt || formData.title}
                            className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).src = '/assets/blog-ai-search.webp'; }}
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400 gap-2">
                            <ImageIcon className="w-10 h-10 text-neutral-300" />
                            <span className="text-xs font-semibold">No image selected</span>
                            <span className="text-[11px] text-neutral-400">Upload or choose from library</span>
                          </div>
                        )}
                      </div>

                      {/* Direct Upload + Library buttons */}
                      <div className="flex items-center gap-2">
                        <label className={`btn-micro flex-1 py-2.5 rounded-xl border-2 border-dashed border-[#6D28D9] text-[#6D28D9] hover:bg-violet-50 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${isUploadingFeatured ? 'opacity-60 pointer-events-none' : ''}`}>
                          {isUploadingFeatured ? (<><Loader2 className="w-3.5 h-3.5 animate-spin" /><span>Uploading...</span></>) : (<><Upload className="w-3.5 h-3.5" /><span>Upload Image</span></>)}
                          <input ref={featuredFileRef} type="file" accept="image/jpeg,image/jpg,image/png,image/webp" onChange={handleFeaturedImageUpload} className="hidden" />
                        </label>
                        <button
                          type="button"
                          onClick={() => { setMediaModalTarget('featured'); setIsMediaModalOpen(true); }}
                          className="btn-micro flex-1 py-2.5 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>Media Library</span>
                        </button>
                      </div>

                      {formData.featuredImage && (
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, featuredImage: '' })}
                          className="w-full px-3 py-1.5 rounded-xl border border-red-200 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Remove Featured Image
                        </button>
                      )}
                    </div>

                    <div className="md:col-span-6 space-y-3">
                      <div>
                        <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block mb-1">
                          Image URL
                        </label>
                        <input
                          type="text"
                          value={formData.featuredImage}
                          onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                          placeholder="/uploads/... or https://..."
                          className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block mb-1">
                          ALT Text * (SEO Critical)
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.featuredImageAlt}
                          onChange={(e) => setFormData({ ...formData, featuredImageAlt: e.target.value })}
                          placeholder="Descriptive explanation for screen readers and search crawlers"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
                        />
                        <p className="text-[10px] text-neutral-400 mt-1">Do not keyword-stuff. Clearly describe the visual subject matter.</p>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block mb-1">
                          Image Title
                        </label>
                        <input
                          type="text"
                          value={(formData as any).featuredImageTitle || ''}
                          onChange={(e) => setFormData({ ...formData, featuredImageTitle: e.target.value } as any)}
                          placeholder="Image title attribute (shown on hover)"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block mb-1">
                          Image Caption (Visible)
                        </label>
                        <input
                          type="text"
                          value={formData.featuredImageCaption}
                          onChange={(e) => setFormData({ ...formData, featuredImageCaption: e.target.value })}
                          placeholder="Optional visible caption shown under the featured image"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9]"
                        />
                      </div>

                      {/* SEO Tips */}
                      <div className="p-3 rounded-xl bg-violet-50 border border-violet-100 space-y-1">
                        <p className="text-[10px] font-bold text-violet-900 uppercase tracking-wider">Image SEO Guidelines</p>
                        <ul className="space-y-0.5 text-[10px] text-violet-800">
                          <li>• ALT text should describe the image meaningfully</li>
                          <li>• Recommended: 1200×630px for optimal OG sharing</li>
                          <li>• Keep file size under 5MB for faster load times</li>
                          <li>• WEBP format provides best compression quality</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: CONTENT EDITOR */}
              {activeTab === 'content' && (
                <div className="max-w-5xl mx-auto space-y-3 bg-white p-5 rounded-3xl border border-[#E9E7F2] shadow-xs">
                  {/* Rich Text Toolbar */}
                  <div className="p-2 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] flex flex-wrap items-center gap-1 text-xs">
                    {/* Undo / Redo */}
                    <button
                      type="button"
                      onClick={() => executeCommand('undo')}
                      className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-700"
                      title="Undo"
                    >
                      <Undo2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => executeCommand('redo')}
                      className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-700"
                      title="Redo"
                    >
                      <Redo2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="w-[1px] h-4 bg-neutral-300 mx-1" />

                    {/* Headings */}
                    <select
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === 'p') executeCommand('formatBlock', '<p>');
                        else if (val) executeCommand('formatBlock', `<${val}>`);
                        e.target.value = '';
                      }}
                      className="px-2 py-1 rounded-lg border border-[#E9E7F2] bg-white text-xs font-bold text-neutral-700"
                    >
                      <option value="">Headings...</option>
                      <option value="h1">Heading 1 (H1)</option>
                      <option value="h2">Heading 2 (H2)</option>
                      <option value="h3">Heading 3 (H3)</option>
                      <option value="h4">Heading 4 (H4)</option>
                      <option value="p">Paragraph</option>
                    </select>

                    <div className="w-[1px] h-4 bg-neutral-300 mx-1" />

                    {/* Formatting */}
                    <button
                      type="button"
                      onClick={() => executeCommand('bold')}
                      className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-700 font-bold"
                      title="Bold"
                    >
                      <Bold className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => executeCommand('italic')}
                      className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-700 italic"
                      title="Italic"
                    >
                      <Italic className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => executeCommand('underline')}
                      className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-700 underline"
                      title="Underline"
                    >
                      <Underline className="w-3.5 h-3.5" />
                    </button>

                    <div className="w-[1px] h-4 bg-neutral-300 mx-1" />

                    {/* Alignment */}
                    <button
                      type="button"
                      onClick={() => executeCommand('justifyLeft')}
                      className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-700"
                      title="Align Left"
                    >
                      <AlignLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => executeCommand('justifyCenter')}
                      className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-700"
                      title="Align Center"
                    >
                      <AlignCenter className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => executeCommand('justifyRight')}
                      className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-700"
                      title="Align Right"
                    >
                      <AlignRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => executeCommand('justifyFull')}
                      className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-700"
                      title="Justify"
                    >
                      <AlignJustify className="w-3.5 h-3.5" />
                    </button>

                    <div className="w-[1px] h-4 bg-neutral-300 mx-1" />

                    {/* Lists & Quotes */}
                    <button
                      type="button"
                      onClick={() => executeCommand('insertUnorderedList')}
                      className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-700"
                      title="Bullet List"
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => executeCommand('insertOrderedList')}
                      className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-700"
                      title="Numbered List"
                    >
                      <ListOrdered className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => executeCommand('formatBlock', '<blockquote>')}
                      className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-700"
                      title="Blockquote"
                    >
                      <Quote className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => executeCommand('insertHorizontalRule')}
                      className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-700"
                      title="Horizontal Divider"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <div className="w-[1px] h-4 bg-neutral-300 mx-1" />

                    {/* Powerful Link & Image Modals */}
                    <button
                      type="button"
                      onClick={() => setIsInternalLinkModalOpen(true)}
                      className="btn-micro px-2.5 py-1 rounded-lg bg-violet-100 hover:bg-violet-200 text-[#6D28D9] font-bold text-xs flex items-center gap-1"
                      title="Insert link to internal service or article"
                    >
                      <Link2 className="w-3 h-3" />
                      <span>Internal Link</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsInlineImageModalOpen(true)}
                      className="btn-micro px-2.5 py-1 rounded-lg bg-violet-100 hover:bg-violet-200 text-[#6D28D9] font-bold text-xs flex items-center gap-1"
                      title="Insert aligned image into article"
                    >
                      <ImageIcon className="w-3 h-3" />
                      <span>Add Image</span>
                    </button>
                  </div>

                  {/* Editable Article Content Area */}
                  <div
                    ref={editorRef}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={(e) => {
                      const newContent = e.currentTarget.innerHTML;
                      setFormData(prev => ({
                        ...prev,
                        content: newContent
                      }));
                    }}
                    className="min-h-[420px] max-h-[550px] overflow-y-auto p-6 rounded-2xl border border-[#E9E7F2] bg-white focus:outline-none focus:border-[#6D28D9] prose prose-neutral max-w-none text-neutral-800 leading-relaxed
                      [&>h1]:text-2xl [&>h1]:font-extrabold [&>h1]:text-neutral-900 [&>h1]:my-4
                      [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-neutral-900 [&>h2]:my-3
                      [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-neutral-900 [&>h3]:my-2
                      [&>p]:my-2 [&>p]:text-sm [&>p]:leading-relaxed
                      [&>blockquote]:border-l-4 [&>blockquote]:border-[#6D28D9] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-neutral-600 [&>blockquote]:bg-[#FAF9FF] [&>blockquote]:py-2
                      [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1
                      [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1
                      [&>a]:text-[#6D28D9] [&>a]:underline font-semibold
                      [&>figure]:my-4
                      [&>img]:rounded-xl [&>img]:shadow-sm
                    "
                  />

                  {/* Status Bar */}
                  <div className="flex items-center justify-between text-xs text-neutral-500 pt-1">
                    <span>
                      Live stats: <strong className="text-neutral-900">{wordCount}</strong> words · <strong className="text-neutral-900">{charCount}</strong> characters
                    </span>
                    <span className="font-mono text-emerald-600">
                      Estimated reading time: {estimatedReadTime}
                    </span>
                  </div>
                </div>
              )}

              {/* TAB 4: SEO SETTINGS */}
              {activeTab === 'seo' && (
                <div className="max-w-4xl mx-auto space-y-6">
                  {/* Form fields */}
                  <div className="bg-white p-6 rounded-3xl border border-[#E9E7F2] space-y-4 shadow-xs">
                    <div>
                      <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block mb-1">
                        Focus Keyword
                      </label>
                      <input
                        type="text"
                        value={formData.focusKeyword}
                        onChange={(e) => setFormData({ ...formData, focusKeyword: e.target.value })}
                        placeholder="e.g. generative ai search engine optimization"
                        className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] text-xs font-semibold text-neutral-900 focus:outline-none focus:border-[#6D28D9] bg-[#FAF9FF]"
                      />
                    </div>

                    {/* Custom SEO Title */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                          Custom SEO Title
                        </label>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handleAiSuggestSeoTitle}
                            className="text-[11px] font-bold text-[#6D28D9] hover:underline"
                          >
                            Suggest from Blog Title
                          </button>
                          <span className={`text-[11px] font-mono font-bold ${
                            (formData.seoTitle || formData.title).length > 60 ? 'text-amber-600' : 'text-neutral-500'
                          }`}>
                            {(formData.seoTitle || formData.title).length} / 60 chars
                          </span>
                        </div>
                      </div>
                      <input
                        type="text"
                        value={formData.seoTitle}
                        onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                        placeholder={formData.title || 'Enter custom title for Google SERPs...'}
                        className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] text-xs font-semibold text-neutral-900 focus:outline-none focus:border-[#6D28D9] bg-[#FAF9FF]"
                      />
                    </div>

                    {/* Meta Description */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                          Meta Description
                        </label>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handleAiSuggestMetaDesc}
                            className="text-[11px] font-bold text-[#6D28D9] hover:underline"
                          >
                            Suggest from Excerpt
                          </button>
                          <span className={`text-[11px] font-mono font-bold ${
                            (formData.metaDescription || formData.excerpt).length > 165 ? 'text-amber-600' : 'text-neutral-500'
                          }`}>
                            {(formData.metaDescription || formData.excerpt).length} / 160 chars
                          </span>
                        </div>
                      </div>
                      <textarea
                        rows={3}
                        value={formData.metaDescription}
                        onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                        placeholder={formData.excerpt || 'Write a compelling search snippet to drive organic click-through rate...'}
                        className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] text-xs text-neutral-900 focus:outline-none focus:border-[#6D28D9] bg-[#FAF9FF]"
                      />
                    </div>

                    {/* Canonical URL & Robots */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block mb-1">
                          Canonical URL
                        </label>
                        <input
                          type="text"
                          value={formData.canonicalUrl}
                          onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                          placeholder={`https://houserobotics.com/blog/${formData.slug || 'slug'}`}
                          className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] text-xs font-mono text-neutral-900 focus:outline-none focus:border-[#6D28D9] bg-[#FAF9FF]"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-6">
                        <div>
                          <label className="text-xs font-bold text-neutral-900">Robots Indexing</label>
                          <p className="text-[11px] text-neutral-500">Allow search engines to index this article.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!formData.noIndex}
                            onChange={(e) => setFormData({ ...formData, noIndex: !e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6D28D9]" />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Google SERP Live Preview */}
                  <div className="bg-white p-6 rounded-3xl border border-[#E9E7F2] space-y-3 shadow-xs">
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                      Google SERP Desktop Snippet Preview
                    </span>

                    <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 max-w-xl space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-sans">
                        <span className="w-4 h-4 rounded-full bg-[#6D28D9] text-white flex items-center justify-center text-[9px] font-bold">HR</span>
                        <span>House Robotics</span>
                        <span className="text-neutral-400">› blog › {formData.slug || 'slug'}</span>
                      </div>
                      <h4 className="text-base font-medium text-[#1A0DAB] hover:underline cursor-pointer leading-snug line-clamp-1">
                        {formData.seoTitle || formData.title || 'Enter your article title'}
                      </h4>
                      <p className="text-xs text-neutral-700 leading-normal line-clamp-2">
                        {formData.metaDescription || formData.excerpt || 'Add a clear meta description or excerpt to preview how your page will appear in Google search results.'}
                      </p>
                    </div>
                  </div>

                  {/* SEO Health Checklist Component */}
                  <SeoChecklist
                    title={formData.title}
                    slug={formData.slug}
                    content={formData.content}
                    excerpt={formData.excerpt}
                    featuredImage={formData.featuredImage}
                    featuredImageAlt={formData.featuredImageAlt}
                    focusKeyword={formData.focusKeyword}
                    seoTitle={formData.seoTitle}
                    metaDescription={formData.metaDescription}
                    canonicalUrl={formData.canonicalUrl}
                  />
                </div>
              )}

              {/* TAB 5: SOCIAL SHARING */}
              {activeTab === 'social' && (
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="bg-white p-6 rounded-3xl border border-[#E9E7F2] space-y-4 shadow-xs">
                    <h3 className="text-sm font-bold text-neutral-900 font-['Space_Grotesk']">
                      Open Graph &amp; Social Card Metadata
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Configure rich snippets for LinkedIn, Facebook, and X (Twitter) social sharing.
                    </p>

                    <div>
                      <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block mb-1">
                        OG / Social Title
                      </label>
                      <input
                        type="text"
                        value={formData.ogTitle}
                        onChange={(e) => setFormData({ ...formData, ogTitle: e.target.value })}
                        placeholder={formData.seoTitle || formData.title}
                        className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] text-xs font-semibold text-neutral-900 focus:outline-none focus:border-[#6D28D9] bg-[#FAF9FF]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block mb-1">
                        OG / Social Description
                      </label>
                      <textarea
                        rows={2}
                        value={formData.ogDescription}
                        onChange={(e) => setFormData({ ...formData, ogDescription: e.target.value })}
                        placeholder={formData.metaDescription || formData.excerpt}
                        className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] text-xs text-neutral-900 focus:outline-none focus:border-[#6D28D9] bg-[#FAF9FF]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block mb-1">
                        Social Share Image URL (Defaults to Featured Image)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={formData.ogImage}
                          onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                          placeholder={formData.featuredImage || '/assets/blog-ai-search.webp'}
                          className="flex-1 px-3 py-2 rounded-xl border border-[#E9E7F2] text-xs font-mono text-neutral-900 focus:outline-none focus:border-[#6D28D9] bg-[#FAF9FF]"
                        />
                        <button
                          type="button"
                          onClick={() => setIsMediaModalOpen(true)}
                          className="btn-micro px-3 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold"
                        >
                          Choose Image
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Social Preview Mock */}
                  <div className="bg-white p-6 rounded-3xl border border-[#E9E7F2] space-y-3 shadow-xs">
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                      Social Card Preview (LinkedIn / Twitter)
                    </span>
                    <div className="border border-[#E9E7F2] rounded-2xl overflow-hidden max-w-lg bg-white shadow-sm">
                      <div className="aspect-[16/9] bg-neutral-100 overflow-hidden">
                        <img
                          src={formData.ogImage || formData.featuredImage || '/assets/blog-ai-search.webp'}
                          alt="Social Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/assets/blog-ai-search.webp';
                          }}
                        />
                      </div>
                      <div className="p-4 space-y-1 bg-[#FAF9FF]">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase">houserobotics.com</span>
                        <h4 className="text-sm font-bold text-neutral-900 line-clamp-1">
                          {formData.ogTitle || formData.seoTitle || formData.title || 'Article Title'}
                        </h4>
                        <p className="text-xs text-neutral-600 line-clamp-2">
                          {formData.ogDescription || formData.metaDescription || formData.excerpt || 'Article summary description...'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: CATEGORIES & TAGS */}
              {activeTab === 'taxonomy' && (
                <div className="max-w-4xl mx-auto space-y-6">
                  {/* Category Management */}
                  <div className="bg-white p-6 rounded-3xl border border-[#E9E7F2] space-y-4 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-neutral-900 font-['Space_Grotesk']">Categories</h3>
                        <p className="text-xs text-neutral-500">Assign the primary topic cluster for this publication.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {categories.map((c) => {
                        const isSelected = formData.categoryId === c.id;
                        return (
                          <div
                            key={c.id}
                            onClick={() => setFormData({ ...formData, categoryId: c.id })}
                            className={`p-3 rounded-2xl border text-xs font-semibold cursor-pointer transition-all flex items-center justify-between ${
                              isSelected
                                ? 'bg-violet-50 border-[#6D28D9] text-[#6D28D9] shadow-xs'
                                : 'border-[#E9E7F2] text-neutral-700 hover:bg-[#FAF9FF]'
                            }`}
                          >
                            <span>{c.name}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        );
                      })}
                    </div>

                    {/* Create New Category inline */}
                    <div className="pt-2 flex items-center gap-2">
                      <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleCreateCategory(); } }}
                        placeholder="Add new category (e.g. CRO & A/B Testing)..."
                        className="px-3 py-1.5 rounded-xl border border-[#E9E7F2] text-xs bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9] flex-1 max-w-sm"
                      />
                      <button
                        type="button"
                        onClick={handleCreateCategory}
                        disabled={!newCategoryName.trim()}
                        className="btn-micro px-3 py-1.5 rounded-xl bg-[#6D28D9] text-white text-xs font-bold hover:bg-[#5B21B6] disabled:opacity-50"
                      >
                        Add Category
                      </button>
                    </div>
                  </div>

                  {/* Tags Management */}
                  <div className="bg-white p-6 rounded-3xl border border-[#E9E7F2] space-y-4 shadow-xs">
                    <div>
                      <h3 className="text-sm font-bold text-neutral-900 font-['Space_Grotesk']">Semantic Tags</h3>
                      <p className="text-xs text-neutral-500">Select multi-dimensional tags for internal indexing and related article mapping.</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {tags.map((t) => {
                        const isSelected = formData.tagIds.includes(t.id);
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => toggleTag(t.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                              isSelected
                                ? 'bg-[#6D28D9] text-white shadow-xs'
                                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                            }`}
                          >
                            <span>#{t.name}</span>
                            {isSelected && <Check className="w-3 h-3" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Create New Tag */}
                    <div className="pt-2 flex items-center gap-2">
                      <input
                        type="text"
                        value={newTagName}
                        onChange={(e) => setNewTagName(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleCreateTag(); } }}
                        placeholder="Create new tag (e.g. Core Web Vitals)..."
                        className="px-3 py-1.5 rounded-xl border border-[#E9E7F2] text-xs bg-[#FAF9FF] text-neutral-900 focus:outline-none focus:border-[#6D28D9] flex-1 max-w-sm"
                      />
                      <button
                        type="button"
                        onClick={handleCreateTag}
                        disabled={!newTagName.trim()}
                        className="btn-micro px-3 py-1.5 rounded-xl bg-[#6D28D9] text-white text-xs font-bold hover:bg-[#5B21B6] disabled:opacity-50"
                      >
                        Add Tag
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 7: PUBLISHING & SCHEDULE */}
              {activeTab === 'publishing' && (
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="bg-white p-6 rounded-3xl border border-[#E9E7F2] space-y-5 shadow-xs">
                    <div>
                      <h3 className="text-sm font-bold text-neutral-900 font-['Space_Grotesk']">
                        Publishing Lifecycle &amp; Scheduling
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Choose whether to save as draft, publish immediately, or schedule for automated future distribution.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'PUBLISHED', title: 'Publish Immediately', desc: 'Article will be live on public website' },
                        { id: 'DRAFT', title: 'Draft Mode', desc: 'Hidden from public, accessible to editors' },
                        { id: 'SCHEDULED', title: 'Schedule Publication', desc: 'Auto-publish at specified date and time' }
                      ].map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setFormData({ ...formData, status: item.id })}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                            formData.status === item.id
                              ? 'border-[#6D28D9] bg-violet-50 text-[#6D28D9] shadow-xs'
                              : 'border-[#E9E7F2] text-neutral-700 hover:bg-[#FAF9FF]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs">{item.title}</span>
                            {formData.status === item.id && <Check className="w-4 h-4 stroke-[3]" />}
                          </div>
                          <p className="text-[11px] text-neutral-500 mt-1">{item.desc}</p>
                        </div>
                      ))}
                    </div>

                    {/* Scheduled Date/Time picker if SCHEDULED is selected */}
                    {formData.status === 'SCHEDULED' && (
                      <div className="p-4 rounded-2xl bg-[#FAF9FF] border border-blue-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-neutral-900 block mb-1">Schedule Date</label>
                          <input
                            type="date"
                            value={formData.scheduledDate}
                            onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] text-xs font-bold text-neutral-900 bg-white focus:outline-none focus:border-[#6D28D9]"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-neutral-900 block mb-1">Time</label>
                          <input
                            type="time"
                            value={formData.scheduledTime}
                            onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-[#E9E7F2] text-xs font-bold text-neutral-900 bg-white focus:outline-none focus:border-[#6D28D9]"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Related Articles Selector */}
                  <div className="bg-white p-6 rounded-3xl border border-[#E9E7F2] space-y-4 shadow-xs">
                    <div>
                      <h3 className="text-sm font-bold text-neutral-900 font-['Space_Grotesk']">
                        Curated Related Articles (Select 2–4)
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Select specific articles to feature at the bottom of this publication. If left unselected, system automatically suggests relevant posts by category.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto">
                      {posts.filter(p => p.id !== editingPost?.id).map((p) => {
                        const isSelected = formData.relatedPostIds.includes(p.id);
                        return (
                          <div
                            key={p.id}
                            onClick={() => toggleRelatedPost(p.id)}
                            className={`p-3 rounded-2xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                              isSelected
                                ? 'bg-violet-50 border-[#6D28D9] text-[#6D28D9] font-bold'
                                : 'border-[#E9E7F2] text-neutral-700 hover:bg-[#FAF9FF]'
                            }`}
                          >
                            <span className="truncate pr-2">{p.title}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 shrink-0 stroke-[3]" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 8: REVISIONS & VERSION HISTORY */}
              {activeTab === 'revisions' && (
                <div className="max-w-4xl mx-auto space-y-4 bg-white p-6 rounded-3xl border border-[#E9E7F2] shadow-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-neutral-900 font-['Space_Grotesk']">
                        Article Revision History
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Every saved edit creates an automatic snapshot. You can inspect and restore previous versions.
                      </p>
                    </div>
                    <History className="w-5 h-5 text-[#6D28D9]" />
                  </div>

                  {revisions.length === 0 ? (
                    <div className="py-16 text-center text-neutral-400">
                      <p className="text-xs">No prior revisions recorded yet. Revisions are created automatically whenever you update this article.</p>
                    </div>
                  ) : (
                    <div className="space-y-2.5 divide-y divide-neutral-100">
                      {revisions.map((rev) => (
                        <div key={rev.id} className="pt-3 flex items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-neutral-900">{rev.title}</span>
                              <span className="text-[10px] text-neutral-400 font-mono">
                                {new Date(rev.createdAt).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">{rev.excerpt}</p>
                            <span className="text-[10px] text-neutral-400">Saved by {rev.author}</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRestoreRevision(rev.id)}
                            className="btn-micro px-3 py-1.5 rounded-xl border border-violet-200 text-[#6D28D9] text-xs font-bold hover:bg-violet-50 flex items-center gap-1 shrink-0"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Restore</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Media Library Modal for Featured Image or General Asset Selection */}
      <MediaLibraryModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelect={(media) => {
          if (mediaModalTarget === 'og') {
            setFormData(p => ({ ...p, ogImage: media.url }));
          } else {
            setFormData(p => ({
              ...p,
              featuredImage: media.url,
              featuredImageAlt: media.altText || p.featuredImageAlt,
              featuredImageCaption: media.caption || p.featuredImageCaption
            }));
          }
          setIsMediaModalOpen(false);
        }}
      />

      {/* Internal Links Modal */}
      <InternalLinkModal
        isOpen={isInternalLinkModalOpen}
        onClose={() => setIsInternalLinkModalOpen(false)}
        onInsert={handleInsertInternalLink}
      />

      {/* Inline Image Modal */}
      <InlineImageModal
        isOpen={isInlineImageModalOpen}
        onClose={() => setIsInlineImageModalOpen(false)}
        onInsert={handleInsertInlineImage}
      />

      {/* Public Render Preview Modal */}
      <BlogPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        data={{
          title: formData.title,
          slug: formData.slug,
          excerpt: formData.excerpt,
          content: formData.content,
          featuredImage: formData.featuredImage,
          featuredImageAlt: formData.featuredImageAlt,
          featuredImageCaption: formData.featuredImageCaption,
          author: formData.author,
          authorRole: formData.authorRole,
          authorBio: formData.authorBio,
          authorAvatar: formData.authorAvatar,
          readTime: estimatedReadTime,
          category: categories.find(c => c.id === formData.categoryId)?.name || 'SEO & AI Architecture',
          status: formData.status,
          publishedAt: new Date().toISOString()
        }}
      />
    </div>
  );
};

export const BlogView: React.FC = () => {
  return (
    <BlogErrorBoundary>
      <BlogViewInner />
    </BlogErrorBoundary>
  );
};
