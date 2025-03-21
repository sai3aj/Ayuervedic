# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Environment Setup

This project uses Supabase for backend services. To connect to Supabase, you'll need to set up environment variables:

1. Create a `.env` file in the root directory
2. Add the following variables:
   ```
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
3. Replace the placeholder values with your actual Supabase credentials

For development, you can copy the `.env.example` file and rename it to `.env`, then add your credentials.

## Admin User Management

This application uses a database table approach for user role management instead of Edge Functions. This approach stores admin status in a dedicated `admin_requests` table.

### Setting Up the Admin System

1. Execute the SQL script to create the `admin_requests` table:
   - Go to your Supabase dashboard
   - Navigate to the SQL Editor
   - Open and run the `supabase/admin_requests.sql` file

### Creating Your First Admin User

To create your first admin user:

1. Sign up a regular user through the application
2. Edit the `supabase/create_first_admin.sql` file:
   - Change `your-email@example.com` to your email address
3. Run the script in Supabase SQL Editor
4. Log out and log back in to the application - you should now have admin access

### Making More Admin Users

Once you have admin access:

1. Log in with your admin account
2. Go to Admin > User Management
3. Enter the email of the user you want to promote
4. Click "Make Admin"
5. The user will need to log out and log back in for the changes to take effect

### How Admin Detection Works

The system checks for admin status in two places:
1. Legacy method: User metadata (for backward compatibility)
2. New method: The `admin_requests` table with `status='approved'`

If a user has admin privileges in either place, they will have admin access in the application.

### Troubleshooting

If you encounter issues:

1. Check if the `admin_requests` table was created correctly
2. Verify that your email matches exactly what's in the auth system
3. Try logging out and back in after making changes
4. Check the browser console for any errors

## Alternative Methods for Creating an Admin User

You can still use direct SQL to set a user as admin:

```sql
UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{role}',
  '"admin"'
)
WHERE email = 'your-email@example.com';
```

Or insert directly into the admin_requests table:

```sql
INSERT INTO public.admin_requests (
  requested_by, 
  email, 
  status, 
  created_at
) 
VALUES (
  (SELECT id FROM auth.users WHERE email = 'your-email@example.com'), 
  'your-email@example.com', 
  'approved', 
  NOW()
);
```
