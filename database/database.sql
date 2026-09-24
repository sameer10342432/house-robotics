-- =====================================================================
-- HOUSE ROBOTICS — Production MySQL / MariaDB Database Dump
-- Compatible with cPanel phpMyAdmin, MySQL 5.7+, MySQL 8.0+, MariaDB 10.3+
-- Charset: utf8mb4 / Collation: utf8mb4_unicode_ci
-- =====================================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET NAMES utf8mb4;

-- ---------------------------------------------------------------------
-- 1. Table structure for table `admin_users`
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` varchar(36) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'ADMIN',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `last_login` datetime DEFAULT NULL,
  `reset_password_token` varchar(255) DEFAULT NULL,
  `reset_password_expires` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_admin_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 2. Table structure for table `services`
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `services` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `category` varchar(100) NOT NULL DEFAULT 'Marketing',
  `short_description` text NOT NULL,
  `long_description` mediumtext NOT NULL,
  `hero_image` varchar(255) DEFAULT NULL,
  `icon` varchar(100) NOT NULL DEFAULT 'Sparkles',
  `status` varchar(50) NOT NULL DEFAULT 'PUBLISHED',
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `metrics_label` varchar(100) DEFAULT NULL,
  `metrics_value` varchar(100) DEFAULT NULL,
  `gradient` varchar(150) DEFAULT 'from-violet-600 to-blue-600',
  `seo_title` varchar(255) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `focus_keyword` varchar(150) DEFAULT NULL,
  `canonical_url` varchar(255) DEFAULT NULL,
  `og_image` varchar(255) DEFAULT NULL,
  `no_index` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_service_slug` (`slug`),
  KEY `idx_service_status` (`status`),
  KEY `idx_service_category` (`category`),
  KEY `idx_service_sort` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 3. Table structure for table `service_features`
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `service_features` (
  `id` varchar(36) NOT NULL,
  `service_id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_feat_service` (`service_id`),
  CONSTRAINT `fk_feature_service` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 4. Table structure for table `service_benefits`
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `service_benefits` (
  `id` varchar(36) NOT NULL,
  `service_id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_ben_service` (`service_id`),
  CONSTRAINT `fk_benefit_service` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 5. Table structure for table `service_process_steps`
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `service_process_steps` (
  `id` varchar(36) NOT NULL,
  `service_id` varchar(36) NOT NULL,
  `step_number` varchar(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_step_service` (`service_id`),
  CONSTRAINT `fk_process_service` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 6. Table structure for table `service_faqs`
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `service_faqs` (
  `id` varchar(36) NOT NULL,
  `service_id` varchar(36) NOT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `status` varchar(50) NOT NULL DEFAULT 'PUBLISHED',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_sfaq_service` (`service_id`),
  CONSTRAINT `fk_sfaq_service` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 7. Table structure for table `blog_categories`
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `blog_categories` (
  `id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_bcat_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 8. Table structure for table `blog_tags`
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `blog_tags` (
  `id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_btag_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 9. Table structure for table `blog_posts`
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `blog_posts` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `excerpt` text NOT NULL,
  `content` longtext NOT NULL,
  `featured_image` varchar(255) DEFAULT NULL,
  `featured_image_alt` varchar(255) DEFAULT NULL,
  `featured_image_caption` varchar(255) DEFAULT NULL,
  `author` varchar(150) NOT NULL DEFAULT 'House Robotics Strategy Team',
  `author_role` varchar(150) DEFAULT 'Growth Strategist',
  `author_bio` text DEFAULT NULL,
  `author_avatar` varchar(255) DEFAULT '/images/avatar-marcus.svg',
  `read_time` varchar(50) NOT NULL DEFAULT '5 min read',
  `category_id` varchar(36) DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'PUBLISHED',
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `views` int(11) NOT NULL DEFAULT 0,
  `published_at` datetime DEFAULT NULL,
  `scheduled_at` datetime DEFAULT NULL,
  `seo_title` varchar(255) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `focus_keyword` varchar(150) DEFAULT NULL,
  `canonical_url` varchar(255) DEFAULT NULL,
  `og_title` varchar(255) DEFAULT NULL,
  `og_description` text DEFAULT NULL,
  `og_image` varchar(255) DEFAULT NULL,
  `twitter_title` varchar(255) DEFAULT NULL,
  `twitter_description` text DEFAULT NULL,
  `twitter_image` varchar(255) DEFAULT NULL,
  `no_index` tinyint(1) NOT NULL DEFAULT 0,
  `related_post_ids` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_post_slug` (`slug`),
  KEY `idx_post_status` (`status`),
  KEY `idx_post_cat` (`category_id`),
  KEY `idx_post_pub` (`published_at`),
  CONSTRAINT `fk_post_category` FOREIGN KEY (`category_id`) REFERENCES `blog_categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 10. Table structure for table `blog_post_tags`
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `blog_post_tags` (
  `id` varchar(36) NOT NULL,
  `post_id` varchar(36) NOT NULL,
  `tag_id` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_post_tag_unique` (`post_id`,`tag_id`),
  KEY `idx_tag_id` (`tag_id`),
  CONSTRAINT `fk_pt_post` FOREIGN KEY (`post_id`) REFERENCES `blog_posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_pt_tag` FOREIGN KEY (`tag_id`) REFERENCES `blog_tags` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 11. Table structure for table `blog_revisions`
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `blog_revisions` (
  `id` varchar(36) NOT NULL,
  `post_id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `excerpt` text NOT NULL,
  `author` varchar(150) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_rev_post` (`post_id`),
  CONSTRAINT `fk_rev_post` FOREIGN KEY (`post_id`) REFERENCES `blog_posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 12. Table structure for table `authors`
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `authors` (
  `id` varchar(36) NOT NULL,
  `name` varchar(150) NOT NULL,
  `role` varchar(150) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 13. Table structure for table `testimonials`
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` varchar(36) NOT NULL,
  `client_name` varchar(150) NOT NULL,
  `company` varchar(150) NOT NULL,
  `role` varchar(150) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `rating` int(11) NOT NULL DEFAULT 5,
  `review` text NOT NULL,
  `highlight` varchar(255) DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'APPROVED',
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_test_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 14. Table structure for table `faqs`
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `faqs` (
  `id` varchar(36) NOT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL,
  `category` varchar(100) NOT NULL DEFAULT 'General',
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `status` varchar(50) NOT NULL DEFAULT 'PUBLISHED',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_faq_cat` (`category`),
  KEY `idx_faq_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 15. Table structure for table `contact_messages`
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `contact_messages` (
  `id` varchar(36) NOT NULL,
  `inquiry_id` varchar(100) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `company` varchar(150) DEFAULT NULL,
  `service` varchar(100) DEFAULT NULL,
  `budget` varchar(100) DEFAULT NULL,
  `message` text NOT NULL,
  `page_url` varchar(500) DEFAULT NULL,
  `referrer` varchar(500) DEFAULT NULL,
  `ip_address` varchar(64) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'UNREAD',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_msg_inq` (`inquiry_id`),
  KEY `idx_msg_email` (`email`),
  KEY `idx_msg_status` (`status`),
  KEY `idx_msg_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 16. Table structure for table `leads`
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `leads` (
  `id` varchar(36) NOT NULL,
  `inquiry_id` varchar(100) DEFAULT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `company` varchar(150) DEFAULT NULL,
  `service` varchar(100) DEFAULT NULL,
  `budget` varchar(100) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `page_url` varchar(500) DEFAULT NULL,
  `referrer` varchar(500) DEFAULT NULL,
  `ip_address` varchar(64) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `utm_source` varchar(100) DEFAULT NULL,
  `utm_medium` varchar(100) DEFAULT NULL,
  `utm_campaign` varchar(100) DEFAULT NULL,
  `source` varchar(100) NOT NULL DEFAULT 'Website',
  `status` varchar(50) NOT NULL DEFAULT 'NEW',
  `assigned_to` varchar(150) DEFAULT NULL,
  `score` int(11) NOT NULL DEFAULT 50,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_lead_inq` (`inquiry_id`),
  KEY `idx_lead_email` (`email`),
  KEY `idx_lead_status` (`status`),
  KEY `idx_lead_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 17. Table structure for table `lead_notes`
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `lead_notes` (
  `id` varchar(36) NOT NULL,
  `lead_id` varchar(36) NOT NULL,
  `admin_id` varchar(36) DEFAULT NULL,
  `author_name` varchar(150) NOT NULL DEFAULT 'Admin',
  `note` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_note_lead` (`lead_id`),
  CONSTRAINT `fk_note_lead` FOREIGN KEY (`lead_id`) REFERENCES `leads` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_note_admin` FOREIGN KEY (`admin_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 18. Table structure for table `newsletter_subscribers`
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `newsletter_subscribers` (
  `id` varchar(36) NOT NULL,
  `email` varchar(191) NOT NULL,
  `name` varchar(150) DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'SUBSCRIBED',
  `source` varchar(100) NOT NULL DEFAULT 'Website Footer',
  `subscribed_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `unsubscribed_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_sub_email` (`email`),
  KEY `idx_sub_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 19. Table structure for table `seo_metadata`
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `seo_metadata` (
  `id` varchar(36) NOT NULL,
  `page_path` varchar(191) NOT NULL,
  `seo_title` varchar(255) NOT NULL,
  `meta_description` text NOT NULL,
  `focus_keyword` varchar(150) DEFAULT NULL,
  `canonical_url` varchar(255) DEFAULT NULL,
  `og_title` varchar(255) DEFAULT NULL,
  `og_description` text DEFAULT NULL,
  `og_image` varchar(255) DEFAULT NULL,
  `twitter_title` varchar(255) DEFAULT NULL,
  `twitter_description` text DEFAULT NULL,
  `twitter_image` varchar(255) DEFAULT NULL,
  `no_index` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_seo_path` (`page_path`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 20. Table structure for table `site_settings`
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` varchar(36) NOT NULL,
  `key` varchar(191) NOT NULL,
  `value` text NOT NULL,
  `group` varchar(50) NOT NULL DEFAULT 'general',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_setting_key` (`key`),
  KEY `idx_setting_group` (`group`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 21. Table structure for table `media`
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `media` (
  `id` varchar(36) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `original_name` varchar(255) NOT NULL,
  `mime_type` varchar(100) NOT NULL,
  `size` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `caption` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `uploaded_by` varchar(150) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 22. Table structure for table `analytics_events`
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `analytics_events` (
  `id` varchar(36) NOT NULL,
  `event_type` varchar(50) NOT NULL,
  `event_name` varchar(100) NOT NULL,
  `page_url` varchar(500) DEFAULT NULL,
  `referrer` varchar(500) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `ip_hash` varchar(64) DEFAULT NULL,
  `metadata` longtext DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_event_type` (`event_type`),
  KEY `idx_event_time` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 23. Table structure for table `activity_logs`
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `activity_logs` (
  `id` varchar(36) NOT NULL,
  `admin_id` varchar(36) DEFAULT NULL,
  `admin_name` varchar(150) NOT NULL DEFAULT 'System',
  `action` varchar(100) NOT NULL,
  `entity` varchar(100) NOT NULL,
  `entity_id` varchar(100) DEFAULT NULL,
  `metadata` longtext DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_log_admin` (`admin_id`),
  KEY `idx_log_action` (`action`),
  KEY `idx_log_time` (`timestamp`),
  CONSTRAINT `fk_log_admin` FOREIGN KEY (`admin_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 24. Table structure for table `password_resets`
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `password_resets` (
  `id` varchar(36) NOT NULL,
  `email` varchar(191) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_reset_token` (`token`),
  KEY `idx_reset_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================================
-- SEED DATA INSERTION
-- =====================================================================

-- 1. Super Admin User (password: Y&VO{(w0J3A6)
INSERT INTO `admin_users` (`id`, `name`, `email`, `password_hash`, `role`, `is_active`, `created_at`, `updated_at`) VALUES
('c0000000-0000-0000-0000-000000000001', 'Sameer Liaqat', 'sameerliaqat81@gmail.com', '$2y$12$uau1llmY6KsagUJ2U1ZQ3OxsRLfnDfWcbklDPApPUFflPWcSUPSZS', 'SUPER_ADMIN', 1, NOW(), NOW())
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- 2. Site Settings
INSERT INTO `site_settings` (`id`, `key`, `value`, `group`, `created_at`, `updated_at`) VALUES
('s0000001', 'company_name', 'House Robotics', 'general', NOW(), NOW()),
('s0000002', 'company_tagline', 'Smart Digital Solutions. Powerful Business Growth.', 'general', NOW(), NOW()),
('s0000003', 'company_description', 'House Robotics combines digital marketing, AI automation and technology to help ambitious businesses grow faster and smarter.', 'general', NOW(), NOW()),
('s0000004', 'contact_whatsapp', '+92 347 4542881', 'contact', NOW(), NOW()),
('s0000005', 'contact_whatsapp_url', 'https://wa.me/923474542881', 'contact', NOW(), NOW()),
('s0000006', 'contact_email', 'sameerliaqat81@gmail.com', 'contact', NOW(), NOW()),
('s0000007', 'contact_address', 'Lahore, Pakistan / Remote Global Client Delivery', 'contact', NOW(), NOW()),
('s0000008', 'social_linkedin', 'https://linkedin.com/company/house-robotics', 'social', NOW(), NOW()),
('s0000009', 'social_instagram', 'https://instagram.com/houserobotics', 'social', NOW(), NOW()),
('s0000010', 'social_facebook', 'https://facebook.com/houserobotics', 'social', NOW(), NOW()),
('s0000011', 'seo_default_title', 'House Robotics — Full-Service Digital Marketing & Technology Agency', 'seo', NOW(), NOW()),
('s0000012', 'seo_default_description', 'House Robotics delivers cutting-edge SEO, Google Ads, Meta Ads, Custom Web Development, AI Automation, and CRO for ambitious brands worldwide.', 'seo', NOW(), NOW()),
('s0000013', 'analytics_ga_id', 'G-HOUSEROBOTICS', 'analytics', NOW(), NOW())
ON DUPLICATE KEY UPDATE `value`=VALUES(`value`);

-- 3. SEO Metadata for Core Pages
INSERT INTO `seo_metadata` (`id`, `page_path`, `seo_title`, `meta_description`, `focus_keyword`, `created_at`, `updated_at`) VALUES
('seo0001', '/', 'House Robotics — Full-Service Digital Marketing & Technology Agency', 'Scale your revenue with high-impact SEO, Google & Meta Ads, Custom Web Applications, and AI Automation workflows.', 'digital marketing agency', NOW(), NOW()),
('seo0002', '/services', 'Our Capabilities & Services | House Robotics', 'Explore our full spectrum of services: SEO, PPC, AI Automation, Web Engineering, CRO, and Marketing Operations.', 'digital agency services', NOW(), NOW()),
('seo0003', '/about', 'About Us | House Robotics Digital Marketing & Technology', 'Learn why hyper-growth brands choose House Robotics for transparent ROI, agile development, and performance marketing.', 'about house robotics', NOW(), NOW()),
('seo0004', '/contact', 'Contact House Robotics — WhatsApp +92 347 4542881 & Consultation', 'Get in touch for a comprehensive audit of your digital presence. Reach us on WhatsApp at +92 347 4542881 or email sameerliaqat81@gmail.com.', 'contact house robotics', NOW(), NOW()),
('seo0005', '/blog', 'Insights & Technology Playbooks | House Robotics Blog', 'Actionable strategies on generative search SEO, practical business automation, Core Web Vitals, and ad optimization.', 'digital marketing insights', NOW(), NOW())
ON DUPLICATE KEY UPDATE `seo_title`=VALUES(`seo_title`);

-- 4. FAQs
INSERT INTO `faqs` (`id`, `question`, `answer`, `category`, `sort_order`, `status`, `created_at`, `updated_at`) VALUES
('faq0001', 'How does House Robotics differ from traditional digital agencies?', 'We unify modern software engineering with high-performance digital marketing. Instead of just running ads or handing off static designs, we build connected systems—speed-optimized web applications, custom AI workflows, automated lead qualification, and measurable search strategies with direct transparent communication.', 'General', 1, 'PUBLISHED', NOW(), NOW()),
('faq0002', 'What is the onboarding process and timeline?', 'Our typical onboarding takes 3–5 business days. We begin with a deep discovery audit of your analytics, current rankings, and technical stack, establish dedicated communication channels via WhatsApp or Slack, and present a prioritized 90-day growth roadmap.', 'General', 2, 'PUBLISHED', NOW(), NOW()),
('faq0003', 'Can you work with our existing WordPress or Shopify website?', 'Yes. We frequently audit, speed-optimize, and redesign existing WordPress and Shopify storefronts without requiring a complete teardown, eliminating bloated plugins and improving Core Web Vitals to elevate conversion rates.', 'Technical', 3, 'PUBLISHED', NOW(), NOW()),
('faq0004', 'How do you measure and report campaign performance?', 'We do not report vanity impressions. You receive live access to custom dashboards detailing qualified leads, cost-per-acquisition (CPA), search ranking momentum, and revenue attribution, backed by regular strategic sprint recaps.', 'Reporting', 4, 'PUBLISHED', NOW(), NOW()),
('faq0005', 'How do we get started?', 'Simply click "Get a Free Consultation" or reach out directly on WhatsApp at +92 347 4542881 or via email at sameerliaqat81@gmail.com. We will review your digital presence and provide an actionable growth analysis.', 'Contact', 5, 'PUBLISHED', NOW(), NOW())
ON DUPLICATE KEY UPDATE `question`=VALUES(`question`);

-- 5. Testimonials
INSERT INTO `testimonials` (`id`, `client_name`, `company`, `role`, `review`, `rating`, `sort_order`, `photo`, `status`, `created_at`, `updated_at`) VALUES
('t0001', 'Marcus Vance', 'Vanguard Retail Tech', 'Founder & CEO', 'House Robotics completely rebuilt our web platform and automated our inbound lead pipeline. Their technical depth and responsiveness on WhatsApp made the entire project seamless.', 5, 1, '/images/avatar-marcus.svg', 'APPROVED', NOW(), NOW()),
('t0002', 'Dr. Sophia Bennett', 'Lumina Aesthetic Institute', 'Clinical Director & Founder', 'Our Google Maps calls tripled within 90 days. We now own the #1 spot in every surrounding district, and the automated patient review workflow runs completely on autopilot.', 5, 2, '/images/avatar-sophia.svg', 'APPROVED', NOW(), NOW()),
('t0003', 'David Sterling', 'UrbanStride Footwear', 'Managing Director', 'Our site went from loading in 4.2 seconds to 0.4 seconds flat. That single engineering upgrade increased our checkout conversion rate by 34% immediately.', 5, 3, '/images/avatar-david.svg', 'APPROVED', NOW(), NOW()),
('t0004', 'Charlotte Dubois', 'Nexus Capital Advisory', 'Managing Partner', 'Unlike typical digital agencies that drown you in vanity graphs, House Robotics focuses purely on qualified deal flow, clean technology, and transparent attribution.', 5, 4, '/images/avatar-charlotte.svg', 'APPROVED', NOW(), NOW())
ON DUPLICATE KEY UPDATE `client_name`=VALUES(`client_name`);

-- 6. Blog Categories
INSERT INTO `blog_categories` (`id`, `name`, `slug`, `description`, `sort_order`, `created_at`, `updated_at`) VALUES
('bcat001', 'SEO', 'seo', 'Search engine optimization strategies and AI search developments', 1, NOW(), NOW()),
('bcat002', 'AI & Automation', 'ai-automation', 'Practical workflow automations and intelligent agents', 2, NOW(), NOW()),
('bcat003', 'Web Development', 'web-dev', 'High-speed web architecture, React, and e-commerce engineering', 3, NOW(), NOW()),
('bcat004', 'Paid Advertising', 'paid-ads', 'Google Ads, Meta Ads, and ROAS optimization', 4, NOW(), NOW()),
('bcat005', 'Digital Marketing', 'digital-marketing', 'Multi-channel brand growth and conversion tactics', 5, NOW(), NOW())
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- 7. Blog Posts
INSERT INTO `blog_posts` (`id`, `title`, `slug`, `excerpt`, `content`, `featured_image`, `author`, `author_role`, `read_time`, `category_id`, `status`, `featured`, `published_at`, `created_at`, `updated_at`) VALUES
('post001', 'The Modern SEO Playbook: How AI Overviews Are Changing Search Rankings', 'the-modern-seo-playbook-ai-overviews', 'How search engines prioritize conversational answers and how your brand can secure citations in AI-generated summary panels.', '<h2>The Evolution of Search in 2026</h2><p>Search engines are transitioning from ten blue links to synthesized conversational answers. To maintain visibility, websites must optimize for entity authority, verified schema markups, and clear factual citations.</p><h3>Three Fundamental Pillars</h3><p>We break down the three fundamental pillars of ranking in modern generative search:</p><ul><li><strong>Factual Entity Clarity:</strong> Structuring content so search models understand who you are and what you deliver without ambiguity.</li><li><strong>Semantic Content Depth:</strong> Answering buyer objections comprehensively rather than stuffing superficial keywords.</li><li><strong>Lightning-Fast Technical Foundations:</strong> Providing sub-second response times that search crawlers reward.</li></ul><p>By organizing your site into structured topical clusters, you provide search engines with unequivocal proof of your subject matter leadership.</p>', '/images/blog-ai-search.svg', 'House Robotics Strategy Team', 'Growth Strategist', '6 min read', 'bcat001', 'PUBLISHED', 1, '2026-03-01 10:00:00', NOW(), NOW()),
('post002', 'Practical AI Automation: Replacing Busywork with Connected Workflows', 'practical-ai-automation-connected-workflows', 'Step-by-step framework for connecting your marketing channels directly to your CRM with zero manual data entry.', '<h2>Stop Wasting 20+ Hours Every Week</h2><p>Most businesses waste 15 to 25 hours every week transferring leads between spreadsheets, answering basic repetitive inquiries, and manually sending follow-ups.</p><h3>Intelligent Qualification Pipelines</h3><p>With modern webhook integrations and structured AI qualification models, you can instantly score incoming prospects, enrich their profile data, and assign them directly to your sales reps calendar.</p><p>We review real architecture diagrams that deliver instant responses to buyers while keeping human reps focused solely on closing high-value deals.</p>', '/images/blog-autonomous-agents.svg', 'Automation Architecture Group', 'AI Engineer', '5 min read', 'bcat002', 'PUBLISHED', 0, '2026-02-15 10:00:00', NOW(), NOW()),
('post003', 'Why Page Speed Is the Ultimate Conversion Rate Multiplier', 'page-speed-conversion-rate-multiplier', 'Every 100ms delay in page load diminishes checkout completions. How clean modern stacks outperform heavy legacy themes.', '<h2>The Direct Financial Impact of Latency</h2><p>A delay of just one second in mobile page rendering drops conversion rates by up to 20%. Cluttered plugin stacks and uncompressed media drag down customer experience.</p><h3>Engineering High-Performance Frontends</h3><p>By decoupling your frontend with modern React and streamlined Tailwind CSS, your business achieves instant page transitions, perfect Core Web Vitals, and superior mobile conversion rates.</p><p>Explore the architectural differences between bloated legacy CMS themes and modern high-performance engineering.</p>', '/images/blog-react-perf.svg', 'Engineering Team', 'Lead Architect', '4 min read', 'bcat003', 'PUBLISHED', 0, '2026-01-20 10:00:00', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`);

-- 8. 21 Core Services
INSERT INTO `services` (`id`, `slug`, `title`, `category`, `short_description`, `long_description`, `hero_image`, `icon`, `status`, `featured`, `sort_order`, `metrics_label`, `metrics_value`, `gradient`, `created_at`, `updated_at`) VALUES
('srv01', 'seo', 'Search Engine Optimization (SEO)', 'Marketing', 'Drive predictable, compounding organic traffic through technical SEO, authoritative link building, and intent-driven content.', 'Comprehensive organic search architecture tailored to dominate competitive keywords, boost domain authority, and generate high-intent search leads.', '/images/seo-page-hero.webp', 'Search', 'PUBLISHED', 1, 1, 'Avg. Organic Lift', '+140%', 'from-violet-600 to-indigo-600', NOW(), NOW()),
('srv02', 'local-seo', 'Local SEO & Google Maps', 'Marketing', 'Dominate Google Local 3-Pack rankings, optimize Google Business Profile, and capture nearby ready-to-buy customers.', 'Turn geographical proximity into inbound phone calls and foot traffic with hyper-localized citation networks, review engines, and geo-targeted landing pages.', '/images/local-seo-page-hero.webp', 'MapPin', 'PUBLISHED', 1, 2, 'Local Visibility Gain', '+210%', 'from-blue-600 to-cyan-600', NOW(), NOW()),
('srv03', 'google-maps-ranking', 'Google Maps Ranking', 'Marketing', 'Geo-grid optimization, local citation architecture, and review acceleration to rank #1 across target radiuses.', 'Systematic geo-targeted optimization that expands your Google Maps radius to capture surrounding zip codes.', '/images/local-seo-page-hero.webp', 'Navigation', 'PUBLISHED', 0, 3, 'Radius Lift', '3.5x', 'from-emerald-600 to-teal-600', NOW(), NOW()),
('srv04', 'social-media-marketing', 'Social Media Marketing', 'Marketing', 'Build an engaged audience and predictable sales pipeline across Instagram, LinkedIn, Facebook, and TikTok.', 'Multi-platform social strategies blending organic creative direction, community building, and retargeting workflows.', '/images/social-media-marketing-page-hero.webp', 'Share2', 'PUBLISHED', 1, 4, 'Engagement Lift', '+185%', 'from-purple-600 to-pink-600', NOW(), NOW()),
('srv05', 'ppc-google-ads', 'PPC & Google Ads', 'Marketing', 'High-ROI Google Search, Shopping, and Display campaigns designed to convert clicks into high-ticket customers.', 'Data-driven paid search architecture eliminating ad waste with laser-targeted negative keyword filtering, bidding models, and landing page alignment.', '/images/ppc-google-ads-page-hero.webp', 'TrendingUp', 'PUBLISHED', 1, 5, 'Avg. Client ROAS', '4.6x', 'from-amber-600 to-orange-600', NOW(), NOW()),
('srv06', 'meta-ads', 'Meta Ads (Facebook & Instagram)', 'Marketing', 'Scalable paid social funnels leveraging high-performing creatives, custom lookalikes, and dynamic retargeting.', 'Full-funnel Meta advertising campaigns designed to generate predictable customer acquisitions at scale.', '/images/social-media-marketing-page-hero.webp', 'Layers', 'PUBLISHED', 0, 6, 'Cost Per Lead Drop', '-38%', 'from-blue-600 to-indigo-600', NOW(), NOW()),
('srv07', 'email-marketing', 'Email Marketing & Retention', 'Growth', 'Automated email flows, segmentation, and weekly campaigns that maximize customer lifetime value (LTV).', 'Turn existing lists into steady revenue through lifecycle flows, behavioral segmentation, and personalized email nurture sequences.', '/images/email-marketing-page-hero.webp', 'Mail', 'PUBLISHED', 0, 7, 'Repeat Sales Lift', '+45%', 'from-violet-600 to-purple-600', NOW(), NOW()),
('srv08', 'content-marketing', 'Content Marketing', 'Marketing', 'Authority-building articles, lead magnets, whitepapers, and guides that educate prospects and drive organic conversions.', 'Strategic editorial production that establishes domain dominance and answers critical commercial buyer questions.', '/images/content-marketing-page-hero.webp', 'FileText', 'PUBLISHED', 0, 8, 'Editorial Velocity', '12x', 'from-emerald-600 to-green-600', NOW(), NOW()),
('srv09', 'ai-automation', 'AI Automation & Workflows', 'AI & Automation', 'Automate repetitive workflows, qualify leads instantly 24/7, and connect CRMs with custom intelligent pipelines.', 'Harness practical generative AI and orchestration tools to automate lead intake, instant email personalization, customer support, and sales pipeline updates.', '/images/home-ai-automation.webp', 'Cpu', 'PUBLISHED', 1, 9, 'Weekly Time Saved', '20+ hrs', 'from-indigo-600 to-cyan-600', NOW(), NOW()),
('srv10', 'marketing-automation', 'Marketing Automation', 'Growth', 'Streamline lead attribution, CRM scoring, multi-channel follow-ups, and customer journey orchestration.', 'Unify sales and marketing data streams into a cohesive pipeline that tracks buyer journeys from first click to closed deal.', '/images/home-marketing-automation.webp', 'Zap', 'PUBLISHED', 0, 10, 'Pipeline Velocity', '2.8x', 'from-amber-500 to-rose-500', NOW(), NOW()),
('srv11', 'custom-web-development', 'Custom Web Development', 'Technology', 'Bespoke web applications and responsive corporate portals engineered with Next.js, React, and Node.js for lightning speed.', 'High-performance web architecture engineered for speed, clean UX, and seamless backend integrations.', '/images/web-development-page-hero.webp', 'Code', 'PUBLISHED', 1, 11, 'Lighthouse Score', '99/100', 'from-blue-600 to-violet-600', NOW(), NOW()),
('srv12', 'wordpress-development', 'WordPress Development', 'Technology', 'Custom, secure, and bloat-free WordPress platforms built for ease of editing, Core Web Vitals, and scale.', 'Modern headless and custom WordPress engineering that eliminates plugin bloat and guarantees top Google PageSpeed scores.', '/images/wordpress-page-hero.webp', 'Globe', 'PUBLISHED', 0, 12, 'Page Speed Gain', '3.4x', 'from-sky-600 to-blue-700', NOW(), NOW()),
('srv13', 'shopify-development', 'Shopify Development', 'Technology', 'High-converting Shopify and Shopify Plus storefronts optimized for mobile shopping and frictionless checkouts.', 'Enterprise e-commerce storefronts tailored to boost average order value (AOV) and conversion rates.', '/images/shopify-page-hero.webp', 'ShoppingBag', 'PUBLISHED', 0, 13, 'Checkout Completion', '+32%', 'from-emerald-600 to-teal-700', NOW(), NOW()),
('srv14', 'ecommerce-development', 'E-commerce Development', 'Technology', 'Scalable e-commerce infrastructure, payment gateway integrations, and omnichannel catalog sync.', 'End-to-end e-commerce solutions that handle complex catalog variations, wholesale pricing, and automated inventory sync.', '/images/ecommerce-page-hero.webp', 'ShoppingCart', 'PUBLISHED', 0, 14, 'Catalog Scalability', '50k+ SKUs', 'from-indigo-600 to-blue-600', NOW(), NOW()),
('srv15', 'website-maintenance', 'Website Maintenance & Security', 'Technology', 'Proactive 24/7 uptime monitoring, security patching, Core Web Vitals maintenance, and regular backups.', 'Protect your digital asset with regular security audits, automated cloud backups, and proactive updates.', '/images/web-development-page-hero.webp', 'Shield', 'PUBLISHED', 0, 15, 'Guaranteed Uptime', '99.9%', 'from-slate-700 to-zinc-900', NOW(), NOW()),
('srv16', 'conversion-rate-optimization', 'Conversion Rate Optimization (CRO)', 'Growth', 'Turn more of your existing traffic into revenue through heatmaps, user session analysis, and rigorous A/B testing.', 'Systematic conversion optimization removing user friction points to unlock higher returns from your current ad spend.', '/images/cro-page-hero.webp', 'BarChart2', 'PUBLISHED', 0, 16, 'Avg. CRO Uplift', '+28%', 'from-rose-600 to-orange-600', NOW(), NOW()),
('srv17', 'lead-generation', 'B2B Lead Generation', 'Growth', 'Multi-touch outbound and inbound systems generating high-value qualified appointments for your sales team.', 'Predictable pipeline development utilizing LinkedIn outreach, automated email enrichment, and targeted lead magnets.', '/images/lead-generation-page-hero.webp', 'Target', 'PUBLISHED', 0, 17, 'Discovery Calls/Mo', '35+', 'from-violet-600 to-indigo-600', NOW(), NOW()),
('srv18', 'analytics-reporting', 'Analytics & Performance Reporting', 'Growth', 'Clean server-side tracking, GA4 configuration, and executive dashboards displaying real revenue impact.', 'Eliminate data fog with custom BI reporting dashboards that track cost-per-lead, lifetime value, and channel attribution.', '/images/analytics-page-hero.webp', 'PieChart', 'PUBLISHED', 0, 18, 'Attribution Clarity', '100%', 'from-blue-600 to-cyan-600', NOW(), NOW()),
('srv19', 'branding-graphic-design', 'Branding & Graphic Design', 'Marketing', 'Memorable brand identity, modern logos, pitch decks, and digital asset systems that command authority.', 'Comprehensive visual identity design that differentiates your company in competitive markets.', '/images/branding-page-hero.webp', 'Feather', 'PUBLISHED', 0, 19, 'Perceived Value', 'Premium', 'from-fuchsia-600 to-pink-600', NOW(), NOW()),
('srv20', 'video-marketing', 'Video Marketing & Production', 'Marketing', 'High-impact product demos, client case study videos, and short-form video systems for social growth.', 'Engaging video assets that explain complex products clearly and build immediate emotional connection with buyers.', '/images/video-marketing-page-hero.webp', 'Video', 'PUBLISHED', 0, 20, 'Retention Uplift', '3.2x', 'from-red-600 to-rose-600', NOW(), NOW()),
('srv21', 'online-reputation-management', 'Online Reputation Management', 'Marketing', 'Automated 5-star review collection, review gating, and brand perception protection across public search.', 'Cultivate an unshakeable 5-star reputation on Google, Trustpilot, and Yelp to win customer trust instantly.', '/images/online-reputation-page-hero.webp', 'Award', 'PUBLISHED', 0, 21, 'Review Velocity', '+400%', 'from-amber-600 to-yellow-500', NOW(), NOW())
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`);

-- 9. Service Features & Benefits Sample
INSERT INTO `service_features` (`id`, `service_id`, `title`, `sort_order`, `created_at`, `updated_at`) VALUES
('sf001', 'srv01', 'Technical SEO Audits & Core Web Vitals', 1, NOW(), NOW()),
('sf002', 'srv01', 'High-Intent Keyword Architecture', 2, NOW(), NOW()),
('sf003', 'srv01', 'Editorial Content Roadmaps', 3, NOW(), NOW()),
('sf004', 'srv01', 'Enterprise Backlink Acquisition', 4, NOW(), NOW()),
('sf005', 'srv01', 'Rank Tracking & Attribution', 5, NOW(), NOW()),
('sf006', 'srv02', 'Google Business Profile Optimization', 1, NOW(), NOW()),
('sf007', 'srv02', 'Local Citation & NAP Synchronization', 2, NOW(), NOW()),
('sf008', 'srv02', 'Geo-Targeted Content Silos', 3, NOW(), NOW()),
('sf009', 'srv02', 'Automated Review Capture Systems', 4, NOW(), NOW()),
('sf010', 'srv09', 'Automated Lead Intake & Routing', 1, NOW(), NOW()),
('sf011', 'srv09', 'CRM & ERP Synchronization', 2, NOW(), NOW()),
('sf012', 'srv09', 'Intelligent 24/7 Chat Qualification', 3, NOW(), NOW()),
('sf013', 'srv11', 'React & Next.js Architecture', 1, NOW(), NOW()),
('sf014', 'srv11', 'Sub-Second Page Loads', 2, NOW(), NOW()),
('sf015', 'srv11', 'REST & GraphQL APIs', 3, NOW(), NOW())
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`);

INSERT INTO `service_benefits` (`id`, `service_id`, `title`, `description`, `sort_order`, `created_at`, `updated_at`) VALUES
('sb001', 'srv01', 'Predictable Organic Inbound', 'Generate high-intent buyer inquiries month after month without paying for every click.', 1, NOW(), NOW()),
('sb002', 'srv01', 'Top Google Rankings', 'Establish market authority by ranking for the keywords your customers search most.', 2, NOW(), NOW()),
('sb003', 'srv02', '3-Pack Dominance', 'Capture 70%+ of clicks from local prospects searching on their mobile devices.', 1, NOW(), NOW()),
('sb004', 'srv09', 'Save 20+ Hours Weekly', 'Eliminate manual data transfers and focus human talent on revenue tasks.', 1, NOW(), NOW()),
('sb005', 'srv11', 'Maximum Speed & Conversion', 'Delight visitors with sub-second page loads and zero layout shift.', 1, NOW(), NOW())
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`);

-- 10. Demo CRM Leads & Inquiries
INSERT INTO `leads` (`id`, `inquiry_id`, `name`, `email`, `phone`, `company`, `service`, `budget`, `message`, `source`, `status`, `score`, `created_at`, `updated_at`) VALUES
('lead001', 'HR-INQ-202609-1001', 'Alexander Hayes', 'alex.hayes@globalenterprises.com', '+1 415 555 0192', 'Global Enterprises Ltd', 'SEO & AI Automation', '$5,000 - $10,000', 'Looking to overhaul our organic search visibility and connect incoming leads to HubSpot CRM automatically.', 'Contact Form', 'QUALIFIED', 75, NOW(), NOW()),
('lead002', 'HR-INQ-202609-1002', 'Elena Rostova', 'elena@novatech.io', '+44 20 7946 0912', 'NovaTech Solutions', 'Custom Web Development', '$10,000+', 'We require a high-speed corporate web platform built with React and automated consultation booking.', 'Website', 'CONTACTED', 65, NOW(), NOW()),
('lead003', 'HR-INQ-202609-1003', 'Tariq Mehmood', 'tariq@vertexproperties.pk', '+92 300 1234567', 'Vertex Properties', 'Google Maps Ranking & Local SEO', '$2,500 - $5,000', 'Need local 3-pack dominance across Lahore and Islamabad branches.', 'WhatsApp', 'NEW', 60, NOW(), NOW())
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

INSERT INTO `contact_messages` (`id`, `inquiry_id`, `name`, `email`, `phone`, `company`, `service`, `budget`, `message`, `status`, `created_at`, `updated_at`) VALUES
('msg001', 'HR-INQ-202609-1001', 'Alexander Hayes', 'alex.hayes@globalenterprises.com', '+1 415 555 0192', 'Global Enterprises Ltd', 'SEO & AI Automation', '$5,000 - $10,000', 'Looking to overhaul our organic search visibility and connect incoming leads to HubSpot CRM automatically.', 'READ', NOW(), NOW()),
('msg002', 'HR-INQ-202609-1002', 'Elena Rostova', 'elena@novatech.io', '+44 20 7946 0912', 'NovaTech Solutions', 'Custom Web Development', '$10,000+', 'We require a high-speed corporate web platform built with React and automated consultation booking.', 'READ', NOW(), NOW()),
('msg003', 'HR-INQ-202609-1003', 'Tariq Mehmood', 'tariq@vertexproperties.pk', '+92 300 1234567', 'Vertex Properties', 'Google Maps Ranking & Local SEO', '$2,500 - $5,000', 'Need local 3-pack dominance across Lahore and Islamabad branches.', 'UNREAD', NOW(), NOW())
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

INSERT INTO `lead_notes` (`id`, `lead_id`, `admin_id`, `author_name`, `note`, `created_at`) VALUES
('note001', 'lead001', 'c0000000-0000-0000-0000-000000000001', 'Sameer Liaqat', 'Spoke with Alexander via zoom. Discovery session scheduled.', NOW()),
('note002', 'lead002', 'c0000000-0000-0000-0000-000000000001', 'Sameer Liaqat', 'Sent initial proposal and technical specifications.', NOW())
ON DUPLICATE KEY UPDATE `note`=VALUES(`note`);

-- 11. Newsletter Subscribers
INSERT INTO `newsletter_subscribers` (`id`, `email`, `name`, `status`, `source`, `subscribed_at`, `created_at`, `updated_at`) VALUES
('sub001', 'director@growthbrands.co', 'Growth Brands Lab', 'SUBSCRIBED', 'FOOTER', NOW(), NOW(), NOW()),
('sub002', 'marketing@techventures.com', 'Tech Ventures Group', 'SUBSCRIBED', 'FOOTER', NOW(), NOW(), NOW())
ON DUPLICATE KEY UPDATE `email`=VALUES(`email`);

SET FOREIGN_KEY_CHECKS = 1;
