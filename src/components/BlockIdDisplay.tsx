'use client';
import React from 'react';
import { Button, useFormFields } from '@payloadcms/ui';
import { convertTitleToSlug } from '@/lib/utils';
import { copyToClipboard } from '@/lib/clipboardUtils';

type Props = {
  path: string;
};

const BlockIdDisplay: React.FC<Props> = ({ path }) => {
  // Base block path (strip UI-only field name)
  const blockPath = path.includes('.') ? path.substring(0, path.lastIndexOf('.')) : path;

  // Read all needed fields in one pass
  const { id, blockName, pageSlug } = useFormFields(([fields]) => ({
    id: fields[`${blockPath}.id`]?.value as string | undefined,
    blockName: fields[`${blockPath}.blockName`]?.value as string | undefined,
    pageSlug: fields['slug']?.value as string | undefined,
  }));

  const [isCopied, setIsCopied] = React.useState(false);

  if (!id) {
    return (
      <div className="rounded border border-dashed border-muted-foreground/20 p-2 text-xs italic text-muted-foreground">
        Save to view anchor.
      </div>
    );
  }

  const finalBlockName = blockName || id;
  const anchorLink = `/${pageSlug ?? ''}#${convertTitleToSlug(finalBlockName)}`;

  const handleCopy = () => {
    copyToClipboard(anchorLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="mb-4 flex flex-col gap-2 rounded border border-border bg-card px-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-wide">Block Anchor Link</p>

          <p className="text-xs text-foreground/70">
            Change the block title to update the anchor link
          </p>

          <code className="mt-1 truncate font-mono text-sm text-secondary">{anchorLink}</code>
        </div>

        <Button
          type="button"
          onClick={handleCopy}
          className="px-3 py-2 text-xs font-semibold transition-all"
          aria-label="Copy anchor link"
        >
          {isCopied ? 'Copied!' : 'Copy Link'}
        </Button>
      </div>
    </div>
  );
};

export default BlockIdDisplay;
