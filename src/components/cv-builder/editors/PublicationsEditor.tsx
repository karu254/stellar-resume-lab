import { useCV } from '@/context/CVContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Publication } from '@/types/cv';

export function PublicationsEditor() {
  const { cvData, dispatch } = useCV();
  const { publications } = cvData;

  const addPublication = () => {
    const newPub: Publication = {
      id: uuidv4(),
      title: '',
      publisher: '',
      date: '',
      link: '',
    };
    dispatch({ type: 'UPDATE_PUBLICATIONS', payload: [...publications, newPub] });
  };

  const updatePublication = (id: string, field: string, value: string) => {
    dispatch({
      type: 'UPDATE_PUBLICATIONS',
      payload: publications.map((pub) =>
        pub.id === id ? { ...pub, [field]: value } : pub
      ),
    });
  };

  const removePublication = (id: string) => {
    dispatch({
      type: 'UPDATE_PUBLICATIONS',
      payload: publications.filter((pub) => pub.id !== id),
    });
  };

  return (
    <div className="space-y-4">
      {publications.map((pub, index) => (
        <div
          key={pub.id}
          className="p-3 bg-secondary/30 rounded-lg space-y-3 relative group"
        >
          <div className="flex items-start justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Publication {index + 1}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removePublication(pub.id)}
              className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <Label className="text-xs text-muted-foreground">Title</Label>
              <Input
                value={pub.title}
                onChange={(e) => updatePublication(pub.id, 'title', e.target.value)}
                placeholder="Publication Title"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Publisher / Journal</Label>
              <Input
                value={pub.publisher}
                onChange={(e) => updatePublication(pub.id, 'publisher', e.target.value)}
                placeholder="Publisher Name"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Date</Label>
              <Input
                type="month"
                value={pub.date}
                onChange={(e) => updatePublication(pub.id, 'date', e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="col-span-2">
              <Label className="text-xs text-muted-foreground">Link (Optional)</Label>
              <Input
                value={pub.link || ''}
                onChange={(e) => updatePublication(pub.id, 'link', e.target.value)}
                placeholder="DOI or URL"
                className="mt-1"
              />
            </div>
          </div>
        </div>
      ))}

      <Button variant="outline" size="sm" onClick={addPublication} className="w-full">
        <Plus className="w-4 h-4 mr-1" />
        Add Publication
      </Button>
    </div>
  );
}
