import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET /api/polls/[id] - Get a specific poll by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const supabase = await createClient();
    const { data: poll, error } = await supabase.from('polls').select('*').eq('id', id).single();

    if (error) {
      console.error('Error fetching poll:', error);
      return NextResponse.json({ success: false, message: 'Failed to fetch poll' }, { status: 500 });
    }
    
    if (!poll) {
      return NextResponse.json(
        { success: false, message: 'Poll not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: poll,
    });
  } catch (error) {
    console.error('Error fetching poll:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch poll' },
      { status: 500 }
    );
  }
}
  

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { title, description, options, expiresAt } = await request.json();

  // Basic validation
  if (!title || !options || options.length < 2) {
    return NextResponse.json({ error: 'Title and at least two options are required.' }, { status: 400 });
  }

  const { data: existingPoll, error: fetchError } = await supabase
    .from('polls')
    .select('createdBy')
    .eq('id', id)
    .single();

  if (fetchError || !existingPoll) {
    return NextResponse.json({ error: 'Poll not found.' }, { status: 404 });
  }

  if (existingPoll.createdBy !== user.id) {
    return NextResponse.json({ error: 'Forbidden: You do not own this poll.' }, { status: 403 });
  }

  const { data, error } = await supabase
    .from('polls')
    .update({
      title,
      description,
      options,
      expiresAt,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating poll:', error);
    return NextResponse.json({ error: 'Failed to update poll.' }, { status: 500 });
  }

  return NextResponse.json(data);
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: existingPoll, error: fetchError } = await supabase
    .from('polls')
    .select('createdBy')
    .eq('id', id)
    .single();

  if (fetchError || !existingPoll) {
    return NextResponse.json({ error: 'Poll not found.' }, { status: 404 });
  }

  if (existingPoll.createdBy !== user.id) {
    return NextResponse.json({ error: 'Forbidden: You do not own this poll.' }, { status: 403 });
  }

  const { error } = await supabase
    .from('polls')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting poll:', error);
    return NextResponse.json({ error: 'Failed to delete poll.' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Poll deleted successfully.' });
}
