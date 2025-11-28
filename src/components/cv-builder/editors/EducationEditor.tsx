import { useCV } from '@/context/CVContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Education } from '@/types/cv';

export function EducationEditor() {
  const { cvData, dispatch } = useCV();
  const { education } = cvData;

  const addEducation = () => {
    const newEdu: Education = {
      id: uuidv4(),
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      bullets: [],
    };
    dispatch({ type: 'UPDATE_EDUCATION', payload: [...education, newEdu] });
  };

  const updateEducation = (id: string, field: string, value: unknown) => {
    dispatch({
      type: 'UPDATE_EDUCATION',
      payload: education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    dispatch({
      type: 'UPDATE_EDUCATION',
      payload: education.filter((edu) => edu.id !== id),
    });
  };

  const addBullet = (eduId: string) => {
    const edu = education.find((e) => e.id === eduId);
    if (edu) {
      updateEducation(eduId, 'bullets', [...edu.bullets, '']);
    }
  };

  const updateBullet = (eduId: string, bulletIndex: number, value: string) => {
    const edu = education.find((e) => e.id === eduId);
    if (edu) {
      const newBullets = [...edu.bullets];
      newBullets[bulletIndex] = value;
      updateEducation(eduId, 'bullets', newBullets);
    }
  };

  const removeBullet = (eduId: string, bulletIndex: number) => {
    const edu = education.find((e) => e.id === eduId);
    if (edu) {
      const newBullets = edu.bullets.filter((_, i) => i !== bulletIndex);
      updateEducation(eduId, 'bullets', newBullets);
    }
  };

  return (
    <div className="space-y-4">
      {education.map((edu, index) => (
        <div
          key={edu.id}
          className="p-3 bg-secondary/30 rounded-lg space-y-3 relative group"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <GripVertical className="w-4 h-4" />
              <span className="text-xs font-medium">Education {index + 1}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeEducation(edu.id)}
              className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <Label className="text-xs text-muted-foreground">Institution</Label>
              <Input
                value={edu.institution}
                onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                placeholder="University Name"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Degree</Label>
              <Input
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                placeholder="Bachelor of Science"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Field of Study</Label>
              <Input
                value={edu.field}
                onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                placeholder="Computer Science"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Location</Label>
              <Input
                value={edu.location}
                onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                placeholder="City, State"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">GPA (Optional)</Label>
              <Input
                value={edu.gpa || ''}
                onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                placeholder="3.8"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Start Date</Label>
              <Input
                type="month"
                value={edu.startDate}
                onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">End Date</Label>
              <Input
                type="month"
                value={edu.endDate}
                onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Additional Info (Optional)</Label>
            <div className="space-y-2 mt-2">
              {edu.bullets.map((bullet, bulletIndex) => (
                <div key={bulletIndex} className="flex gap-2">
                  <span className="text-muted-foreground mt-2">•</span>
                  <Textarea
                    value={bullet}
                    onChange={(e) => updateBullet(edu.id, bulletIndex, e.target.value)}
                    placeholder="Honors, activities..."
                    className="min-h-[40px] resize-none flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBullet(edu.id, bulletIndex)}
                    className="h-8 w-8 p-0 mt-1"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addBullet(edu.id)}
                className="text-xs"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add detail
              </Button>
            </div>
          </div>
        </div>
      ))}

      <Button variant="outline" size="sm" onClick={addEducation} className="w-full">
        <Plus className="w-4 h-4 mr-1" />
        Add Education
      </Button>
    </div>
  );
}
