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

export function CorporateTemplate({ data, isPrintMode = false }: TemplateProps) {
  const { personalInfo, summary, skills, experience, education, projects, certifications, languages, achievements, volunteering, publications, references, sections, styles } = data;

  const fontClass = `cv-font-${styles.fontFamily}`;
  const fontSizeClass = {
    small: 'text-[10px]',
    medium: 'text-[11px]',
    large: 'text-[12px]',
  }[styles.fontSize];

  const spacingClass = {
    compact: 'space-y-4',
    normal: 'space-y-6',
    relaxed: 'space-y-8',
  }[styles.spacing];

  const enabledSections = sections.filter((s) => s.enabled).sort((a, b) => a.order - b.order);

  const renderSection = (sectionType: string) => {
    switch (sectionType) {
      case 'summary':
        return summary.content ? (
          <div key="summary" className="relative">
            <div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
              style={{ backgroundColor: styles.accentColor }}
            />
            <div className="pl-5">
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">
                Profile
              </h2>
              <p className="leading-relaxed text-gray-700 italic">{summary.content}</p>
            </div>
          </div>
        ) : null;

      case 'experience':
        return experience.length > 0 ? (
          <div key="experience" className="relative">
            <div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
              style={{ backgroundColor: styles.accentColor }}
            />
            <div className="pl-5">
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                Professional Experience
              </h2>
              <div className="space-y-5">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-gray-900">{exp.position}</h3>
                      <span className="text-xs text-gray-500 font-medium">
                        {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <p className="text-gray-600 font-medium mb-2">{exp.company}, {exp.location}</p>
                    {exp.bullets.length > 0 && (
                      <ul className="space-y-1.5">
                        {exp.bullets.filter(b => b.trim()).map((bullet, i) => (
                          <li key={i} className="flex gap-2 text-gray-700">
                            <span
                              className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                              style={{ backgroundColor: styles.accentColor }}
                            />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null;

      case 'education':
        return education.length > 0 ? (
          <div key="education" className="relative">
            <div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
              style={{ backgroundColor: styles.accentColor }}
            />
            <div className="pl-5">
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                      <span className="text-xs text-gray-500 font-medium">
                        {formatDate(edu.endDate)}
                      </span>
                    </div>
                    <p className="text-gray-600">{edu.institution}, {edu.location}</p>
                    {edu.gpa && <p className="text-xs text-gray-500 mt-1">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null;

      case 'skills':
        return skills.length > 0 ? (
          <div key="skills" className="relative">
            <div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
              style={{ backgroundColor: styles.accentColor }}
            />
            <div className="pl-5">
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3">
                Core Competencies
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-3 py-1 rounded-full text-xs font-medium border"
                    style={{ borderColor: styles.accentColor, color: styles.accentColor }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : null;

      case 'projects':
        return projects.length > 0 ? (
          <div key="projects" className="relative">
            <div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
              style={{ backgroundColor: styles.accentColor }}
            />
            <div className="pl-5">
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                Key Projects
              </h2>
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="font-bold text-gray-900">{proj.name}</h3>
                    <p className="text-xs text-gray-500 mb-1">{proj.technologies}</p>
                    {proj.bullets.length > 0 && (
                      <ul className="space-y-1">
                        {proj.bullets.filter(b => b.trim()).map((bullet, i) => (
                          <li key={i} className="flex gap-2 text-gray-700">
                            <span
                              className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                              style={{ backgroundColor: styles.accentColor }}
                            />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null;

      case 'certifications':
        return certifications.length > 0 ? (
          <div key="certifications" className="relative">
            <div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
              style={{ backgroundColor: styles.accentColor }}
            />
            <div className="pl-5">
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3">
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex justify-between items-baseline">
                    <div>
                      <span className="font-medium text-gray-900">{cert.name}</span>
                      <span className="text-gray-500"> — {cert.issuer}</span>
                    </div>
                    <span className="text-xs text-gray-500">{formatDate(cert.date)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null;

      case 'languages':
        return languages.length > 0 ? (
          <div key="languages" className="relative">
            <div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
              style={{ backgroundColor: styles.accentColor }}
            />
            <div className="pl-5">
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">
                Languages
              </h2>
              <div className="flex flex-wrap gap-x-6 gap-y-1">
                {languages.map((lang) => (
                  <span key={lang.id} className="text-gray-700">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-gray-500"> ({lang.proficiency})</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : null;

      case 'achievements':
        return achievements.length > 0 ? (
          <div key="achievements" className="relative">
            <div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
              style={{ backgroundColor: styles.accentColor }}
            />
            <div className="pl-5">
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3">
                Awards & Recognition
              </h2>
              <div className="space-y-2">
                {achievements.map((ach) => (
                  <div key={ach.id}>
                    <div className="flex justify-between items-baseline">
                      <span className="font-medium text-gray-900">{ach.title}</span>
                      {ach.date && <span className="text-xs text-gray-500">{ach.date}</span>}
                    </div>
                    <p className="text-gray-600">{ach.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null;

      case 'volunteering':
        return volunteering.length > 0 ? (
          <div key="volunteering" className="relative">
            <div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
              style={{ backgroundColor: styles.accentColor }}
            />
            <div className="pl-5">
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                Volunteering
              </h2>
              <div className="space-y-4">
                {volunteering.map((vol) => (
                  <div key={vol.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-gray-900">{vol.role}</h3>
                      <span className="text-xs text-gray-500 font-medium">
                        {formatDate(vol.startDate)} — {formatDate(vol.endDate)}
                      </span>
                    </div>
                    <p className="text-gray-600 font-medium">{vol.organization}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null;

      case 'publications':
        return publications.length > 0 ? (
          <div key="publications" className="relative">
            <div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
              style={{ backgroundColor: styles.accentColor }}
            />
            <div className="pl-5">
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3">
                Publications
              </h2>
              <div className="space-y-2">
                {publications.map((pub) => (
                  <div key={pub.id} className="flex justify-between items-baseline">
                    <div>
                      <span className="font-medium text-gray-900">{pub.title}</span>
                      <span className="text-gray-500"> — {pub.publisher}</span>
                    </div>
                    <span className="text-xs text-gray-500">{formatDate(pub.date)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null;

      case 'references':
        return references.length > 0 ? (
          <div key="references" className="relative">
            <div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
              style={{ backgroundColor: styles.accentColor }}
            />
            <div className="pl-5">
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3">
                References
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {references.map((ref) => (
                  <div key={ref.id}>
                    <h3 className="font-bold text-gray-900">{ref.name}</h3>
                    <p className="text-gray-600 text-xs">{ref.position} at {ref.company}</p>
                    <p className="text-gray-500 text-xs">{ref.email}</p>
                    <p className="text-gray-500 text-xs">{ref.phone}</p>
                  </div>
                ))}
              </div>
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
        'bg-white text-gray-900 w-full min-h-[1122px]',
        fontClass,
        fontSizeClass,
        !isPrintMode && 'shadow-lg'
      )}
      style={{ maxWidth: '794px' }}
    >
      {/* Header */}
      <header
        className="px-8 py-6 text-white"
        style={{ backgroundColor: styles.accentColor }}
      >
        <h1 className="text-3xl font-bold tracking-tight">
          {personalInfo.fullName}
        </h1>
        <p className="text-lg text-white/90 mt-1 font-light">{personalInfo.jobTitle}</p>
        
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-4 text-xs text-white/80">
          {personalInfo.email && (
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.github && (
            <span className="flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5" />
              {personalInfo.github}
            </span>
          )}
          {personalInfo.portfolio && (
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              {personalInfo.portfolio}
            </span>
          )}
        </div>
      </header>

      {/* Content */}
      <div className={cn('p-8', spacingClass)}>
        {enabledSections
          .filter((s) => s.type !== 'personalInfo')
          .map((section) => renderSection(section.type))}
      </div>
    </div>
  );
}
