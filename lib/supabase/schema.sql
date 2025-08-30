-- Create polls table
CREATE TABLE polls (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  CONSTRAINT title_length CHECK (char_length(title) >= 3 AND char_length(title) <= 100)
);

-- Create poll options table
CREATE TABLE poll_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  poll_id UUID NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  votes INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT text_length CHECK (char_length(text) >= 1 AND char_length(text) <= 100)
);

-- Create votes table to track who voted for what
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  poll_id UUID NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
  option_id UUID NOT NULL REFERENCES poll_options(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(poll_id, user_id) -- Each user can only vote once per poll
);

-- Create RLS policies

-- Polls policies
ALTER TABLE polls ENABLE ROW LEVEL SECURITY;

-- Anyone can view polls
CREATE POLICY "Anyone can view polls" 
  ON polls FOR SELECT 
  USING (true);

-- Only authenticated users can create polls
CREATE POLICY "Authenticated users can create polls" 
  ON polls FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- Only poll creators can update their polls
CREATE POLICY "Users can update their own polls" 
  ON polls FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = created_by);

-- Only poll creators can delete their polls
CREATE POLICY "Users can delete their own polls" 
  ON polls FOR DELETE 
  TO authenticated 
  USING (auth.uid() = created_by);

-- Poll options policies
ALTER TABLE poll_options ENABLE ROW LEVEL SECURITY;

-- Anyone can view poll options
CREATE POLICY "Anyone can view poll options" 
  ON poll_options FOR SELECT 
  USING (true);

-- Only authenticated users can create poll options
CREATE POLICY "Authenticated users can create poll options" 
  ON poll_options FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- Only poll creators can update poll options
CREATE POLICY "Poll creators can update options" 
  ON poll_options FOR UPDATE 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM polls 
      WHERE polls.id = poll_options.poll_id 
      AND polls.created_by = auth.uid()
    )
  );

-- Votes policies
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Anyone can view votes
CREATE POLICY "Anyone can view votes" 
  ON votes FOR SELECT 
  USING (true);

-- Only authenticated users can vote
CREATE POLICY "Authenticated users can vote" 
  ON votes FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- Users can only delete their own votes
CREATE POLICY "Users can delete their own votes" 
  ON votes FOR DELETE 
  TO authenticated 
  USING (auth.uid() = user_id);