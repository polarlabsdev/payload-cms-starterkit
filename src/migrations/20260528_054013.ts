import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'fr', 'es', 'ru', 'ar');
  CREATE TYPE "public"."enum_users_roles" AS ENUM('website-reader', 'website-editor', 'website-admin', 'superadmin');
  CREATE TYPE "public"."enum_users_role" AS ENUM('reader', 'contributor', 'editor', 'admin');
  CREATE TYPE "public"."enum_pages_blocks_hero_buttons_link_link_type" AS ENUM('manual', 'relation');
  CREATE TYPE "public"."enum_pages_blocks_hero_buttons_link_button_type" AS ENUM('default', 'secondary', 'destructive', 'outline', 'ghost', 'link', 'brand');
  CREATE TYPE "public"."enum_pages_blocks_hero_buttons_link_button_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_pages_blocks_hero_buttons_link_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_pages_blocks_hero_hero_type" AS ENUM('fullscreen', 'half', 'minimal');
  CREATE TYPE "public"."enum_pages_blocks_hero_media_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum_pages_blocks_hero_text_orientation" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_story_cards_stories_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_pages_blocks_story_cards_stories_text_background" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_pages_blocks_story_cards_background_color" AS ENUM('Background', 'Foreground', 'Card', 'Card Foreground', 'Primary', 'Primary Foreground', 'Secondary', 'Secondary Foreground', 'Muted', 'Muted Foreground', 'Accent', 'Accent Foreground', 'Destructive', 'Destructive Foreground', 'Success', 'Success Foreground', 'Warning', 'Warning Foreground', 'Border');
  CREATE TYPE "public"."enum_pages_blocks_story_cards_variant" AS ENUM('featured-cards', 'story-previews');
  CREATE TYPE "public"."enum_pages_blocks_story_cards_bottom_button_link_type" AS ENUM('manual', 'relation');
  CREATE TYPE "public"."enum_pages_blocks_story_cards_bottom_button_button_type" AS ENUM('default', 'secondary', 'destructive', 'outline', 'ghost', 'link', 'brand');
  CREATE TYPE "public"."enum_pages_blocks_story_cards_bottom_button_button_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_pages_blocks_story_cards_bottom_button_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_pages_blocks_icon_row_items_icon_background_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_pages_blocks_icon_row_items_icon_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_pages_blocks_icon_row_items_icon_color_dark" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_pages_blocks_icon_row_items_icon_color_with_background" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_pages_blocks_icon_row_items_button_link_type" AS ENUM('manual', 'relation');
  CREATE TYPE "public"."enum_pages_blocks_icon_row_items_button_button_type" AS ENUM('default', 'secondary', 'destructive', 'outline', 'ghost', 'link', 'brand');
  CREATE TYPE "public"."enum_pages_blocks_icon_row_items_button_button_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_pages_blocks_icon_row_items_button_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_pages_blocks_icon_row_background_color" AS ENUM('Background', 'Foreground', 'Card', 'Card Foreground', 'Primary', 'Primary Foreground', 'Secondary', 'Secondary Foreground', 'Muted', 'Muted Foreground', 'Accent', 'Accent Foreground', 'Destructive', 'Destructive Foreground', 'Success', 'Success Foreground', 'Warning', 'Warning Foreground', 'Border');
  CREATE TYPE "public"."enum_pages_blocks_standard_content_buttons_link_link_type" AS ENUM('manual', 'relation');
  CREATE TYPE "public"."enum_pages_blocks_standard_content_buttons_link_button_type" AS ENUM('default', 'secondary', 'destructive', 'outline', 'ghost', 'link', 'brand');
  CREATE TYPE "public"."enum_pages_blocks_standard_content_buttons_link_button_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_pages_blocks_standard_content_buttons_link_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_pages_blocks_standard_content_header_highlight_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_pages_blocks_standard_content_header_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_pages_blocks_standard_content_header_level" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_pages_blocks_standard_content_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_standard_content_theme_mode" AS ENUM('inherit', 'light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_standard_content_background_overlay" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_pages_blocks_standard_content_background_color" AS ENUM('Background', 'Foreground', 'Card', 'Card Foreground', 'Primary', 'Primary Foreground', 'Secondary', 'Secondary Foreground', 'Muted', 'Muted Foreground', 'Accent', 'Accent Foreground', 'Destructive', 'Destructive Foreground', 'Success', 'Success Foreground', 'Warning', 'Warning Foreground', 'Border');
  CREATE TYPE "public"."enum_pages_blocks_wide_image_header_highlight_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_pages_blocks_wide_image_header_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_pages_blocks_wide_image_header_level" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_pages_blocks_wide_image_background_color" AS ENUM('Background', 'Foreground', 'Card', 'Card Foreground', 'Primary', 'Primary Foreground', 'Secondary', 'Secondary Foreground', 'Muted', 'Muted Foreground', 'Accent', 'Accent Foreground', 'Destructive', 'Destructive Foreground', 'Success', 'Success Foreground', 'Warning', 'Warning Foreground', 'Border');
  CREATE TYPE "public"."enum_pages_blocks_image_grid_items_link_link_type" AS ENUM('manual', 'relation');
  CREATE TYPE "public"."imageGridItems_button_type" AS ENUM('default', 'secondary', 'destructive', 'outline', 'ghost', 'link', 'brand');
  CREATE TYPE "public"."imageGridItems_btn_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."imageGridItems_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_pages_blocks_image_grid_background_color" AS ENUM('Background', 'Foreground', 'Card', 'Card Foreground', 'Primary', 'Primary Foreground', 'Secondary', 'Secondary Foreground', 'Muted', 'Muted Foreground', 'Accent', 'Accent Foreground', 'Destructive', 'Destructive Foreground', 'Success', 'Success Foreground', 'Warning', 'Warning Foreground', 'Border');
  CREATE TYPE "public"."enum_pages_blocks_image_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_simple_rich_text_background_color" AS ENUM('Background', 'Foreground', 'Card', 'Card Foreground', 'Primary', 'Primary Foreground', 'Secondary', 'Secondary Foreground', 'Muted', 'Muted Foreground', 'Accent', 'Accent Foreground', 'Destructive', 'Destructive Foreground', 'Success', 'Success Foreground', 'Warning', 'Warning Foreground', 'Border');
  CREATE TYPE "public"."enum_pages_blocks_youtube_embed_background_color" AS ENUM('Background', 'Foreground', 'Card', 'Card Foreground', 'Primary', 'Primary Foreground', 'Secondary', 'Secondary Foreground', 'Muted', 'Muted Foreground', 'Accent', 'Accent Foreground', 'Destructive', 'Destructive Foreground', 'Success', 'Success Foreground', 'Warning', 'Warning Foreground', 'Border');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_buttons_link_link_type" AS ENUM('manual', 'relation');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_buttons_link_button_type" AS ENUM('default', 'secondary', 'destructive', 'outline', 'ghost', 'link', 'brand');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_buttons_link_button_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_buttons_link_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_hero_type" AS ENUM('fullscreen', 'half', 'minimal');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_media_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_text_orientation" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_story_cards_stories_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__pages_v_blocks_story_cards_stories_text_background" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__pages_v_blocks_story_cards_background_color" AS ENUM('Background', 'Foreground', 'Card', 'Card Foreground', 'Primary', 'Primary Foreground', 'Secondary', 'Secondary Foreground', 'Muted', 'Muted Foreground', 'Accent', 'Accent Foreground', 'Destructive', 'Destructive Foreground', 'Success', 'Success Foreground', 'Warning', 'Warning Foreground', 'Border');
  CREATE TYPE "public"."enum__pages_v_blocks_story_cards_variant" AS ENUM('featured-cards', 'story-previews');
  CREATE TYPE "public"."enum__pages_v_blocks_story_cards_bottom_button_link_type" AS ENUM('manual', 'relation');
  CREATE TYPE "public"."enum__pages_v_blocks_story_cards_bottom_button_button_type" AS ENUM('default', 'secondary', 'destructive', 'outline', 'ghost', 'link', 'brand');
  CREATE TYPE "public"."enum__pages_v_blocks_story_cards_bottom_button_button_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__pages_v_blocks_story_cards_bottom_button_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__pages_v_blocks_icon_row_items_icon_background_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__pages_v_blocks_icon_row_items_icon_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__pages_v_blocks_icon_row_items_icon_color_dark" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__pages_v_blocks_icon_row_items_icon_color_with_background" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__pages_v_blocks_icon_row_items_button_link_type" AS ENUM('manual', 'relation');
  CREATE TYPE "public"."enum__pages_v_blocks_icon_row_items_button_button_type" AS ENUM('default', 'secondary', 'destructive', 'outline', 'ghost', 'link', 'brand');
  CREATE TYPE "public"."enum__pages_v_blocks_icon_row_items_button_button_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__pages_v_blocks_icon_row_items_button_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__pages_v_blocks_icon_row_background_color" AS ENUM('Background', 'Foreground', 'Card', 'Card Foreground', 'Primary', 'Primary Foreground', 'Secondary', 'Secondary Foreground', 'Muted', 'Muted Foreground', 'Accent', 'Accent Foreground', 'Destructive', 'Destructive Foreground', 'Success', 'Success Foreground', 'Warning', 'Warning Foreground', 'Border');
  CREATE TYPE "public"."enum__pages_v_blocks_standard_content_buttons_link_link_type" AS ENUM('manual', 'relation');
  CREATE TYPE "public"."enum__pages_v_blocks_standard_content_buttons_link_button_type" AS ENUM('default', 'secondary', 'destructive', 'outline', 'ghost', 'link', 'brand');
  CREATE TYPE "public"."enum__pages_v_blocks_standard_content_buttons_link_button_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__pages_v_blocks_standard_content_buttons_link_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__pages_v_blocks_standard_content_header_highlight_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__pages_v_blocks_standard_content_header_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__pages_v_blocks_standard_content_header_level" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum__pages_v_blocks_standard_content_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_standard_content_theme_mode" AS ENUM('inherit', 'light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_standard_content_background_overlay" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__pages_v_blocks_standard_content_background_color" AS ENUM('Background', 'Foreground', 'Card', 'Card Foreground', 'Primary', 'Primary Foreground', 'Secondary', 'Secondary Foreground', 'Muted', 'Muted Foreground', 'Accent', 'Accent Foreground', 'Destructive', 'Destructive Foreground', 'Success', 'Success Foreground', 'Warning', 'Warning Foreground', 'Border');
  CREATE TYPE "public"."enum__pages_v_blocks_wide_image_header_highlight_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__pages_v_blocks_wide_image_header_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__pages_v_blocks_wide_image_header_level" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum__pages_v_blocks_wide_image_background_color" AS ENUM('Background', 'Foreground', 'Card', 'Card Foreground', 'Primary', 'Primary Foreground', 'Secondary', 'Secondary Foreground', 'Muted', 'Muted Foreground', 'Accent', 'Accent Foreground', 'Destructive', 'Destructive Foreground', 'Success', 'Success Foreground', 'Warning', 'Warning Foreground', 'Border');
  CREATE TYPE "public"."enum__pages_v_blocks_image_grid_items_link_link_type" AS ENUM('manual', 'relation');
  CREATE TYPE "public"."enum__pages_v_blocks_image_grid_background_color" AS ENUM('Background', 'Foreground', 'Card', 'Card Foreground', 'Primary', 'Primary Foreground', 'Secondary', 'Secondary Foreground', 'Muted', 'Muted Foreground', 'Accent', 'Accent Foreground', 'Destructive', 'Destructive Foreground', 'Success', 'Success Foreground', 'Warning', 'Warning Foreground', 'Border');
  CREATE TYPE "public"."enum__pages_v_blocks_image_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_simple_rich_text_background_color" AS ENUM('Background', 'Foreground', 'Card', 'Card Foreground', 'Primary', 'Primary Foreground', 'Secondary', 'Secondary Foreground', 'Muted', 'Muted Foreground', 'Accent', 'Accent Foreground', 'Destructive', 'Destructive Foreground', 'Success', 'Success Foreground', 'Warning', 'Warning Foreground', 'Border');
  CREATE TYPE "public"."enum__pages_v_blocks_youtube_embed_background_color" AS ENUM('Background', 'Foreground', 'Card', 'Card Foreground', 'Primary', 'Primary Foreground', 'Secondary', 'Secondary Foreground', 'Muted', 'Muted Foreground', 'Accent', 'Accent Foreground', 'Destructive', 'Destructive Foreground', 'Success', 'Success Foreground', 'Warning', 'Warning Foreground', 'Border');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'fr', 'es', 'ru', 'ar');
  CREATE TYPE "public"."enum_stories_blocks_story_cards_stories_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_stories_blocks_story_cards_stories_text_background" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_stories_blocks_story_cards_background_color" AS ENUM('Background', 'Foreground', 'Card', 'Card Foreground', 'Primary', 'Primary Foreground', 'Secondary', 'Secondary Foreground', 'Muted', 'Muted Foreground', 'Accent', 'Accent Foreground', 'Destructive', 'Destructive Foreground', 'Success', 'Success Foreground', 'Warning', 'Warning Foreground', 'Border');
  CREATE TYPE "public"."enum_stories_blocks_story_cards_variant" AS ENUM('featured-cards', 'story-previews');
  CREATE TYPE "public"."enum_stories_blocks_story_cards_bottom_button_link_type" AS ENUM('manual', 'relation');
  CREATE TYPE "public"."enum_stories_blocks_story_cards_bottom_button_button_type" AS ENUM('default', 'secondary', 'destructive', 'outline', 'ghost', 'link', 'brand');
  CREATE TYPE "public"."enum_stories_blocks_story_cards_bottom_button_button_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_stories_blocks_story_cards_bottom_button_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_stories_blocks_image_grid_items_link_link_type" AS ENUM('manual', 'relation');
  CREATE TYPE "public"."enum_stories_blocks_image_grid_background_color" AS ENUM('Background', 'Foreground', 'Card', 'Card Foreground', 'Primary', 'Primary Foreground', 'Secondary', 'Secondary Foreground', 'Muted', 'Muted Foreground', 'Accent', 'Accent Foreground', 'Destructive', 'Destructive Foreground', 'Success', 'Success Foreground', 'Warning', 'Warning Foreground', 'Border');
  CREATE TYPE "public"."enum_stories_blocks_image_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_stories_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__stories_v_blocks_story_cards_stories_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__stories_v_blocks_story_cards_stories_text_background" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__stories_v_blocks_story_cards_background_color" AS ENUM('Background', 'Foreground', 'Card', 'Card Foreground', 'Primary', 'Primary Foreground', 'Secondary', 'Secondary Foreground', 'Muted', 'Muted Foreground', 'Accent', 'Accent Foreground', 'Destructive', 'Destructive Foreground', 'Success', 'Success Foreground', 'Warning', 'Warning Foreground', 'Border');
  CREATE TYPE "public"."enum__stories_v_blocks_story_cards_variant" AS ENUM('featured-cards', 'story-previews');
  CREATE TYPE "public"."enum__stories_v_blocks_story_cards_bottom_button_link_type" AS ENUM('manual', 'relation');
  CREATE TYPE "public"."enum__stories_v_blocks_story_cards_bottom_button_button_type" AS ENUM('default', 'secondary', 'destructive', 'outline', 'ghost', 'link', 'brand');
  CREATE TYPE "public"."enum__stories_v_blocks_story_cards_bottom_button_button_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__stories_v_blocks_story_cards_bottom_button_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__stories_v_blocks_image_grid_items_link_link_type" AS ENUM('manual', 'relation');
  CREATE TYPE "public"."enum__stories_v_blocks_image_grid_background_color" AS ENUM('Background', 'Foreground', 'Card', 'Card Foreground', 'Primary', 'Primary Foreground', 'Secondary', 'Secondary Foreground', 'Muted', 'Muted Foreground', 'Accent', 'Accent Foreground', 'Destructive', 'Destructive Foreground', 'Success', 'Success Foreground', 'Warning', 'Warning Foreground', 'Border');
  CREATE TYPE "public"."enum__stories_v_blocks_image_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__stories_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__stories_v_published_locale" AS ENUM('en', 'fr', 'es', 'ru', 'ar');
  CREATE TYPE "public"."enum_story_categories_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_story_categories_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_exports_format" AS ENUM('csv', 'json');
  CREATE TYPE "public"."enum_exports_sort_order" AS ENUM('asc', 'desc');
  CREATE TYPE "public"."enum_exports_locale" AS ENUM('all', 'en', 'fr', 'es', 'ru', 'ar');
  CREATE TYPE "public"."enum_exports_drafts" AS ENUM('yes', 'no');
  CREATE TYPE "public"."enum_imports_import_mode" AS ENUM('create', 'update', 'upsert');
  CREATE TYPE "public"."enum_imports_status" AS ENUM('pending', 'completed', 'partial', 'failed');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'createCollectionExport', 'createCollectionImport', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'createCollectionExport', 'createCollectionImport', 'schedulePublish');
  CREATE TYPE "public"."enum_dd_links_link_link_type" AS ENUM('manual', 'relation');
  CREATE TYPE "public"."enum_dd_links_link_button_type" AS ENUM('default', 'secondary', 'destructive', 'outline', 'ghost', 'link', 'brand');
  CREATE TYPE "public"."enum_dd_links_link_button_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_dd_links_link_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_nav_items_type" AS ENUM('link', 'dropdown');
  CREATE TYPE "public"."enum_nav_items_link_config_link_type" AS ENUM('manual', 'relation');
  CREATE TYPE "public"."enum_nav_items_link_config_button_type" AS ENUM('default', 'secondary', 'destructive', 'outline', 'ghost', 'link', 'brand');
  CREATE TYPE "public"."enum_nav_items_link_config_button_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_nav_items_link_config_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_nav_items_dropdown_label_link_link_type" AS ENUM('manual', 'relation');
  CREATE TYPE "public"."enum_nav_items_dropdown_label_link_button_type" AS ENUM('default', 'secondary', 'destructive', 'outline', 'ghost', 'link', 'brand');
  CREATE TYPE "public"."enum_nav_items_dropdown_label_link_button_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_nav_items_dropdown_label_link_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_nav_buttons_link_link_type" AS ENUM('manual', 'relation');
  CREATE TYPE "public"."enum_nav_buttons_link_button_type" AS ENUM('default', 'secondary', 'destructive', 'outline', 'ghost', 'link', 'brand');
  CREATE TYPE "public"."enum_nav_buttons_link_button_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_nav_buttons_link_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_header_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__dd_links_v_link_link_type" AS ENUM('manual', 'relation');
  CREATE TYPE "public"."enum__dd_links_v_link_button_type" AS ENUM('default', 'secondary', 'destructive', 'outline', 'ghost', 'link', 'brand');
  CREATE TYPE "public"."enum__dd_links_v_link_button_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__dd_links_v_link_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__nav_items_v_type" AS ENUM('link', 'dropdown');
  CREATE TYPE "public"."enum__nav_items_v_link_config_link_type" AS ENUM('manual', 'relation');
  CREATE TYPE "public"."enum__nav_items_v_link_config_button_type" AS ENUM('default', 'secondary', 'destructive', 'outline', 'ghost', 'link', 'brand');
  CREATE TYPE "public"."enum__nav_items_v_link_config_button_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__nav_items_v_link_config_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__nav_items_v_dropdown_label_link_link_type" AS ENUM('manual', 'relation');
  CREATE TYPE "public"."enum__nav_items_v_dropdown_label_link_button_type" AS ENUM('default', 'secondary', 'destructive', 'outline', 'ghost', 'link', 'brand');
  CREATE TYPE "public"."enum__nav_items_v_dropdown_label_link_button_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__nav_items_v_dropdown_label_link_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__nav_buttons_v_link_link_type" AS ENUM('manual', 'relation');
  CREATE TYPE "public"."enum__nav_buttons_v_link_button_type" AS ENUM('default', 'secondary', 'destructive', 'outline', 'ghost', 'link', 'brand');
  CREATE TYPE "public"."enum__nav_buttons_v_link_button_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__nav_buttons_v_link_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__header_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__header_v_published_locale" AS ENUM('en', 'fr', 'es', 'ru', 'ar');
  CREATE TYPE "public"."enum_footer_social_links_link_link_type" AS ENUM('manual', 'relation');
  CREATE TYPE "public"."enum_footer_social_links_link_button_type" AS ENUM('default', 'secondary', 'destructive', 'outline', 'ghost', 'link', 'brand');
  CREATE TYPE "public"."enum_footer_social_links_link_button_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_footer_social_links_link_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_footer_nav_buttons_link_link_type" AS ENUM('manual', 'relation');
  CREATE TYPE "public"."enum_footer_nav_buttons_link_button_type" AS ENUM('default', 'secondary', 'destructive', 'outline', 'ghost', 'link', 'brand');
  CREATE TYPE "public"."enum_footer_nav_buttons_link_button_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_footer_nav_buttons_link_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_footer_nav_groups_nav_items_link_link_type" AS ENUM('manual', 'relation');
  CREATE TYPE "public"."enum_footer_nav_groups_nav_items_link_button_type" AS ENUM('default', 'secondary', 'destructive', 'outline', 'ghost', 'link', 'brand');
  CREATE TYPE "public"."enum_footer_nav_groups_nav_items_link_button_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_footer_nav_groups_nav_items_link_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_footer_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__footer_v_version_social_links_link_link_type" AS ENUM('manual', 'relation');
  CREATE TYPE "public"."enum__footer_v_version_social_links_link_button_type" AS ENUM('default', 'secondary', 'destructive', 'outline', 'ghost', 'link', 'brand');
  CREATE TYPE "public"."enum__footer_v_version_social_links_link_button_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__footer_v_version_social_links_link_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__footer_v_version_nav_buttons_link_link_type" AS ENUM('manual', 'relation');
  CREATE TYPE "public"."enum__footer_v_version_nav_buttons_link_button_type" AS ENUM('default', 'secondary', 'destructive', 'outline', 'ghost', 'link', 'brand');
  CREATE TYPE "public"."enum__footer_v_version_nav_buttons_link_button_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__footer_v_version_nav_buttons_link_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__footer_v_version_nav_groups_nav_items_link_link_type" AS ENUM('manual', 'relation');
  CREATE TYPE "public"."enum__footer_v_version_nav_groups_nav_items_link_button_type" AS ENUM('default', 'secondary', 'destructive', 'outline', 'ghost', 'link', 'brand');
  CREATE TYPE "public"."enum__footer_v_version_nav_groups_nav_items_link_button_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__footer_v_version_nav_groups_nav_items_link_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__footer_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__footer_v_published_locale" AS ENUM('en', 'fr', 'es', 'ru', 'ar');
  CREATE TYPE "public"."enum_announcement_bar_link_link_type" AS ENUM('manual', 'relation');
  CREATE TYPE "public"."enum_announcement_bar_link_button_type" AS ENUM('default', 'secondary', 'destructive', 'outline', 'ghost', 'link', 'brand');
  CREATE TYPE "public"."enum_announcement_bar_link_button_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_announcement_bar_link_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_announcement_bar_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_announcement_bar_background_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_stories_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__stories_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__stories_page_v_published_locale" AS ENUM('en', 'fr', 'es', 'ru', 'ar');
  CREATE TABLE "users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_xs_url" varchar,
  	"sizes_xs_width" numeric,
  	"sizes_xs_height" numeric,
  	"sizes_xs_mime_type" varchar,
  	"sizes_xs_filesize" numeric,
  	"sizes_xs_filename" varchar,
  	"sizes_sm_url" varchar,
  	"sizes_sm_width" numeric,
  	"sizes_sm_height" numeric,
  	"sizes_sm_mime_type" varchar,
  	"sizes_sm_filesize" numeric,
  	"sizes_sm_filename" varchar,
  	"sizes_md_url" varchar,
  	"sizes_md_width" numeric,
  	"sizes_md_height" numeric,
  	"sizes_md_mime_type" varchar,
  	"sizes_md_filesize" numeric,
  	"sizes_md_filename" varchar,
  	"sizes_lg_url" varchar,
  	"sizes_lg_width" numeric,
  	"sizes_lg_height" numeric,
  	"sizes_lg_mime_type" varchar,
  	"sizes_lg_filesize" numeric,
  	"sizes_lg_filename" varchar,
  	"sizes_xl_url" varchar,
  	"sizes_xl_width" numeric,
  	"sizes_xl_height" numeric,
  	"sizes_xl_mime_type" varchar,
  	"sizes_xl_filesize" numeric,
  	"sizes_xl_filename" varchar,
  	"sizes_xs_square_url" varchar,
  	"sizes_xs_square_width" numeric,
  	"sizes_xs_square_height" numeric,
  	"sizes_xs_square_mime_type" varchar,
  	"sizes_xs_square_filesize" numeric,
  	"sizes_xs_square_filename" varchar,
  	"sizes_sm_square_url" varchar,
  	"sizes_sm_square_width" numeric,
  	"sizes_sm_square_height" numeric,
  	"sizes_sm_square_mime_type" varchar,
  	"sizes_sm_square_filesize" numeric,
  	"sizes_sm_square_filename" varchar,
  	"sizes_md_square_url" varchar,
  	"sizes_md_square_width" numeric,
  	"sizes_md_square_height" numeric,
  	"sizes_md_square_mime_type" varchar,
  	"sizes_md_square_filesize" numeric,
  	"sizes_md_square_filename" varchar,
  	"sizes_lg_square_url" varchar,
  	"sizes_lg_square_width" numeric,
  	"sizes_lg_square_height" numeric,
  	"sizes_lg_square_mime_type" varchar,
  	"sizes_lg_square_filesize" numeric,
  	"sizes_lg_square_filename" varchar,
  	"sizes_xl_square_url" varchar,
  	"sizes_xl_square_width" numeric,
  	"sizes_xl_square_height" numeric,
  	"sizes_xl_square_mime_type" varchar,
  	"sizes_xl_square_filesize" numeric,
  	"sizes_xl_square_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_link_type" "enum_pages_blocks_hero_buttons_link_link_type" DEFAULT 'manual',
  	"link_url" varchar,
  	"link_button_type" "enum_pages_blocks_hero_buttons_link_button_type" DEFAULT 'default',
  	"link_button_color" "enum_pages_blocks_hero_buttons_link_button_color" DEFAULT 'Teal',
  	"link_text_color" "enum_pages_blocks_hero_buttons_link_text_color" DEFAULT 'White',
  	"link_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_hero_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hero_type" "enum_pages_blocks_hero_hero_type",
  	"media_type" "enum_pages_blocks_hero_media_type" DEFAULT 'image',
  	"text_orientation" "enum_pages_blocks_hero_text_orientation" DEFAULT 'left',
  	"banner_image_id" integer,
  	"banner_video_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_locales" (
  	"title" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_story_cards_stories" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"story_id" integer,
  	"color" "enum_pages_blocks_story_cards_stories_color" DEFAULT 'Teal',
  	"text_background" "enum_pages_blocks_story_cards_stories_text_background" DEFAULT 'Teal'
  );
  
  CREATE TABLE "pages_blocks_story_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_pages_blocks_story_cards_background_color" DEFAULT 'Background',
  	"variant" "enum_pages_blocks_story_cards_variant" DEFAULT 'featured-cards',
  	"show_title" boolean DEFAULT true,
  	"show_button" boolean DEFAULT true,
  	"bottom_button_link_type" "enum_pages_blocks_story_cards_bottom_button_link_type" DEFAULT 'manual',
  	"bottom_button_url" varchar,
  	"bottom_button_button_type" "enum_pages_blocks_story_cards_bottom_button_button_type" DEFAULT 'default',
  	"bottom_button_button_color" "enum_pages_blocks_story_cards_bottom_button_button_color" DEFAULT 'Teal',
  	"bottom_button_text_color" "enum_pages_blocks_story_cards_bottom_button_text_color" DEFAULT 'White',
  	"bottom_button_new_tab" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_story_cards_locales" (
  	"title" varchar,
  	"bottom_button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_icon_row_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_name" varchar,
  	"icon_background_color" "enum_pages_blocks_icon_row_items_icon_background_color",
  	"icon_color" "enum_pages_blocks_icon_row_items_icon_color" DEFAULT 'Black',
  	"icon_color_dark" "enum_pages_blocks_icon_row_items_icon_color_dark",
  	"icon_color_with_background" "enum_pages_blocks_icon_row_items_icon_color_with_background" DEFAULT 'White',
  	"has_button" boolean DEFAULT true,
  	"button_link_type" "enum_pages_blocks_icon_row_items_button_link_type" DEFAULT 'manual',
  	"button_url" varchar,
  	"button_button_type" "enum_pages_blocks_icon_row_items_button_button_type" DEFAULT 'default',
  	"button_button_color" "enum_pages_blocks_icon_row_items_button_button_color" DEFAULT 'Teal',
  	"button_text_color" "enum_pages_blocks_icon_row_items_button_text_color" DEFAULT 'White',
  	"button_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_icon_row_items_locales" (
  	"title" varchar,
  	"description" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_icon_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_pages_blocks_icon_row_background_color" DEFAULT 'Background',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_icon_row_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_standard_content_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_link_type" "enum_pages_blocks_standard_content_buttons_link_link_type" DEFAULT 'manual',
  	"link_url" varchar,
  	"link_button_type" "enum_pages_blocks_standard_content_buttons_link_button_type" DEFAULT 'default',
  	"link_button_color" "enum_pages_blocks_standard_content_buttons_link_button_color" DEFAULT 'Teal',
  	"link_text_color" "enum_pages_blocks_standard_content_buttons_link_text_color" DEFAULT 'White',
  	"link_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_standard_content_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_standard_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"header_highlight_color" "enum_pages_blocks_standard_content_header_highlight_color" DEFAULT 'Purple',
  	"header_text_color" "enum_pages_blocks_standard_content_header_text_color" DEFAULT 'White',
  	"header_level" "enum_pages_blocks_standard_content_header_level" DEFAULT '2',
  	"image_id" integer,
  	"image_position" "enum_pages_blocks_standard_content_image_position" DEFAULT 'right',
  	"theme_mode" "enum_pages_blocks_standard_content_theme_mode" DEFAULT 'inherit',
  	"background_image_id" integer,
  	"background_overlay" "enum_pages_blocks_standard_content_background_overlay" DEFAULT 'Purple',
  	"background_color" "enum_pages_blocks_standard_content_background_color" DEFAULT 'Background',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_standard_content_locales" (
  	"header_text" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_wide_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"header_highlight_color" "enum_pages_blocks_wide_image_header_highlight_color" DEFAULT 'Purple',
  	"header_text_color" "enum_pages_blocks_wide_image_header_text_color" DEFAULT 'White',
  	"header_level" "enum_pages_blocks_wide_image_header_level" DEFAULT '2',
  	"background_color" "enum_pages_blocks_wide_image_background_color" DEFAULT 'Background',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_wide_image_locales" (
  	"header_text" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_image_grid_category" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"show_link" boolean DEFAULT false,
  	"assigned_categories" jsonb,
  	"link_link_type" "enum_pages_blocks_image_grid_items_link_link_type" DEFAULT 'manual',
  	"link_url" varchar,
  	"link_button_type" "imageGridItems_button_type" DEFAULT 'default',
  	"link_button_color" "imageGridItems_btn_color" DEFAULT 'Teal',
  	"link_text_color" "imageGridItems_text_color" DEFAULT 'White',
  	"link_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_image_grid_items_locales" (
  	"header" varchar,
  	"subheader" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_pages_blocks_image_grid_background_color" DEFAULT 'Background',
  	"show_title" boolean DEFAULT false,
  	"columns" "enum_pages_blocks_image_grid_columns" DEFAULT '3',
  	"show_all" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_grid_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_simple_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_pages_blocks_simple_rich_text_background_color" DEFAULT 'Background',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_simple_rich_text_locales" (
  	"title" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_youtube_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_pages_blocks_youtube_embed_background_color" DEFAULT 'Background',
  	"video_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_youtube_embed_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"published_at" timestamp(3) with time zone,
  	"pull_behind_nav" boolean DEFAULT false,
  	"meta_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"stories_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_link_type" "enum__pages_v_blocks_hero_buttons_link_link_type" DEFAULT 'manual',
  	"link_url" varchar,
  	"link_button_type" "enum__pages_v_blocks_hero_buttons_link_button_type" DEFAULT 'default',
  	"link_button_color" "enum__pages_v_blocks_hero_buttons_link_button_color" DEFAULT 'Teal',
  	"link_text_color" "enum__pages_v_blocks_hero_buttons_link_text_color" DEFAULT 'White',
  	"link_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_type" "enum__pages_v_blocks_hero_hero_type",
  	"media_type" "enum__pages_v_blocks_hero_media_type" DEFAULT 'image',
  	"text_orientation" "enum__pages_v_blocks_hero_text_orientation" DEFAULT 'left',
  	"banner_image_id" integer,
  	"banner_video_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_locales" (
  	"title" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_story_cards_stories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"story_id" integer,
  	"color" "enum__pages_v_blocks_story_cards_stories_color" DEFAULT 'Teal',
  	"text_background" "enum__pages_v_blocks_story_cards_stories_text_background" DEFAULT 'Teal',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_story_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__pages_v_blocks_story_cards_background_color" DEFAULT 'Background',
  	"variant" "enum__pages_v_blocks_story_cards_variant" DEFAULT 'featured-cards',
  	"show_title" boolean DEFAULT true,
  	"show_button" boolean DEFAULT true,
  	"bottom_button_link_type" "enum__pages_v_blocks_story_cards_bottom_button_link_type" DEFAULT 'manual',
  	"bottom_button_url" varchar,
  	"bottom_button_button_type" "enum__pages_v_blocks_story_cards_bottom_button_button_type" DEFAULT 'default',
  	"bottom_button_button_color" "enum__pages_v_blocks_story_cards_bottom_button_button_color" DEFAULT 'Teal',
  	"bottom_button_text_color" "enum__pages_v_blocks_story_cards_bottom_button_text_color" DEFAULT 'White',
  	"bottom_button_new_tab" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_story_cards_locales" (
  	"title" varchar,
  	"bottom_button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_icon_row_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_name" varchar,
  	"icon_background_color" "enum__pages_v_blocks_icon_row_items_icon_background_color",
  	"icon_color" "enum__pages_v_blocks_icon_row_items_icon_color" DEFAULT 'Black',
  	"icon_color_dark" "enum__pages_v_blocks_icon_row_items_icon_color_dark",
  	"icon_color_with_background" "enum__pages_v_blocks_icon_row_items_icon_color_with_background" DEFAULT 'White',
  	"has_button" boolean DEFAULT true,
  	"button_link_type" "enum__pages_v_blocks_icon_row_items_button_link_type" DEFAULT 'manual',
  	"button_url" varchar,
  	"button_button_type" "enum__pages_v_blocks_icon_row_items_button_button_type" DEFAULT 'default',
  	"button_button_color" "enum__pages_v_blocks_icon_row_items_button_button_color" DEFAULT 'Teal',
  	"button_text_color" "enum__pages_v_blocks_icon_row_items_button_text_color" DEFAULT 'White',
  	"button_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_icon_row_items_locales" (
  	"title" varchar,
  	"description" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_icon_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__pages_v_blocks_icon_row_background_color" DEFAULT 'Background',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_icon_row_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_standard_content_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_link_type" "enum__pages_v_blocks_standard_content_buttons_link_link_type" DEFAULT 'manual',
  	"link_url" varchar,
  	"link_button_type" "enum__pages_v_blocks_standard_content_buttons_link_button_type" DEFAULT 'default',
  	"link_button_color" "enum__pages_v_blocks_standard_content_buttons_link_button_color" DEFAULT 'Teal',
  	"link_text_color" "enum__pages_v_blocks_standard_content_buttons_link_text_color" DEFAULT 'White',
  	"link_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_standard_content_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_standard_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_highlight_color" "enum__pages_v_blocks_standard_content_header_highlight_color" DEFAULT 'Purple',
  	"header_text_color" "enum__pages_v_blocks_standard_content_header_text_color" DEFAULT 'White',
  	"header_level" "enum__pages_v_blocks_standard_content_header_level" DEFAULT '2',
  	"image_id" integer,
  	"image_position" "enum__pages_v_blocks_standard_content_image_position" DEFAULT 'right',
  	"theme_mode" "enum__pages_v_blocks_standard_content_theme_mode" DEFAULT 'inherit',
  	"background_image_id" integer,
  	"background_overlay" "enum__pages_v_blocks_standard_content_background_overlay" DEFAULT 'Purple',
  	"background_color" "enum__pages_v_blocks_standard_content_background_color" DEFAULT 'Background',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_standard_content_locales" (
  	"header_text" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_wide_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"header_highlight_color" "enum__pages_v_blocks_wide_image_header_highlight_color" DEFAULT 'Purple',
  	"header_text_color" "enum__pages_v_blocks_wide_image_header_text_color" DEFAULT 'White',
  	"header_level" "enum__pages_v_blocks_wide_image_header_level" DEFAULT '2',
  	"background_color" "enum__pages_v_blocks_wide_image_background_color" DEFAULT 'Background',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_wide_image_locales" (
  	"header_text" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_image_grid_category" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"show_link" boolean DEFAULT false,
  	"assigned_categories" jsonb,
  	"link_link_type" "enum__pages_v_blocks_image_grid_items_link_link_type" DEFAULT 'manual',
  	"link_url" varchar,
  	"link_button_type" "imageGridItems_button_type" DEFAULT 'default',
  	"link_button_color" "imageGridItems_btn_color" DEFAULT 'Teal',
  	"link_text_color" "imageGridItems_text_color" DEFAULT 'White',
  	"link_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_grid_items_locales" (
  	"header" varchar,
  	"subheader" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__pages_v_blocks_image_grid_background_color" DEFAULT 'Background',
  	"show_title" boolean DEFAULT false,
  	"columns" "enum__pages_v_blocks_image_grid_columns" DEFAULT '3',
  	"show_all" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_grid_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_simple_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__pages_v_blocks_simple_rich_text_background_color" DEFAULT 'Background',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_simple_rich_text_locales" (
  	"title" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_youtube_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__pages_v_blocks_youtube_embed_background_color" DEFAULT 'Background',
  	"video_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_youtube_embed_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_pull_behind_nav" boolean DEFAULT false,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"stories_id" integer
  );
  
  CREATE TABLE "stories_blocks_story_cards_stories" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"story_id" integer,
  	"color" "enum_stories_blocks_story_cards_stories_color" DEFAULT 'Teal',
  	"text_background" "enum_stories_blocks_story_cards_stories_text_background" DEFAULT 'Teal'
  );
  
  CREATE TABLE "stories_blocks_story_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_stories_blocks_story_cards_background_color" DEFAULT 'Background',
  	"variant" "enum_stories_blocks_story_cards_variant" DEFAULT 'featured-cards',
  	"show_title" boolean DEFAULT true,
  	"show_button" boolean DEFAULT true,
  	"bottom_button_link_type" "enum_stories_blocks_story_cards_bottom_button_link_type" DEFAULT 'manual',
  	"bottom_button_url" varchar,
  	"bottom_button_button_type" "enum_stories_blocks_story_cards_bottom_button_button_type" DEFAULT 'default',
  	"bottom_button_button_color" "enum_stories_blocks_story_cards_bottom_button_button_color" DEFAULT 'Teal',
  	"bottom_button_text_color" "enum_stories_blocks_story_cards_bottom_button_text_color" DEFAULT 'White',
  	"bottom_button_new_tab" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "stories_blocks_story_cards_locales" (
  	"title" varchar,
  	"bottom_button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "stories_blocks_image_grid_category" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "stories_blocks_image_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"show_link" boolean DEFAULT false,
  	"assigned_categories" jsonb,
  	"link_link_type" "enum_stories_blocks_image_grid_items_link_link_type" DEFAULT 'manual',
  	"link_url" varchar,
  	"link_button_type" "imageGridItems_button_type" DEFAULT 'default',
  	"link_button_color" "imageGridItems_btn_color" DEFAULT 'Teal',
  	"link_text_color" "imageGridItems_text_color" DEFAULT 'White',
  	"link_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "stories_blocks_image_grid_items_locales" (
  	"header" varchar,
  	"subheader" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "stories_blocks_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_stories_blocks_image_grid_background_color" DEFAULT 'Background',
  	"show_title" boolean DEFAULT false,
  	"columns" "enum_stories_blocks_image_grid_columns" DEFAULT '3',
  	"show_all" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "stories_blocks_image_grid_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "stories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"is_external_link" boolean DEFAULT false,
  	"external_url" varchar,
  	"published_at" timestamp(3) with time zone,
  	"author_id" integer,
  	"featured" boolean DEFAULT false,
  	"reading_time" numeric,
  	"banner_image_id" integer,
  	"thumbnail_id" integer,
  	"meta_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_stories_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "stories_locales" (
  	"title" varchar,
  	"summary" jsonb,
  	"body" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "stories_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"story_categories_id" integer,
  	"pages_id" integer,
  	"stories_id" integer
  );
  
  CREATE TABLE "_stories_v_blocks_story_cards_stories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"story_id" integer,
  	"color" "enum__stories_v_blocks_story_cards_stories_color" DEFAULT 'Teal',
  	"text_background" "enum__stories_v_blocks_story_cards_stories_text_background" DEFAULT 'Teal',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_stories_v_blocks_story_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__stories_v_blocks_story_cards_background_color" DEFAULT 'Background',
  	"variant" "enum__stories_v_blocks_story_cards_variant" DEFAULT 'featured-cards',
  	"show_title" boolean DEFAULT true,
  	"show_button" boolean DEFAULT true,
  	"bottom_button_link_type" "enum__stories_v_blocks_story_cards_bottom_button_link_type" DEFAULT 'manual',
  	"bottom_button_url" varchar,
  	"bottom_button_button_type" "enum__stories_v_blocks_story_cards_bottom_button_button_type" DEFAULT 'default',
  	"bottom_button_button_color" "enum__stories_v_blocks_story_cards_bottom_button_button_color" DEFAULT 'Teal',
  	"bottom_button_text_color" "enum__stories_v_blocks_story_cards_bottom_button_text_color" DEFAULT 'White',
  	"bottom_button_new_tab" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_stories_v_blocks_story_cards_locales" (
  	"title" varchar,
  	"bottom_button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_stories_v_blocks_image_grid_category" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_stories_v_blocks_image_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"show_link" boolean DEFAULT false,
  	"assigned_categories" jsonb,
  	"link_link_type" "enum__stories_v_blocks_image_grid_items_link_link_type" DEFAULT 'manual',
  	"link_url" varchar,
  	"link_button_type" "imageGridItems_button_type" DEFAULT 'default',
  	"link_button_color" "imageGridItems_btn_color" DEFAULT 'Teal',
  	"link_text_color" "imageGridItems_text_color" DEFAULT 'White',
  	"link_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_stories_v_blocks_image_grid_items_locales" (
  	"header" varchar,
  	"subheader" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_stories_v_blocks_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__stories_v_blocks_image_grid_background_color" DEFAULT 'Background',
  	"show_title" boolean DEFAULT false,
  	"columns" "enum__stories_v_blocks_image_grid_columns" DEFAULT '3',
  	"show_all" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_stories_v_blocks_image_grid_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_stories_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_is_external_link" boolean DEFAULT false,
  	"version_external_url" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_author_id" integer,
  	"version_featured" boolean DEFAULT false,
  	"version_reading_time" numeric,
  	"version_banner_image_id" integer,
  	"version_thumbnail_id" integer,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__stories_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__stories_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_stories_v_locales" (
  	"version_title" varchar,
  	"version_summary" jsonb,
  	"version_body" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_stories_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"story_categories_id" integer,
  	"pages_id" integer,
  	"stories_id" integer
  );
  
  CREATE TABLE "story_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"icon_name" varchar,
  	"color" "enum_story_categories_color" NOT NULL,
  	"text_color" "enum_story_categories_text_color" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "story_categories_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "videos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "videos_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "exports" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"format" "enum_exports_format" DEFAULT 'csv' NOT NULL,
  	"limit" numeric,
  	"page" numeric DEFAULT 1,
  	"sort" varchar,
  	"sort_order" "enum_exports_sort_order",
  	"locale" "enum_exports_locale" DEFAULT 'all',
  	"drafts" "enum_exports_drafts" DEFAULT 'yes',
  	"collection_slug" varchar DEFAULT 'pages' NOT NULL,
  	"where" jsonb DEFAULT '{}'::jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "exports_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "imports" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"collection_slug" varchar DEFAULT 'pages' NOT NULL,
  	"import_mode" "enum_imports_import_mode",
  	"match_field" varchar DEFAULT 'id',
  	"status" "enum_imports_status" DEFAULT 'pending',
  	"summary_imported" numeric,
  	"summary_updated" numeric,
  	"summary_total" numeric,
  	"summary_issues" numeric,
  	"summary_issue_details" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "search" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"priority" numeric,
  	"slug" varchar,
  	"no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "search_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "search_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"stories_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"pages_id" integer,
  	"stories_id" integer,
  	"story_categories_id" integer,
  	"videos_id" integer,
  	"search_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "dd_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"is_featured" boolean,
  	"featured_image_id" integer,
  	"link_link_type" "enum_dd_links_link_link_type" DEFAULT 'manual',
  	"link_url" varchar,
  	"link_button_type" "enum_dd_links_link_button_type" DEFAULT 'link',
  	"link_button_color" "enum_dd_links_link_button_color" DEFAULT 'Teal',
  	"link_text_color" "enum_dd_links_link_text_color" DEFAULT 'White',
  	"link_new_tab" boolean DEFAULT false,
  	"description" varchar
  );
  
  CREATE TABLE "dd_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_nav_items_type" DEFAULT 'link',
  	"link_config_link_type" "enum_nav_items_link_config_link_type" DEFAULT 'manual',
  	"link_config_url" varchar,
  	"link_config_button_type" "enum_nav_items_link_config_button_type" DEFAULT 'link',
  	"link_config_button_color" "enum_nav_items_link_config_button_color" DEFAULT 'Teal',
  	"link_config_text_color" "enum_nav_items_link_config_text_color" DEFAULT 'White',
  	"link_config_new_tab" boolean DEFAULT false,
  	"has_dropdown_label_link" boolean DEFAULT false,
  	"dropdown_label_link_link_type" "enum_nav_items_dropdown_label_link_link_type" DEFAULT 'manual',
  	"dropdown_label_link_url" varchar,
  	"dropdown_label_link_button_type" "enum_nav_items_dropdown_label_link_button_type" DEFAULT 'link',
  	"dropdown_label_link_button_color" "enum_nav_items_dropdown_label_link_button_color" DEFAULT 'Teal',
  	"dropdown_label_link_text_color" "enum_nav_items_dropdown_label_link_text_color" DEFAULT 'White',
  	"dropdown_label_link_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "nav_items_locales" (
  	"link_config_label" varchar,
  	"dropdown_label" varchar,
  	"dropdown_label_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "nav_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_link_type" "enum_nav_buttons_link_link_type" DEFAULT 'manual',
  	"link_url" varchar,
  	"link_button_type" "enum_nav_buttons_link_button_type" DEFAULT 'default',
  	"link_button_color" "enum_nav_buttons_link_button_color" DEFAULT 'Teal',
  	"link_text_color" "enum_nav_buttons_link_text_color" DEFAULT 'White',
  	"link_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "nav_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_light_id" integer,
  	"logo_dark_id" integer,
  	"_status" "enum_header_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"stories_id" integer
  );
  
  CREATE TABLE "_dd_links_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"is_featured" boolean,
  	"featured_image_id" integer,
  	"link_link_type" "enum__dd_links_v_link_link_type" DEFAULT 'manual',
  	"link_url" varchar,
  	"link_button_type" "enum__dd_links_v_link_button_type" DEFAULT 'link',
  	"link_button_color" "enum__dd_links_v_link_button_color" DEFAULT 'Teal',
  	"link_text_color" "enum__dd_links_v_link_text_color" DEFAULT 'White',
  	"link_new_tab" boolean DEFAULT false,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_dd_links_v_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_nav_items_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__nav_items_v_type" DEFAULT 'link',
  	"link_config_link_type" "enum__nav_items_v_link_config_link_type" DEFAULT 'manual',
  	"link_config_url" varchar,
  	"link_config_button_type" "enum__nav_items_v_link_config_button_type" DEFAULT 'link',
  	"link_config_button_color" "enum__nav_items_v_link_config_button_color" DEFAULT 'Teal',
  	"link_config_text_color" "enum__nav_items_v_link_config_text_color" DEFAULT 'White',
  	"link_config_new_tab" boolean DEFAULT false,
  	"has_dropdown_label_link" boolean DEFAULT false,
  	"dropdown_label_link_link_type" "enum__nav_items_v_dropdown_label_link_link_type" DEFAULT 'manual',
  	"dropdown_label_link_url" varchar,
  	"dropdown_label_link_button_type" "enum__nav_items_v_dropdown_label_link_button_type" DEFAULT 'link',
  	"dropdown_label_link_button_color" "enum__nav_items_v_dropdown_label_link_button_color" DEFAULT 'Teal',
  	"dropdown_label_link_text_color" "enum__nav_items_v_dropdown_label_link_text_color" DEFAULT 'White',
  	"dropdown_label_link_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_nav_items_v_locales" (
  	"link_config_label" varchar,
  	"dropdown_label" varchar,
  	"dropdown_label_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_nav_buttons_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_link_type" "enum__nav_buttons_v_link_link_type" DEFAULT 'manual',
  	"link_url" varchar,
  	"link_button_type" "enum__nav_buttons_v_link_button_type" DEFAULT 'default',
  	"link_button_color" "enum__nav_buttons_v_link_button_color" DEFAULT 'Teal',
  	"link_text_color" "enum__nav_buttons_v_link_text_color" DEFAULT 'White',
  	"link_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_nav_buttons_v_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_header_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_logo_light_id" integer,
  	"version_logo_dark_id" integer,
  	"version__status" "enum__header_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__header_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_header_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"stories_id" integer
  );
  
  CREATE TABLE "footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_name" varchar,
  	"link_link_type" "enum_footer_social_links_link_link_type" DEFAULT 'manual',
  	"link_url" varchar,
  	"link_button_type" "enum_footer_social_links_link_button_type" DEFAULT 'link',
  	"link_button_color" "enum_footer_social_links_link_button_color" DEFAULT 'Teal',
  	"link_text_color" "enum_footer_social_links_link_text_color" DEFAULT 'White',
  	"link_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "footer_social_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_nav_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_link_type" "enum_footer_nav_buttons_link_link_type" DEFAULT 'manual',
  	"link_url" varchar,
  	"link_button_type" "enum_footer_nav_buttons_link_button_type" DEFAULT 'default',
  	"link_button_color" "enum_footer_nav_buttons_link_button_color" DEFAULT 'Teal',
  	"link_text_color" "enum_footer_nav_buttons_link_text_color" DEFAULT 'White',
  	"link_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "footer_nav_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_nav_groups_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_link_type" "enum_footer_nav_groups_nav_items_link_link_type" DEFAULT 'manual',
  	"link_url" varchar,
  	"link_button_type" "enum_footer_nav_groups_nav_items_link_button_type" DEFAULT 'link',
  	"link_button_color" "enum_footer_nav_groups_nav_items_link_button_color" DEFAULT 'Teal',
  	"link_text_color" "enum_footer_nav_groups_nav_items_link_text_color" DEFAULT 'White',
  	"link_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "footer_nav_groups_nav_items_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_nav_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "footer_nav_groups_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_light_id" integer,
  	"logo_dark_id" integer,
  	"_status" "enum_footer_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_locales" (
  	"footer_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"stories_id" integer
  );
  
  CREATE TABLE "_footer_v_version_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_name" varchar,
  	"link_link_type" "enum__footer_v_version_social_links_link_link_type" DEFAULT 'manual',
  	"link_url" varchar,
  	"link_button_type" "enum__footer_v_version_social_links_link_button_type" DEFAULT 'link',
  	"link_button_color" "enum__footer_v_version_social_links_link_button_color" DEFAULT 'Teal',
  	"link_text_color" "enum__footer_v_version_social_links_link_text_color" DEFAULT 'White',
  	"link_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_footer_v_version_social_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_footer_v_version_nav_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_link_type" "enum__footer_v_version_nav_buttons_link_link_type" DEFAULT 'manual',
  	"link_url" varchar,
  	"link_button_type" "enum__footer_v_version_nav_buttons_link_button_type" DEFAULT 'default',
  	"link_button_color" "enum__footer_v_version_nav_buttons_link_button_color" DEFAULT 'Teal',
  	"link_text_color" "enum__footer_v_version_nav_buttons_link_text_color" DEFAULT 'White',
  	"link_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_footer_v_version_nav_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_footer_v_version_nav_groups_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_link_type" "enum__footer_v_version_nav_groups_nav_items_link_link_type" DEFAULT 'manual',
  	"link_url" varchar,
  	"link_button_type" "enum__footer_v_version_nav_groups_nav_items_link_button_type" DEFAULT 'link',
  	"link_button_color" "enum__footer_v_version_nav_groups_nav_items_link_button_color" DEFAULT 'Teal',
  	"link_text_color" "enum__footer_v_version_nav_groups_nav_items_link_text_color" DEFAULT 'White',
  	"link_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_footer_v_version_nav_groups_nav_items_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_footer_v_version_nav_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_footer_v_version_nav_groups_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_footer_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_logo_light_id" integer,
  	"version_logo_dark_id" integer,
  	"version__status" "enum__footer_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__footer_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_footer_v_locales" (
  	"version_footer_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_footer_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"stories_id" integer
  );
  
  CREATE TABLE "announcement_bar" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT false,
  	"text" varchar,
  	"show_link" boolean DEFAULT false,
  	"link_link_type" "enum_announcement_bar_link_link_type" DEFAULT 'manual',
  	"link_url" varchar,
  	"link_button_type" "enum_announcement_bar_link_button_type" DEFAULT 'default',
  	"link_button_color" "enum_announcement_bar_link_button_color" DEFAULT 'Teal',
  	"link_text_color" "enum_announcement_bar_link_text_color" DEFAULT 'White',
  	"link_new_tab" boolean DEFAULT false,
  	"text_color" "enum_announcement_bar_text_color" DEFAULT 'White',
  	"background_color" "enum_announcement_bar_background_color" DEFAULT 'Teal',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "announcement_bar_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "announcement_bar_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"stories_id" integer
  );
  
  CREATE TABLE "stories_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_no_index" boolean DEFAULT false,
  	"_status" "enum_stories_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "stories_page_locales" (
  	"all_stories_label" varchar DEFAULT 'All Stories',
  	"default_description" varchar DEFAULT 'Discover inspiring stories from our community',
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_stories_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version__status" "enum__stories_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__stories_page_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_stories_page_v_locales" (
  	"version_all_stories_label" varchar DEFAULT 'All Stories',
  	"version_default_description" varchar DEFAULT 'Discover inspiring stories from our community',
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_buttons" ADD CONSTRAINT "pages_blocks_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_buttons_locales" ADD CONSTRAINT "pages_blocks_hero_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_banner_image_id_media_id_fk" FOREIGN KEY ("banner_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_banner_video_id_videos_id_fk" FOREIGN KEY ("banner_video_id") REFERENCES "public"."videos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_locales" ADD CONSTRAINT "pages_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_story_cards_stories" ADD CONSTRAINT "pages_blocks_story_cards_stories_story_id_stories_id_fk" FOREIGN KEY ("story_id") REFERENCES "public"."stories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_story_cards_stories" ADD CONSTRAINT "pages_blocks_story_cards_stories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_story_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_story_cards" ADD CONSTRAINT "pages_blocks_story_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_story_cards_locales" ADD CONSTRAINT "pages_blocks_story_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_story_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_row_items" ADD CONSTRAINT "pages_blocks_icon_row_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_icon_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_row_items_locales" ADD CONSTRAINT "pages_blocks_icon_row_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_icon_row_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_row" ADD CONSTRAINT "pages_blocks_icon_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_row_locales" ADD CONSTRAINT "pages_blocks_icon_row_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_icon_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_standard_content_buttons" ADD CONSTRAINT "pages_blocks_standard_content_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_standard_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_standard_content_buttons_locales" ADD CONSTRAINT "pages_blocks_standard_content_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_standard_content_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_standard_content" ADD CONSTRAINT "pages_blocks_standard_content_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_standard_content" ADD CONSTRAINT "pages_blocks_standard_content_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_standard_content" ADD CONSTRAINT "pages_blocks_standard_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_standard_content_locales" ADD CONSTRAINT "pages_blocks_standard_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_standard_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_wide_image" ADD CONSTRAINT "pages_blocks_wide_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_wide_image" ADD CONSTRAINT "pages_blocks_wide_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_wide_image_locales" ADD CONSTRAINT "pages_blocks_wide_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_wide_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_grid_category" ADD CONSTRAINT "pages_blocks_image_grid_category_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_grid_items" ADD CONSTRAINT "pages_blocks_image_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_grid_items" ADD CONSTRAINT "pages_blocks_image_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_grid_items_locales" ADD CONSTRAINT "pages_blocks_image_grid_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_grid_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_grid" ADD CONSTRAINT "pages_blocks_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_grid_locales" ADD CONSTRAINT "pages_blocks_image_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_simple_rich_text" ADD CONSTRAINT "pages_blocks_simple_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_simple_rich_text_locales" ADD CONSTRAINT "pages_blocks_simple_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_simple_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_youtube_embed" ADD CONSTRAINT "pages_blocks_youtube_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_youtube_embed_locales" ADD CONSTRAINT "pages_blocks_youtube_embed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_youtube_embed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_buttons" ADD CONSTRAINT "_pages_v_blocks_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_buttons_locales" ADD CONSTRAINT "_pages_v_blocks_hero_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_banner_image_id_media_id_fk" FOREIGN KEY ("banner_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_banner_video_id_videos_id_fk" FOREIGN KEY ("banner_video_id") REFERENCES "public"."videos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_locales" ADD CONSTRAINT "_pages_v_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_story_cards_stories" ADD CONSTRAINT "_pages_v_blocks_story_cards_stories_story_id_stories_id_fk" FOREIGN KEY ("story_id") REFERENCES "public"."stories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_story_cards_stories" ADD CONSTRAINT "_pages_v_blocks_story_cards_stories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_story_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_story_cards" ADD CONSTRAINT "_pages_v_blocks_story_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_story_cards_locales" ADD CONSTRAINT "_pages_v_blocks_story_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_story_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_icon_row_items" ADD CONSTRAINT "_pages_v_blocks_icon_row_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_icon_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_icon_row_items_locales" ADD CONSTRAINT "_pages_v_blocks_icon_row_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_icon_row_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_icon_row" ADD CONSTRAINT "_pages_v_blocks_icon_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_icon_row_locales" ADD CONSTRAINT "_pages_v_blocks_icon_row_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_icon_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_standard_content_buttons" ADD CONSTRAINT "_pages_v_blocks_standard_content_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_standard_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_standard_content_buttons_locales" ADD CONSTRAINT "_pages_v_blocks_standard_content_buttons_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_standard_content_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_standard_content" ADD CONSTRAINT "_pages_v_blocks_standard_content_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_standard_content" ADD CONSTRAINT "_pages_v_blocks_standard_content_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_standard_content" ADD CONSTRAINT "_pages_v_blocks_standard_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_standard_content_locales" ADD CONSTRAINT "_pages_v_blocks_standard_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_standard_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_wide_image" ADD CONSTRAINT "_pages_v_blocks_wide_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_wide_image" ADD CONSTRAINT "_pages_v_blocks_wide_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_wide_image_locales" ADD CONSTRAINT "_pages_v_blocks_wide_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_wide_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_grid_category" ADD CONSTRAINT "_pages_v_blocks_image_grid_category_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_grid_items" ADD CONSTRAINT "_pages_v_blocks_image_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_grid_items" ADD CONSTRAINT "_pages_v_blocks_image_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_grid_items_locales" ADD CONSTRAINT "_pages_v_blocks_image_grid_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_grid_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_grid" ADD CONSTRAINT "_pages_v_blocks_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_grid_locales" ADD CONSTRAINT "_pages_v_blocks_image_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_simple_rich_text" ADD CONSTRAINT "_pages_v_blocks_simple_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_simple_rich_text_locales" ADD CONSTRAINT "_pages_v_blocks_simple_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_simple_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_youtube_embed" ADD CONSTRAINT "_pages_v_blocks_youtube_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_youtube_embed_locales" ADD CONSTRAINT "_pages_v_blocks_youtube_embed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_youtube_embed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_blocks_story_cards_stories" ADD CONSTRAINT "stories_blocks_story_cards_stories_story_id_stories_id_fk" FOREIGN KEY ("story_id") REFERENCES "public"."stories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories_blocks_story_cards_stories" ADD CONSTRAINT "stories_blocks_story_cards_stories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories_blocks_story_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_blocks_story_cards" ADD CONSTRAINT "stories_blocks_story_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_blocks_story_cards_locales" ADD CONSTRAINT "stories_blocks_story_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories_blocks_story_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_blocks_image_grid_category" ADD CONSTRAINT "stories_blocks_image_grid_category_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_blocks_image_grid_items" ADD CONSTRAINT "stories_blocks_image_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories_blocks_image_grid_items" ADD CONSTRAINT "stories_blocks_image_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_blocks_image_grid_items_locales" ADD CONSTRAINT "stories_blocks_image_grid_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories_blocks_image_grid_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_blocks_image_grid" ADD CONSTRAINT "stories_blocks_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_blocks_image_grid_locales" ADD CONSTRAINT "stories_blocks_image_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories" ADD CONSTRAINT "stories_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories" ADD CONSTRAINT "stories_banner_image_id_media_id_fk" FOREIGN KEY ("banner_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories" ADD CONSTRAINT "stories_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories_locales" ADD CONSTRAINT "stories_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories_locales" ADD CONSTRAINT "stories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_rels" ADD CONSTRAINT "stories_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_rels" ADD CONSTRAINT "stories_rels_story_categories_fk" FOREIGN KEY ("story_categories_id") REFERENCES "public"."story_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_rels" ADD CONSTRAINT "stories_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_rels" ADD CONSTRAINT "stories_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_stories_v_blocks_story_cards_stories" ADD CONSTRAINT "_stories_v_blocks_story_cards_stories_story_id_stories_id_fk" FOREIGN KEY ("story_id") REFERENCES "public"."stories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_stories_v_blocks_story_cards_stories" ADD CONSTRAINT "_stories_v_blocks_story_cards_stories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_stories_v_blocks_story_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_stories_v_blocks_story_cards" ADD CONSTRAINT "_stories_v_blocks_story_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_stories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_stories_v_blocks_story_cards_locales" ADD CONSTRAINT "_stories_v_blocks_story_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_stories_v_blocks_story_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_stories_v_blocks_image_grid_category" ADD CONSTRAINT "_stories_v_blocks_image_grid_category_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_stories_v_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_stories_v_blocks_image_grid_items" ADD CONSTRAINT "_stories_v_blocks_image_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_stories_v_blocks_image_grid_items" ADD CONSTRAINT "_stories_v_blocks_image_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_stories_v_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_stories_v_blocks_image_grid_items_locales" ADD CONSTRAINT "_stories_v_blocks_image_grid_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_stories_v_blocks_image_grid_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_stories_v_blocks_image_grid" ADD CONSTRAINT "_stories_v_blocks_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_stories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_stories_v_blocks_image_grid_locales" ADD CONSTRAINT "_stories_v_blocks_image_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_stories_v_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_stories_v" ADD CONSTRAINT "_stories_v_parent_id_stories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."stories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_stories_v" ADD CONSTRAINT "_stories_v_version_author_id_users_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_stories_v" ADD CONSTRAINT "_stories_v_version_banner_image_id_media_id_fk" FOREIGN KEY ("version_banner_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_stories_v" ADD CONSTRAINT "_stories_v_version_thumbnail_id_media_id_fk" FOREIGN KEY ("version_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_stories_v_locales" ADD CONSTRAINT "_stories_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_stories_v_locales" ADD CONSTRAINT "_stories_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_stories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_stories_v_rels" ADD CONSTRAINT "_stories_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_stories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_stories_v_rels" ADD CONSTRAINT "_stories_v_rels_story_categories_fk" FOREIGN KEY ("story_categories_id") REFERENCES "public"."story_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_stories_v_rels" ADD CONSTRAINT "_stories_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_stories_v_rels" ADD CONSTRAINT "_stories_v_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "story_categories_locales" ADD CONSTRAINT "story_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."story_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_locales" ADD CONSTRAINT "videos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "exports_texts" ADD CONSTRAINT "exports_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."exports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_locales" ADD CONSTRAINT "search_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_story_categories_fk" FOREIGN KEY ("story_categories_id") REFERENCES "public"."story_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_videos_fk" FOREIGN KEY ("videos_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_search_fk" FOREIGN KEY ("search_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dd_links" ADD CONSTRAINT "dd_links_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dd_links" ADD CONSTRAINT "dd_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dd_links_locales" ADD CONSTRAINT "dd_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dd_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_items" ADD CONSTRAINT "nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_items_locales" ADD CONSTRAINT "nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_buttons" ADD CONSTRAINT "nav_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_buttons_locales" ADD CONSTRAINT "nav_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_light_id_media_id_fk" FOREIGN KEY ("logo_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_dark_id_media_id_fk" FOREIGN KEY ("logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dd_links_v" ADD CONSTRAINT "_dd_links_v_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_dd_links_v" ADD CONSTRAINT "_dd_links_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_nav_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dd_links_v_locales" ADD CONSTRAINT "_dd_links_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dd_links_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_nav_items_v" ADD CONSTRAINT "_nav_items_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_header_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_nav_items_v_locales" ADD CONSTRAINT "_nav_items_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_nav_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_nav_buttons_v" ADD CONSTRAINT "_nav_buttons_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_header_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_nav_buttons_v_locales" ADD CONSTRAINT "_nav_buttons_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_nav_buttons_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v" ADD CONSTRAINT "_header_v_version_logo_light_id_media_id_fk" FOREIGN KEY ("version_logo_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_header_v" ADD CONSTRAINT "_header_v_version_logo_dark_id_media_id_fk" FOREIGN KEY ("version_logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_header_v_rels" ADD CONSTRAINT "_header_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_header_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_rels" ADD CONSTRAINT "_header_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_rels" ADD CONSTRAINT "_header_v_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_social_links_locales" ADD CONSTRAINT "footer_social_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_social_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_buttons" ADD CONSTRAINT "footer_nav_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_buttons_locales" ADD CONSTRAINT "footer_nav_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_nav_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_groups_nav_items" ADD CONSTRAINT "footer_nav_groups_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_nav_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_groups_nav_items_locales" ADD CONSTRAINT "footer_nav_groups_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_nav_groups_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_groups" ADD CONSTRAINT "footer_nav_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_groups_locales" ADD CONSTRAINT "footer_nav_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_nav_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_light_id_media_id_fk" FOREIGN KEY ("logo_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_dark_id_media_id_fk" FOREIGN KEY ("logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_social_links" ADD CONSTRAINT "_footer_v_version_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_social_links_locales" ADD CONSTRAINT "_footer_v_version_social_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v_version_social_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_nav_buttons" ADD CONSTRAINT "_footer_v_version_nav_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_nav_buttons_locales" ADD CONSTRAINT "_footer_v_version_nav_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v_version_nav_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_nav_groups_nav_items" ADD CONSTRAINT "_footer_v_version_nav_groups_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v_version_nav_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_nav_groups_nav_items_locales" ADD CONSTRAINT "_footer_v_version_nav_groups_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v_version_nav_groups_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_nav_groups" ADD CONSTRAINT "_footer_v_version_nav_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_nav_groups_locales" ADD CONSTRAINT "_footer_v_version_nav_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v_version_nav_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v" ADD CONSTRAINT "_footer_v_version_logo_light_id_media_id_fk" FOREIGN KEY ("version_logo_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_footer_v" ADD CONSTRAINT "_footer_v_version_logo_dark_id_media_id_fk" FOREIGN KEY ("version_logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_footer_v_locales" ADD CONSTRAINT "_footer_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_rels" ADD CONSTRAINT "_footer_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_rels" ADD CONSTRAINT "_footer_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_rels" ADD CONSTRAINT "_footer_v_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcement_bar_locales" ADD CONSTRAINT "announcement_bar_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."announcement_bar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcement_bar_rels" ADD CONSTRAINT "announcement_bar_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."announcement_bar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcement_bar_rels" ADD CONSTRAINT "announcement_bar_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcement_bar_rels" ADD CONSTRAINT "announcement_bar_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_page_locales" ADD CONSTRAINT "stories_page_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories_page_locales" ADD CONSTRAINT "stories_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_stories_page_v_locales" ADD CONSTRAINT "_stories_page_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_stories_page_v_locales" ADD CONSTRAINT "_stories_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_stories_page_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_xs_sizes_xs_filename_idx" ON "media" USING btree ("sizes_xs_filename");
  CREATE INDEX "media_sizes_sm_sizes_sm_filename_idx" ON "media" USING btree ("sizes_sm_filename");
  CREATE INDEX "media_sizes_md_sizes_md_filename_idx" ON "media" USING btree ("sizes_md_filename");
  CREATE INDEX "media_sizes_lg_sizes_lg_filename_idx" ON "media" USING btree ("sizes_lg_filename");
  CREATE INDEX "media_sizes_xl_sizes_xl_filename_idx" ON "media" USING btree ("sizes_xl_filename");
  CREATE INDEX "media_sizes_xs_square_sizes_xs_square_filename_idx" ON "media" USING btree ("sizes_xs_square_filename");
  CREATE INDEX "media_sizes_sm_square_sizes_sm_square_filename_idx" ON "media" USING btree ("sizes_sm_square_filename");
  CREATE INDEX "media_sizes_md_square_sizes_md_square_filename_idx" ON "media" USING btree ("sizes_md_square_filename");
  CREATE INDEX "media_sizes_lg_square_sizes_lg_square_filename_idx" ON "media" USING btree ("sizes_lg_square_filename");
  CREATE INDEX "media_sizes_xl_square_sizes_xl_square_filename_idx" ON "media" USING btree ("sizes_xl_square_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_buttons_order_idx" ON "pages_blocks_hero_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_buttons_parent_id_idx" ON "pages_blocks_hero_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_buttons_locales_locale_parent_id_unique" ON "pages_blocks_hero_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_banner_image_idx" ON "pages_blocks_hero" USING btree ("banner_image_id");
  CREATE INDEX "pages_blocks_hero_banner_video_idx" ON "pages_blocks_hero" USING btree ("banner_video_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_locales_locale_parent_id_unique" ON "pages_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_story_cards_stories_order_idx" ON "pages_blocks_story_cards_stories" USING btree ("_order");
  CREATE INDEX "pages_blocks_story_cards_stories_parent_id_idx" ON "pages_blocks_story_cards_stories" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_story_cards_stories_story_idx" ON "pages_blocks_story_cards_stories" USING btree ("story_id");
  CREATE INDEX "pages_blocks_story_cards_order_idx" ON "pages_blocks_story_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_story_cards_parent_id_idx" ON "pages_blocks_story_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_story_cards_path_idx" ON "pages_blocks_story_cards" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_story_cards_locales_locale_parent_id_unique" ON "pages_blocks_story_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_icon_row_items_order_idx" ON "pages_blocks_icon_row_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_icon_row_items_parent_id_idx" ON "pages_blocks_icon_row_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_icon_row_items_locales_locale_parent_id_unique" ON "pages_blocks_icon_row_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_icon_row_order_idx" ON "pages_blocks_icon_row" USING btree ("_order");
  CREATE INDEX "pages_blocks_icon_row_parent_id_idx" ON "pages_blocks_icon_row" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_icon_row_path_idx" ON "pages_blocks_icon_row" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_icon_row_locales_locale_parent_id_unique" ON "pages_blocks_icon_row_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_standard_content_buttons_order_idx" ON "pages_blocks_standard_content_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_standard_content_buttons_parent_id_idx" ON "pages_blocks_standard_content_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_standard_content_buttons_locales_locale_parent_" ON "pages_blocks_standard_content_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_standard_content_order_idx" ON "pages_blocks_standard_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_standard_content_parent_id_idx" ON "pages_blocks_standard_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_standard_content_path_idx" ON "pages_blocks_standard_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_standard_content_image_idx" ON "pages_blocks_standard_content" USING btree ("image_id");
  CREATE INDEX "pages_blocks_standard_content_background_image_idx" ON "pages_blocks_standard_content" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_standard_content_locales_locale_parent_id_uniqu" ON "pages_blocks_standard_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_wide_image_order_idx" ON "pages_blocks_wide_image" USING btree ("_order");
  CREATE INDEX "pages_blocks_wide_image_parent_id_idx" ON "pages_blocks_wide_image" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_wide_image_path_idx" ON "pages_blocks_wide_image" USING btree ("_path");
  CREATE INDEX "pages_blocks_wide_image_image_idx" ON "pages_blocks_wide_image" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_wide_image_locales_locale_parent_id_unique" ON "pages_blocks_wide_image_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_image_grid_category_order_idx" ON "pages_blocks_image_grid_category" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_grid_category_parent_id_idx" ON "pages_blocks_image_grid_category" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_grid_items_order_idx" ON "pages_blocks_image_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_grid_items_parent_id_idx" ON "pages_blocks_image_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_grid_items_image_idx" ON "pages_blocks_image_grid_items" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_image_grid_items_locales_locale_parent_id_uniqu" ON "pages_blocks_image_grid_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_image_grid_order_idx" ON "pages_blocks_image_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_grid_parent_id_idx" ON "pages_blocks_image_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_grid_path_idx" ON "pages_blocks_image_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_image_grid_locales_locale_parent_id_unique" ON "pages_blocks_image_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_simple_rich_text_order_idx" ON "pages_blocks_simple_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_simple_rich_text_parent_id_idx" ON "pages_blocks_simple_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_simple_rich_text_path_idx" ON "pages_blocks_simple_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_simple_rich_text_locales_locale_parent_id_uniqu" ON "pages_blocks_simple_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_youtube_embed_order_idx" ON "pages_blocks_youtube_embed" USING btree ("_order");
  CREATE INDEX "pages_blocks_youtube_embed_parent_id_idx" ON "pages_blocks_youtube_embed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_youtube_embed_path_idx" ON "pages_blocks_youtube_embed" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_youtube_embed_locales_locale_parent_id_unique" ON "pages_blocks_youtube_embed_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "pages_rels_stories_id_idx" ON "pages_rels" USING btree ("stories_id");
  CREATE INDEX "_pages_v_blocks_hero_buttons_order_idx" ON "_pages_v_blocks_hero_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_buttons_parent_id_idx" ON "_pages_v_blocks_hero_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_buttons_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_banner_image_idx" ON "_pages_v_blocks_hero" USING btree ("banner_image_id");
  CREATE INDEX "_pages_v_blocks_hero_banner_video_idx" ON "_pages_v_blocks_hero" USING btree ("banner_video_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_story_cards_stories_order_idx" ON "_pages_v_blocks_story_cards_stories" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_story_cards_stories_parent_id_idx" ON "_pages_v_blocks_story_cards_stories" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_story_cards_stories_story_idx" ON "_pages_v_blocks_story_cards_stories" USING btree ("story_id");
  CREATE INDEX "_pages_v_blocks_story_cards_order_idx" ON "_pages_v_blocks_story_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_story_cards_parent_id_idx" ON "_pages_v_blocks_story_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_story_cards_path_idx" ON "_pages_v_blocks_story_cards" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_story_cards_locales_locale_parent_id_unique" ON "_pages_v_blocks_story_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_icon_row_items_order_idx" ON "_pages_v_blocks_icon_row_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_icon_row_items_parent_id_idx" ON "_pages_v_blocks_icon_row_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_icon_row_items_locales_locale_parent_id_uniq" ON "_pages_v_blocks_icon_row_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_icon_row_order_idx" ON "_pages_v_blocks_icon_row" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_icon_row_parent_id_idx" ON "_pages_v_blocks_icon_row" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_icon_row_path_idx" ON "_pages_v_blocks_icon_row" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_icon_row_locales_locale_parent_id_unique" ON "_pages_v_blocks_icon_row_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_standard_content_buttons_order_idx" ON "_pages_v_blocks_standard_content_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_standard_content_buttons_parent_id_idx" ON "_pages_v_blocks_standard_content_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_standard_content_buttons_locales_locale_pare" ON "_pages_v_blocks_standard_content_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_standard_content_order_idx" ON "_pages_v_blocks_standard_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_standard_content_parent_id_idx" ON "_pages_v_blocks_standard_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_standard_content_path_idx" ON "_pages_v_blocks_standard_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_standard_content_image_idx" ON "_pages_v_blocks_standard_content" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_standard_content_background_image_idx" ON "_pages_v_blocks_standard_content" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_standard_content_locales_locale_parent_id_un" ON "_pages_v_blocks_standard_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_wide_image_order_idx" ON "_pages_v_blocks_wide_image" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_wide_image_parent_id_idx" ON "_pages_v_blocks_wide_image" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_wide_image_path_idx" ON "_pages_v_blocks_wide_image" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_wide_image_image_idx" ON "_pages_v_blocks_wide_image" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_wide_image_locales_locale_parent_id_unique" ON "_pages_v_blocks_wide_image_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_image_grid_category_order_idx" ON "_pages_v_blocks_image_grid_category" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_grid_category_parent_id_idx" ON "_pages_v_blocks_image_grid_category" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_grid_items_order_idx" ON "_pages_v_blocks_image_grid_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_grid_items_parent_id_idx" ON "_pages_v_blocks_image_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_grid_items_image_idx" ON "_pages_v_blocks_image_grid_items" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_image_grid_items_locales_locale_parent_id_un" ON "_pages_v_blocks_image_grid_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_image_grid_order_idx" ON "_pages_v_blocks_image_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_grid_parent_id_idx" ON "_pages_v_blocks_image_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_grid_path_idx" ON "_pages_v_blocks_image_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_image_grid_locales_locale_parent_id_unique" ON "_pages_v_blocks_image_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_simple_rich_text_order_idx" ON "_pages_v_blocks_simple_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_simple_rich_text_parent_id_idx" ON "_pages_v_blocks_simple_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_simple_rich_text_path_idx" ON "_pages_v_blocks_simple_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_simple_rich_text_locales_locale_parent_id_un" ON "_pages_v_blocks_simple_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_youtube_embed_order_idx" ON "_pages_v_blocks_youtube_embed" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_youtube_embed_parent_id_idx" ON "_pages_v_blocks_youtube_embed" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_youtube_embed_path_idx" ON "_pages_v_blocks_youtube_embed" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_youtube_embed_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_youtube_embed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_rels_stories_id_idx" ON "_pages_v_rels" USING btree ("stories_id");
  CREATE INDEX "stories_blocks_story_cards_stories_order_idx" ON "stories_blocks_story_cards_stories" USING btree ("_order");
  CREATE INDEX "stories_blocks_story_cards_stories_parent_id_idx" ON "stories_blocks_story_cards_stories" USING btree ("_parent_id");
  CREATE INDEX "stories_blocks_story_cards_stories_story_idx" ON "stories_blocks_story_cards_stories" USING btree ("story_id");
  CREATE INDEX "stories_blocks_story_cards_order_idx" ON "stories_blocks_story_cards" USING btree ("_order");
  CREATE INDEX "stories_blocks_story_cards_parent_id_idx" ON "stories_blocks_story_cards" USING btree ("_parent_id");
  CREATE INDEX "stories_blocks_story_cards_path_idx" ON "stories_blocks_story_cards" USING btree ("_path");
  CREATE UNIQUE INDEX "stories_blocks_story_cards_locales_locale_parent_id_unique" ON "stories_blocks_story_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "stories_blocks_image_grid_category_order_idx" ON "stories_blocks_image_grid_category" USING btree ("_order");
  CREATE INDEX "stories_blocks_image_grid_category_parent_id_idx" ON "stories_blocks_image_grid_category" USING btree ("_parent_id");
  CREATE INDEX "stories_blocks_image_grid_items_order_idx" ON "stories_blocks_image_grid_items" USING btree ("_order");
  CREATE INDEX "stories_blocks_image_grid_items_parent_id_idx" ON "stories_blocks_image_grid_items" USING btree ("_parent_id");
  CREATE INDEX "stories_blocks_image_grid_items_image_idx" ON "stories_blocks_image_grid_items" USING btree ("image_id");
  CREATE UNIQUE INDEX "stories_blocks_image_grid_items_locales_locale_parent_id_uni" ON "stories_blocks_image_grid_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "stories_blocks_image_grid_order_idx" ON "stories_blocks_image_grid" USING btree ("_order");
  CREATE INDEX "stories_blocks_image_grid_parent_id_idx" ON "stories_blocks_image_grid" USING btree ("_parent_id");
  CREATE INDEX "stories_blocks_image_grid_path_idx" ON "stories_blocks_image_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "stories_blocks_image_grid_locales_locale_parent_id_unique" ON "stories_blocks_image_grid_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "stories_slug_idx" ON "stories" USING btree ("slug");
  CREATE INDEX "stories_author_idx" ON "stories" USING btree ("author_id");
  CREATE INDEX "stories_featured_idx" ON "stories" USING btree ("featured");
  CREATE INDEX "stories_banner_image_idx" ON "stories" USING btree ("banner_image_id");
  CREATE INDEX "stories_thumbnail_idx" ON "stories" USING btree ("thumbnail_id");
  CREATE INDEX "stories_updated_at_idx" ON "stories" USING btree ("updated_at");
  CREATE INDEX "stories_created_at_idx" ON "stories" USING btree ("created_at");
  CREATE INDEX "stories__status_idx" ON "stories" USING btree ("_status");
  CREATE INDEX "stories_meta_meta_image_idx" ON "stories_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "stories_locales_locale_parent_id_unique" ON "stories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "stories_rels_order_idx" ON "stories_rels" USING btree ("order");
  CREATE INDEX "stories_rels_parent_idx" ON "stories_rels" USING btree ("parent_id");
  CREATE INDEX "stories_rels_path_idx" ON "stories_rels" USING btree ("path");
  CREATE INDEX "stories_rels_story_categories_id_idx" ON "stories_rels" USING btree ("story_categories_id");
  CREATE INDEX "stories_rels_pages_id_idx" ON "stories_rels" USING btree ("pages_id");
  CREATE INDEX "stories_rels_stories_id_idx" ON "stories_rels" USING btree ("stories_id");
  CREATE INDEX "_stories_v_blocks_story_cards_stories_order_idx" ON "_stories_v_blocks_story_cards_stories" USING btree ("_order");
  CREATE INDEX "_stories_v_blocks_story_cards_stories_parent_id_idx" ON "_stories_v_blocks_story_cards_stories" USING btree ("_parent_id");
  CREATE INDEX "_stories_v_blocks_story_cards_stories_story_idx" ON "_stories_v_blocks_story_cards_stories" USING btree ("story_id");
  CREATE INDEX "_stories_v_blocks_story_cards_order_idx" ON "_stories_v_blocks_story_cards" USING btree ("_order");
  CREATE INDEX "_stories_v_blocks_story_cards_parent_id_idx" ON "_stories_v_blocks_story_cards" USING btree ("_parent_id");
  CREATE INDEX "_stories_v_blocks_story_cards_path_idx" ON "_stories_v_blocks_story_cards" USING btree ("_path");
  CREATE UNIQUE INDEX "_stories_v_blocks_story_cards_locales_locale_parent_id_uniqu" ON "_stories_v_blocks_story_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_stories_v_blocks_image_grid_category_order_idx" ON "_stories_v_blocks_image_grid_category" USING btree ("_order");
  CREATE INDEX "_stories_v_blocks_image_grid_category_parent_id_idx" ON "_stories_v_blocks_image_grid_category" USING btree ("_parent_id");
  CREATE INDEX "_stories_v_blocks_image_grid_items_order_idx" ON "_stories_v_blocks_image_grid_items" USING btree ("_order");
  CREATE INDEX "_stories_v_blocks_image_grid_items_parent_id_idx" ON "_stories_v_blocks_image_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_stories_v_blocks_image_grid_items_image_idx" ON "_stories_v_blocks_image_grid_items" USING btree ("image_id");
  CREATE UNIQUE INDEX "_stories_v_blocks_image_grid_items_locales_locale_parent_id_" ON "_stories_v_blocks_image_grid_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_stories_v_blocks_image_grid_order_idx" ON "_stories_v_blocks_image_grid" USING btree ("_order");
  CREATE INDEX "_stories_v_blocks_image_grid_parent_id_idx" ON "_stories_v_blocks_image_grid" USING btree ("_parent_id");
  CREATE INDEX "_stories_v_blocks_image_grid_path_idx" ON "_stories_v_blocks_image_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "_stories_v_blocks_image_grid_locales_locale_parent_id_unique" ON "_stories_v_blocks_image_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_stories_v_parent_idx" ON "_stories_v" USING btree ("parent_id");
  CREATE INDEX "_stories_v_version_version_slug_idx" ON "_stories_v" USING btree ("version_slug");
  CREATE INDEX "_stories_v_version_version_author_idx" ON "_stories_v" USING btree ("version_author_id");
  CREATE INDEX "_stories_v_version_version_featured_idx" ON "_stories_v" USING btree ("version_featured");
  CREATE INDEX "_stories_v_version_version_banner_image_idx" ON "_stories_v" USING btree ("version_banner_image_id");
  CREATE INDEX "_stories_v_version_version_thumbnail_idx" ON "_stories_v" USING btree ("version_thumbnail_id");
  CREATE INDEX "_stories_v_version_version_updated_at_idx" ON "_stories_v" USING btree ("version_updated_at");
  CREATE INDEX "_stories_v_version_version_created_at_idx" ON "_stories_v" USING btree ("version_created_at");
  CREATE INDEX "_stories_v_version_version__status_idx" ON "_stories_v" USING btree ("version__status");
  CREATE INDEX "_stories_v_created_at_idx" ON "_stories_v" USING btree ("created_at");
  CREATE INDEX "_stories_v_updated_at_idx" ON "_stories_v" USING btree ("updated_at");
  CREATE INDEX "_stories_v_snapshot_idx" ON "_stories_v" USING btree ("snapshot");
  CREATE INDEX "_stories_v_published_locale_idx" ON "_stories_v" USING btree ("published_locale");
  CREATE INDEX "_stories_v_latest_idx" ON "_stories_v" USING btree ("latest");
  CREATE INDEX "_stories_v_version_meta_version_meta_image_idx" ON "_stories_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_stories_v_locales_locale_parent_id_unique" ON "_stories_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_stories_v_rels_order_idx" ON "_stories_v_rels" USING btree ("order");
  CREATE INDEX "_stories_v_rels_parent_idx" ON "_stories_v_rels" USING btree ("parent_id");
  CREATE INDEX "_stories_v_rels_path_idx" ON "_stories_v_rels" USING btree ("path");
  CREATE INDEX "_stories_v_rels_story_categories_id_idx" ON "_stories_v_rels" USING btree ("story_categories_id");
  CREATE INDEX "_stories_v_rels_pages_id_idx" ON "_stories_v_rels" USING btree ("pages_id");
  CREATE INDEX "_stories_v_rels_stories_id_idx" ON "_stories_v_rels" USING btree ("stories_id");
  CREATE UNIQUE INDEX "story_categories_slug_idx" ON "story_categories" USING btree ("slug");
  CREATE INDEX "story_categories_updated_at_idx" ON "story_categories" USING btree ("updated_at");
  CREATE INDEX "story_categories_created_at_idx" ON "story_categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "story_categories_locales_locale_parent_id_unique" ON "story_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "videos_updated_at_idx" ON "videos" USING btree ("updated_at");
  CREATE INDEX "videos_created_at_idx" ON "videos" USING btree ("created_at");
  CREATE UNIQUE INDEX "videos_filename_idx" ON "videos" USING btree ("filename");
  CREATE UNIQUE INDEX "videos_locales_locale_parent_id_unique" ON "videos_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "exports_updated_at_idx" ON "exports" USING btree ("updated_at");
  CREATE INDEX "exports_created_at_idx" ON "exports" USING btree ("created_at");
  CREATE UNIQUE INDEX "exports_filename_idx" ON "exports" USING btree ("filename");
  CREATE INDEX "exports_texts_order_parent" ON "exports_texts" USING btree ("order","parent_id");
  CREATE INDEX "imports_updated_at_idx" ON "imports" USING btree ("updated_at");
  CREATE INDEX "imports_created_at_idx" ON "imports" USING btree ("created_at");
  CREATE UNIQUE INDEX "imports_filename_idx" ON "imports" USING btree ("filename");
  CREATE INDEX "search_updated_at_idx" ON "search" USING btree ("updated_at");
  CREATE INDEX "search_created_at_idx" ON "search" USING btree ("created_at");
  CREATE UNIQUE INDEX "search_locales_locale_parent_id_unique" ON "search_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "search_rels_order_idx" ON "search_rels" USING btree ("order");
  CREATE INDEX "search_rels_parent_idx" ON "search_rels" USING btree ("parent_id");
  CREATE INDEX "search_rels_path_idx" ON "search_rels" USING btree ("path");
  CREATE INDEX "search_rels_pages_id_idx" ON "search_rels" USING btree ("pages_id");
  CREATE INDEX "search_rels_stories_id_idx" ON "search_rels" USING btree ("stories_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_stories_id_idx" ON "payload_locked_documents_rels" USING btree ("stories_id");
  CREATE INDEX "payload_locked_documents_rels_story_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("story_categories_id");
  CREATE INDEX "payload_locked_documents_rels_videos_id_idx" ON "payload_locked_documents_rels" USING btree ("videos_id");
  CREATE INDEX "payload_locked_documents_rels_search_id_idx" ON "payload_locked_documents_rels" USING btree ("search_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "dd_links_order_idx" ON "dd_links" USING btree ("_order");
  CREATE INDEX "dd_links_parent_id_idx" ON "dd_links" USING btree ("_parent_id");
  CREATE INDEX "dd_links_featured_image_idx" ON "dd_links" USING btree ("featured_image_id");
  CREATE UNIQUE INDEX "dd_links_locales_locale_parent_id_unique" ON "dd_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "nav_items_order_idx" ON "nav_items" USING btree ("_order");
  CREATE INDEX "nav_items_parent_id_idx" ON "nav_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "nav_items_locales_locale_parent_id_unique" ON "nav_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "nav_buttons_order_idx" ON "nav_buttons" USING btree ("_order");
  CREATE INDEX "nav_buttons_parent_id_idx" ON "nav_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "nav_buttons_locales_locale_parent_id_unique" ON "nav_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_logo_logo_light_idx" ON "header" USING btree ("logo_light_id");
  CREATE INDEX "header_logo_logo_dark_idx" ON "header" USING btree ("logo_dark_id");
  CREATE INDEX "header__status_idx" ON "header" USING btree ("_status");
  CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id");
  CREATE INDEX "header_rels_stories_id_idx" ON "header_rels" USING btree ("stories_id");
  CREATE INDEX "_dd_links_v_order_idx" ON "_dd_links_v" USING btree ("_order");
  CREATE INDEX "_dd_links_v_parent_id_idx" ON "_dd_links_v" USING btree ("_parent_id");
  CREATE INDEX "_dd_links_v_featured_image_idx" ON "_dd_links_v" USING btree ("featured_image_id");
  CREATE UNIQUE INDEX "_dd_links_v_locales_locale_parent_id_unique" ON "_dd_links_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_nav_items_v_order_idx" ON "_nav_items_v" USING btree ("_order");
  CREATE INDEX "_nav_items_v_parent_id_idx" ON "_nav_items_v" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_nav_items_v_locales_locale_parent_id_unique" ON "_nav_items_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_nav_buttons_v_order_idx" ON "_nav_buttons_v" USING btree ("_order");
  CREATE INDEX "_nav_buttons_v_parent_id_idx" ON "_nav_buttons_v" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_nav_buttons_v_locales_locale_parent_id_unique" ON "_nav_buttons_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_header_v_version_logo_version_logo_light_idx" ON "_header_v" USING btree ("version_logo_light_id");
  CREATE INDEX "_header_v_version_logo_version_logo_dark_idx" ON "_header_v" USING btree ("version_logo_dark_id");
  CREATE INDEX "_header_v_version_version__status_idx" ON "_header_v" USING btree ("version__status");
  CREATE INDEX "_header_v_created_at_idx" ON "_header_v" USING btree ("created_at");
  CREATE INDEX "_header_v_updated_at_idx" ON "_header_v" USING btree ("updated_at");
  CREATE INDEX "_header_v_snapshot_idx" ON "_header_v" USING btree ("snapshot");
  CREATE INDEX "_header_v_published_locale_idx" ON "_header_v" USING btree ("published_locale");
  CREATE INDEX "_header_v_latest_idx" ON "_header_v" USING btree ("latest");
  CREATE INDEX "_header_v_rels_order_idx" ON "_header_v_rels" USING btree ("order");
  CREATE INDEX "_header_v_rels_parent_idx" ON "_header_v_rels" USING btree ("parent_id");
  CREATE INDEX "_header_v_rels_path_idx" ON "_header_v_rels" USING btree ("path");
  CREATE INDEX "_header_v_rels_pages_id_idx" ON "_header_v_rels" USING btree ("pages_id");
  CREATE INDEX "_header_v_rels_stories_id_idx" ON "_header_v_rels" USING btree ("stories_id");
  CREATE INDEX "footer_social_links_order_idx" ON "footer_social_links" USING btree ("_order");
  CREATE INDEX "footer_social_links_parent_id_idx" ON "footer_social_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_social_links_locales_locale_parent_id_unique" ON "footer_social_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_nav_buttons_order_idx" ON "footer_nav_buttons" USING btree ("_order");
  CREATE INDEX "footer_nav_buttons_parent_id_idx" ON "footer_nav_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_nav_buttons_locales_locale_parent_id_unique" ON "footer_nav_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_nav_groups_nav_items_order_idx" ON "footer_nav_groups_nav_items" USING btree ("_order");
  CREATE INDEX "footer_nav_groups_nav_items_parent_id_idx" ON "footer_nav_groups_nav_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_nav_groups_nav_items_locales_locale_parent_id_unique" ON "footer_nav_groups_nav_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_nav_groups_order_idx" ON "footer_nav_groups" USING btree ("_order");
  CREATE INDEX "footer_nav_groups_parent_id_idx" ON "footer_nav_groups" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_nav_groups_locales_locale_parent_id_unique" ON "footer_nav_groups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_logo_logo_light_idx" ON "footer" USING btree ("logo_light_id");
  CREATE INDEX "footer_logo_logo_dark_idx" ON "footer" USING btree ("logo_dark_id");
  CREATE INDEX "footer__status_idx" ON "footer" USING btree ("_status");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX "footer_rels_pages_id_idx" ON "footer_rels" USING btree ("pages_id");
  CREATE INDEX "footer_rels_stories_id_idx" ON "footer_rels" USING btree ("stories_id");
  CREATE INDEX "_footer_v_version_social_links_order_idx" ON "_footer_v_version_social_links" USING btree ("_order");
  CREATE INDEX "_footer_v_version_social_links_parent_id_idx" ON "_footer_v_version_social_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_footer_v_version_social_links_locales_locale_parent_id_uniq" ON "_footer_v_version_social_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_footer_v_version_nav_buttons_order_idx" ON "_footer_v_version_nav_buttons" USING btree ("_order");
  CREATE INDEX "_footer_v_version_nav_buttons_parent_id_idx" ON "_footer_v_version_nav_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_footer_v_version_nav_buttons_locales_locale_parent_id_uniqu" ON "_footer_v_version_nav_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_footer_v_version_nav_groups_nav_items_order_idx" ON "_footer_v_version_nav_groups_nav_items" USING btree ("_order");
  CREATE INDEX "_footer_v_version_nav_groups_nav_items_parent_id_idx" ON "_footer_v_version_nav_groups_nav_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_footer_v_version_nav_groups_nav_items_locales_locale_parent" ON "_footer_v_version_nav_groups_nav_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_footer_v_version_nav_groups_order_idx" ON "_footer_v_version_nav_groups" USING btree ("_order");
  CREATE INDEX "_footer_v_version_nav_groups_parent_id_idx" ON "_footer_v_version_nav_groups" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_footer_v_version_nav_groups_locales_locale_parent_id_unique" ON "_footer_v_version_nav_groups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_footer_v_version_logo_version_logo_light_idx" ON "_footer_v" USING btree ("version_logo_light_id");
  CREATE INDEX "_footer_v_version_logo_version_logo_dark_idx" ON "_footer_v" USING btree ("version_logo_dark_id");
  CREATE INDEX "_footer_v_version_version__status_idx" ON "_footer_v" USING btree ("version__status");
  CREATE INDEX "_footer_v_created_at_idx" ON "_footer_v" USING btree ("created_at");
  CREATE INDEX "_footer_v_updated_at_idx" ON "_footer_v" USING btree ("updated_at");
  CREATE INDEX "_footer_v_snapshot_idx" ON "_footer_v" USING btree ("snapshot");
  CREATE INDEX "_footer_v_published_locale_idx" ON "_footer_v" USING btree ("published_locale");
  CREATE INDEX "_footer_v_latest_idx" ON "_footer_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_footer_v_locales_locale_parent_id_unique" ON "_footer_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_footer_v_rels_order_idx" ON "_footer_v_rels" USING btree ("order");
  CREATE INDEX "_footer_v_rels_parent_idx" ON "_footer_v_rels" USING btree ("parent_id");
  CREATE INDEX "_footer_v_rels_path_idx" ON "_footer_v_rels" USING btree ("path");
  CREATE INDEX "_footer_v_rels_pages_id_idx" ON "_footer_v_rels" USING btree ("pages_id");
  CREATE INDEX "_footer_v_rels_stories_id_idx" ON "_footer_v_rels" USING btree ("stories_id");
  CREATE UNIQUE INDEX "announcement_bar_locales_locale_parent_id_unique" ON "announcement_bar_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "announcement_bar_rels_order_idx" ON "announcement_bar_rels" USING btree ("order");
  CREATE INDEX "announcement_bar_rels_parent_idx" ON "announcement_bar_rels" USING btree ("parent_id");
  CREATE INDEX "announcement_bar_rels_path_idx" ON "announcement_bar_rels" USING btree ("path");
  CREATE INDEX "announcement_bar_rels_pages_id_idx" ON "announcement_bar_rels" USING btree ("pages_id");
  CREATE INDEX "announcement_bar_rels_stories_id_idx" ON "announcement_bar_rels" USING btree ("stories_id");
  CREATE INDEX "stories_page__status_idx" ON "stories_page" USING btree ("_status");
  CREATE INDEX "stories_page_meta_meta_image_idx" ON "stories_page_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "stories_page_locales_locale_parent_id_unique" ON "stories_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_stories_page_v_version_version__status_idx" ON "_stories_page_v" USING btree ("version__status");
  CREATE INDEX "_stories_page_v_created_at_idx" ON "_stories_page_v" USING btree ("created_at");
  CREATE INDEX "_stories_page_v_updated_at_idx" ON "_stories_page_v" USING btree ("updated_at");
  CREATE INDEX "_stories_page_v_snapshot_idx" ON "_stories_page_v" USING btree ("snapshot");
  CREATE INDEX "_stories_page_v_published_locale_idx" ON "_stories_page_v" USING btree ("published_locale");
  CREATE INDEX "_stories_page_v_latest_idx" ON "_stories_page_v" USING btree ("latest");
  CREATE INDEX "_stories_page_v_version_meta_version_meta_image_idx" ON "_stories_page_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_stories_page_v_locales_locale_parent_id_unique" ON "_stories_page_v_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_roles" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "pages_blocks_hero_buttons" CASCADE;
  DROP TABLE "pages_blocks_hero_buttons_locales" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_story_cards_stories" CASCADE;
  DROP TABLE "pages_blocks_story_cards" CASCADE;
  DROP TABLE "pages_blocks_story_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_icon_row_items" CASCADE;
  DROP TABLE "pages_blocks_icon_row_items_locales" CASCADE;
  DROP TABLE "pages_blocks_icon_row" CASCADE;
  DROP TABLE "pages_blocks_icon_row_locales" CASCADE;
  DROP TABLE "pages_blocks_standard_content_buttons" CASCADE;
  DROP TABLE "pages_blocks_standard_content_buttons_locales" CASCADE;
  DROP TABLE "pages_blocks_standard_content" CASCADE;
  DROP TABLE "pages_blocks_standard_content_locales" CASCADE;
  DROP TABLE "pages_blocks_wide_image" CASCADE;
  DROP TABLE "pages_blocks_wide_image_locales" CASCADE;
  DROP TABLE "pages_blocks_image_grid_category" CASCADE;
  DROP TABLE "pages_blocks_image_grid_items" CASCADE;
  DROP TABLE "pages_blocks_image_grid_items_locales" CASCADE;
  DROP TABLE "pages_blocks_image_grid" CASCADE;
  DROP TABLE "pages_blocks_image_grid_locales" CASCADE;
  DROP TABLE "pages_blocks_simple_rich_text" CASCADE;
  DROP TABLE "pages_blocks_simple_rich_text_locales" CASCADE;
  DROP TABLE "pages_blocks_youtube_embed" CASCADE;
  DROP TABLE "pages_blocks_youtube_embed_locales" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_buttons_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_story_cards_stories" CASCADE;
  DROP TABLE "_pages_v_blocks_story_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_story_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_icon_row_items" CASCADE;
  DROP TABLE "_pages_v_blocks_icon_row_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_icon_row" CASCADE;
  DROP TABLE "_pages_v_blocks_icon_row_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_standard_content_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_standard_content_buttons_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_standard_content" CASCADE;
  DROP TABLE "_pages_v_blocks_standard_content_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_wide_image" CASCADE;
  DROP TABLE "_pages_v_blocks_wide_image_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_image_grid_category" CASCADE;
  DROP TABLE "_pages_v_blocks_image_grid_items" CASCADE;
  DROP TABLE "_pages_v_blocks_image_grid_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_image_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_image_grid_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_simple_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_simple_rich_text_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_youtube_embed" CASCADE;
  DROP TABLE "_pages_v_blocks_youtube_embed_locales" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "stories_blocks_story_cards_stories" CASCADE;
  DROP TABLE "stories_blocks_story_cards" CASCADE;
  DROP TABLE "stories_blocks_story_cards_locales" CASCADE;
  DROP TABLE "stories_blocks_image_grid_category" CASCADE;
  DROP TABLE "stories_blocks_image_grid_items" CASCADE;
  DROP TABLE "stories_blocks_image_grid_items_locales" CASCADE;
  DROP TABLE "stories_blocks_image_grid" CASCADE;
  DROP TABLE "stories_blocks_image_grid_locales" CASCADE;
  DROP TABLE "stories" CASCADE;
  DROP TABLE "stories_locales" CASCADE;
  DROP TABLE "stories_rels" CASCADE;
  DROP TABLE "_stories_v_blocks_story_cards_stories" CASCADE;
  DROP TABLE "_stories_v_blocks_story_cards" CASCADE;
  DROP TABLE "_stories_v_blocks_story_cards_locales" CASCADE;
  DROP TABLE "_stories_v_blocks_image_grid_category" CASCADE;
  DROP TABLE "_stories_v_blocks_image_grid_items" CASCADE;
  DROP TABLE "_stories_v_blocks_image_grid_items_locales" CASCADE;
  DROP TABLE "_stories_v_blocks_image_grid" CASCADE;
  DROP TABLE "_stories_v_blocks_image_grid_locales" CASCADE;
  DROP TABLE "_stories_v" CASCADE;
  DROP TABLE "_stories_v_locales" CASCADE;
  DROP TABLE "_stories_v_rels" CASCADE;
  DROP TABLE "story_categories" CASCADE;
  DROP TABLE "story_categories_locales" CASCADE;
  DROP TABLE "videos" CASCADE;
  DROP TABLE "videos_locales" CASCADE;
  DROP TABLE "exports" CASCADE;
  DROP TABLE "exports_texts" CASCADE;
  DROP TABLE "imports" CASCADE;
  DROP TABLE "search" CASCADE;
  DROP TABLE "search_locales" CASCADE;
  DROP TABLE "search_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "dd_links" CASCADE;
  DROP TABLE "dd_links_locales" CASCADE;
  DROP TABLE "nav_items" CASCADE;
  DROP TABLE "nav_items_locales" CASCADE;
  DROP TABLE "nav_buttons" CASCADE;
  DROP TABLE "nav_buttons_locales" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TABLE "_dd_links_v" CASCADE;
  DROP TABLE "_dd_links_v_locales" CASCADE;
  DROP TABLE "_nav_items_v" CASCADE;
  DROP TABLE "_nav_items_v_locales" CASCADE;
  DROP TABLE "_nav_buttons_v" CASCADE;
  DROP TABLE "_nav_buttons_v_locales" CASCADE;
  DROP TABLE "_header_v" CASCADE;
  DROP TABLE "_header_v_rels" CASCADE;
  DROP TABLE "footer_social_links" CASCADE;
  DROP TABLE "footer_social_links_locales" CASCADE;
  DROP TABLE "footer_nav_buttons" CASCADE;
  DROP TABLE "footer_nav_buttons_locales" CASCADE;
  DROP TABLE "footer_nav_groups_nav_items" CASCADE;
  DROP TABLE "footer_nav_groups_nav_items_locales" CASCADE;
  DROP TABLE "footer_nav_groups" CASCADE;
  DROP TABLE "footer_nav_groups_locales" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  DROP TABLE "_footer_v_version_social_links" CASCADE;
  DROP TABLE "_footer_v_version_social_links_locales" CASCADE;
  DROP TABLE "_footer_v_version_nav_buttons" CASCADE;
  DROP TABLE "_footer_v_version_nav_buttons_locales" CASCADE;
  DROP TABLE "_footer_v_version_nav_groups_nav_items" CASCADE;
  DROP TABLE "_footer_v_version_nav_groups_nav_items_locales" CASCADE;
  DROP TABLE "_footer_v_version_nav_groups" CASCADE;
  DROP TABLE "_footer_v_version_nav_groups_locales" CASCADE;
  DROP TABLE "_footer_v" CASCADE;
  DROP TABLE "_footer_v_locales" CASCADE;
  DROP TABLE "_footer_v_rels" CASCADE;
  DROP TABLE "announcement_bar" CASCADE;
  DROP TABLE "announcement_bar_locales" CASCADE;
  DROP TABLE "announcement_bar_rels" CASCADE;
  DROP TABLE "stories_page" CASCADE;
  DROP TABLE "stories_page_locales" CASCADE;
  DROP TABLE "_stories_page_v" CASCADE;
  DROP TABLE "_stories_page_v_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_pages_blocks_hero_buttons_link_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_buttons_link_button_type";
  DROP TYPE "public"."enum_pages_blocks_hero_buttons_link_button_color";
  DROP TYPE "public"."enum_pages_blocks_hero_buttons_link_text_color";
  DROP TYPE "public"."enum_pages_blocks_hero_hero_type";
  DROP TYPE "public"."enum_pages_blocks_hero_media_type";
  DROP TYPE "public"."enum_pages_blocks_hero_text_orientation";
  DROP TYPE "public"."enum_pages_blocks_story_cards_stories_color";
  DROP TYPE "public"."enum_pages_blocks_story_cards_stories_text_background";
  DROP TYPE "public"."enum_pages_blocks_story_cards_background_color";
  DROP TYPE "public"."enum_pages_blocks_story_cards_variant";
  DROP TYPE "public"."enum_pages_blocks_story_cards_bottom_button_link_type";
  DROP TYPE "public"."enum_pages_blocks_story_cards_bottom_button_button_type";
  DROP TYPE "public"."enum_pages_blocks_story_cards_bottom_button_button_color";
  DROP TYPE "public"."enum_pages_blocks_story_cards_bottom_button_text_color";
  DROP TYPE "public"."enum_pages_blocks_icon_row_items_icon_background_color";
  DROP TYPE "public"."enum_pages_blocks_icon_row_items_icon_color";
  DROP TYPE "public"."enum_pages_blocks_icon_row_items_icon_color_dark";
  DROP TYPE "public"."enum_pages_blocks_icon_row_items_icon_color_with_background";
  DROP TYPE "public"."enum_pages_blocks_icon_row_items_button_link_type";
  DROP TYPE "public"."enum_pages_blocks_icon_row_items_button_button_type";
  DROP TYPE "public"."enum_pages_blocks_icon_row_items_button_button_color";
  DROP TYPE "public"."enum_pages_blocks_icon_row_items_button_text_color";
  DROP TYPE "public"."enum_pages_blocks_icon_row_background_color";
  DROP TYPE "public"."enum_pages_blocks_standard_content_buttons_link_link_type";
  DROP TYPE "public"."enum_pages_blocks_standard_content_buttons_link_button_type";
  DROP TYPE "public"."enum_pages_blocks_standard_content_buttons_link_button_color";
  DROP TYPE "public"."enum_pages_blocks_standard_content_buttons_link_text_color";
  DROP TYPE "public"."enum_pages_blocks_standard_content_header_highlight_color";
  DROP TYPE "public"."enum_pages_blocks_standard_content_header_text_color";
  DROP TYPE "public"."enum_pages_blocks_standard_content_header_level";
  DROP TYPE "public"."enum_pages_blocks_standard_content_image_position";
  DROP TYPE "public"."enum_pages_blocks_standard_content_theme_mode";
  DROP TYPE "public"."enum_pages_blocks_standard_content_background_overlay";
  DROP TYPE "public"."enum_pages_blocks_standard_content_background_color";
  DROP TYPE "public"."enum_pages_blocks_wide_image_header_highlight_color";
  DROP TYPE "public"."enum_pages_blocks_wide_image_header_text_color";
  DROP TYPE "public"."enum_pages_blocks_wide_image_header_level";
  DROP TYPE "public"."enum_pages_blocks_wide_image_background_color";
  DROP TYPE "public"."enum_pages_blocks_image_grid_items_link_link_type";
  DROP TYPE "public"."imageGridItems_button_type";
  DROP TYPE "public"."imageGridItems_btn_color";
  DROP TYPE "public"."imageGridItems_text_color";
  DROP TYPE "public"."enum_pages_blocks_image_grid_background_color";
  DROP TYPE "public"."enum_pages_blocks_image_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_simple_rich_text_background_color";
  DROP TYPE "public"."enum_pages_blocks_youtube_embed_background_color";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_buttons_link_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_buttons_link_button_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_buttons_link_button_color";
  DROP TYPE "public"."enum__pages_v_blocks_hero_buttons_link_text_color";
  DROP TYPE "public"."enum__pages_v_blocks_hero_hero_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_media_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_text_orientation";
  DROP TYPE "public"."enum__pages_v_blocks_story_cards_stories_color";
  DROP TYPE "public"."enum__pages_v_blocks_story_cards_stories_text_background";
  DROP TYPE "public"."enum__pages_v_blocks_story_cards_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_story_cards_variant";
  DROP TYPE "public"."enum__pages_v_blocks_story_cards_bottom_button_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_story_cards_bottom_button_button_type";
  DROP TYPE "public"."enum__pages_v_blocks_story_cards_bottom_button_button_color";
  DROP TYPE "public"."enum__pages_v_blocks_story_cards_bottom_button_text_color";
  DROP TYPE "public"."enum__pages_v_blocks_icon_row_items_icon_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_icon_row_items_icon_color";
  DROP TYPE "public"."enum__pages_v_blocks_icon_row_items_icon_color_dark";
  DROP TYPE "public"."enum__pages_v_blocks_icon_row_items_icon_color_with_background";
  DROP TYPE "public"."enum__pages_v_blocks_icon_row_items_button_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_icon_row_items_button_button_type";
  DROP TYPE "public"."enum__pages_v_blocks_icon_row_items_button_button_color";
  DROP TYPE "public"."enum__pages_v_blocks_icon_row_items_button_text_color";
  DROP TYPE "public"."enum__pages_v_blocks_icon_row_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_standard_content_buttons_link_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_standard_content_buttons_link_button_type";
  DROP TYPE "public"."enum__pages_v_blocks_standard_content_buttons_link_button_color";
  DROP TYPE "public"."enum__pages_v_blocks_standard_content_buttons_link_text_color";
  DROP TYPE "public"."enum__pages_v_blocks_standard_content_header_highlight_color";
  DROP TYPE "public"."enum__pages_v_blocks_standard_content_header_text_color";
  DROP TYPE "public"."enum__pages_v_blocks_standard_content_header_level";
  DROP TYPE "public"."enum__pages_v_blocks_standard_content_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_standard_content_theme_mode";
  DROP TYPE "public"."enum__pages_v_blocks_standard_content_background_overlay";
  DROP TYPE "public"."enum__pages_v_blocks_standard_content_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_wide_image_header_highlight_color";
  DROP TYPE "public"."enum__pages_v_blocks_wide_image_header_text_color";
  DROP TYPE "public"."enum__pages_v_blocks_wide_image_header_level";
  DROP TYPE "public"."enum__pages_v_blocks_wide_image_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_image_grid_items_link_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_image_grid_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_image_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_simple_rich_text_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_youtube_embed_background_color";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_stories_blocks_story_cards_stories_color";
  DROP TYPE "public"."enum_stories_blocks_story_cards_stories_text_background";
  DROP TYPE "public"."enum_stories_blocks_story_cards_background_color";
  DROP TYPE "public"."enum_stories_blocks_story_cards_variant";
  DROP TYPE "public"."enum_stories_blocks_story_cards_bottom_button_link_type";
  DROP TYPE "public"."enum_stories_blocks_story_cards_bottom_button_button_type";
  DROP TYPE "public"."enum_stories_blocks_story_cards_bottom_button_button_color";
  DROP TYPE "public"."enum_stories_blocks_story_cards_bottom_button_text_color";
  DROP TYPE "public"."enum_stories_blocks_image_grid_items_link_link_type";
  DROP TYPE "public"."enum_stories_blocks_image_grid_background_color";
  DROP TYPE "public"."enum_stories_blocks_image_grid_columns";
  DROP TYPE "public"."enum_stories_status";
  DROP TYPE "public"."enum__stories_v_blocks_story_cards_stories_color";
  DROP TYPE "public"."enum__stories_v_blocks_story_cards_stories_text_background";
  DROP TYPE "public"."enum__stories_v_blocks_story_cards_background_color";
  DROP TYPE "public"."enum__stories_v_blocks_story_cards_variant";
  DROP TYPE "public"."enum__stories_v_blocks_story_cards_bottom_button_link_type";
  DROP TYPE "public"."enum__stories_v_blocks_story_cards_bottom_button_button_type";
  DROP TYPE "public"."enum__stories_v_blocks_story_cards_bottom_button_button_color";
  DROP TYPE "public"."enum__stories_v_blocks_story_cards_bottom_button_text_color";
  DROP TYPE "public"."enum__stories_v_blocks_image_grid_items_link_link_type";
  DROP TYPE "public"."enum__stories_v_blocks_image_grid_background_color";
  DROP TYPE "public"."enum__stories_v_blocks_image_grid_columns";
  DROP TYPE "public"."enum__stories_v_version_status";
  DROP TYPE "public"."enum__stories_v_published_locale";
  DROP TYPE "public"."enum_story_categories_color";
  DROP TYPE "public"."enum_story_categories_text_color";
  DROP TYPE "public"."enum_exports_format";
  DROP TYPE "public"."enum_exports_sort_order";
  DROP TYPE "public"."enum_exports_locale";
  DROP TYPE "public"."enum_exports_drafts";
  DROP TYPE "public"."enum_imports_import_mode";
  DROP TYPE "public"."enum_imports_status";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_dd_links_link_link_type";
  DROP TYPE "public"."enum_dd_links_link_button_type";
  DROP TYPE "public"."enum_dd_links_link_button_color";
  DROP TYPE "public"."enum_dd_links_link_text_color";
  DROP TYPE "public"."enum_nav_items_type";
  DROP TYPE "public"."enum_nav_items_link_config_link_type";
  DROP TYPE "public"."enum_nav_items_link_config_button_type";
  DROP TYPE "public"."enum_nav_items_link_config_button_color";
  DROP TYPE "public"."enum_nav_items_link_config_text_color";
  DROP TYPE "public"."enum_nav_items_dropdown_label_link_link_type";
  DROP TYPE "public"."enum_nav_items_dropdown_label_link_button_type";
  DROP TYPE "public"."enum_nav_items_dropdown_label_link_button_color";
  DROP TYPE "public"."enum_nav_items_dropdown_label_link_text_color";
  DROP TYPE "public"."enum_nav_buttons_link_link_type";
  DROP TYPE "public"."enum_nav_buttons_link_button_type";
  DROP TYPE "public"."enum_nav_buttons_link_button_color";
  DROP TYPE "public"."enum_nav_buttons_link_text_color";
  DROP TYPE "public"."enum_header_status";
  DROP TYPE "public"."enum__dd_links_v_link_link_type";
  DROP TYPE "public"."enum__dd_links_v_link_button_type";
  DROP TYPE "public"."enum__dd_links_v_link_button_color";
  DROP TYPE "public"."enum__dd_links_v_link_text_color";
  DROP TYPE "public"."enum__nav_items_v_type";
  DROP TYPE "public"."enum__nav_items_v_link_config_link_type";
  DROP TYPE "public"."enum__nav_items_v_link_config_button_type";
  DROP TYPE "public"."enum__nav_items_v_link_config_button_color";
  DROP TYPE "public"."enum__nav_items_v_link_config_text_color";
  DROP TYPE "public"."enum__nav_items_v_dropdown_label_link_link_type";
  DROP TYPE "public"."enum__nav_items_v_dropdown_label_link_button_type";
  DROP TYPE "public"."enum__nav_items_v_dropdown_label_link_button_color";
  DROP TYPE "public"."enum__nav_items_v_dropdown_label_link_text_color";
  DROP TYPE "public"."enum__nav_buttons_v_link_link_type";
  DROP TYPE "public"."enum__nav_buttons_v_link_button_type";
  DROP TYPE "public"."enum__nav_buttons_v_link_button_color";
  DROP TYPE "public"."enum__nav_buttons_v_link_text_color";
  DROP TYPE "public"."enum__header_v_version_status";
  DROP TYPE "public"."enum__header_v_published_locale";
  DROP TYPE "public"."enum_footer_social_links_link_link_type";
  DROP TYPE "public"."enum_footer_social_links_link_button_type";
  DROP TYPE "public"."enum_footer_social_links_link_button_color";
  DROP TYPE "public"."enum_footer_social_links_link_text_color";
  DROP TYPE "public"."enum_footer_nav_buttons_link_link_type";
  DROP TYPE "public"."enum_footer_nav_buttons_link_button_type";
  DROP TYPE "public"."enum_footer_nav_buttons_link_button_color";
  DROP TYPE "public"."enum_footer_nav_buttons_link_text_color";
  DROP TYPE "public"."enum_footer_nav_groups_nav_items_link_link_type";
  DROP TYPE "public"."enum_footer_nav_groups_nav_items_link_button_type";
  DROP TYPE "public"."enum_footer_nav_groups_nav_items_link_button_color";
  DROP TYPE "public"."enum_footer_nav_groups_nav_items_link_text_color";
  DROP TYPE "public"."enum_footer_status";
  DROP TYPE "public"."enum__footer_v_version_social_links_link_link_type";
  DROP TYPE "public"."enum__footer_v_version_social_links_link_button_type";
  DROP TYPE "public"."enum__footer_v_version_social_links_link_button_color";
  DROP TYPE "public"."enum__footer_v_version_social_links_link_text_color";
  DROP TYPE "public"."enum__footer_v_version_nav_buttons_link_link_type";
  DROP TYPE "public"."enum__footer_v_version_nav_buttons_link_button_type";
  DROP TYPE "public"."enum__footer_v_version_nav_buttons_link_button_color";
  DROP TYPE "public"."enum__footer_v_version_nav_buttons_link_text_color";
  DROP TYPE "public"."enum__footer_v_version_nav_groups_nav_items_link_link_type";
  DROP TYPE "public"."enum__footer_v_version_nav_groups_nav_items_link_button_type";
  DROP TYPE "public"."enum__footer_v_version_nav_groups_nav_items_link_button_color";
  DROP TYPE "public"."enum__footer_v_version_nav_groups_nav_items_link_text_color";
  DROP TYPE "public"."enum__footer_v_version_status";
  DROP TYPE "public"."enum__footer_v_published_locale";
  DROP TYPE "public"."enum_announcement_bar_link_link_type";
  DROP TYPE "public"."enum_announcement_bar_link_button_type";
  DROP TYPE "public"."enum_announcement_bar_link_button_color";
  DROP TYPE "public"."enum_announcement_bar_link_text_color";
  DROP TYPE "public"."enum_announcement_bar_text_color";
  DROP TYPE "public"."enum_announcement_bar_background_color";
  DROP TYPE "public"."enum_stories_page_status";
  DROP TYPE "public"."enum__stories_page_v_version_status";
  DROP TYPE "public"."enum__stories_page_v_published_locale";`)
}
