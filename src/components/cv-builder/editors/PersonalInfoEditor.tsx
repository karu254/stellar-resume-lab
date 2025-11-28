import { useCV } from '@/context/CVContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function PersonalInfoEditor() {
  const { cvData, dispatch } = useCV();
  const { personalInfo } = cvData;

  const updateField = (field: string, value: string) => {
    dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: { [field]: value } });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <Label className="text-xs text-muted-foreground">Full Name</Label>
          <Input
            value={personalInfo.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            placeholder="John Doe"
            className="mt-1"
          />
        </div>

        <div className="col-span-2">
          <Label className="text-xs text-muted-foreground">Job Title</Label>
          <Input
            value={personalInfo.jobTitle}
            onChange={(e) => updateField('jobTitle', e.target.value)}
            placeholder="Software Engineer"
            className="mt-1"
          />
        </div>

        <div>
          <Label className="text-xs text-muted-foreground">Email</Label>
          <Input
            value={personalInfo.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="email@example.com"
            className="mt-1"
          />
        </div>

        <div>
          <Label className="text-xs text-muted-foreground">Phone</Label>
          <Input
            value={personalInfo.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="+1 (555) 000-0000"
            className="mt-1"
          />
        </div>

        <div className="col-span-2">
          <Label className="text-xs text-muted-foreground">Location</Label>
          <Input
            value={personalInfo.location}
            onChange={(e) => updateField('location', e.target.value)}
            placeholder="San Francisco, CA"
            className="mt-1"
          />
        </div>

        <div>
          <Label className="text-xs text-muted-foreground">LinkedIn</Label>
          <Input
            value={personalInfo.linkedin || ''}
            onChange={(e) => updateField('linkedin', e.target.value)}
            placeholder="linkedin.com/in/johndoe"
            className="mt-1"
          />
        </div>

        <div>
          <Label className="text-xs text-muted-foreground">GitHub</Label>
          <Input
            value={personalInfo.github || ''}
            onChange={(e) => updateField('github', e.target.value)}
            placeholder="github.com/johndoe"
            className="mt-1"
          />
        </div>

        <div className="col-span-2">
          <Label className="text-xs text-muted-foreground">Portfolio</Label>
          <Input
            value={personalInfo.portfolio || ''}
            onChange={(e) => updateField('portfolio', e.target.value)}
            placeholder="johndoe.com"
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
}
