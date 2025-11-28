import { useCV } from '@/context/CVContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Achievement } from '@/types/cv';

export function AchievementsEditor() {
  const { cvData, dispatch } = useCV();
  const { achievements } = cvData;

  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: uuidv4(),
      title: '',
      description: '',
      date: '',
    };
    dispatch({ type: 'UPDATE_ACHIEVEMENTS', payload: [...achievements, newAchievement] });
  };

  const updateAchievement = (id: string, field: string, value: string) => {
    dispatch({
      type: 'UPDATE_ACHIEVEMENTS',
      payload: achievements.map((ach) =>
        ach.id === id ? { ...ach, [field]: value } : ach
      ),
    });
  };

  const removeAchievement = (id: string) => {
    dispatch({
      type: 'UPDATE_ACHIEVEMENTS',
      payload: achievements.filter((ach) => ach.id !== id),
    });
  };

  return (
    <div className="space-y-4">
      {achievements.map((ach, index) => (
        <div
          key={ach.id}
          className="p-3 bg-secondary/30 rounded-lg space-y-3 relative group"
        >
          <div className="flex items-start justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Achievement {index + 1}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeAchievement(ach.id)}
              className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <Label className="text-xs text-muted-foreground">Title</Label>
              <Input
                value={ach.title}
                onChange={(e) => updateAchievement(ach.id, 'title', e.target.value)}
                placeholder="Award or Achievement"
                className="mt-1"
              />
            </div>

            <div className="col-span-2">
              <Label className="text-xs text-muted-foreground">Description</Label>
              <Textarea
                value={ach.description}
                onChange={(e) => updateAchievement(ach.id, 'description', e.target.value)}
                placeholder="Describe the achievement..."
                className="mt-1 min-h-[60px] resize-none"
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Date (Optional)</Label>
              <Input
                value={ach.date || ''}
                onChange={(e) => updateAchievement(ach.id, 'date', e.target.value)}
                placeholder="2023"
                className="mt-1"
              />
            </div>
          </div>
        </div>
      ))}

      <Button variant="outline" size="sm" onClick={addAchievement} className="w-full">
        <Plus className="w-4 h-4 mr-1" />
        Add Achievement
      </Button>
    </div>
  );
}
