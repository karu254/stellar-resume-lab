import { useCV } from '@/context/CVContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Experience } from '@/types/cv';

export function ExperienceEditor() {
  const { cvData, dispatch } = useCV();
  const { experience } = cvData;

  const addExperience = () => {
    const newExp: Experience = {
      id: uuidv4(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      bullets: [''],
    };
    dispatch({ type: 'UPDATE_EXPERIENCE', payload: [...experience, newExp] });
  };

  const updateExperience = (id: string, field: string, value: unknown) => {
    dispatch({
      type: 'UPDATE_EXPERIENCE',
      payload: experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const removeExperience = (id: string) => {
    dispatch({
      type: 'UPDATE_EXPERIENCE',
      payload: experience.filter((exp) => exp.id !== id),
    });
  };

  const addBullet = (expId: string) => {
    const exp = experience.find((e) => e.id === expId);
    if (exp) {
      updateExperience(expId, 'bullets', [...exp.bullets, '']);
    }
  };

  const updateBullet = (expId: string, bulletIndex: number, value: string) => {
    const exp = experience.find((e) => e.id === expId);
    if (exp) {
      const newBullets = [...exp.bullets];
      newBullets[bulletIndex] = value;
      updateExperience(expId, 'bullets', newBullets);
    }
  };

  const removeBullet = (expId: string, bulletIndex: number) => {
    const exp = experience.find((e) => e.id === expId);
    if (exp && exp.bullets.length > 1) {
      const newBullets = exp.bullets.filter((_, i) => i !== bulletIndex);
      updateExperience(expId, 'bullets', newBullets);
    }
  };

  return (
    <div className="space-y-4">
      {experience.map((exp, index) => (
        <div
          key={exp.id}
          className="p-3 bg-secondary/30 rounded-lg space-y-3 relative group"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <GripVertical className="w-4 h-4" />
              <span className="text-xs font-medium">Position {index + 1}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeExperience(exp.id)}
              className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <Label className="text-xs text-muted-foreground">Position</Label>
              <Input
                value={exp.position}
                onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                placeholder="Software Engineer"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Company</Label>
              <Input
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                placeholder="Company Name"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Location</Label>
              <Input
                value={exp.location}
                onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                placeholder="City, State"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Start Date</Label>
              <Input
                type="month"
                value={exp.startDate}
                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">End Date</Label>
              <Input
                type="month"
                value={exp.endDate}
                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                disabled={exp.current}
                className="mt-1"
              />
            </div>

            <div className="col-span-2 flex items-center gap-2">
              <Checkbox
                id={`current-${exp.id}`}
                checked={exp.current}
                onCheckedChange={(checked) =>
                  updateExperience(exp.id, 'current', checked)
                }
              />
              <Label htmlFor={`current-${exp.id}`} className="text-xs cursor-pointer">
                Currently working here
              </Label>
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Achievements & Responsibilities</Label>
            <div className="space-y-2 mt-2">
              {exp.bullets.map((bullet, bulletIndex) => (
                <div key={bulletIndex} className="flex gap-2">
                  <span className="text-muted-foreground mt-2">•</span>
                  <Textarea
                    value={bullet}
                    onChange={(e) => updateBullet(exp.id, bulletIndex, e.target.value)}
                    placeholder="Describe your achievement..."
                    className="min-h-[60px] resize-none flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBullet(exp.id, bulletIndex)}
                    disabled={exp.bullets.length <= 1}
                    className="h-8 w-8 p-0 mt-1"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addBullet(exp.id)}
                className="text-xs"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add bullet point
              </Button>
            </div>
          </div>
        </div>
      ))}

      <Button variant="outline" size="sm" onClick={addExperience} className="w-full">
        <Plus className="w-4 h-4 mr-1" />
        Add Experience
      </Button>
    </div>
  );
}
