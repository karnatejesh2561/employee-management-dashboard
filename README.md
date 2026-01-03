# Employee Management Dashboard

A modern, fully-featured Employee Management Dashboard built with React, TypeScript, Vite, and Tailwind CSS.

## Features

✅ **Employee Management**

- View all employees in a responsive table
- Add new employees with form validation
- Edit existing employee information
- Delete employees with confirmation
- View detailed employee profiles

✅ **Search & Filter**

- Search employees by name, email, or department
- Filter by department
- Filter by employment status (Active/Inactive)
- Real-time results

✅ **Data Persistence**

- LocalStorage integration for persistent data
- Sample data included by default

✅ **Responsive Design**

- Mobile-friendly interface
- Built with Tailwind CSS
- Clean, modern UI

## Tech Stack

- **React 18.2** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Layout.tsx      # Main layout with navigation
│   └── EmployeeTable.tsx # Employee list table
├── pages/              # Page components
│   ├── Dashboard.tsx   # Main dashboard with search/filter
│   ├── EmployeeForm.tsx # Add/Edit employee form
│   └── EmployeeDetail.tsx # Single employee details
├── hooks/              # Custom React hooks
│   └── useEmployeeStore.ts # Employee data management
├── types/              # TypeScript type definitions
│   └── index.ts        # Employee interface
├── App.tsx            # Main app component with routing
├── main.tsx           # Entry point
└── index.css          # Global styles with Tailwind
```

## Installation

1. **Navigate to project directory:**

   ```bash
   cd employee-management-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Development

Start the development server:

```bash
npm run dev
```

The application will open in your browser at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## Features in Detail

### Dashboard

- Overview of all employees
- Search functionality with real-time results
- Filter by department and status
- Quick action links (View, Edit, Delete)

### Add/Edit Employee

- Form validation for all fields
- Required fields: First Name, Last Name, Email, Phone, Department, Position, Join Date
- Optional fields: Salary, Status
- Error messages for invalid inputs
- Submit and Cancel buttons

### Employee Details

- Complete employee profile view
- Organized information sections
- Edit and Delete options
- Back to dashboard navigation

### Data Storage

- LocalStorage-based persistence
- Sample data loads on first visit
- Data persists across browser sessions

## Form Validation

The employee form includes validation for:

- ✓ Required fields (all main fields)
- ✓ Email format validation
- ✓ Salary non-negative validation
- ✓ Real-time error display

## Departments

Pre-configured departments:

- Engineering
- HR
- Sales
- Marketing
- Finance
- Operations

## Sample Data

The dashboard comes with 3 sample employees:

1. John Doe - Senior Developer (Engineering)
2. Jane Smith - HR Manager (HR)
3. Bob Johnson - Sales Executive (Sales)

## Styling

All styling uses Tailwind CSS with:

- Responsive grid layouts
- Hover effects and transitions
- Color-coded status badges
- Accessible form inputs
- Professional color scheme

## Future Enhancements

Potential features to add:

- Backend API integration
- User authentication
- Data export (CSV/PDF)
- Advanced filtering and sorting
- Employee performance metrics
- Department management
- Salary analytics

## License

This project is open source and available under the MIT License.

---

**Created for:** React.js Web Assignment - Employee Management Dashboard
# employee-management-dashboard
