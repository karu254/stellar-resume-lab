import { useState, useRef } from 'react';
import { CVProvider, useCV } from '@/context/CVContext';
import { EditorPanel } from '@/components/cv-builder/EditorPanel';
import { CVPreview } from '@/components/cv-builder/CVPreview';
import { ExportButton } from '@/components/cv-builder/ExportButton';
import { Button } from '@/components/ui/button';
import { FileText, Eye, Edit3, RotateCcw, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { defaultCVData } from '@/types/cv';

function CVBuilderContent() {
  const [showPreview, setShowPreview] = useState(true);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { dispatch } = useCV();
  const { toast } = useToast();

  const handleReset = () => {
    dispatch({ type: 'SET_CV_DATA', payload: defaultCVData });
    toast({
      title: 'CV Reset',
      description: 'Your CV has been reset to the default template.',
    });
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary-foreground" />
            </div>
            <h1 className="font-semibold text-lg hidden sm:block">CV Builder</h1>
          </div>
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-muted-foreground"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? (
              <>
                <Edit3 className="w-4 h-4 mr-1" />
                Editor Only
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-1" />
                Show Preview
              </>
            )}
          </Button>
          <ExportButton />
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <ExportButton />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-b border-border p-4 animate-fade-in">
          <div className="flex flex-col gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="justify-start"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset to Default
            </Button>
          </div>
        </div>
      )}

      {/* Mobile view toggle */}
      <div className="md:hidden flex border-b border-border bg-card">
        <button
          onClick={() => setMobileView('editor')}
          className={cn(
            'flex-1 py-3 text-sm font-medium transition-colors',
            mobileView === 'editor'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground'
          )}
        >
          <Edit3 className="w-4 h-4 inline mr-1" />
          Editor
        </button>
        <button
          onClick={() => setMobileView('preview')}
          className={cn(
            'flex-1 py-3 text-sm font-medium transition-colors',
            mobileView === 'preview'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground'
          )}
        >
          <Eye className="w-4 h-4 inline mr-1" />
          Preview
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Panel - Desktop */}
        <div
          className={cn(
            'hidden md:flex flex-col border-r border-border transition-all duration-300',
            showPreview ? 'w-[420px]' : 'w-full max-w-3xl mx-auto'
          )}
        >
          <EditorPanel />
        </div>

        {/* Editor Panel - Mobile */}
        <div
          className={cn(
            'md:hidden flex-1',
            mobileView === 'editor' ? 'block' : 'hidden'
          )}
        >
          <EditorPanel />
        </div>

        {/* Preview Panel - Desktop */}
        {showPreview && (
          <div className="hidden md:flex flex-1 bg-muted overflow-auto p-6">
            <div className="mx-auto">
              <div className="sticky top-0">
                <div className="transform scale-[0.7] origin-top">
                  <CVPreview />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preview Panel - Mobile */}
        <div
          className={cn(
            'md:hidden flex-1 bg-muted overflow-auto p-4',
            mobileView === 'preview' ? 'block' : 'hidden'
          )}
        >
          <div className="transform scale-[0.45] origin-top">
            <CVPreview />
          </div>
        </div>
      </div>
    </div>
  );
}

const Index = () => {
  return (
    <CVProvider>
      <CVBuilderContent />
    </CVProvider>
  );
};

export default Index;
