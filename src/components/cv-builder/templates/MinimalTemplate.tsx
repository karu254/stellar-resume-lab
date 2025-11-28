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

export function MinimalTemplate({ data, isPrintMode = false }: TemplateProps) {
  const { personalInfo, summary, skills, experience, education, projects, certifications, languages, achievements, volunteering, publications, references, sections, styles } = data;

  const fontClass = `cv-font-${styles.fontFamily}`;
  const fontSizeClass = {
    small: 'text-[10px]',
    medium: 'text-[11px]',
    large: 'text-[12px]',
  }[styles.fontSize];

  const spacingClass = {
    compact: 'space-y-3',
    normal: 'space-y-5',
    relaxed: 'space-y-7',
  }[styles.spacing];

  const enabledSections = sections.filter((s) => s.enabled).sort((a, b) => a.order - b.order);

  const renderSection = (sectionType: string) => {
    switch (sectionType) {
      case 'summary':
        return summary.content ? (
          <div key="summary">
            <h2
              className="text-sm font-semibold uppercase tracking-wider mb-2 pb-1 border-b-2"
              style={{ borderColor: styles.accentColor, color: styles.accentColor }}
            >
              Professional Summary
            </h2>
            <p className="leading-relaxed">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        return experience.length > 0 ? (
          <div key="experience">
            <h2
              className="text-sm font-semibold uppercase tracking-wider mb-3 pb-1 border-b-2"
              style={{ borderColor: styles.accentColor, color: styles.accentColor }}
            >
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{exp.position}</h3>
                      <p className="text-muted-foreground">{exp.company} • {exp.location}</p>
                    </div>
                    <span className="text-muted-foreground text-xs whitespace-nowrap">
                      {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.bullets.length > 0 && (
                    <ul className="mt-2 space-y-1 ml-4">
                      {exp.bullets.filter(b => b.trim()).map((bullet, i) => (
                        <li key={i} className="relative pl-3 before:content-['•'] before:absolute before:left-0 before:text-muted-foreground">
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
              className="text-sm font-semibold uppercase tracking-wider mb-3 pb-1 border-b-2"
              style={{ borderColor: styles.accentColor, color: styles.accentColor }}
            >
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{edu.degree} in {edu.field}</h3>
                      <p className="text-muted-foreground">{edu.institution} • {edu.location}</p>
                    </div>
                    <span className="text-muted-foreground text-xs whitespace-nowrap">
                      {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                    </span>
                  </div>
                  {edu.gpa && <p className="text-xs text-muted-foreground mt-1">GPA: {edu.gpa}</p>}
                  {edu.bullets.length > 0 && (
                    <ul className="mt-1 space-y-0.5 ml-4">
                      {edu.bullets.filter(b => b.trim()).map((bullet, i) => (
                        <li key={i} className="relative pl-3 before:content-['•'] before:absolute before:left-0 before:text-muted-foreground text-xs">
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

      case 'skills':
        return skills.length > 0 ? (
          <div key="skills">
            <h2
              className="text-sm font-semibold uppercase tracking-wider mb-2 pb-1 border-b-2"
              style={{ borderColor: styles.accentColor, color: styles.accentColor }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-2 py-0.5 rounded text-xs"
                  style={{ backgroundColor: `${styles.accentColor}15`, color: styles.accentColor }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ) : null;

      case 'projects':
        return projects.length > 0 ? (
          <div key="projects">
            <h2
              className="text-sm font-semibold uppercase tracking-wider mb-3 pb-1 border-b-2"
              style={{ borderColor: styles.accentColor, color: styles.accentColor }}
            >
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{proj.name}</h3>
                    {proj.link && (
                      <span className="text-xs text-muted-foreground">{proj.link}</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{proj.technologies}</p>
                  {proj.bullets.length > 0 && (
                    <ul className="mt-1 space-y-0.5 ml-4">
                      {proj.bullets.filter(b => b.trim()).map((bullet, i) => (
                        <li key={i} className="relative pl-3 before:content-['•'] before:absolute before:left-0 before:text-muted-foreground">
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

      case 'certifications':
        return certifications.length > 0 ? (
          <div key="certifications">
            <h2
              className="text-sm font-semibold uppercase tracking-wider mb-2 pb-1 border-b-2"
              style={{ borderColor: styles.accentColor, color: styles.accentColor }}
            >
              Certifications
            </h2>
            <div className="space-y-1.5">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between">
                  <div>
                    <span className="font-medium">{cert.name}</span>
                    <span className="text-muted-foreground"> — {cert.issuer}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{formatDate(cert.date)}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'languages':
        return languages.length > 0 ? (
          <div key="languages">
            <h2
              className="text-sm font-semibold uppercase tracking-wider mb-2 pb-1 border-b-2"
              style={{ borderColor: styles.accentColor, color: styles.accentColor }}
            >
              Languages
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {languages.map((lang) => (
                <span key={lang.id}>
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-muted-foreground"> — {lang.proficiency}</span>
                </span>
              ))}
            </div>
          </div>
        ) : null;

      case 'achievements':
        return achievements.length > 0 ? (
          <div key="achievements">
            <h2
              className="text-sm font-semibold uppercase tracking-wider mb-2 pb-1 border-b-2"
              style={{ borderColor: styles.accentColor, color: styles.accentColor }}
            >
              Achievements
            </h2>
            <div className="space-y-2">
              {achievements.map((ach) => (
                <div key={ach.id}>
                  <div className="flex justify-between">
                    <span className="font-medium">{ach.title}</span>
                    {ach.date && <span className="text-xs text-muted-foreground">{ach.date}</span>}
                  </div>
                  <p className="text-muted-foreground">{ach.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'volunteering':
        return volunteering.length > 0 ? (
          <div key="volunteering">
            <h2
              className="text-sm font-semibold uppercase tracking-wider mb-3 pb-1 border-b-2"
              style={{ borderColor: styles.accentColor, color: styles.accentColor }}
            >
              Volunteering
            </h2>
            <div className="space-y-3">
              {volunteering.map((vol) => (
                <div key={vol.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{vol.role}</h3>
                      <p className="text-muted-foreground">{vol.organization}</p>
                    </div>
                    <span className="text-muted-foreground text-xs whitespace-nowrap">
                      {formatDate(vol.startDate)} — {formatDate(vol.endDate)}
                    </span>
                  </div>
                  {vol.bullets.length > 0 && (
                    <ul className="mt-1 space-y-0.5 ml-4">
                      {vol.bullets.filter(b => b.trim()).map((bullet, i) => (
                        <li key={i} className="relative pl-3 before:content-['•'] before:absolute before:left-0 before:text-muted-foreground">
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

      case 'publications':
        return publications.length > 0 ? (
          <div key="publications">
            <h2
              className="text-sm font-semibold uppercase tracking-wider mb-2 pb-1 border-b-2"
              style={{ borderColor: styles.accentColor, color: styles.accentColor }}
            >
              Publications
            </h2>
            <div className="space-y-1.5">
              {publications.map((pub) => (
                <div key={pub.id} className="flex justify-between">
                  <div>
                    <span className="font-medium">{pub.title}</span>
                    <span className="text-muted-foreground"> — {pub.publisher}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{formatDate(pub.date)}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'references':
        return references.length > 0 ? (
          <div key="references">
            <h2
              className="text-sm font-semibold uppercase tracking-wider mb-2 pb-1 border-b-2"
              style={{ borderColor: styles.accentColor, color: styles.accentColor }}
            >
              References
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {references.map((ref) => (
                <div key={ref.id}>
                  <h3 className="font-semibold">{ref.name}</h3>
                  <p className="text-muted-foreground text-xs">{ref.position} at {ref.company}</p>
                  <p className="text-muted-foreground text-xs">{ref.email}</p>
                  <p className="text-muted-foreground text-xs">{ref.phone}</p>
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
        'bg-white text-cv-text p-8 w-full min-h-[1122px]',
        fontClass,
        fontSizeClass,
        !isPrintMode && 'shadow-lg'
      )}
      style={{ maxWidth: '794px' }}
    >
      {/* Header */}
      <header className="text-center mb-6 pb-4 border-b" style={{ borderColor: `${styles.accentColor}30` }}>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: styles.accentColor }}>
          {personalInfo.fullName}
        </h1>
        <p className="text-sm font-medium text-muted-foreground mt-1">{personalInfo.jobTitle}</p>
        
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-3 text-xs text-muted-foreground">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-3 h-3" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.github && (
            <span className="flex items-center gap-1">
              <Github className="w-3 h-3" />
              {personalInfo.github}
            </span>
          )}
          {personalInfo.portfolio && (
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              {personalInfo.portfolio}
            </span>
          )}
        </div>
      </header>

      {/* Sections */}
      <div className={spacingClass}>
        {enabledSections
          .filter((s) => s.type !== 'personalInfo')
          .map((section) => renderSection(section.type))}
      </div>
    </div>
  );
}
