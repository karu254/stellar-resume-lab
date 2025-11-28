import { useCV } from '@/context/CVContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Language } from '@/types/cv';

const proficiencyLevels = [
  'Native',
  'Fluent',
  'Professional',
  'Intermediate',
  'Basic',
];

export function LanguagesEditor() {
  const { cvData, dispatch } = useCV();
  const { languages } = cvData;

  const addLanguage = () => {
    const newLang: Language = {
      id: uuidv4(),
      name: '',
      proficiency: 'Professional',
    };
    dispatch({ type: 'UPDATE_LANGUAGES', payload: [...languages, newLang] });
  };

  const updateLanguage = (id: string, field: string, value: string) => {
    dispatch({
      type: 'UPDATE_LANGUAGES',
      payload: languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      ),
    });
  };

  const removeLanguage = (id: string) => {
    dispatch({
      type: 'UPDATE_LANGUAGES',
      payload: languages.filter((lang) => lang.id !== id),
    });
  };

  return (
    <div className="space-y-3">
      {languages.map((lang) => (
        <div
          key={lang.id}
          className="flex items-center gap-2 p-2 bg-secondary/30 rounded-lg group"
        >
          <Input
            value={lang.name}
            onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
            placeholder="Language"
            className="flex-1"
          />
          <Select
            value={lang.proficiency}
            onValueChange={(value) => updateLanguage(lang.id, 'proficiency', value)}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {proficiencyLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeLanguage(lang.id)}
            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}

      <Button variant="outline" size="sm" onClick={addLanguage} className="w-full">
        <Plus className="w-4 h-4 mr-1" />
        Add Language
      </Button>
    </div>
  );
}
