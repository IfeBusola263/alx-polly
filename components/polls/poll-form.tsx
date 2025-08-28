'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/auth-context';

export default function PollForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [expiresAt, setExpiresAt] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!title.trim()) return;
    if (options.filter(opt => opt.trim()).length < 2) return;
    
    setIsSubmitting(true);
    try {
      // This would be replaced with actual API call
      console.log('Creating poll:', { title, description, options, expiresAt });
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Redirect to polls page
      router.push('/polls');
    } catch (error) {
      console.error('Error creating poll:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Create a New Poll</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Poll Question</Label>
            <Input
              id="title"
              placeholder="What is your favorite programming language?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              placeholder="Provide more context for your poll"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <Label>Options</Label>
            {options.map((option, index) => (
              <div key={index} className="flex gap-2">
                <Input
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
              type="datetime-local"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Creating...' : 'Create Poll'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}