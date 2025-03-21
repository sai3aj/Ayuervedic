-- Add booked_by_admin column to appointments table
ALTER TABLE public.appointments 
ADD COLUMN IF NOT EXISTS booked_by_admin BOOLEAN DEFAULT false;

-- Update existing appointments (optional)
UPDATE public.appointments
SET booked_by_admin = false
WHERE booked_by_admin IS NULL;