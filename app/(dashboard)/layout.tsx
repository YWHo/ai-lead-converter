import DashboardNavbar from '@/components/ui/DashboardNavbar';

export default function DashboardLayout({ children }: { children: React.ReactNode}) {
  return (
    <div className='flex flex-col h-full w-full'>
      <DashboardNavbar />
      { children }
    </div>
  )
}