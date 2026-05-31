'use client';

import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/Alert';
import { RiAlertFill } from '@remixicon/react';

export const MediaFileNamingNoticeUI: React.FC = () => {
  return (
    <Alert variant="outlined" color="warning">
      <RiAlertFill size={20} />
      <AlertTitle>File Naming Tip</AlertTitle>
      <AlertDescription>
        Please make sure file names are simple and clean. Use only letters, numbers, dashes, or
        underscores.
        <br />
        Avoid spaces and special characters in file names to prevent upload issues.
      </AlertDescription>
    </Alert>
  );
};
