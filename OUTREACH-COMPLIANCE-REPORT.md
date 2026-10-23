# HOUSE ROBOTICS — OUTREACH COMPLIANCE & GOVERNANCE REPORT
**Phase 5 Lawful B2B Communication Standard**  
**Target Market:** United States of America  
**Operating Entity:** House Robotics  
**Executive Lead:** Sameer Liaqat (`sameerliaqat81@gmail.com` | `+92 347 4542881`)  

---

## 1. Compliance Philosophy & Legal Foundation

House Robotics adheres strictly to federal and state commercial communications regulations governing business-to-business (B2B) communications in the United States, primarily:
- **The CAN-SPAM Act of 2003** (15 U.S.C. §§ 7701-7713)
- **FTC Commercial Email Rules** (16 C.F.R. Part 316)
- **Applicable State Privacy Safeguards** (California CCPA/CPRA, Texas Data Privacy and Security Act)

Our client acquisition model operates exclusively as **tailored, one-to-one research and manual communication with qualified commercial business entities**. Automated mass scraping of personal consumer inboxes and high-volume unsolicited bulk blasts are strictly forbidden.

---

## 2. Seven Pillars of Outreach Compliance

| Compliance Requirement | Legal Standard | House Robotics Implementation |
|---|---|---|
| **1. Truthful Headers & Sender ID** | 15 U.S.C. § 7704(a)(1) | Sender domain and email headers must accurately identify House Robotics (`sameerliaqat81@gmail.com` / `houserobotics.online`). No proxy relays or deceptive email headers. |
| **2. Non-Deceptive Subject Lines** | 15 U.S.C. § 7704(a)(2) | Subject lines must accurately reflect the contents of the message (e.g. *"Technical Web Engineering & Digital Platform for {Company}"*). No misleading prefixes like `Re:` or `Fwd:` on initial outreach. |
| **3. Transparent Commercial Disclosure** | 15 U.S.C. § 7704(a)(5)(A)(i) | The message must clearly and conspicuously disclose that it is a business inquiry/consultation proposal. |
| **4. Valid Physical Identification** | 15 U.S.C. § 7704(a)(5)(A)(iii) | Must disclose House Robotics' legitimate business location (Lahore, Pakistan) and clarify remote collaboration capabilities with US enterprises. Never fabricates fake US offices. |
| **5. Conspicuous Opt-Out Mechanism** | 15 U.S.C. § 7704(a)(3)(A) | Every outreach draft includes clear instructions allowing the recipient to opt out by replying with *"Unsubscribe"* or *"Do Not Contact"*. |
| **6. Rapid Opt-Out Processing** | 15 U.S.C. § 7704(a)(4)(A) | Opt-out requests are honored immediately through the built-in **Suppression List** (`suppressed_contacts`), blocking future drafts and communications. |
| **7. Prohibited Automated Harvesting** | 15 U.S.C. § 7704(b)(1) | Indiscriminate address harvesting and dictionary attacks are blocked. Sourcing is restricted to official business websites and public B2B directories. |

---

## 3. Suppression List Architecture & Mechanics

The system maintains a dedicated database table (`suppressed_contacts`) with high-priority indexes:

```sql
CREATE TABLE `suppressed_contacts` (
  `id` VARCHAR(36) NOT NULL,
  `email` VARCHAR(191) NULL,
  `domain` VARCHAR(191) NULL,
  `reason` VARCHAR(100) NOT NULL,
  `source` VARCHAR(100) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_suppressed_email` (`email`),
  INDEX `idx_suppressed_domain` (`domain`)
);
```

### Automatic & Manual Suppression Triggers
1. **Status Set to `DO_NOT_CONTACT`:** When an administrator marks a prospect as `DO_NOT_CONTACT` in the Admin Panel, the prospect's email and normalized domain are automatically inserted into `suppressed_contacts`.
2. **Draft Generation Blocker:** The endpoint `POST /api/admin/prospects/:id/draft` queries `suppressed_contacts` before compiling content. If suppressed, it throws an immediate `403 Forbidden` error:
   ```json
   {
     "success": false,
     "code": "DO_NOT_CONTACT_RESTRICTION",
     "message": "Draft generation blocked. This prospect has requested no contact."
   }
   ```
3. **Outreach Activity Lock:** Administrators cannot record an `EMAIL_SENT_MANUAL` or `PHONE_CALL` activity on any prospect marked `DO_NOT_CONTACT`.
4. **Import-Time Exclusion:** The bulk CSV import runner evaluates every row against `suppressed_contacts`. Matching emails or domains are silently dropped and added to the skipped count.

---

## 4. Truth in Marketing & Engineering Representations

House Robotics enforces strict ethical boundaries across all generated drafts and staff interactions:
- **No Fabricated Prior Relationships:** Messages must never claim a previous telephone call, mutual acquaintance, or prior conversation that did not occur.
- **No Simulated Website Audits:** No claim of a "comprehensive site performance or SEO audit" may be made unless the engineer has personally inspected the prospect's website and recorded the findings in `benefit_reason`.
- **No Guaranteed Performance Outcomes:** Strictly prohibits guarantees such as *"guaranteed #1 Google ranking in 30 days"* or *"guaranteed 300% revenue increase"*. Communications focus on architectural code quality, page-speed benchmarks, and best-practice search engine indexability.
- **Accurate Service Scope:** House Robotics identifies itself accurately as an elite engineering team offering remote development and strategy consultations.

---

## 5. Audit & Compliance Governance

- **Activity Tracking:** Every outreach activity (drafting, manual sending, follow-up, status transition) is logged in `prospect_activities` with timestamps and administrator attribution.
- **Admin Action Audit:** Key administrative operations (exporting, importing, suppressing) are immutably logged in `activity_logs`.
- **Review Requirement:** Automatic bulk outbound emailing is disabled by default. All campaigns remain draft/manual-dispatch workflows until explicit administrative review.
