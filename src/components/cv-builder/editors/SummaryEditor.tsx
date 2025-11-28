import { useCV } from '@/context/CVContext';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export function SummaryEditor() {
  const { cvData, dispatch } = useCV();

  return (
    <div>
      <Label className="text-xs text-muted-foreground">Professional Summary</Label>
      <Textarea
        value={cvData.summary.content}
        onChange={(e) => dispatch({ type: 'UPDATE_SUMMARY', payload: e.target.value })}
        placeholder="Write a compelling summary of your professional background..."
        className="mt-1 min-h-[100px] resize-none"
      />
      <p className="text-xs text-muted-foreground mt-1">
        {cvData.summary.content.length} / 500 characters
      </p>
    </div>
  );
}
