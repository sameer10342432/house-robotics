-- ========================================================================
-- HOUSE ROBOTICS — PHASE 5: USA CLIENT ACQUISITION & OUTREACH SYSTEM MIGRATION
-- Database: MySQL 5.7+ / 8.0+ or MariaDB 10.3+
-- Zero Record Loss: Non-destructive ALTER and CREATE TABLE operations
-- Target: muhamma1_houserobotics
-- ========================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. Table: prospects
CREATE TABLE IF NOT EXISTS `prospects` (
  `id` VARCHAR(36) NOT NULL,
  `business_name` VARCHAR(191) NOT NULL,
  `website_url` VARCHAR(255) NOT NULL,
  `normalized_domain` VARCHAR(191) NOT NULL,
  `category` VARCHAR(100) NULL,
  `city` VARCHAR(100) NULL,
  `state` VARCHAR(50) NULL,
  `country` VARCHAR(50) NOT NULL DEFAULT 'USA',
  `contact_page_url` VARCHAR(255) NULL,
  `email` VARCHAR(191) NULL,
  `phone` VARCHAR(50) NULL,
  `source_url` VARCHAR(255) NULL,
  `source_type` VARCHAR(50) NOT NULL DEFAULT 'MANUAL_RESEARCH',
  `research_date` DATETIME NULL,
  `potential_service_fit` VARCHAR(100) NOT NULL DEFAULT 'Web Development',
  `benefit_reason` TEXT NULL,
  `priority` VARCHAR(20) NOT NULL DEFAULT 'MEDIUM',
  `confidence` VARCHAR(20) NOT NULL DEFAULT 'INFERRED',
  `status` VARCHAR(30) NOT NULL DEFAULT 'NEW',
  `follow_up_date` DATETIME NULL,
  `follow_up_status` VARCHAR(20) NOT NULL DEFAULT 'NONE',
  `follow_up_note` TEXT NULL,
  `internal_notes` TEXT NULL,
  `converted_lead_id` VARCHAR(36) NULL,
  `converted_at` DATETIME NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_prospects_domain` (`normalized_domain`),
  INDEX `idx_prospects_status` (`status`),
  INDEX `idx_prospects_priority` (`priority`),
  INDEX `idx_prospects_service` (`potential_service_fit`),
  INDEX `idx_prospects_city_state` (`city`, `state`),
  INDEX `idx_prospects_follow_up` (`follow_up_date`),
  INDEX `idx_prospects_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Table: prospect_notes
CREATE TABLE IF NOT EXISTS `prospect_notes` (
  `id` VARCHAR(36) NOT NULL,
  `prospect_id` VARCHAR(36) NOT NULL,
  `admin_id` VARCHAR(36) NULL,
  `author_name` VARCHAR(100) NOT NULL DEFAULT 'Admin',
  `note` TEXT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_prospect_notes_prospect` (`prospect_id`),
  CONSTRAINT `fk_prospect_notes_prospect` FOREIGN KEY (`prospect_id`) REFERENCES `prospects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Table: prospect_activities
CREATE TABLE IF NOT EXISTS `prospect_activities` (
  `id` VARCHAR(36) NOT NULL,
  `prospect_id` VARCHAR(36) NOT NULL,
  `admin_id` VARCHAR(36) NULL,
  `author_name` VARCHAR(100) NOT NULL DEFAULT 'Admin',
  `activity_type` VARCHAR(50) NOT NULL,
  `channel` VARCHAR(50) NULL,
  `subject` VARCHAR(255) NULL,
  `content` TEXT NULL,
  `outcome` VARCHAR(50) NULL,
  `next_follow_up` DATETIME NULL,
  `performed_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_prospect_act_prospect` (`prospect_id`),
  INDEX `idx_prospect_act_type` (`activity_type`),
  INDEX `idx_prospect_act_created` (`created_at`),
  CONSTRAINT `fk_prospect_activities_prospect` FOREIGN KEY (`prospect_id`) REFERENCES `prospects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Table: prospect_campaigns
CREATE TABLE IF NOT EXISTS `prospect_campaigns` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `goal` VARCHAR(255) NULL,
  `service` VARCHAR(100) NULL,
  `city` VARCHAR(100) NULL,
  `state` VARCHAR(50) NULL,
  `category` VARCHAR(100) NULL,
  `target_audience` TEXT NULL,
  `message_template` TEXT NULL,
  `status` VARCHAR(30) NOT NULL DEFAULT 'DRAFT',
  `start_date` DATETIME NULL,
  `end_date` DATETIME NULL,
  `notes` TEXT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_prospect_camp_status` (`status`),
  INDEX `idx_prospect_camp_service` (`service`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Table: prospect_campaign_members
CREATE TABLE IF NOT EXISTS `prospect_campaign_members` (
  `id` VARCHAR(36) NOT NULL,
  `campaign_id` VARCHAR(36) NOT NULL,
  `prospect_id` VARCHAR(36) NOT NULL,
  `status` VARCHAR(30) NOT NULL DEFAULT 'PLANNED',
  `assigned_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_camp_prospect` (`campaign_id`, `prospect_id`),
  INDEX `idx_camp_member_camp` (`campaign_id`),
  INDEX `idx_camp_member_prospect` (`prospect_id`),
  CONSTRAINT `fk_camp_member_camp` FOREIGN KEY (`campaign_id`) REFERENCES `prospect_campaigns` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_camp_member_prospect` FOREIGN KEY (`prospect_id`) REFERENCES `prospects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Table: suppressed_contacts
CREATE TABLE IF NOT EXISTS `suppressed_contacts` (
  `id` VARCHAR(36) NOT NULL,
  `email` VARCHAR(191) NULL,
  `domain` VARCHAR(191) NULL,
  `reason` VARCHAR(100) NOT NULL,
  `source` VARCHAR(100) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_suppressed_email` (`email`),
  INDEX `idx_suppressed_domain` (`domain`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Add prospect_id foreign link to existing leads table if not already present
DELIMITER //
CREATE PROCEDURE AddProspectIdToLeads()
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.COLUMNS 
    WHERE TABLE_SCHEMA = DATABASE() 
      AND TABLE_NAME = 'leads' 
      AND COLUMN_NAME = 'prospect_id'
  ) THEN
    ALTER TABLE `leads` ADD COLUMN `prospect_id` VARCHAR(36) NULL AFTER `consent_given`;
    ALTER TABLE `leads` ADD INDEX `idx_leads_prospect_id` (`prospect_id`);
  END IF;
END //
DELIMITER ;
CALL AddProspectIdToLeads();
DROP PROCEDURE AddProspectIdToLeads();

-- 8. Initialize default settings for Outreach and CAN-SPAM Compliance
INSERT INTO `site_settings` (`id`, `key`, `value`, `group`, `created_at`, `updated_at`)
VALUES 
  (UUID(), 'outreach_sender_name', 'House Robotics Strategy Team', 'outreach', NOW(), NOW()),
  (UUID(), 'outreach_official_email', 'sameerliaqat81@gmail.com', 'outreach', NOW(), NOW()),
  (UUID(), 'outreach_whatsapp', '+92 347 4542881', 'outreach', NOW(), NOW()),
  (UUID(), 'outreach_collaboration_mode', 'Remote USA Engineering & Dedicated Strategy Consultations', 'outreach', NOW(), NOW()),
  (UUID(), 'outreach_optout_footer', 'If you prefer not to receive strategic engineering briefings from House Robotics, please reply with "Unsubscribe" or "Do Not Contact" and your address will be immediately suppressed.', 'outreach', NOW(), NOW())
ON DUPLICATE KEY UPDATE `updated_at` = NOW();

SET FOREIGN_KEY_CHECKS = 1;
