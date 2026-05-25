import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center py-28 text-center">
      <div className="prose max-w-none dark:prose-invert">
        <h1 style={{ marginBottom: 0 }}>404</h1>
        <p className="mb-4">This page could not be found.</p>
      </div>

      <Button variant="default" asChild>
        <Link href="/">Go home</Link>
      </Button>
    </div>
  );
}
