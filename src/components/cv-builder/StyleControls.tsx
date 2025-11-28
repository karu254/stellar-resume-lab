import { useCV } from '@/context/CVContext';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const templates = [
  { id: 'minimal', name: 'Minimal Clean', description: 'Single column, clean & ATS-friendly' },
  { id: 'two-column', name: 'Professional', description: 'Two-column modern layout' },
  { id: 'corporate', name: 'Corporate', description: 'Elegant executive style' },
] as const;

const fonts = [
  { id: 'inter', name: 'Inter', class: 'cv-font-inter' },
  { id: 'merriweather', name: 'Merriweather', class: 'cv-font-merriweather' },
  { id: 'roboto', name: 'Roboto', class: 'cv-font-roboto' },
  { id: 'lato', name: 'Lato', class: 'cv-font-lato' },
  { id: 'opensans', name: 'Open Sans', class: 'cv-font-opensans' },
] as const;

const accentColors = [
  '#3b82f6', // Blue
  '#10b981', // Emerald
  '#8b5cf6', // Purple
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#06b6d4', // Cyan
  '#64748b', // Slate
  '#000000', // Black
];

export function StyleControls() {
  const { cvData, dispatch } = useCV();
  const { styles } = cvData;

  const updateStyle = (key: string, value: string) => {
    dispatch({ type: 'UPDATE_STYLES', payload: { [key]: value } });
  };

  return (
    <div className="space-y-5">
      {/* Template Selection */}
      <div>
        <Label className="text-xs text-muted-foreground mb-2 block">Template</Label>
        <div className="grid grid-cols-3 gap-2">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => updateStyle('template', template.id)}
              className={cn(
                'p-3 rounded-lg border-2 transition-all text-left',
                styles.template === template.id
                  ? 'border-primary bg-primary/5'
                  : 'border-editor-border hover:border-primary/50'
              )}
            >
              <div className="text-xs font-medium">{template.name}</div>
              <div className="text-[10px] text-muted-foreground mt-1">{template.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Font Selection */}
      <div>
        <Label className="text-xs text-muted-foreground">Font Family</Label>
        <Select value={styles.fontFamily} onValueChange={(v) => updateStyle('fontFamily', v)}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fonts.map((font) => (
              <SelectItem key={font.id} value={font.id} className={font.class}>
                {font.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Font Size */}
      <div>
        <Label className="text-xs text-muted-foreground">Font Size</Label>
        <Select value={styles.fontSize} onValueChange={(v) => updateStyle('fontSize', v)}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Accent Color */}
      <div>
        <Label className="text-xs text-muted-foreground mb-2 block">Accent Color</Label>
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            {accentColors.map((color) => (
              <button
                key={color}
                onClick={() => updateStyle('accentColor', color)}
                className={cn(
                  'w-6 h-6 rounded-full transition-transform hover:scale-110',
                  styles.accentColor === color && 'ring-2 ring-offset-2 ring-primary'
                )}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <Input
            type="color"
            value={styles.accentColor}
            onChange={(e) => updateStyle('accentColor', e.target.value)}
            className="w-8 h-8 p-0 border-0 cursor-pointer"
          />
        </div>
      </div>

      {/* Spacing */}
      <div>
        <Label className="text-xs text-muted-foreground">Spacing</Label>
        <Select value={styles.spacing} onValueChange={(v) => updateStyle('spacing', v)}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="compact">Compact</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="relaxed">Relaxed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
