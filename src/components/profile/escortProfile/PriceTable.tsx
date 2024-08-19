import type React from 'react';
import { useState, useEffect } from 'react';
import type { Escort } from '../../../types';

interface PriceTableProps {
  profile: Escort | null;
  onUpdate: (updatedData: Partial<Escort>) => void;
}

interface PriceEntry {
  duration: number;
  incall: number;
  outcall: number;
  description: string;
}

const PriceTable: React.FC<PriceTableProps> = ({ profile, onUpdate }) => {
  const [priceTable, setPriceTable] = useState<PriceEntry[]>(
    profile?.priceTable || [{ duration: 60, incall: 0, outcall: 0, description: '' }]
  );

  useEffect(() => {
    if (profile?.priceTable) {
      setPriceTable(profile.priceTable);
    }
  }, [profile]);

  const handlePriceChange = (index: number, field: keyof PriceEntry, value: string | number) => {
    const updatedTable = [...priceTable];
    if (field === 'duration' || field === 'incall' || field === 'outcall') {
      const numValue = Number(String(value).replace(/^0+/, ''));
      updatedTable[index][field] = numValue;
    } else {
      updatedTable[index][field] = value as string;
    }
    setPriceTable(updatedTable);
  };

  const addNewEntry = () => {
    setPriceTable([...priceTable, { duration: 0, incall: 0, outcall: 0, description: '' }]);
  };

  const removeEntry = (index: number) => {
    if (index === 0) {
      alert("You cannot remove the first entry as it is mandatory.");
      return;
    }
    const updatedTable = priceTable.filter((_, i) => i !== index);
    setPriceTable(updatedTable);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ priceTable });
  };

  const getWordCount = (str: string) => {
    const trimmedStr = str.trim();
    return trimmedStr === '' ? 0 : trimmedStr.length;
  };

  return (
    <div className="space-y-6 bg-gray-900 text-white p-4 sm:p-8 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8">Your Price Table</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-2 text-left min-w-24">Duration
                <p className="text-xs text-gray-300">
                    (1hr:60;2hr:120;3hr:180)
                </p>
                </th>
                <th className="p-2 text-left w-24">Incall</th>
                <th className="p-2 text-left w-24">Outcall</th>
                <th className="p-2 text-left min-w-40">Description</th>
                <th className="p-2 text-left w-20">Action</th>
              </tr>
            </thead>
            <tbody>
              {priceTable.map((entry, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="p-2">
                    <input
                      type="number"
                      value={entry.duration}
                      onChange={(e) => handlePriceChange(index, 'duration', e.target.value)}
                      className="w-full p-1 bg-gray-800 border border-gray-600 rounded text-white"
                      min="10"
                      step="10"
                      readOnly={index === 0}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={entry.incall}
                      onChange={(e) => handlePriceChange(index, 'incall', e.target.value)}
                      className="w-full p-1 bg-gray-800 border border-gray-600 rounded text-white"
                      min="0"
                      step="10"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={entry.outcall}
                      onChange={(e) => handlePriceChange(index, 'outcall', e.target.value)}
                      className="w-full p-1 bg-gray-800 border border-gray-600 rounded text-white"
                      min="0"
                      step="10"
                    />
                  </td>
                  <td className="p-2">
                    <div className="relative">
                      <input
                        type="text"
                        value={entry.description}
                        onChange={(e) => {
                          if (getWordCount(e.target.value) <= 15) {
                            handlePriceChange(index, 'description', e.target.value);
                          }
                        }}
                        className="w-full p-1 pr-12 bg-gray-800 border border-gray-600 rounded text-white"
                        placeholder="Max 15 words"
                      />
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                        {getWordCount(entry.description)}/15
                      </div>
                    </div>
                  </td>
                  <td className="p-2">
                    {index !== 0 && (
                      <button
                      type="button"
                      onClick={() => removeEntry(index)}
                      className="text-red-400 hover:text-red-300 transition-colors p-1"
                      aria-label="Remove price"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <button
            type="button"
            onClick={addNewEntry}
            className="w-full sm:w-auto bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            disabled={priceTable.length >= 10}
          >
            Add New Entry
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto bg-accent-gold text-gray-900 px-6 py-2 rounded hover:bg-opacity-80 transition-colors font-bold"
          >
            Save Price Table
          </button>
        </div>
      </form>
    </div>
  );
};

export default PriceTable;