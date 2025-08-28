import { NextResponse } from 'next/server';
import { mockPolls } from '@/data/mock-polls';

// GET /api/user/polls - Get polls created by the authenticated user
export async function GET(request: Request) {
  try {
    // This is a placeholder for actual database query
    // In a real implementation, you would:
    // 1. Get the authenticated user ID from the session
    // 2. Fetch polls created by that user from the database
    
    // Mock user ID (in a real app, this would come from authentication)
    const userId = 'user1';
    
    // Filter mock polls to only include those created by the user
    const userPolls = mockPolls.filter(poll => poll.createdBy === userId);
    
    return NextResponse.json({
      success: true,
      data: userPolls,
    });
  } catch (error) {
    console.error('Error fetching user polls:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch user polls' },
      { status: 500 }
    );
  }
}