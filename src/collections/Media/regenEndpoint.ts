import type { PayloadHandler } from 'payload';
import { isAdminCheck } from '@/accessControl/isAdmin';
import { User } from '@/payload-types';

export const regenerateMediaSizesHandler: PayloadHandler = async (req) => {
  const { payload, user } = req;

  // Check if user has admin access
  if (user && !isAdminCheck(user as User)) {
    return Response.json(
      { success: false, message: 'Unauthorized - Admin access required' },
      { status: 401 },
    );
  }

  try {
    console.log('Starting media sizes regeneration...');

    // Get all media items
    const mediaItems = await payload.find({
      collection: 'media',
      limit: 1000,
      depth: 0,
    });

    console.log(`Found ${mediaItems.docs.length} media items to process`);

    let processed = 0;
    let errors = 0;

    // Process each media item to trigger size regeneration
    for (const item of mediaItems.docs) {
      try {
        console.log(
          `Processing media item ${item.id} (${processed + 1}/${mediaItems.docs.length})`,
        );

        // Skip if not an image
        if (!item.mimeType?.startsWith('image/') || !item.url) {
          console.log(`Skipping non-image file or missing URL: ${item.filename}`);
          processed++;
          continue;
        }

        console.log(`Regenerating sizes for ${item.filename}`);

        // Construct full URL for fetching the file
        const serverURL =
          process.env.PAYLOAD_PUBLIC_SERVER_URL ||
          process.env.NEXT_PUBLIC_SERVER_URL ||
          'http://localhost:3000';
        const fullURL = item.url.startsWith('http') ? item.url : `${serverURL}${item.url}`;

        console.log(`Fetching file from: ${fullURL}`);

        // Fetch the file from S3/Supabase storage
        const response = await fetch(fullURL);
        if (!response.ok) {
          throw new Error(`Failed to fetch file from ${fullURL}: ${response.statusText}`);
        }
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        console.log(`Fetched file ${item.filename} (${buffer.length} bytes)`);

        // Create file object for PayloadCMS
        const file = {
          data: buffer,
          mimetype: item.mimeType,
          name: item.filename || 'unknown',
          size: item.filesize || buffer.length,
        };

        // Update the media item with the file to trigger regeneration
        await payload.update({
          collection: 'media',
          id: item.id,
          data: {
            alt: item.alt,
          },
          file,
          overwriteExistingFiles: true,
          overrideAccess: true,
        });

        processed++;
        console.log(`✓ Successfully regenerated sizes for ${item.filename}`);
      } catch (error) {
        console.error(`Failed to regenerate sizes for media ${item.id}:`, error);
        errors++;
      }
    }

    console.log(
      `Media sizes regeneration completed: ${processed} processed, ${errors} errors, ${mediaItems.docs.length} total`,
    );

    return Response.json({
      success: true,
      message: `Successfully regenerated image sizes for ${processed} media items. ${errors} errors occurred.`,
      processed,
      errors,
      total: mediaItems.docs.length,
    });
  } catch (error) {
    console.error('Error regenerating media sizes:', error);
    return Response.json(
      {
        success: false,
        message: 'Failed to regenerate media sizes',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
};
