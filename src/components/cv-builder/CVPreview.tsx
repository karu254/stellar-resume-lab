import { forwardRef } from 'react';
import { useCV } from '@/context/CVContext';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { TwoColumnTemplate } from './templates/TwoColumnTemplate';
import { CorporateTemplate } from './templates/CorporateTemplate';

interface CVPreviewProps {
  isPrintMode?: boolean;
}

export const CVPreview = forwardRef<HTMLDivElement, CVPreviewProps>(
  ({ isPrintMode = false }, ref) => {
    const { cvData } = useCV();
    const { template } = cvData.styles;

    const renderTemplate = () => {
      switch (template) {
        case 'minimal':
          return <MinimalTemplate data={cvData} isPrintMode={isPrintMode} />;
        case 'two-column':
          return <TwoColumnTemplate data={cvData} isPrintMode={isPrintMode} />;
        case 'corporate':
          return <CorporateTemplate data={cvData} isPrintMode={isPrintMode} />;
        default:
          return <MinimalTemplate data={cvData} isPrintMode={isPrintMode} />;
      }
    };

    return (
      <div ref={ref} className={isPrintMode ? '' : 'flex justify-center'}>
        {renderTemplate()}
      </div>
    );
  }
);

CVPreview.displayName = 'CVPreview';
