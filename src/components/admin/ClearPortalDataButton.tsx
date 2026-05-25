'use client';

import React, { type ChangeEvent, useState } from 'react';
import { Modal, TextInput, useModal } from '@payloadcms/ui';
import { Button } from '@/components/ui/Button';

const MODAL_SLUG = 'clear-portal-data-confirm';
const CONFIRM_PHRASE = 'DELETE ALL';

export default function ClearPortalDataButton() {
  const { openModal, closeModal } = useModal();
  const [confirmText, setConfirmText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleOpen = () => {
    setConfirmText('');
    setResult(null);
    openModal(MODAL_SLUG);
  };

  const handleClose = () => {
    setConfirmText('');
    setResult(null);
    closeModal(MODAL_SLUG);
  };

  const handleConfirm = async () => {
    if (confirmText !== CONFIRM_PHRASE) return;

    setIsLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/admin/clear-portal-data', {
        method: 'POST',
        credentials: 'include',
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const { partnerUsers, portalUsers, cases } = data.deleted;
        setResult(
          `Cleared: ${partnerUsers} partner user(s), ${portalUsers} portal user(s), ${cases} case(s).`,
        );
        setTimeout(() => {
          handleClose();
          window.location.reload();
        }, 1500);
      } else {
        setResult(`Error: ${data.error ?? 'Unknown error'}`);
      }
    } catch {
      setResult('Error: Request failed. Check the console.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button variant="destructive" size="sm" onClick={handleOpen}>
        Clear Portal Data (Resync)
      </Button>

      <Modal slug={MODAL_SLUG} className="confirmation-modal">
        <div className="confirmation-modal__wrapper">
          <div className="confirmation-modal__content">
            <h2>Clear All Portal Data</h2>
            <p>
              This will permanently delete all <strong>cases</strong>, <strong>portal users</strong>
              , and <strong>partner users</strong>. Access logs and sign-in requests will be
              preserved. This cannot be undone.
            </p>
            <p>
              Type <strong>{CONFIRM_PHRASE}</strong> to confirm
            </p>
            <TextInput
              path="confirmText"
              value={confirmText}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmText(e.target.value)}
              placeholder={CONFIRM_PHRASE}
              readOnly={isLoading}
              htmlAttributes={{ autoComplete: 'off' }}
            />
            {result && <p>{result}</p>}
          </div>
          <div className="confirmation-modal__controls">
            <Button variant="ghost" onClick={handleClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirm}
              disabled={confirmText !== CONFIRM_PHRASE || isLoading}
            >
              {isLoading ? 'Clearing…' : 'Clear All Portal Data'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
