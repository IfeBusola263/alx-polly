-- Function to increment vote count for a poll option
CREATE OR REPLACE FUNCTION increment_vote(option_id_param UUID)
RETURNS void AS $$
BEGIN
  UPDATE poll_options
  SET votes = votes + 1
  WHERE id = option_id_param;
END;
$$ LANGUAGE plpgsql;