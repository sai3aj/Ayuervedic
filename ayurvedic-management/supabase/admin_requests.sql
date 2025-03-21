-- Create the admin_requests table to track admin role assignments
CREATE TABLE IF NOT EXISTS public.admin_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  requested_by UUID NOT NULL REFERENCES auth.users(id),
  email TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS admin_requests_email_idx ON public.admin_requests(email);

-- Create an index on status for faster filtering
CREATE INDEX IF NOT EXISTS admin_requests_status_idx ON public.admin_requests(status);

-- Set up Row Level Security (RLS)
ALTER TABLE public.admin_requests ENABLE ROW LEVEL SECURITY;

-- Allow users who are admins to select all rows
CREATE POLICY "Admins can view all admin requests" 
  ON public.admin_requests 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM admin_requests ar 
      WHERE ar.email = auth.email() 
      AND ar.status = 'approved'
    )
    OR
    auth.jwt() ->> 'user_metadata'::text = '{"role":"admin"}'
  );

-- Allow users who are admins to insert new rows
CREATE POLICY "Admins can create admin requests" 
  ON public.admin_requests 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_requests ar 
      WHERE ar.email = auth.email() 
      AND ar.status = 'approved'
    )
    OR
    auth.jwt() ->> 'user_metadata'::text = '{"role":"admin"}'
  );

-- Allow users who are admins to update rows
CREATE POLICY "Admins can update admin requests" 
  ON public.admin_requests 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM admin_requests ar 
      WHERE ar.email = auth.email() 
      AND ar.status = 'approved'
    )
    OR
    auth.jwt() ->> 'user_metadata'::text = '{"role":"admin"}'
  );

-- Create a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_admin_requests_updated_at
BEFORE UPDATE ON public.admin_requests
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Add notification function
CREATE OR REPLACE FUNCTION handle_new_admin_request()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'approved' THEN
    -- You could add additional logic here if needed
    -- For example, sending notifications or emails
    NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_admin_request_approved
AFTER INSERT OR UPDATE ON public.admin_requests
FOR EACH ROW
WHEN (NEW.status = 'approved')
EXECUTE FUNCTION handle_new_admin_request(); 