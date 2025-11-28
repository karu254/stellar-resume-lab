import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { useCV } from '@/context/CVContext';
import { useToast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CVPreview } from './CVPreview';
import { createRoot } from 'react-dom/client';
import { CVProvider } from '@/context/CVContext';

export function ExportButton() {
  const [isExporting, setIsExporting] = useState(false);
  const { cvData } = useCV();
  const { toast } = useToast();

  const exportToPDF = async () => {
    setIsExporting(true);

    try {
      // Create a hidden container for rendering
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.style.width = '794px';
      document.body.appendChild(container);

      // Create wrapper for React component
      const wrapper = document.createElement('div');
      container.appendChild(wrapper);

      // Render the CV preview
      const root = createRoot(wrapper);
      
      await new Promise<void>((resolve) => {
        root.render(
          <CVProvider>
            <CVPreviewForExport data={cvData} onReady={resolve} />
          </CVProvider>
        );
      });

      // Wait for fonts and images to load
      await new Promise((resolve) => setTimeout(resolve, 500));

      const cvElement = container.querySelector('.cv-export-target') as HTMLElement;
      
      if (!cvElement) {
        throw new Error('CV element not found');
      }

      // Use html2canvas with specific settings for best quality
      const canvas = await html2canvas(cvElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${cvData.personalInfo.fullName.replace(/\s+/g, '_')}_CV.pdf`);

      // Cleanup
      root.unmount();
      document.body.removeChild(container);

      toast({
        title: 'PDF exported successfully!',
        description: 'Your CV has been downloaded.',
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: 'Export failed',
        description: 'There was an error exporting your CV. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button onClick={exportToPDF} disabled={isExporting} className="gap-2">
      {isExporting ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Exporting...
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          Download PDF
        </>
      )}
    </Button>
  );
}

// Separate component for export that receives data directly
import { CVData } from '@/types/cv';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { TwoColumnTemplate } from './templates/TwoColumnTemplate';
import { CorporateTemplate } from './templates/CorporateTemplate';
import { useEffect } from 'react';

function CVPreviewForExport({ data, onReady }: { data: CVData; onReady: () => void }) {
  useEffect(() => {
    onReady();
  }, [onReady]);

  const { template } = data.styles;

  const renderTemplate = () => {
    switch (template) {
      case 'minimal':
        return <MinimalTemplate data={data} isPrintMode={true} />;
      case 'two-column':
        return <TwoColumnTemplate data={data} isPrintMode={true} />;
      case 'corporate':
        return <CorporateTemplate data={data} isPrintMode={true} />;
      default:
        return <MinimalTemplate data={data} isPrintMode={true} />;
    }
  };

  return <div className="cv-export-target">{renderTemplate()}</div>;
}
