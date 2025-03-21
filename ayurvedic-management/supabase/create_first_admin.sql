-- This script creates the first admin user
-- Replace 'your-email@example.com' with the email of the user you want to make admin

-- First, let's find the user's ID
DO $$
DECLARE
    user_id UUID;
    admin_email TEXT := 'your-email@example.com';  -- CHANGE THIS to your email
BEGIN
    -- Get the user ID
    SELECT id INTO user_id 
    FROM auth.users 
    WHERE email = admin_email;
    
    IF user_id IS NULL THEN
        RAISE EXCEPTION 'User with email % not found', admin_email;
    END IF;
    
    -- Insert into admin_requests
    INSERT INTO public.admin_requests (
        requested_by, 
        email, 
        status, 
        created_at
    ) 
    VALUES (
        user_id, 
        admin_email, 
        'approved', 
        NOW()
    )
    ON CONFLICT (email) DO NOTHING;
    
    -- You can also optionally update the user's metadata
    -- But this is not required as we now check the admin_requests table
    UPDATE auth.users
    SET raw_user_meta_data = jsonb_set(
        COALESCE(raw_user_meta_data, '{}'::jsonb),
        '{role}',
        '"admin"'
    )
    WHERE id = user_id;
    
    RAISE NOTICE 'User % has been set as admin', admin_email;
END $$; 