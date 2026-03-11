import { useState } from 'react';
import { Star, Check } from 'lucide-react';

export default function VendorTable({ vendors, onSelect, selectedId }) {
  return (
    <div className="overflow-x-auto animate-fade-in">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Vendor</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Rating</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Speciality</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Last Job</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Est. Cost</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">ETA</th>
            <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map(v => (
            <tr
              key={v.id}
              className={`border-b border-gray-100 transition-colors ${
                selectedId === v.id ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
            >
              <td className="py-3 px-4 font-medium text-gray-900">{v.name}</td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  <span className="font-medium">{v.rating}</span>
                  <span className="text-gray-400 text-xs">({v.totalJobs})</span>
                </div>
              </td>
              <td className="py-3 px-4 text-gray-600 hidden sm:table-cell">{v.speciality}</td>
              <td className="py-3 px-4 text-gray-500 hidden md:table-cell">{v.lastJob}</td>
              <td className="py-3 px-4 font-mono font-medium text-gray-900">{v.estimatedCost}</td>
              <td className="py-3 px-4 text-gray-600">{v.availability}</td>
              <td className="py-3 px-4 text-right">
                {selectedId === v.id ? (
                  <span className="inline-flex items-center gap-1 text-ok text-xs font-medium">
                    <Check size={14} /> Selected
                  </span>
                ) : (
                  <button
                    onClick={() => onSelect(v.id)}
                    className="px-3 py-1 text-xs font-medium bg-accent text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Select
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
