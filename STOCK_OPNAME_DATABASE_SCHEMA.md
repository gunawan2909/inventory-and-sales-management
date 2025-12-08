# Stock Opname Module - Database Schema

## Overview
This document defines the database schema for the Stock Opname module, covering all 5 sub-modules:
1. Planning (11.1)
2. Counting Execution (11.2)
3. Verification & Recount (11.3)
4. Adjustment & Finalization (11.4)
5. Reporting & Analytics (11.5)

---

## 1. OPNAME PLANS (Header)

### Table: `opname_plans`
| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT | Unique identifier |
| plan_no | VARCHAR(50) UNIQUE NOT NULL | SO-[BRANCH]-[YYYYMMDD]-[SEQ] |
| opname_type | ENUM | full_count, cycle_count, spot_check, category_based, high_value, abc_analysis |
| planned_date | DATETIME NOT NULL | Scheduled date & time |
| estimated_duration | INT | Duration in minutes |
| frequency | ENUM | one_time, monthly, quarterly, annually |
| next_scheduled_date | DATE NULL | For recurring opnames |
| warehouse_id | INT NOT NULL | FK to warehouses |
| branch_code | VARCHAR(10) | Branch code for numbering |
| status | ENUM | draft, scheduled, in_progress, completed, cancelled |
| freeze_start | DATETIME NULL | When inventory was frozen |
| freeze_end | DATETIME NULL | When inventory was unfrozen |
| created_by | INT NOT NULL | FK to users |
| created_at | DATETIME DEFAULT CURRENT_TIMESTAMP |
| updated_at | DATETIME ON UPDATE CURRENT_TIMESTAMP |
| finalized_by | INT NULL | FK to users |
| finalized_at | DATETIME NULL |

---

## 2. OPNAME SCOPE

### Table: `opname_scopes`
| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT |
| plan_id | INT NOT NULL | FK to opname_plans |
| scope_type | ENUM | location, category, product, filter |
| scope_value | TEXT | JSON array of IDs or filter criteria |
| created_at | DATETIME DEFAULT CURRENT_TIMESTAMP |

**Example scope_value JSON:**
```json
{
  "location_ids": [1, 2, 3],
  "category_ids": [10, 20],
  "product_ids": [100, 200, 300],
  "filters": {
    "abc_class": ["A", "B"],
    "movement": ["fast", "slow"],
    "value_threshold": 1000000
  }
}
```

---

## 3. TEAM ASSIGNMENT

### Table: `opname_teams`
| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT |
| plan_id | INT NOT NULL | FK to opname_plans |
| team_name | VARCHAR(100) NOT NULL | Team identifier |
| team_leader_id | INT NOT NULL | FK to users |
| supervisor_id | INT NULL | FK to users |
| witness_id | INT NULL | FK to users (for compliance) |
| created_at | DATETIME DEFAULT CURRENT_TIMESTAMP |

### Table: `opname_team_members`
| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT |
| team_id | INT NOT NULL | FK to opname_teams |
| user_id | INT NOT NULL | FK to users |
| role | ENUM | counter, leader, supervisor, witness |
| contact_info | VARCHAR(200) | Phone/email |
| created_at | DATETIME DEFAULT CURRENT_TIMESTAMP |

---

## 4. COUNT SHEETS

### Table: `opname_count_sheets`
| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT |
| plan_id | INT NOT NULL | FK to opname_plans |
| sheet_no | VARCHAR(50) UNIQUE NOT NULL | Sheet number sequence |
| team_id | INT NOT NULL | FK to opname_teams |
| location_id | INT NOT NULL | FK to locations |
| zone | VARCHAR(50) NULL | Zone/area within location |
| bin | VARCHAR(50) NULL | Specific bin identifier |
| status | ENUM | not_started, in_progress, completed, verified |
| is_blind_count | BOOLEAN DEFAULT FALSE | Hide system qty from counters |
| assigned_at | DATETIME |
| started_at | DATETIME NULL |
| completed_at | DATETIME NULL |
| completed_by | INT NULL | FK to users |
| signature | TEXT NULL | Digital signature data |
| created_at | DATETIME DEFAULT CURRENT_TIMESTAMP |

### Table: `opname_count_sheet_details`
| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT |
| sheet_id | INT NOT NULL | FK to opname_count_sheets |
| product_id | INT NOT NULL | FK to products |
| system_qty | DECIMAL(15,4) NOT NULL | System quantity at freeze time |
| uom | VARCHAR(20) | Unit of measure |
| last_cost | DECIMAL(15,2) | Last cost per unit |
| line_no | INT | Line sequence |
| created_at | DATETIME DEFAULT CURRENT_TIMESTAMP |

---

## 5. COUNTING EXECUTION

### Table: `opname_counts`
| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT |
| sheet_detail_id | INT NOT NULL | FK to opname_count_sheet_details |
| counted_qty | DECIMAL(15,4) NOT NULL | Physical count quantity |
| counter_id | INT NOT NULL | FK to users |
| count_time | DATETIME NOT NULL | When counted |
| count_method | ENUM | barcode_scan, manual_entry, voice_input |
| gps_latitude | DECIMAL(10,8) NULL | GPS location |
| gps_longitude | DECIMAL(11,8) NULL |
| device_info | VARCHAR(200) NULL | Device used for counting |
| is_recount | BOOLEAN DEFAULT FALSE |
| recount_sequence | INT DEFAULT 1 | 1st, 2nd, 3rd count |
| created_at | DATETIME DEFAULT CURRENT_TIMESTAMP |

### Table: `opname_count_photos`
| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT |
| count_id | INT NOT NULL | FK to opname_counts |
| photo_path | VARCHAR(500) NOT NULL | File path or URL |
| photo_type | ENUM | counted_items, damaged, unusual, empty_location, packed_items |
| gps_latitude | DECIMAL(10,8) NULL |
| gps_longitude | DECIMAL(11,8) NULL |
| taken_at | DATETIME NOT NULL |
| file_size | INT | Bytes |
| created_at | DATETIME DEFAULT CURRENT_TIMESTAMP |

### Table: `opname_count_remarks`
| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT |
| count_id | INT NOT NULL | FK to opname_counts |
| remark_type | ENUM | damaged, expired, slow_moving, mislocation, identification_issue, other |
| remark_text | TEXT NOT NULL |
| created_at | DATETIME DEFAULT CURRENT_TIMESTAMP |

### Table: `opname_quality_checks`
| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT |
| count_id | INT NOT NULL | FK to opname_counts |
| expiry_date | DATE NULL | For FEFO items |
| condition | ENUM | good, damaged, expired, questionable |
| batch_no | VARCHAR(50) NULL |
| serial_no | VARCHAR(50) NULL |
| created_at | DATETIME DEFAULT CURRENT_TIMESTAMP |

---

## 6. GPS TRACKING

### Table: `opname_gps_tracking`
| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT |
| counter_id | INT NOT NULL | FK to users |
| plan_id | INT NOT NULL | FK to opname_plans |
| latitude | DECIMAL(10,8) NOT NULL |
| longitude | DECIMAL(11,8) NOT NULL |
| accuracy | DECIMAL(6,2) | Meters |
| timestamp | DATETIME NOT NULL |
| activity | VARCHAR(100) NULL | Current activity |
| created_at | DATETIME DEFAULT CURRENT_TIMESTAMP |

---

## 7. VARIANCE ANALYSIS

### Table: `opname_variances`
| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT |
| plan_id | INT NOT NULL | FK to opname_plans |
| product_id | INT NOT NULL | FK to products |
| location_id | INT NOT NULL | FK to locations |
| system_qty | DECIMAL(15,4) NOT NULL |
| counted_qty | DECIMAL(15,4) NOT NULL |
| variance_qty | DECIMAL(15,4) NOT NULL | counted - system |
| variance_pct | DECIMAL(8,2) NOT NULL | (variance/system) * 100 |
| unit_cost | DECIMAL(15,2) NOT NULL |
| variance_value | DECIMAL(15,2) NOT NULL | variance_qty * cost |
| variance_category | ENUM | zero, small, medium, large, critical |
| requires_recount | BOOLEAN DEFAULT FALSE |
| recount_requested | BOOLEAN DEFAULT FALSE |
| recount_completed | BOOLEAN DEFAULT FALSE |
| final_qty | DECIMAL(15,4) NULL | After recount/investigation |
| status | ENUM | pending, under_investigation, approved, adjusted |
| created_at | DATETIME DEFAULT CURRENT_TIMESTAMP |
| updated_at | DATETIME ON UPDATE CURRENT_TIMESTAMP |

---

## 8. RECOUNT

### Table: `opname_recounts`
| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT |
| variance_id | INT NOT NULL | FK to opname_variances |
| recount_sequence | INT NOT NULL | 2nd, 3rd count |
| requested_by | INT NOT NULL | FK to users |
| requested_at | DATETIME NOT NULL |
| reason | TEXT NOT NULL |
| assigned_to_team | INT NOT NULL | FK to opname_teams |
| assigned_to_counter | INT NULL | FK to users (different from original) |
| recount_qty | DECIMAL(15,4) NULL |
| recounted_by | INT NULL | FK to users |
| recounted_at | DATETIME NULL |
| status | ENUM | pending, in_progress, completed |
| created_at | DATETIME DEFAULT CURRENT_TIMESTAMP |

---

## 9. INVESTIGATION

### Table: `opname_investigations`
| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT |
| variance_id | INT NOT NULL | FK to opname_variances |
| investigation_no | VARCHAR(50) UNIQUE |
| root_cause | ENUM | transaction_not_recorded, theft_shrinkage, counting_error, system_error, mislocation, other |
| findings | TEXT NOT NULL |
| evidence_paths | TEXT NULL | JSON array of file paths |
| assigned_to | INT NOT NULL | FK to users |
| assigned_at | DATETIME NOT NULL |
| resolved_by | INT NULL | FK to users |
| resolved_at | DATETIME NULL |
| resolution | TEXT NULL |
| status | ENUM | open, in_progress, resolved, closed |
| created_at | DATETIME DEFAULT CURRENT_TIMESTAMP |
| updated_at | DATETIME ON UPDATE CURRENT_TIMESTAMP |

---

## 10. APPROVAL WORKFLOW

### Table: `opname_approvals`
| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT |
| variance_id | INT NOT NULL | FK to opname_variances |
| approval_level | ENUM | supervisor, manager, director, management_meeting |
| required_variance_pct | DECIMAL(8,2) | Threshold that triggered this level |
| required_variance_value | DECIMAL(15,2) |
| approver_id | INT NOT NULL | FK to users |
| decision | ENUM | approved, rejected, request_investigation, request_recount |
| decision_date | DATETIME NULL |
| remarks | TEXT NULL |
| status | ENUM | pending, approved, rejected |
| created_at | DATETIME DEFAULT CURRENT_TIMESTAMP |
| updated_at | DATETIME ON UPDATE CURRENT_TIMESTAMP |

---

## 11. DISPUTE RESOLUTION

### Table: `opname_disputes`
| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT |
| variance_id | INT NOT NULL | FK to opname_variances |
| dispute_no | VARCHAR(50) UNIQUE |
| raised_by | INT NOT NULL | FK to users |
| raised_at | DATETIME NOT NULL |
| dispute_reason | TEXT NOT NULL |
| evidence_paths | TEXT NULL | JSON array |
| resolution | TEXT NULL |
| resolved_by | INT NULL | FK to users |
| resolved_at | DATETIME NULL |
| final_decision | TEXT NULL |
| status | ENUM | open, under_review, resolved |
| created_at | DATETIME DEFAULT CURRENT_TIMESTAMP |
| updated_at | DATETIME ON UPDATE CURRENT_TIMESTAMP |

---

## 12. ADJUSTMENTS

### Table: `opname_adjustments`
| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT |
| plan_id | INT NOT NULL | FK to opname_plans |
| adjustment_no | VARCHAR(50) UNIQUE NOT NULL | ADJ-[YYYY]-[SEQ] |
| adjustment_date | DATE NOT NULL |
| total_increase_value | DECIMAL(15,2) DEFAULT 0 |
| total_decrease_value | DECIMAL(15,2) DEFAULT 0 |
| net_impact | DECIMAL(15,2) | increase - decrease |
| affected_products_count | INT DEFAULT 0 |
| status | ENUM | draft, pending_approval, approved, posted |
| approved_by | INT NULL | FK to users |
| approved_at | DATETIME NULL |
| posted_by | INT NULL | FK to users |
| posted_at | DATETIME NULL |
| created_by | INT NOT NULL | FK to users |
| created_at | DATETIME DEFAULT CURRENT_TIMESTAMP |
| updated_at | DATETIME ON UPDATE CURRENT_TIMESTAMP |

### Table: `opname_adjustment_details`
| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT |
| adjustment_id | INT NOT NULL | FK to opname_adjustments |
| product_id | INT NOT NULL | FK to products |
| location_id | INT NOT NULL | FK to locations |
| system_qty | DECIMAL(15,4) NOT NULL |
| counted_qty | DECIMAL(15,4) NOT NULL |
| adjustment_qty | DECIMAL(15,4) NOT NULL | variance |
| reason_code | ENUM | shrinkage, damage, expiry, theft, counting_error, system_error, mislocation, other |
| unit_cost | DECIMAL(15,2) NOT NULL |
| adjustment_value | DECIMAL(15,2) NOT NULL | qty * cost |
| gl_account | VARCHAR(50) NULL | GL account for posting |
| created_at | DATETIME DEFAULT CURRENT_TIMESTAMP |

---

## 13. JOURNAL ENTRIES

### Table: `opname_journal_entries`
| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT |
| adjustment_id | INT NOT NULL | FK to opname_adjustments |
| entry_no | VARCHAR(50) UNIQUE NOT NULL | JE-[YYYY]-[SEQ] |
| entry_date | DATE NOT NULL |
| description | TEXT |
| total_debit | DECIMAL(15,2) NOT NULL |
| total_credit | DECIMAL(15,2) NOT NULL |
| status | ENUM | draft, posted |
| posted_by | INT NULL | FK to users |
| posted_at | DATETIME NULL |
| created_at | DATETIME DEFAULT CURRENT_TIMESTAMP |

### Table: `opname_journal_entry_lines`
| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT |
| entry_id | INT NOT NULL | FK to opname_journal_entries |
| line_no | INT NOT NULL |
| account_code | VARCHAR(50) NOT NULL | GL account code |
| account_name | VARCHAR(200) NOT NULL |
| debit_amount | DECIMAL(15,2) DEFAULT 0 |
| credit_amount | DECIMAL(15,2) DEFAULT 0 |
| description | TEXT |
| cost_center | VARCHAR(50) NULL |
| department | VARCHAR(50) NULL |
| created_at | DATETIME DEFAULT CURRENT_TIMESTAMP |

---

## 14. FREEZE LOGS

### Table: `opname_freeze_logs`
| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT |
| plan_id | INT NOT NULL | FK to opname_plans |
| warehouse_id | INT NOT NULL | FK to warehouses |
| freeze_type | ENUM | full_freeze, partial_freeze |
| freeze_scope | TEXT | JSON: modules/transaction types frozen |
| freeze_start | DATETIME NOT NULL |
| freeze_end | DATETIME NULL |
| frozen_by | INT NOT NULL | FK to users |
| unfrozen_by | INT NULL | FK to users |
| reason | TEXT |
| exception_approvals | TEXT NULL | JSON: approved exceptions |
| created_at | DATETIME DEFAULT CURRENT_TIMESTAMP |

---

## 15. CORRECTIVE ACTIONS

### Table: `opname_corrective_actions`
| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT |
| plan_id | INT NOT NULL | FK to opname_plans |
| action_no | VARCHAR(50) UNIQUE |
| action_type | ENUM | process_improvement, training, system_fix, layout_change, policy_update, investigation |
| priority | ENUM | low, medium, high, critical |
| description | TEXT NOT NULL |
| root_cause | TEXT NULL |
| assigned_to | INT NOT NULL | FK to users |
| due_date | DATE NOT NULL |
| status | ENUM | open, in_progress, completed, cancelled |
| completion_notes | TEXT NULL |
| completed_by | INT NULL | FK to users |
| completed_at | DATETIME NULL |
| verification_required | BOOLEAN DEFAULT FALSE |
| verified_by | INT NULL | FK to users |
| verified_at | DATETIME NULL |
| created_by | INT NOT NULL | FK to users |
| created_at | DATETIME DEFAULT CURRENT_TIMESTAMP |
| updated_at | DATETIME ON UPDATE CURRENT_TIMESTAMP |

---

## 16. PROGRESS TRACKING

### Table: `opname_progress_tracking`
| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT |
| sheet_id | INT NOT NULL | FK to opname_count_sheets |
| items_counted | INT DEFAULT 0 |
| total_items | INT NOT NULL |
| progress_pct | DECIMAL(5,2) DEFAULT 0 | (counted/total) * 100 |
| estimated_time_remaining | INT NULL | Minutes |
| last_activity | DATETIME NULL |
| updated_at | DATETIME ON UPDATE CURRENT_TIMESTAMP |

---

## 17. NOTIFICATIONS

### Table: `opname_notifications`
| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT |
| plan_id | INT NOT NULL | FK to opname_plans |
| notification_type | ENUM | schedule_reminder, freeze_warning, team_assignment, variance_alert, approval_required, completion |
| recipient_id | INT NOT NULL | FK to users |
| recipient_email | VARCHAR(200) |
| recipient_phone | VARCHAR(20) NULL | For SMS |
| subject | VARCHAR(500) |
| message | TEXT NOT NULL |
| delivery_method | ENUM | email, sms, push, in_app |
| scheduled_at | DATETIME NOT NULL |
| sent_at | DATETIME NULL |
| status | ENUM | pending, sent, failed |
| error_message | TEXT NULL |
| created_at | DATETIME DEFAULT CURRENT_TIMESTAMP |

---

## Supporting Tables (Reference)

These tables should already exist in the system:

### `warehouses`
- id, code, name, branch, address, etc.

### `locations`
- id, warehouse_id, zone, rack, bin, etc.

### `products`
- id, sku, name, category_id, uom, cost, etc.

### `product_categories`
- id, code, name, parent_id, etc.

### `users`
- id, username, full_name, email, phone, role, etc.

### `stock_balance`
- product_id, location_id, qty, last_updated, etc.

### `stock_movements`
- id, product_id, location_id, movement_type, qty, balance_after, reference_type, reference_no, etc.

---

## Indexes for Performance

```sql
-- Opname Plans
CREATE INDEX idx_opname_plans_status ON opname_plans(status);
CREATE INDEX idx_opname_plans_planned_date ON opname_plans(planned_date);
CREATE INDEX idx_opname_plans_warehouse ON opname_plans(warehouse_id);

-- Count Sheets
CREATE INDEX idx_count_sheets_plan ON opname_count_sheets(plan_id);
CREATE INDEX idx_count_sheets_team ON opname_count_sheets(team_id);
CREATE INDEX idx_count_sheets_status ON opname_count_sheets(status);

-- Counts
CREATE INDEX idx_counts_sheet_detail ON opname_counts(sheet_detail_id);
CREATE INDEX idx_counts_counter ON opname_counts(counter_id);
CREATE INDEX idx_counts_time ON opname_counts(count_time);

-- Variances
CREATE INDEX idx_variances_plan ON opname_variances(plan_id);
CREATE INDEX idx_variances_product ON opname_variances(product_id);
CREATE INDEX idx_variances_status ON opname_variances(status);
CREATE INDEX idx_variances_category ON opname_variances(variance_category);

-- Adjustments
CREATE INDEX idx_adjustments_plan ON opname_adjustments(plan_id);
CREATE INDEX idx_adjustments_status ON opname_adjustments(status);
CREATE INDEX idx_adjustment_details_adj ON opname_adjustment_details(adjustment_id);
CREATE INDEX idx_adjustment_details_product ON opname_adjustment_details(product_id);

-- GPS Tracking
CREATE INDEX idx_gps_counter ON opname_gps_tracking(counter_id);
CREATE INDEX idx_gps_timestamp ON opname_gps_tracking(timestamp);
```

---

## Data Relationships

```
opname_plans (1) -----> (N) opname_scopes
opname_plans (1) -----> (N) opname_teams
opname_plans (1) -----> (N) opname_count_sheets
opname_plans (1) -----> (N) opname_variances
opname_plans (1) -----> (N) opname_adjustments

opname_count_sheets (1) -----> (N) opname_count_sheet_details
opname_count_sheet_details (1) -----> (N) opname_counts

opname_counts (1) -----> (N) opname_count_photos
opname_counts (1) -----> (N) opname_count_remarks
opname_counts (1) -----> (1) opname_quality_checks

opname_variances (1) -----> (N) opname_recounts
opname_variances (1) -----> (N) opname_investigations
opname_variances (1) -----> (N) opname_approvals
opname_variances (1) -----> (N) opname_disputes

opname_adjustments (1) -----> (N) opname_adjustment_details
opname_adjustments (1) -----> (1) opname_journal_entries
opname_journal_entries (1) -----> (N) opname_journal_entry_lines
```

---

## Business Rules

1. **Plan Numbering**: SO-[BRANCH]-[YYYYMMDD]-[SEQ]
   - BRANCH: 3-letter branch code
   - YYYYMMDD: Planned date
   - SEQ: 3-digit sequence

2. **Variance Categories**:
   - Zero: 0% variance
   - Small: < 5%
   - Medium: 5-10%
   - Large: 10-20%
   - Critical: > 20%

3. **Approval Matrix**:
   - Small (<5%): Supervisor
   - Medium (5-10%): Manager
   - Large (10-20%): Director
   - Critical (>20%) or high value: Management meeting

4. **Recount Rules**:
   - Auto-trigger: variance > 10% OR high-value with any variance OR zero count
   - Different counter required
   - Maximum 3 counts

5. **Freeze Period**:
   - Maximum 24 hours (warning if exceed)
   - Block: Sales orders, Purchase receipts, Transfers, Adjustments
   - Allow: View only
   - Exception: Director approval override

6. **Photo Requirements**:
   - Mandatory for: Zero count, Large variance (>20%), Damaged/expired items
   - Optional for: Normal counts
   - Maximum 5 photos per item
   - Auto-compress before upload

7. **GPS Tracking**:
   - Record location when: Starting count sheet, Counting each item, Completing sheet
   - Accuracy threshold: < 50 meters

8. **Status Transitions**:
   ```
   Plans: draft → scheduled → in_progress → completed
   Count Sheets: not_started → in_progress → completed → verified
   Variances: pending → under_investigation → approved → adjusted
   Adjustments: draft → pending_approval → approved → posted
   ```

---

## API Endpoints Structure (for future backend)

### Planning
- POST /api/opname/plans - Create plan
- GET /api/opname/plans - List plans
- GET /api/opname/plans/:id - Get plan details
- PUT /api/opname/plans/:id - Update plan
- POST /api/opname/plans/:id/generate-sheets - Generate count sheets
- POST /api/opname/plans/:id/freeze - Freeze inventory
- POST /api/opname/plans/:id/unfreeze - Unfreeze inventory

### Counting
- GET /api/opname/count-sheets - List assigned sheets
- GET /api/opname/count-sheets/:id - Get sheet details
- POST /api/opname/count-sheets/:id/start - Start counting
- POST /api/opname/count-sheets/:id/count - Record count
- POST /api/opname/count-sheets/:id/complete - Complete sheet
- POST /api/opname/counts/:id/photos - Upload photo
- POST /api/opname/gps-tracking - Log GPS location

### Verification
- GET /api/opname/variances - List variances
- GET /api/opname/variances/:id - Get variance details
- POST /api/opname/variances/:id/request-recount - Request recount
- POST /api/opname/variances/:id/investigate - Start investigation
- POST /api/opname/variances/:id/approve - Approve variance

### Adjustment
- POST /api/opname/adjustments - Generate adjustments
- GET /api/opname/adjustments/:id - Get adjustment details
- POST /api/opname/adjustments/:id/approve - Approve adjustment
- POST /api/opname/adjustments/:id/post - Post adjustment
- POST /api/opname/plans/:id/finalize - Finalize opname

### Reporting
- GET /api/opname/reports/summary/:id - Summary report
- GET /api/opname/reports/accuracy/:id - Accuracy report
- GET /api/opname/reports/team-performance/:id - Team performance
- GET /api/opname/reports/financial-impact/:id - Financial impact
- GET /api/opname/reports/trends - Historical trends

---

## Mock Data Structures (for frontend development)

See the React components for TypeScript interfaces and mock data examples.

---

## Version History

- v1.0 (2025-12-08): Initial schema design
