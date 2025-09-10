'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { createPoll } from '@/app/(main)/polls/create/actions';
import { updatePoll } from '@/app/(main)/polls/[id]/edit/actions';
import { redirect } from 'next/navigation';

// Submit button with loading state
function SubmitButton({ initialData }: { initialData?: Poll }) {
  const { pending } = useFormStatus();
  
  return (
    <Button 
      type="submit" 
      disabled={pending}
      className="w-full"
    >
      {pending ? (initialData ? 'Updating...' : 'Creating...') : (initialData ? 'Update Poll' : 'Create Poll')}
    </Button>
  );
}

import { Poll } from '@/types';

interface PollFormProps {
  initialData?: Poll;
}

export default function PollForm({ initialData }: PollFormProps) {
  const [options, setOptions] = useState(initialData?.options?.map(opt => opt.text) || ['', '']);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // This function is only used for the dynamic options UI
  // The actual form submission will collect all options from the form data
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index: number) => {
    if (options.length <= 2) return; // Minimum 2 options required
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const clientSubmit = async (formData: FormData) => {
    // Clear any previous errors
    setError(null);
    setSuccess(false);
    
    // The server action will handle validation and submission
    let result;
    if (initialData) {
      result = await updatePoll(initialData.id, formData);
    } else {
      result = await createPoll(formData);
    }
    
    // If there's an error, display it
    if (result?.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      redirect('/polls');
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{initialData ? 'Edit Poll' : 'Create a New Poll'}</CardTitle>
      </CardHeader>
      <form action={clientSubmit}>
        <CardContent className="space-y-6">
          {success && (
            <div className="text-green-500 text-center text-lg font-semibold mb-4">
              Poll created successfully!
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="title">Poll Question</Label>
            <Input
              id="title"
              name="title"
              placeholder="What is your favorite programming language?"
              required
              defaultValue={initialData?.title}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              name="description"
              placeholder="Provide more context for your poll"
              defaultValue={initialData?.description}
            />
          </div>

          <div className="space-y-4">
            <Label>Options</Label>
            {options.map((option, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  name={`option-${index}`}
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required
                />
                {options.length > 2 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon" 
                    onClick={() => removeOption(index)}
                  >
                    ×
                  </Button>
                )}
              </div>
            ))}
            <Button 
              type="button" 
              variant="outline" 
              onClick={addOption}
              className="w-full"
            >
              Add Option
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiresAt">Expiration Date (Optional)</Label>
            <Input
              id="expiresAt"
              name="expiresAt"
              type="datetime-local"
              defaultValue={initialData?.expiresAt ? new Date(initialData.expiresAt).toISOString().slice(0, 16) : ''}
            />
          </div>
        </CardContent>
        <CardFooter className="pt-6 border-t">
          {error && (
            <div className="text-destructive text-sm mb-2">{error}</div>
          )}
          <SubmitButton initialData={initialData} />
        </CardFooter>
      </form>
    </Card>
  );
}