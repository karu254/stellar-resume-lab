import { useCV } from '@/context/CVContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Project } from '@/types/cv';

export function ProjectsEditor() {
  const { cvData, dispatch } = useCV();
  const { projects } = cvData;

  const addProject = () => {
    const newProject: Project = {
      id: uuidv4(),
      name: '',
      description: '',
      technologies: '',
      link: '',
      bullets: [''],
    };
    dispatch({ type: 'UPDATE_PROJECTS', payload: [...projects, newProject] });
  };

  const updateProject = (id: string, field: string, value: unknown) => {
    dispatch({
      type: 'UPDATE_PROJECTS',
      payload: projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    });
  };

  const removeProject = (id: string) => {
    dispatch({
      type: 'UPDATE_PROJECTS',
      payload: projects.filter((proj) => proj.id !== id),
    });
  };

  const addBullet = (projId: string) => {
    const proj = projects.find((p) => p.id === projId);
    if (proj) {
      updateProject(projId, 'bullets', [...proj.bullets, '']);
    }
  };

  const updateBullet = (projId: string, bulletIndex: number, value: string) => {
    const proj = projects.find((p) => p.id === projId);
    if (proj) {
      const newBullets = [...proj.bullets];
      newBullets[bulletIndex] = value;
      updateProject(projId, 'bullets', newBullets);
    }
  };

  const removeBullet = (projId: string, bulletIndex: number) => {
    const proj = projects.find((p) => p.id === projId);
    if (proj && proj.bullets.length > 1) {
      const newBullets = proj.bullets.filter((_, i) => i !== bulletIndex);
      updateProject(projId, 'bullets', newBullets);
    }
  };

  return (
    <div className="space-y-4">
      {projects.map((proj, index) => (
        <div
          key={proj.id}
          className="p-3 bg-secondary/30 rounded-lg space-y-3 relative group"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <GripVertical className="w-4 h-4" />
              <span className="text-xs font-medium">Project {index + 1}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeProject(proj.id)}
              className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <Label className="text-xs text-muted-foreground">Project Name</Label>
              <Input
                value={proj.name}
                onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                placeholder="Project Name"
                className="mt-1"
              />
            </div>

            <div className="col-span-2">
              <Label className="text-xs text-muted-foreground">Technologies</Label>
              <Input
                value={proj.technologies}
                onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)}
                placeholder="React, Node.js, PostgreSQL"
                className="mt-1"
              />
            </div>

            <div className="col-span-2">
              <Label className="text-xs text-muted-foreground">Link (Optional)</Label>
              <Input
                value={proj.link || ''}
                onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                placeholder="github.com/username/project"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Description & Highlights</Label>
            <div className="space-y-2 mt-2">
              {proj.bullets.map((bullet, bulletIndex) => (
                <div key={bulletIndex} className="flex gap-2">
                  <span className="text-muted-foreground mt-2">•</span>
                  <Textarea
                    value={bullet}
                    onChange={(e) => updateBullet(proj.id, bulletIndex, e.target.value)}
                    placeholder="Describe the project..."
                    className="min-h-[60px] resize-none flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBullet(proj.id, bulletIndex)}
                    disabled={proj.bullets.length <= 1}
                    className="h-8 w-8 p-0 mt-1"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addBullet(proj.id)}
                className="text-xs"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add bullet point
              </Button>
            </div>
          </div>
        </div>
      ))}

      <Button variant="outline" size="sm" onClick={addProject} className="w-full">
        <Plus className="w-4 h-4 mr-1" />
        Add Project
      </Button>
    </div>
  );
}
