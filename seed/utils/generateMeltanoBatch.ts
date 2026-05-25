/**
 * Generates ingestion-tests/fixtures/batch-200.json — 200 deterministic
 * Meltano sync records for the connection-pool stress test.
 *
 * Run: npm run gen:meltano-batch
 *
 * ~30% of records include a referrer email address (exercises the partner-user
 * advisory-lock path). ~10% have two referrer emails (tests multi-value splitting).
 * All IDs are deterministic so re-running produces the same fixture file and the
 * test's afterAll DELETE cleanup always targets the correct records.
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const BATCH_SIZE = 200;
const FIXED_TIMESTAMP = '2024-01-01T12:00:00Z';

const OUTPUT_DIR = join(dirname(fileURLToPath(import.meta.url)), '../../ingestion-tests/fixtures');
const OUTPUT_FILE = join(OUTPUT_DIR, 'batch-200.json');

const records = Array.from({ length: BATCH_SIZE }, (_, idx) => {
  const i = idx + 1;
  const id = String(i).padStart(4, '0');
  const hasReferrer = i % 3 === 0; // ~33% have referrer
  const hasMultiReferrer = i % 10 === 0; // ~10% have two referrers

  return {
    salesforce_contact_id: `STRESS_CONTACT_${id}`,
    salesforce_case_id: `STRESS_CASE_${id}`,
    email: `stress.user.${id}@example-stress-test.invalid`,
    first_name: 'Stress',
    last_name: `User ${id}`,
    case_number: `RR-STRESS-${id}`,
    created_at: FIXED_TIMESTAMP,
    client_portal_status: 'Active',
    last_updated_at: FIXED_TIMESTAMP,
    status: 'Screening',
    ...(hasReferrer && {
      referrer_email_addresses: hasMultiReferrer
        ? `stress.partner.${id}a@example-stress-test.invalid,stress.partner.${id}b@example-stress-test.invalid`
        : `stress.partner.${id}@example-stress-test.invalid`,
    }),
  };
});

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_FILE, JSON.stringify({ records }, null, 2));
console.log(`Generated ${records.length} records → ${OUTPUT_FILE}`);
