import { NextResponse } from 'next/server';
import { getPollById } from '@/data/mock-polls';

// POST /api/polls/[id]/vote - Vote on a poll
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { optionId } = await request.json();
    
    // This is a placeholder for actual voting logic
    // In a real implementation, you would:
    // 1. Validate the input data
    // 2. Check if the poll exists
    // 3. Check if the user has already voted (if one vote per user)
    // 4. Update the vote count in the database
    // 5. Return the updated poll
    
    // Mock poll data for response
    const poll = getPollById(id);
    
    if (!poll) {
      return NextResponse.json(
        { success: false, message: 'Poll not found' },
        { status: 404 }
      );
    }
    
    // Mock successful vote
    const updatedPoll = {
      ...poll,
      options: poll.options.map(option => {
        if (option.id === optionId) {
          return {
            ...option,
            votes: option.votes + 1,
          };
        }
        return option;
      }),
      totalVotes: poll.totalVotes + 1,
    };
    
    return NextResponse.json({
      success: true,
      data: updatedPoll,
    });
  } catch (error) {
    console.error('Error voting on poll:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to vote on poll' },
      { status: 400 }
    );
  }
}