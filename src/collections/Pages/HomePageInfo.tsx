'use client';

import React from 'react';
const HomePageInfo: React.FC = () => {
  return (
    <div className="gutter--left gutter--right mb-4 rounded-lg bg-card py-4">
      <p className="text-foreground">
        <strong>Tip:</strong> Setting the slug for a page to{' '}
        <code className="rounded bg-muted px-1 py-0.5 text-muted-foreground">home</code> will make
        it the homepage of the website.
      </p>
    </div>
  );
};

export default HomePageInfo;
