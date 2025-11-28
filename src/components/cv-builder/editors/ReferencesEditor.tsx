import { useCV } from '@/context/CVContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Reference } from '@/types/cv';

export function ReferencesEditor() {
  const { cvData, dispatch } = useCV();
  const { references } = cvData;

  const addReference = () => {
    const newRef: Reference = {
      id: uuidv4(),
      name: '',
      position: '',
      company: '',
      email: '',
      phone: '',
    };
    dispatch({ type: 'UPDATE_REFERENCES', payload: [...references, newRef] });
  };

  const updateReference = (id: string, field: string, value: string) => {
    dispatch({
      type: 'UPDATE_REFERENCES',
      payload: references.map((ref) =>
        ref.id === id ? { ...ref, [field]: value } : ref
      ),
    });
  };

  const removeReference = (id: string) => {
    dispatch({
      type: 'UPDATE_REFERENCES',
      payload: references.filter((ref) => ref.id !== id),
    });
  };

  return (
    <div className="space-y-4">
      {references.map((ref, index) => (
        <div
          key={ref.id}
          className="p-3 bg-secondary/30 rounded-lg space-y-3 relative group"
        >
          <div className="flex items-start justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Reference {index + 1}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeReference(ref.id)}
              className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <Label className="text-xs text-muted-foreground">Name</Label>
              <Input
                value={ref.name}
                onChange={(e) => updateReference(ref.id, 'name', e.target.value)}
                placeholder="Reference Name"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Position</Label>
              <Input
                value={ref.position}
                onChange={(e) => updateReference(ref.id, 'position', e.target.value)}
                placeholder="Job Title"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Company</Label>
              <Input
                value={ref.company}
                onChange={(e) => updateReference(ref.id, 'company', e.target.value)}
                placeholder="Company Name"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Email</Label>
              <Input
                value={ref.email}
                onChange={(e) => updateReference(ref.id, 'email', e.target.value)}
                placeholder="email@example.com"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Phone</Label>
              <Input
                value={ref.phone}
                onChange={(e) => updateReference(ref.id, 'phone', e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="mt-1"
              />
            </div>
          </div>
        </div>
      ))}

      <Button variant="outline" size="sm" onClick={addReference} className="w-full">
        <Plus className="w-4 h-4 mr-1" />
        Add Reference
      </Button>
    </div>
  );
}
