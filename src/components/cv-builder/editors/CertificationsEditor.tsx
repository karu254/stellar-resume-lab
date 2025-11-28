import { useCV } from '@/context/CVContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Certification } from '@/types/cv';

export function CertificationsEditor() {
  const { cvData, dispatch } = useCV();
  const { certifications } = cvData;

  const addCertification = () => {
    const newCert: Certification = {
      id: uuidv4(),
      name: '',
      issuer: '',
      date: '',
      link: '',
    };
    dispatch({ type: 'UPDATE_CERTIFICATIONS', payload: [...certifications, newCert] });
  };

  const updateCertification = (id: string, field: string, value: string) => {
    dispatch({
      type: 'UPDATE_CERTIFICATIONS',
      payload: certifications.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      ),
    });
  };

  const removeCertification = (id: string) => {
    dispatch({
      type: 'UPDATE_CERTIFICATIONS',
      payload: certifications.filter((cert) => cert.id !== id),
    });
  };

  return (
    <div className="space-y-4">
      {certifications.map((cert, index) => (
        <div
          key={cert.id}
          className="p-3 bg-secondary/30 rounded-lg space-y-3 relative group"
        >
          <div className="flex items-start justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Certification {index + 1}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeCertification(cert.id)}
              className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <Label className="text-xs text-muted-foreground">Certification Name</Label>
              <Input
                value={cert.name}
                onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                placeholder="AWS Solutions Architect"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Issuer</Label>
              <Input
                value={cert.issuer}
                onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                placeholder="Amazon Web Services"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Date</Label>
              <Input
                type="month"
                value={cert.date}
                onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="col-span-2">
              <Label className="text-xs text-muted-foreground">Link (Optional)</Label>
              <Input
                value={cert.link || ''}
                onChange={(e) => updateCertification(cert.id, 'link', e.target.value)}
                placeholder="Credential URL"
                className="mt-1"
              />
            </div>
          </div>
        </div>
      ))}

      <Button variant="outline" size="sm" onClick={addCertification} className="w-full">
        <Plus className="w-4 h-4 mr-1" />
        Add Certification
      </Button>
    </div>
  );
}
