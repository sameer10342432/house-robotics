const fs = require('fs');
const path = require('path');

const sqlPath = path.resolve(__dirname, '../database/database.sql');
let content = fs.readFileSync(sqlPath, 'utf8');

// 1. Remove all DROP TABLE IF EXISTS statements
content = content.replace(/DROP TABLE IF EXISTS\s+`[^`]+`;\r?\n?/g, '');

// 2. Convert CREATE TABLE `foo` to CREATE TABLE IF NOT EXISTS `foo`
content = content.replace(/CREATE TABLE\s+`([^`]+)`/g, 'CREATE TABLE IF NOT EXISTS `$1`');

// 3. Update contact_messages schema in CREATE TABLE
const contactOld = `CREATE TABLE IF NOT EXISTS \`contact_messages\` (
  \`id\` varchar(36) NOT NULL,
  \`inquiry_id\` varchar(100) NOT NULL,
  \`name\` varchar(150) NOT NULL,
  \`email\` varchar(191) NOT NULL,
  \`phone\` varchar(50) DEFAULT NULL,
  \`company\` varchar(150) DEFAULT NULL,
  \`service\` varchar(100) DEFAULT NULL,
  \`budget\` varchar(100) DEFAULT NULL,
  \`message\` text NOT NULL,
  \`status\` varchar(50) NOT NULL DEFAULT 'UNREAD',
  \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,`;

const contactNew = `CREATE TABLE IF NOT EXISTS \`contact_messages\` (
  \`id\` varchar(36) NOT NULL,
  \`inquiry_id\` varchar(100) NOT NULL,
  \`name\` varchar(150) NOT NULL,
  \`email\` varchar(191) NOT NULL,
  \`phone\` varchar(50) DEFAULT NULL,
  \`company\` varchar(150) DEFAULT NULL,
  \`service\` varchar(100) DEFAULT NULL,
  \`budget\` varchar(100) DEFAULT NULL,
  \`message\` text NOT NULL,
  \`page_url\` varchar(500) DEFAULT NULL,
  \`referrer\` varchar(500) DEFAULT NULL,
  \`ip_address\` varchar(64) DEFAULT NULL,
  \`user_agent\` varchar(255) DEFAULT NULL,
  \`status\` varchar(50) NOT NULL DEFAULT 'UNREAD',
  \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,`;

if (content.includes(contactOld)) {
  content = content.replace(contactOld, contactNew);
  console.log('Updated contact_messages schema');
} else {
  console.log('Warning: contactOld exact match not found');
}

// 4. Update leads schema in CREATE TABLE
const leadsOld = `CREATE TABLE IF NOT EXISTS \`leads\` (
  \`id\` varchar(36) NOT NULL,
  \`inquiry_id\` varchar(100) DEFAULT NULL,
  \`name\` varchar(150) NOT NULL,
  \`email\` varchar(191) NOT NULL,
  \`phone\` varchar(50) DEFAULT NULL,
  \`company\` varchar(150) DEFAULT NULL,
  \`service\` varchar(100) DEFAULT NULL,
  \`budget\` varchar(100) DEFAULT NULL,
  \`message\` text DEFAULT NULL,
  \`source\` varchar(100) NOT NULL DEFAULT 'Website',
  \`status\` varchar(50) NOT NULL DEFAULT 'NEW',
  \`assigned_to\` varchar(150) DEFAULT NULL,
  \`score\` int(11) NOT NULL DEFAULT 50,
  \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,`;

const leadsNew = `CREATE TABLE IF NOT EXISTS \`leads\` (
  \`id\` varchar(36) NOT NULL,
  \`inquiry_id\` varchar(100) DEFAULT NULL,
  \`name\` varchar(150) NOT NULL,
  \`email\` varchar(191) NOT NULL,
  \`phone\` varchar(50) DEFAULT NULL,
  \`company\` varchar(150) DEFAULT NULL,
  \`service\` varchar(100) DEFAULT NULL,
  \`budget\` varchar(100) DEFAULT NULL,
  \`message\` text DEFAULT NULL,
  \`page_url\` varchar(500) DEFAULT NULL,
  \`referrer\` varchar(500) DEFAULT NULL,
  \`ip_address\` varchar(64) DEFAULT NULL,
  \`user_agent\` varchar(255) DEFAULT NULL,
  \`utm_source\` varchar(100) DEFAULT NULL,
  \`utm_medium\` varchar(100) DEFAULT NULL,
  \`utm_campaign\` varchar(100) DEFAULT NULL,
  \`source\` varchar(100) NOT NULL DEFAULT 'Website',
  \`status\` varchar(50) NOT NULL DEFAULT 'NEW',
  \`assigned_to\` varchar(150) DEFAULT NULL,
  \`score\` int(11) NOT NULL DEFAULT 50,
  \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,`;

if (content.includes(leadsOld)) {
  content = content.replace(leadsOld, leadsNew);
  console.log('Updated leads schema');
} else {
  console.log('Warning: leadsOld exact match not found');
}

fs.writeFileSync(sqlPath, content, 'utf8');
console.log('Successfully wrote updated database/database.sql');
