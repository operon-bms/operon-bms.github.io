import BillExplainer from '../components/BillExplainer';

export default function BillExplainerPage() {
  return (
    <div className="animate-fade-in max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Monthly Bill Explainer</h1>
        <p className="text-sm text-gray-500">Electricity bill variance analysis — walk into owner meetings with a complete, defensible explanation</p>
      </div>
      <BillExplainer />
    </div>
  );
}
