'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { createPoll } from '@/app/(main)/polls/create/actions';

// Submit button with loading state
function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <Button 
      type="submit" 
      disabled={pending}
      className="w-full"
    >
      {pending ? 'Creating...' : 'Create Poll'}
    </Button>
  );
}

export default function PollForm() {
  const [options, setOptions] = useState(['', '']);
  const [error, setError] = useState<string | null>(null);

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
    
    // The server action will handle validation and submission
    const result = await createPoll(formData);
    
    // If there's an error, display it
    if (result?.error) {
      setError(result.error);
    }
    // No need to handle success case as the server action will redirect
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Create a New Poll</CardTitle>
      </CardHeader>
      <form action={clientSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Poll Question</Label>
            <Input
              id="title"
              name="title"
              placeholder="What is your favorite programming language?"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              name="description"
              placeholder="Provide more context for your poll"
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
            />
          </div>
        </CardContent>
        <CardFooter>
          {error && (
            <div className="text-destructive text-sm mb-2">{error}</div>
          )}
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}