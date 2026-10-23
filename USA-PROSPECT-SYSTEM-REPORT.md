# HOUSE ROBOTICS — USA PROSPECT MANAGEMENT & CLIENT ACQUISITION SYSTEM
**Phase 5 Production Implementation Report**  
**Live Website:** [https://houserobotics.online/](https://houserobotics.online/)  
**Deployment Archive:** `House-Robotics-USA-Outreach-Phase-5.zip`  
**Target Market:** United States of America  
**Official Notification Recipient:** `sameerliaqat81@gmail.com`  
**Official WhatsApp:** `+92 347 4542881`  

---

## 1. Executive Summary & Architecture Overview

Phase 5 introduces a comprehensive, lawful, and ethical **USA Prospect Management & Outreach Automation System** directly embedded within the existing House Robotics Admin Panel. 

Rather than deploying a disconnected third-party CRM or executing spammy unreviewed outbound campaigns, Phase 5 provides an intelligent research pipeline, service-opportunity fit assessment, editable draft generation, and seamless conversion into the core House Robotics CRM.

### Core Architectural Principles
1. **Preservation of Existing Identity:** 100% preservation of the website design, light purple-accent theme (`#6D28D9`), typography, navigation, and existing features.
2. **Dual-Runtime Compatibility:** Full feature parity across **Node.js/Express/Prisma** and **cPanel Apache/PHP 8.2+/MySQL PDO**.
3. **No Fabricated Information:** Zero synthetic prospects, fake metrics, or unverified claims. Contact details and business URLs are sourced from public official records.
4. **Human-in-the-Loop Safeguards:** All outreach communications remain editable drafts until manually reviewed and logged by an administrator. Uncontrolled bulk blasts are prohibited.

---

## 2. USA Prospect Management Module

The module is accessible under **Admin Panel → USA Prospects** (`src/admin/views/ProspectsView.tsx`).

### 2.1 Stored Prospect Intelligence
| Field Name | Type | Description |
|---|---|---|
| `businessName` | String | Verified legal or DBA business name |
| `websiteUrl` | String | Primary public corporate website |
| `normalizedDomain` | String | Protocol/www-stripped domain for indexing & duplicate prevention |
| `category` | String | Industry category (e.g. Logistics, Healthcare, HVAC, E-Commerce, Legal) |
| `city` / `state` | String | Primary physical or operational metropolitan location |
| `country` | String | Defaults to `USA` |
| `contactPageUrl` | String | Verified public contact/team page |
| `email` | String | Lawfully sourced public business email (e.g., info@, sales@, procurement@) |
| `phone` | String | Verified public business telephone |
| `sourceUrl` | String | Originating directory listing or corporate website |
| `sourceType` | Enum | `MANUAL_RESEARCH`, `PUBLIC_DIRECTORY`, `CSV_IMPORT`, `REFERRAL` |
| `potentialServiceFit` | Enum | `Web Development`, `SEO`, `AI Automation`, `E-Commerce`, `Digital Marketing` |
| `benefitReason` | Text | Observed architectural, performance, or workflow opportunity |
| `priority` | Enum | `HIGH`, `MEDIUM`, `LOW` |
| `confidence` | Enum | `VERIFIED`, `NEEDS_REVIEW`, `INFERRED` |
| `status` | Enum | Pipeline status (see Section 3) |
| `followUpDate` | Date | Scheduled follow-up date |
| `followUpStatus` | Enum | `NONE`, `PENDING`, `TODAY`, `OVERDUE`, `COMPLETED` |
| `followUpNote` | Text | Action plan for scheduled follow-up |
| `internalNotes` | Text | Private strategy notes for House Robotics team |
| `convertedLeadId` | String | Foreign key linking to active CRM Lead when converted |

---

## 3. Prospect Pipeline & Lifecycle Stages

Prospects transition through standardized, auditable pipeline stages:

```
[ NEW ] ──> [ RESEARCHED ] ──> [ QUALIFIED ] ──> [ READY FOR OUTREACH ]
                                                         │
   ┌─────────────────────────────────────────────────────┘
   ▼
[ CONTACTED ] ──> [ REPLIED ] ──> [ MEETING REQUESTED ] ──> [ PROPOSAL SENT ]
                                                                   │
                                                ┌──────────────────┴──────────────────┐
                                                ▼                                     ▼
                                             [ WON ]                               [ LOST ]
                                                │
                                    (Converts to CRM Lead)
```
- **Do Not Contact (`DO_NOT_CONTACT`):** Universal safety state. Immediately adds domain and email to suppression list and forbids further outreach drafts or actions.

---

## 4. Intelligent Sourcing, Deduplication & CSV Utilities

### 4.1 Normalized Domain Deduplication
- Domains are normalized by stripping `http://`, `https://`, `www.`, trailing slashes, paths, and query parameters.
- Both manual prospect creation (`POST /api/admin/prospects`) and bulk CSV imports (`POST /api/admin/prospects/import`) detect existing domains and reject duplicates with `409 Conflict`.
- Import duplicate handling supports:
  - `SKIP`: Discards duplicate rows and logs skipped records.
  - `FLAG`: Flags existing records as `NEEDS_REVIEW` with an import timestamp note.
  - `OVERWRITE`: Updates missing contact fields from the imported file.

### 4.2 Secure CSV Export & Formula Injection Guard
- Implemented in both Node.js (`server/routes/admin/prospects.ts`) and PHP (`api/index.php`).
- Neutralizes CSV Formula Injection (CWE-1236) by prepending a single quote (`'`) to any cell beginning with `=`, `+`, `-`, `@`, `\t`, or `\r`.
- Supports UTF-8 BOM encoding for seamless opening in Microsoft Excel, Apple Numbers, and Google Sheets.

---

## 5. Personalized Outreach Draft Engine

The draft engine dynamically generates context-aware, editable outreach communications tailored to the prospect's verified profile:

### Supported Templates
1. **Custom Web Engineering & Digital Platform** (Web Development focus)
2. **Technical Organic Visibility & Search Architecture** (SEO focus)
3. **Workflow Automation & Process Optimization** (AI Automation focus)
4. **E-Commerce Platform Performance & Conversion Experience** (E-Commerce focus)

### Mandatory Transparency & Compliance Rules
- **No Deceptive Claims:** Never claims unperformed audits or promises guaranteed Google rankings or revenue figures.
- **Accurate Identification:** Clearly identifies House Robotics as an engineering consultancy based in Lahore, Pakistan, delivering dedicated remote collaboration aligned with US business hours.
- **CAN-SPAM Compliant Opt-Out:** Every draft automatically appends explicit sender identification and opt-out language:
  ```text
  ----------------------------------------
  House Robotics | Strategic Web Engineering & AI Solutions
  Lahore, Pakistan | Serving Remote Clients Across the USA
  Official Contact: sameerliaqat81@gmail.com | +92 347 4542881
  Opt-out: If you prefer not to receive strategic engineering briefings from House Robotics,
  simply reply with "Unsubscribe" or "Do Not Contact" to be immediately removed.
  ```

---

## 6. Outreach Activity Tracking & Follow-Up Automation

### 6.1 Audit Logged Activities
Administrators can log discrete touchpoints:
- `EMAIL_DRAFTED`
- `EMAIL_SENT_MANUAL`
- `CONTACT_FORM_SUBMITTED`
- `PHONE_CALL`
- `LINKEDIN_INTERACTION`
- `REPLY_RECEIVED`
- `MEETING_BOOKED`
- `PROPOSAL_SENT`

### 6.2 Scheduled cPanel Cron Follow-Up Integration
The standalone CLI script `cron_followups.php` aggregates overdue and due-today items across both inbound leads and USA prospects, sending a single morning digest email to `sameerliaqat81@gmail.com`.

---

## 7. Direct CRM Lead Conversion

When a prospect responds or requests a consultation:
- One-click **"Convert to CRM Lead"** creates a new entry in `leads` with standardized inquiry ID `HR-INQ-YYYYMMDD-XXXX`.
- Links `prospectId` to preserve the original research context.
- Migrates timeline notes to `lead_notes`.
- Sets initial status to `QUALIFIED` with a quality score of 75.
- Prevents duplicate lead records if the prospect's email or domain is already present in `leads`.
