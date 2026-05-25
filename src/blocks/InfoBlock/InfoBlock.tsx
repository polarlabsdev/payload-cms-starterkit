import React from 'react';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import type { InfoBlock as InfoBlockType } from '@/payload-types';
import { RichText } from '@/components/RichText';
import { cn } from '@/lib/utils';
import { getLinkUrl } from '@/fields/link/utils';
import type { CustomLinkType } from '@/fields/link/config';
import { Icon } from '@/components/ui/Icon';
import { TAILWIND_THEME_COLORS, type TailwindThemeColorKey } from '@/lib/colors';
import { Button } from '@/components/ui/Button';

/**
 * THEME CONFIGURATION
 * Buttons are now "Decent": Muted Slate/Charcoal across all themes.
 * Container & Icon handle the subtle color communication.
 */
export type Variant = 'default' | 'info' | 'success' | 'error' | 'partial' | 'loading';
type Theme = Exclude<Variant, 'loading'>;

const INFO_BLOCK_THEMES: Record<Theme, { container: string; button: string; icon: string }> = {
  default: {
    container:
      'bg-slate-500/[0.04] border-slate-500/10 dark:bg-slate-400/[0.04] dark:border-slate-400/15',
    button:
      'bg-slate-800 text-white hover:bg-slate-900 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-white',
    icon: 'text-slate-400 dark:text-slate-500',
  },
  info: {
    container:
      'bg-blue-500/[0.05] border-blue-500/20 dark:bg-blue-400/[0.05] dark:border-blue-400/20',
    button:
      'bg-slate-800 text-white hover:bg-blue-900 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-blue-100',
    icon: 'text-blue-500 dark:text-blue-400',
  },
  success: {
    container:
      'bg-emerald-500/[0.05] border-emerald-500/20 dark:bg-emerald-400/[0.05] dark:border-emerald-400/20',
    button:
      'bg-slate-800 text-white hover:bg-emerald-900 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-emerald-100',
    icon: 'text-emerald-500 dark:text-emerald-400',
  },
  error: {
    container: 'bg-red-500/[0.05] border-red-500/20 dark:bg-red-400/[0.05] dark:border-red-400/20',
    button:
      'bg-slate-800 text-white hover:bg-red-900 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-red-100',
    icon: 'text-red-500 dark:text-red-400',
  },
  partial: {
    container:
      'bg-amber-500/[0.05] border-amber-500/20 dark:bg-amber-400/[0.05] dark:border-amber-400/20',
    button:
      'bg-slate-800 text-white hover:bg-amber-900 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-amber-100',
    icon: 'text-amber-500 dark:text-amber-400',
  },
};

const resolveAction = (action: NonNullable<InfoBlockType['actions']>[number]) => {
  const label = action.label || '';
  if (action.actionType === 'email') {
    const { to = '', subject = '', body = '' } = action.emailDetails || {};
    const params = new URLSearchParams();
    if (subject) params.set('subject', subject);
    if (body) params.set('body', body);
    let paramString = params.toString();
    // Replace + with %20 for spaces in mailto query params
    if (paramString) {
      paramString = paramString.replace(/\+/g, '%20');
    }
    const href = `mailto:${to}${paramString ? `?${paramString}` : ''}`;
    return { href, label };
  }
  return {
    href: action.link ? getLinkUrl(action.link as CustomLinkType) : '#',
    label,
  };
};

export const InfoBlockComponent: React.FC<InfoBlockType> = ({
  backgroundColor,
  theme,
  icon,
  content,
  actions,
}) => {
  const resolvedTheme = (theme as Theme) ?? 'default';
  const styles = INFO_BLOCK_THEMES[resolvedTheme];
  const bgSectionClass = TAILWIND_THEME_COLORS[backgroundColor as TailwindThemeColorKey];

  return (
    <section className={cn('py-20', bgSectionClass)}>
      <div className="container">
        <div
          className={cn(
            'mx-auto max-w-4xl rounded-3xl border p-8 shadow-sm transition-all duration-300',
            styles.container,
          )}
        >
          {/* Header Icon */}
          {icon && (
            <div className="mb-6">
              <Icon
                iconName={icon}
                iconSize="2xl"
                backgroundSize="none"
                align="start"
                iconClassName={styles.icon}
              />
            </div>
          )}

          {/* Main Content */}
          {content && (
            <div className="prose prose-slate max-w-none text-slate-800 dark:prose-invert prose-p:leading-relaxed dark:text-slate-200">
              <RichText data={content as SerializedEditorState} />
            </div>
          )}

          {/* Action Buttons */}
          {actions && actions.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-4">
              {actions.map((action) => {
                const { href, label } = resolveAction(action);
                return (
                  <Button
                    key={action.id}
                    asChild
                    shape="pill"
                    className={cn(
                      'px-8 py-2.5 font-bold shadow-md transition-all active:scale-95',
                      styles.button,
                    )}
                  >
                    <a href={href}>{label}</a>
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
