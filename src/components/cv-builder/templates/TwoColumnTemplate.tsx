import { CVData } from '@/types/cv';
import { cn } from '@/lib/utils';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

interface TemplateProps {
  data: CVData;
  isPrintMode?: boolean;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr + '-01');
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function TwoColumnTemplate({ data, isPrintMode = false }: TemplateProps) {
  const { personalInfo, summary, skills, experience, education, projects, certifications, languages, achievements, volunteering, publications, references, sections, styles } = data;

  const fontClass = `cv-font-${styles.fontFamily}`;
  const fontSizeClass = {
    small: 'text-[10px]',
    medium: 'text-[11px]',
    large: 'text-[12px]',
  }[styles.fontSize];

  const spacingClass = {
    compact: 'space-y-3',
    normal: 'space-y-4',
    relaxed: 'space-y-6',
  }[styles.spacing];

  const enabledSections = sections.filter((s) => s.enabled).sort((a, b) => a.order - b.order);

  const sidebarSections = ['skills', 'languages', 'certifications', 'references'];
  const mainSections = ['summary', 'experience', 'education', 'projects', 'achievements', 'volunteering', 'publications'];

  const renderSidebarSection = (sectionType: string) => {
    switch (sectionType) {
      case 'skills':
        return skills.length > 0 ? (
          <div key="skills">
            <h2 className="text-xs font-semibold uppercase tracking-wider mb-2 text-white/80">
              Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-2 py-0.5 rounded text-xs bg-white/10 text-white"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ) : null;

      case 'languages':
        return languages.length > 0 ? (
          <div key="languages">
            <h2 className="text-xs font-semibold uppercase tracking-wider mb-2 text-white/80">
              Languages
            </h2>
            <div className="space-y-1">
              {languages.map((lang) => (
                <div key={lang.id} className="text-white/90">
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-white/60 text-xs"> — {lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'certifications':
        return certifications.length > 0 ? (
          <div key="certifications">
            <h2 className="text-xs font-semibold uppercase tracking-wider mb-2 text-white/80">
              Certifications
            </h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="text-white/90">
                  <div className="font-medium text-xs">{cert.name}</div>
                  <div className="text-white/60 text-xs">{cert.issuer}</div>
                  <div className="text-white/50 text-xs">{formatDate(cert.date)}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'references':
        return references.length > 0 ? (
          <div key="references">
            <h2 className="text-xs font-semibold uppercase tracking-wider mb-2 text-white/80">
              References
            </h2>
            <div className="space-y-2">
              {references.map((ref) => (
                <div key={ref.id} className="text-white/90">
                  <div className="font-medium text-xs">{ref.name}</div>
                  <div className="text-white/60 text-xs">{ref.position}</div>
                  <div className="text-white/50 text-xs">{ref.email}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      default:
        return null;
    }
  };

  const renderMainSection = (sectionType: string) => {
    switch (sectionType) {
      case 'summary':
        return summary.content ? (
          <div key="summary">
            <h2
              className="text-sm font-semibold uppercase tracking-wider mb-2 pb-1"
              style={{ color: styles.accentColor }}
            >
              Professional Summary
            </h2>
            <p className="leading-relaxed text-gray-700">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        return experience.length > 0 ? (
          <div key="experience">
            <h2
              className="text-sm font-semibold uppercase tracking-wider mb-3"
              style={{ color: styles.accentColor }}
            >
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-gray-600 text-xs">{exp.company} • {exp.location}</p>
                    </div>
                    <span className="text-gray-500 text-xs whitespace-nowrap">
                      {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.bullets.length > 0 && (
                    <ul className="mt-2 space-y-1 ml-3">
                      {exp.bullets.filter(b => b.trim()).map((bullet, i) => (
                        <li key={i} className="relative pl-3 text-gray-700 before:content-['•'] before:absolute before:left-0" style={{ color: 'inherit' }}>
                          <span style={{ color: styles.accentColor }} className="before:content-none absolute left-0">•</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'education':
        return education.length > 0 ? (
          <div key="education">
            <h2
              className="text-sm font-semibold uppercase tracking-wider mb-3"
              style={{ color: styles.accentColor }}
            >
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                      <p className="text-gray-600 text-xs">{edu.institution}</p>
                    </div>
                    <span className="text-gray-500 text-xs whitespace-nowrap">
                      {formatDate(edu.endDate)}
                    </span>
                  </div>
                  {edu.gpa && <p className="text-xs text-gray-500 mt-0.5">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'projects':
        return projects.length > 0 ? (
          <div key="projects">
            <h2
              className="text-sm font-semibold uppercase tracking-wider mb-3"
              style={{ color: styles.accentColor }}
            >
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                  <p className="text-xs text-gray-500">{proj.technologies}</p>
                  {proj.bullets.length > 0 && (
                    <ul className="mt-1 space-y-0.5 ml-3">
                      {proj.bullets.filter(b => b.trim()).map((bullet, i) => (
                        <li key={i} className="relative pl-3 text-gray-700">
                          <span style={{ color: styles.accentColor }} className="absolute left-0">•</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'achievements':
        return achievements.length > 0 ? (
          <div key="achievements">
            <h2
              className="text-sm font-semibold uppercase tracking-wider mb-2"
              style={{ color: styles.accentColor }}
            >
              Achievements
            </h2>
            <div className="space-y-2">
              {achievements.map((ach) => (
                <div key={ach.id}>
                  <span className="font-medium text-gray-900">{ach.title}</span>
                  {ach.date && <span className="text-gray-500 text-xs"> — {ach.date}</span>}
                  <p className="text-gray-600 text-xs">{ach.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'volunteering':
        return volunteering.length > 0 ? (
          <div key="volunteering">
            <h2
              className="text-sm font-semibold uppercase tracking-wider mb-3"
              style={{ color: styles.accentColor }}
            >
              Volunteering
            </h2>
            <div className="space-y-3">
              {volunteering.map((vol) => (
                <div key={vol.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{vol.role}</h3>
                      <p className="text-gray-600 text-xs">{vol.organization}</p>
                    </div>
                    <span className="text-gray-500 text-xs whitespace-nowrap">
                      {formatDate(vol.startDate)} — {formatDate(vol.endDate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'publications':
        return publications.length > 0 ? (
          <div key="publications">
            <h2
              className="text-sm font-semibold uppercase tracking-wider mb-2"
              style={{ color: styles.accentColor }}
            >
              Publications
            </h2>
            <div className="space-y-2">
              {publications.map((pub) => (
                <div key={pub.id}>
                  <span className="font-medium text-gray-900">{pub.title}</span>
                  <span className="text-gray-500"> — {pub.publisher}</span>
                  <span className="text-gray-500 text-xs block">{formatDate(pub.date)}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        'bg-white text-gray-900 w-full min-h-[1122px] flex',
        fontClass,
        fontSizeClass,
        !isPrintMode && 'shadow-lg'
      )}
      style={{ maxWidth: '794px' }}
    >
      {/* Sidebar */}
      <aside
        className="w-[240px] p-6 text-white flex-shrink-0"
        style={{ backgroundColor: styles.accentColor }}
      >
        {/* Header in sidebar */}
        <div className="mb-6 pb-4 border-b border-white/20">
          <h1 className="text-xl font-bold tracking-tight text-white">
            {personalInfo.fullName}
          </h1>
          <p className="text-sm text-white/80 mt-1">{personalInfo.jobTitle}</p>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 mb-6 text-xs">
          {personalInfo.email && (
            <div className="flex items-center gap-2 text-white/90">
              <Mail className="w-3 h-3 flex-shrink-0" />
              <span className="break-all">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2 text-white/90">
              <Phone className="w-3 h-3 flex-shrink-0" />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2 text-white/90">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              {personalInfo.location}
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-2 text-white/90">
              <Linkedin className="w-3 h-3 flex-shrink-0" />
              <span className="break-all">{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-2 text-white/90">
              <Github className="w-3 h-3 flex-shrink-0" />
              <span className="break-all">{personalInfo.github}</span>
            </div>
          )}
          {personalInfo.portfolio && (
            <div className="flex items-center gap-2 text-white/90">
              <Globe className="w-3 h-3 flex-shrink-0" />
              <span className="break-all">{personalInfo.portfolio}</span>
            </div>
          )}
        </div>

        {/* Sidebar sections */}
        <div className={spacingClass}>
          {enabledSections
            .filter((s) => sidebarSections.includes(s.type))
            .map((section) => renderSidebarSection(section.type))}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <div className={spacingClass}>
          {enabledSections
            .filter((s) => mainSections.includes(s.type))
            .map((section) => renderMainSection(section.type))}
        </div>
      </main>
    </div>
  );
}
