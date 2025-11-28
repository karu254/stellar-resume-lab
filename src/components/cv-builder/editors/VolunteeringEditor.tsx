import { useCV } from '@/context/CVContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Volunteering } from '@/types/cv';

export function VolunteeringEditor() {
  const { cvData, dispatch } = useCV();
  const { volunteering } = cvData;

  const addVolunteering = () => {
    const newVol: Volunteering = {
      id: uuidv4(),
      organization: '',
      role: '',
      startDate: '',
      endDate: '',
      bullets: [''],
    };
    dispatch({ type: 'UPDATE_VOLUNTEERING', payload: [...volunteering, newVol] });
  };

  const updateVolunteering = (id: string, field: string, value: unknown) => {
    dispatch({
      type: 'UPDATE_VOLUNTEERING',
      payload: volunteering.map((vol) =>
        vol.id === id ? { ...vol, [field]: value } : vol
      ),
    });
  };

  const removeVolunteering = (id: string) => {
    dispatch({
      type: 'UPDATE_VOLUNTEERING',
      payload: volunteering.filter((vol) => vol.id !== id),
    });
  };

  const addBullet = (volId: string) => {
    const vol = volunteering.find((v) => v.id === volId);
    if (vol) {
      updateVolunteering(volId, 'bullets', [...vol.bullets, '']);
    }
  };

  const updateBullet = (volId: string, bulletIndex: number, value: string) => {
    const vol = volunteering.find((v) => v.id === volId);
    if (vol) {
      const newBullets = [...vol.bullets];
      newBullets[bulletIndex] = value;
      updateVolunteering(volId, 'bullets', newBullets);
    }
  };

  const removeBullet = (volId: string, bulletIndex: number) => {
    const vol = volunteering.find((v) => v.id === volId);
    if (vol && vol.bullets.length > 1) {
      const newBullets = vol.bullets.filter((_, i) => i !== bulletIndex);
      updateVolunteering(volId, 'bullets', newBullets);
    }
  };

  return (
    <div className="space-y-4">
      {volunteering.map((vol, index) => (
        <div
          key={vol.id}
          className="p-3 bg-secondary/30 rounded-lg space-y-3 relative group"
        >
          <div className="flex items-start justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Volunteer Experience {index + 1}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeVolunteering(vol.id)}
              className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <Label className="text-xs text-muted-foreground">Organization</Label>
              <Input
                value={vol.organization}
                onChange={(e) => updateVolunteering(vol.id, 'organization', e.target.value)}
                placeholder="Organization Name"
                className="mt-1"
              />
            </div>

            <div className="col-span-2">
              <Label className="text-xs text-muted-foreground">Role</Label>
              <Input
                value={vol.role}
                onChange={(e) => updateVolunteering(vol.id, 'role', e.target.value)}
                placeholder="Volunteer Role"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Start Date</Label>
              <Input
                type="month"
                value={vol.startDate}
                onChange={(e) => updateVolunteering(vol.id, 'startDate', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">End Date</Label>
              <Input
                type="month"
                value={vol.endDate}
                onChange={(e) => updateVolunteering(vol.id, 'endDate', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Activities</Label>
            <div className="space-y-2 mt-2">
              {vol.bullets.map((bullet, bulletIndex) => (
                <div key={bulletIndex} className="flex gap-2">
                  <span className="text-muted-foreground mt-2">•</span>
                  <Textarea
                    value={bullet}
                    onChange={(e) => updateBullet(vol.id, bulletIndex, e.target.value)}
                    placeholder="Describe your contributions..."
                    className="min-h-[60px] resize-none flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBullet(vol.id, bulletIndex)}
                    disabled={vol.bullets.length <= 1}
                    className="h-8 w-8 p-0 mt-1"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addBullet(vol.id)}
                className="text-xs"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add bullet point
              </Button>
            </div>
          </div>
        </div>
      ))}

      <Button variant="outline" size="sm" onClick={addVolunteering} className="w-full">
        <Plus className="w-4 h-4 mr-1" />
        Add Volunteering
      </Button>
    </div>
  );
}
