import { ReactNode } from 'react';
import { ChevronDown, ChevronUp, GripVertical, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

interface EditorSectionProps {
  title: string;
  enabled: boolean;
  onToggleEnabled: () => void;
  isOpen: boolean;
  onToggleOpen: () => void;
  children: ReactNode;
  dragHandleProps?: Record<string, unknown>;
  isDragging?: boolean;
}

export function EditorSection({
  title,
  enabled,
  onToggleEnabled,
  isOpen,
  onToggleOpen,
  children,
  dragHandleProps,
  isDragging,
}: EditorSectionProps) {
  return (
    <div
      className={cn(
        'bg-editor-card rounded-lg border border-editor-border transition-all duration-200',
        isDragging && 'shadow-lg ring-2 ring-primary/20',
        !enabled && 'opacity-60'
      )}
    >
      <div className="flex items-center gap-2 p-3">
        <div
          {...dragHandleProps}
          className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors"
        >
          <GripVertical className="w-4 h-4" />
        </div>

        <Collapsible open={isOpen} onOpenChange={onToggleOpen} className="flex-1">
          <div className="flex items-center justify-between">
            <CollapsibleTrigger asChild>
              <button className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                {title}
              </button>
            </CollapsibleTrigger>

            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onToggleEnabled();
              }}
              className="h-7 px-2"
            >
              {enabled ? (
                <Eye className="w-4 h-4 text-primary" />
              ) : (
                <EyeOff className="w-4 h-4 text-muted-foreground" />
              )}
            </Button>
          </div>

          <CollapsibleContent className="mt-3 pt-3 border-t border-editor-border">
            {children}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
