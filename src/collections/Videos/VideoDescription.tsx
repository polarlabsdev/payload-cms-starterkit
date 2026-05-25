'use client';

import React from 'react';
import type { ViewDescriptionClientProps } from 'payload';

const MAX_FILE_SIZE_MEGABYTES = parseInt(
  process.env.NEXT_PUBLIC_VIDEO_MAX_FILE_SIZE_MB || '15',
  10,
);

export const VideoDescription: React.FC<ViewDescriptionClientProps> = () => {
  return (
    <div className="text-sm">
      Video files stored in Supabase S3 storage.
      <span className="ms-2 inline-flex items-center gap-1 rounded-full bg-red-500 px-3 py-1 text-xs font-medium text-white ring-1 ring-red-300">
        ⚠️ Max {MAX_FILE_SIZE_MEGABYTES} MB
      </span>
    </div>
  );
};
