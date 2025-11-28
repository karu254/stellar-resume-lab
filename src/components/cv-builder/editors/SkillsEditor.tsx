import { useCV } from '@/context/CVContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export function SkillsEditor() {
  const { cvData, dispatch } = useCV();
  const { skills } = cvData;

  const addSkill = () => {
    dispatch({
      type: 'UPDATE_SKILLS',
      payload: [...skills, { id: uuidv4(), name: '', category: '' }],
    });
  };

  const updateSkill = (id: string, field: string, value: string) => {
    dispatch({
      type: 'UPDATE_SKILLS',
      payload: skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      ),
    });
  };

  const removeSkill = (id: string) => {
    dispatch({
      type: 'UPDATE_SKILLS',
      payload: skills.filter((skill) => skill.id !== id),
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="flex items-center gap-1 bg-secondary rounded-full pl-3 pr-1 py-1"
          >
            <Input
              value={skill.name}
              onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
              placeholder="Skill"
              className="h-6 w-24 border-0 bg-transparent p-0 text-sm focus-visible:ring-0"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeSkill(skill.id)}
              className="h-5 w-5 p-0 hover:bg-destructive/20"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ))}
      </div>

      <Button variant="outline" size="sm" onClick={addSkill} className="w-full">
        <Plus className="w-4 h-4 mr-1" />
        Add Skill
      </Button>
    </div>
  );
}
