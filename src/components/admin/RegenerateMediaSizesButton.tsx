'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@payloadcms/ui';

const RegenerateMediaSizesButton: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegenerate = async () => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      'Are you sure you want to regenerate all media sizes? This will process all media files and may take several minutes. This action cannot be undone.',
    );

    if (!confirmed) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/media/regenerate-sizes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
      });

      const result = await response.json();

      if (result.success) {
        alert(`Success: ${result.message}`);
      } else {
        alert(`Error: ${result.message || 'Failed to regenerate media sizes'}`);
      }
    } catch (error) {
      console.error('Error regenerating media sizes:', error);
      alert('Error: Failed to regenerate media sizes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Only show button to admin users
  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div>
      <Button
        onClick={handleRegenerate}
        disabled={isLoading}
        variant="secondary"
        size="sm"
        style={{ marginBottom: '0.5rem' }}
      >
        {isLoading ? 'Regenerating...' : 'Regenerate All Media Sizes'}
      </Button>
      <p style={{ fontSize: '12px', color: '#6c757d', margin: 0 }}>
        This is a tool FOR DEVELOPERS which will regenerate all image sizes for the new size
        configuration. Use this after updating image size settings in the code.
      </p>
    </div>
  );
};

export default RegenerateMediaSizesButton;
