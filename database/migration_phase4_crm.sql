-- =====================================================================
-- HOUSE ROBOTICS — Phase 4: USA Lead Generation & CRM Automation Migration
-- MySQL / MariaDB compatible for cPanel phpMyAdmin execution
-- Non-destructive: preserves all existing tables, rows, posts, and leads
-- =====================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. Upgrade `leads` table with Phase 4 CRM columns
ALTER TABLE `leads`
  ADD COLUMN IF NOT EXISTS `website_url` varchar(255) DEFAULT NULL AFTER `company`,
  ADD COLUMN IF NOT EXISTS `timeline` varchar(100) DEFAULT NULL AFTER `budget`,
  ADD COLUMN IF NOT EXISTS `service_details` text DEFAULT NULL AFTER `message`,
  ADD COLUMN IF NOT EXISTS `follow_up_date` datetime DEFAULT NULL AFTER `score`,
  ADD COLUMN IF NOT EXISTS `follow_up_status` varchar(30) NOT NULL DEFAULT 'NONE' AFTER `follow_up_date`,
  ADD COLUMN IF NOT EXISTS `follow_up_note` text DEFAULT NULL AFTER `follow_up_status`,
  ADD COLUMN IF NOT EXISTS `consent_given` tinyint(1) NOT NULL DEFAULT 1 AFTER `follow_up_note`,
  ADD COLUMN IF NOT EXISTS `utm_content` varchar(100) DEFAULT NULL AFTER `utm_campaign`,
  ADD COLUMN IF NOT EXISTS `utm_term` varchar(100) DEFAULT NULL AFTER `utm_content`;

-- Add indexes on lead follow-up and status queries
ALTER TABLE `leads`
  ADD INDEX IF NOT EXISTS `idx_leads_followup` (`follow_up_status`, `follow_up_date`),
  ADD INDEX IF NOT EXISTS `idx_leads_service` (`service`);

-- 2. Upgrade `contact_messages` table with Phase 4 columns
ALTER TABLE `contact_messages`
  ADD COLUMN IF NOT EXISTS `website_url` varchar(255) DEFAULT NULL AFTER `company`,
  ADD COLUMN IF NOT EXISTS `timeline` varchar(100) DEFAULT NULL AFTER `budget`,
  ADD COLUMN IF NOT EXISTS `service_details` text DEFAULT NULL AFTER `message`,
  ADD COLUMN IF NOT EXISTS `consent_given` tinyint(1) NOT NULL DEFAULT 1 AFTER `service_details`;

-- 3. Create `lead_communications` table for tracking notifications & follow-up logs
CREATE TABLE IF NOT EXISTS `lead_communications` (
  `id` varchar(36) NOT NULL,
  `lead_id` varchar(36) NOT NULL,
  `type` varchar(50) NOT NULL, -- ADMIN_NOTIFICATION, AUTO_CONFIRMATION, FOLLOW_UP_REMINDER, MANUAL_DISPATCH
  `channel` varchar(50) NOT NULL DEFAULT 'EMAIL', -- EMAIL, WHATSAPP, INTERNAL
  `recipient` varchar(255) NOT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'LOGGED', -- LOGGED, SENT, FAILED, SCHEDULED
  `error_message` text DEFAULT NULL,
  `sent_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_comm_lead_id` (`lead_id`),
  KEY `idx_comm_status` (`status`),
  KEY `idx_comm_type` (`type`),
  KEY `idx_comm_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Seed CRM automation settings in `site_settings`
INSERT IGNORE INTO `site_settings` (`id`, `key`, `value`, `group`, `created_at`, `updated_at`) VALUES
('crm-setting-01', 'crm_auto_followup_enabled', '0', 'crm', NOW(), NOW()),
('crm-setting-02', 'crm_followup_delay_hours', '24', 'crm', NOW(), NOW()),
('crm-setting-03', 'crm_notification_email', 'sameerliaqat81@gmail.com', 'crm', NOW(), NOW()),
('crm-setting-04', 'crm_official_whatsapp', '+923474542881', 'crm', NOW(), NOW()),
('crm-setting-05', 'crm_auto_followup_subject', 'House Robotics — Project Brief Received [{{inquiryId}}]', 'crm', NOW(), NOW()),
('crm-setting-06', 'crm_auto_followup_template', 'Hi {{name}},\n\nThank you for reaching out to House Robotics regarding {{service}}.\n\nOur senior engineering team has received your project brief (Inquiry Reference: {{inquiryId}}). We are currently evaluating your technical requirements and business objectives.\n\nA senior team member will follow up with an initial assessment and calendar invite within 24 business hours.\n\nIf your request is urgent, feel free to message us directly on WhatsApp: +92 347 4542881.\n\nWarm regards,\nHouse Robotics Strategy & Engineering Team\nhttps://houserobotics.online/', 'crm', NOW(), NOW());

SET FOREIGN_KEY_CHECKS = 1;
