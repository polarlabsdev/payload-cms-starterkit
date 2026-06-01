import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_info_block_actions_action_type" AS ENUM('link', 'email');
  CREATE TYPE "public"."enum_pages_blocks_info_block_actions_link_link_type" AS ENUM('manual', 'relation');
  CREATE TYPE "public"."enum_pages_blocks_info_block_actions_link_button_type" AS ENUM('default', 'secondary', 'destructive', 'outline', 'ghost', 'link', 'brand');
  CREATE TYPE "public"."enum_pages_blocks_info_block_actions_link_button_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_pages_blocks_info_block_actions_link_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum_pages_blocks_info_block_background_color" AS ENUM('Background', 'Foreground', 'Card', 'Card Foreground', 'Primary', 'Primary Foreground', 'Secondary', 'Secondary Foreground', 'Muted', 'Muted Foreground', 'Accent', 'Accent Foreground', 'Destructive', 'Destructive Foreground', 'Success', 'Success Foreground', 'Warning', 'Warning Foreground', 'Border');
  CREATE TYPE "public"."enum_pages_blocks_info_block_theme" AS ENUM('default', 'info', 'success', 'error', 'partial');
  CREATE TYPE "public"."enum__pages_v_blocks_info_block_actions_action_type" AS ENUM('link', 'email');
  CREATE TYPE "public"."enum__pages_v_blocks_info_block_actions_link_link_type" AS ENUM('manual', 'relation');
  CREATE TYPE "public"."enum__pages_v_blocks_info_block_actions_link_button_type" AS ENUM('default', 'secondary', 'destructive', 'outline', 'ghost', 'link', 'brand');
  CREATE TYPE "public"."enum__pages_v_blocks_info_block_actions_link_button_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__pages_v_blocks_info_block_actions_link_text_color" AS ENUM('White', 'Black', 'Yellow', 'Red', 'Purple', 'Blue', 'Pink', 'Teal', 'Dark Purple', 'Orange', 'Dark Green', 'Dark Red');
  CREATE TYPE "public"."enum__pages_v_blocks_info_block_background_color" AS ENUM('Background', 'Foreground', 'Card', 'Card Foreground', 'Primary', 'Primary Foreground', 'Secondary', 'Secondary Foreground', 'Muted', 'Muted Foreground', 'Accent', 'Accent Foreground', 'Destructive', 'Destructive Foreground', 'Success', 'Success Foreground', 'Warning', 'Warning Foreground', 'Border');
  CREATE TYPE "public"."enum__pages_v_blocks_info_block_theme" AS ENUM('default', 'info', 'success', 'error', 'partial');
  CREATE TABLE "pages_blocks_info_block_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"action_type" "enum_pages_blocks_info_block_actions_action_type" DEFAULT 'link',
  	"link_link_type" "enum_pages_blocks_info_block_actions_link_link_type" DEFAULT 'manual',
  	"link_url" varchar,
  	"link_button_type" "enum_pages_blocks_info_block_actions_link_button_type" DEFAULT 'link',
  	"link_button_color" "enum_pages_blocks_info_block_actions_link_button_color" DEFAULT 'Teal',
  	"link_text_color" "enum_pages_blocks_info_block_actions_link_text_color" DEFAULT 'White',
  	"link_new_tab" boolean DEFAULT false,
  	"email_details_to" varchar
  );
  
  CREATE TABLE "pages_blocks_info_block_actions_locales" (
  	"label" varchar,
  	"link_label" varchar,
  	"email_details_subject" varchar,
  	"email_details_body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_info_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_pages_blocks_info_block_background_color" DEFAULT 'Background',
  	"theme" "enum_pages_blocks_info_block_theme" DEFAULT 'default',
  	"icon" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_info_block_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_info_block_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"action_type" "enum__pages_v_blocks_info_block_actions_action_type" DEFAULT 'link',
  	"link_link_type" "enum__pages_v_blocks_info_block_actions_link_link_type" DEFAULT 'manual',
  	"link_url" varchar,
  	"link_button_type" "enum__pages_v_blocks_info_block_actions_link_button_type" DEFAULT 'link',
  	"link_button_color" "enum__pages_v_blocks_info_block_actions_link_button_color" DEFAULT 'Teal',
  	"link_text_color" "enum__pages_v_blocks_info_block_actions_link_text_color" DEFAULT 'White',
  	"link_new_tab" boolean DEFAULT false,
  	"email_details_to" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_info_block_actions_locales" (
  	"label" varchar,
  	"link_label" varchar,
  	"email_details_subject" varchar,
  	"email_details_body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_info_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__pages_v_blocks_info_block_background_color" DEFAULT 'Background',
  	"theme" "enum__pages_v_blocks_info_block_theme" DEFAULT 'default',
  	"icon" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_info_block_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_info_block_actions" ADD CONSTRAINT "pages_blocks_info_block_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_info_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_info_block_actions_locales" ADD CONSTRAINT "pages_blocks_info_block_actions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_info_block_actions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_info_block" ADD CONSTRAINT "pages_blocks_info_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_info_block_locales" ADD CONSTRAINT "pages_blocks_info_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_info_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_info_block_actions" ADD CONSTRAINT "_pages_v_blocks_info_block_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_info_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_info_block_actions_locales" ADD CONSTRAINT "_pages_v_blocks_info_block_actions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_info_block_actions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_info_block" ADD CONSTRAINT "_pages_v_blocks_info_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_info_block_locales" ADD CONSTRAINT "_pages_v_blocks_info_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_info_block"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_info_block_actions_order_idx" ON "pages_blocks_info_block_actions" USING btree ("_order");
  CREATE INDEX "pages_blocks_info_block_actions_parent_id_idx" ON "pages_blocks_info_block_actions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_info_block_actions_locales_locale_parent_id_uni" ON "pages_blocks_info_block_actions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_info_block_order_idx" ON "pages_blocks_info_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_info_block_parent_id_idx" ON "pages_blocks_info_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_info_block_path_idx" ON "pages_blocks_info_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_info_block_locales_locale_parent_id_unique" ON "pages_blocks_info_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_info_block_actions_order_idx" ON "_pages_v_blocks_info_block_actions" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_info_block_actions_parent_id_idx" ON "_pages_v_blocks_info_block_actions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_info_block_actions_locales_locale_parent_id_" ON "_pages_v_blocks_info_block_actions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_info_block_order_idx" ON "_pages_v_blocks_info_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_info_block_parent_id_idx" ON "_pages_v_blocks_info_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_info_block_path_idx" ON "_pages_v_blocks_info_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_info_block_locales_locale_parent_id_unique" ON "_pages_v_blocks_info_block_locales" USING btree ("_locale","_parent_id");`);
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_info_block_actions" CASCADE;
  DROP TABLE "pages_blocks_info_block_actions_locales" CASCADE;
  DROP TABLE "pages_blocks_info_block" CASCADE;
  DROP TABLE "pages_blocks_info_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_info_block_actions" CASCADE;
  DROP TABLE "_pages_v_blocks_info_block_actions_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_info_block" CASCADE;
  DROP TABLE "_pages_v_blocks_info_block_locales" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_info_block_actions_action_type";
  DROP TYPE "public"."enum_pages_blocks_info_block_actions_link_link_type";
  DROP TYPE "public"."enum_pages_blocks_info_block_actions_link_button_type";
  DROP TYPE "public"."enum_pages_blocks_info_block_actions_link_button_color";
  DROP TYPE "public"."enum_pages_blocks_info_block_actions_link_text_color";
  DROP TYPE "public"."enum_pages_blocks_info_block_background_color";
  DROP TYPE "public"."enum_pages_blocks_info_block_theme";
  DROP TYPE "public"."enum__pages_v_blocks_info_block_actions_action_type";
  DROP TYPE "public"."enum__pages_v_blocks_info_block_actions_link_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_info_block_actions_link_button_type";
  DROP TYPE "public"."enum__pages_v_blocks_info_block_actions_link_button_color";
  DROP TYPE "public"."enum__pages_v_blocks_info_block_actions_link_text_color";
  DROP TYPE "public"."enum__pages_v_blocks_info_block_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_info_block_theme";`);
}
