import { Suspense } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

function DashboardContent() {
  return (
    <DashboardLayout>
      {/* Content is handled by DashboardLayout */}
    </DashboardLayout>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}

