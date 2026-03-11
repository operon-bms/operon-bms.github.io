import TenantComplaintIntelligence from '../components/TenantComplaintIntelligence';

export default function TenantComplaints() {
  return (
    <div className="animate-fade-in max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tenant Complaint Intelligence</h1>
        <p className="text-sm text-gray-500">Cross-referenced complaints against live sensor data — resolution in under 2 minutes</p>
      </div>
      <TenantComplaintIntelligence />
    </div>
  );
}
