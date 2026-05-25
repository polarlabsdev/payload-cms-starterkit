import React, { Fragment } from 'react';
import { Footer } from '@/payload-types';
import { ThemeAwareImage } from '@/fields/themeAwareImage';
import { CustomLink } from '@/fields/link/CustomLink';
import { RichText } from '@/components/RichText';
import { cn } from '@/lib/utils';
import { CustomLinkType } from '@/fields/link/config';
import { Link } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';
import LanguageSelect from './LanguageSelect';

type FooterClientProps = {
  footer: Footer;
};

export const FooterClient: React.FC<FooterClientProps> = ({ footer }) => {
  const { logo, socialLinks, navButtons, navGroups, footerText } = footer;

  return (
    <Fragment>
      <div className="container">
        <div className="mb-8 flex flex-col items-start justify-between gap-8 sm:flex-row">
          <div className="flex items-center gap-6">
            {logo && (
              <Link href="/" className={cn('flex items-center')}>
                <div className={cn('relative h-10 w-auto')}>
                  <ThemeAwareImage
                    image={logo}
                    defaultAlt={'Site logo'}
                    className={cn('h-full w-auto object-contain')}
                    skeletonClassName={cn('h-full w-[100px]')}
                    priority
                  />
                </div>
              </Link>
            )}

            <div className="flex gap-3">
              {socialLinks?.map((item, index) => (
                <CustomLink key={`social-${index}`} link={item.link as CustomLinkType}>
                  <Icon
                    iconName={item.iconName}
                    iconSize="2xl"
                    backgroundSize="md"
                    iconColor="Black"
                    iconColorDark="White"
                  />
                </CustomLink>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            {navButtons?.map((button, index) => (
              <CustomLink
                key={`nav-button-${index}`}
                link={button.link as CustomLinkType}
                buttonSize="sm"
              />
            ))}
          </div>
        </div>

        <div
          className={cn('mb-8 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-4', {
            [`lg:grid-cols-${navGroups?.length}`]:
              navGroups && navGroups.length > 0 && navGroups.length <= 6,
          })}
        >
          {navGroups?.map((group, index) => (
            <div key={`nav-group-${index}`} className="flex flex-col">
              <h3 className="mb-4 font-bold">{group.label}</h3>
              <ul className="space-y-2">
                {group.navItems?.map((item, itemIndex) => (
                  <li key={`nav-item-${itemIndex}`}>
                    <CustomLink link={item.link as CustomLinkType} className="font-normal" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-8 border-t pt-8 sm:flex-row">
          <div className="max-w-full text-sm sm:max-w-[31.25rem]">
            {footerText && <RichText data={footerText} />}
          </div>

          <div>
            <LanguageSelect />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
