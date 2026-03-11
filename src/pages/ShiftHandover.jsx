import ShiftHandoverBrief from '../components/ShiftHandoverBrief';

export default function ShiftHandover() {
  return (
    <div className="animate-fade-in max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shift Handover Brief</h1>
        <p className="text-sm text-gray-500">Auto-generated handover — all open items transferred between teams</p>
      </div>
      <ShiftHandoverBrief />
    </div>
  );
}
