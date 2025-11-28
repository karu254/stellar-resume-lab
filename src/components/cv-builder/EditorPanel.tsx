import { useState } from 'react';
import { useCV } from '@/context/CVContext';
import { EditorSection } from './EditorSection';
import { PersonalInfoEditor } from './editors/PersonalInfoEditor';
import { SummaryEditor } from './editors/SummaryEditor';
import { SkillsEditor } from './editors/SkillsEditor';
import { ExperienceEditor } from './editors/ExperienceEditor';
import { EducationEditor } from './editors/EducationEditor';
import { ProjectsEditor } from './editors/ProjectsEditor';
import { CertificationsEditor } from './editors/CertificationsEditor';
import { LanguagesEditor } from './editors/LanguagesEditor';
import { AchievementsEditor } from './editors/AchievementsEditor';
import { VolunteeringEditor } from './editors/VolunteeringEditor';
import { PublicationsEditor } from './editors/PublicationsEditor';
import { ReferencesEditor } from './editors/ReferencesEditor';
import { StyleControls } from './StyleControls';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Palette } from 'lucide-react';

export function EditorPanel() {
  const { cvData, dispatch } = useCV();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    personalInfo: true,
    summary: true,
    experience: true,
  });

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const toggleSectionEnabled = (sectionId: string) => {
    dispatch({ type: 'TOGGLE_SECTION', payload: sectionId });
  };

  const getEditor = (sectionType: string) => {
    switch (sectionType) {
      case 'personalInfo':
        return <PersonalInfoEditor />;
      case 'summary':
        return <SummaryEditor />;
      case 'skills':
        return <SkillsEditor />;
      case 'experience':
        return <ExperienceEditor />;
      case 'education':
        return <EducationEditor />;
      case 'projects':
        return <ProjectsEditor />;
      case 'certifications':
        return <CertificationsEditor />;
      case 'languages':
        return <LanguagesEditor />;
      case 'achievements':
        return <AchievementsEditor />;
      case 'volunteering':
        return <VolunteeringEditor />;
      case 'publications':
        return <PublicationsEditor />;
      case 'references':
        return <ReferencesEditor />;
      default:
        return null;
    }
  };

  const sortedSections = [...cvData.sections].sort((a, b) => a.order - b.order);

  return (
    <div className="h-full flex flex-col bg-editor-bg">
      <Tabs defaultValue="content" className="flex-1 flex flex-col">
        <div className="border-b border-editor-border bg-editor-card px-4">
          <TabsList className="h-12 bg-transparent p-0 gap-4">
            <TabsTrigger
              value="content"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-1 pb-3 pt-3"
            >
              <FileText className="w-4 h-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger
              value="design"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-1 pb-3 pt-3"
            >
              <Palette className="w-4 h-4 mr-2" />
              Design
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="content" className="flex-1 overflow-y-auto scrollbar-thin p-4 mt-0">
          <div className="space-y-3">
            {sortedSections.map((section) => (
              <EditorSection
                key={section.id}
                title={section.title}
                enabled={section.enabled}
                onToggleEnabled={() => toggleSectionEnabled(section.id)}
                isOpen={openSections[section.id] ?? false}
                onToggleOpen={() => toggleSection(section.id)}
              >
                {getEditor(section.type)}
              </EditorSection>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="design" className="flex-1 overflow-y-auto scrollbar-thin p-4 mt-0">
          <div className="bg-editor-card rounded-lg border border-editor-border p-4">
            <StyleControls />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
