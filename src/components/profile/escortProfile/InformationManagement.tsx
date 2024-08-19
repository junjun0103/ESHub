import type React from 'react';
import { useState, useEffect } from 'react';
import type { Escort,Language } from '../../../types';

interface InformationManagementProps {
  profile: Escort | null;
  onUpdate: (updatedData: Partial<Escort>) => void;
}

const InformationManagement: React.FC<InformationManagementProps> = ({ profile, onUpdate }) => {
  const [name, setName] = useState(profile?.name || '');
  const [age, setAge] = useState(profile?.age?.toString() || '');
  const [suburb, setSuburb] = useState(profile?.suburb || '');
  const [region, setRegion] = useState(profile?.region || '');
  const [nationality, setNationality] = useState(profile?.nationality || '');
  const [height, setHeight] = useState(profile?.height?.toString() || '');
  const [weight, setWeight] = useState(profile?.weight?.toString() || '');
  const [hairColor, setHairColor] = useState(profile?.hairColor || '');
  const [hairLength, setHairLength] = useState(profile?.hairLength || '');
  const [bustSize, setBustSize] = useState(profile?.bustSize || '');
  const [bodyType, setBodyType] = useState(profile?.bodyType || '');
  const [smoker, setSmoker] = useState(profile?.smoker || false);
  const [languages, setLanguages] = useState<Language[]>(profile?.languages || []);
  const [about, setAbout] = useState(profile?.about || '');

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setAge(profile.age?.toString() || '');
      setSuburb(profile.suburb || '');
      setRegion(profile.region || '');
      setNationality(profile.nationality || '');
      setHeight(profile.height?.toString() || '');
      setWeight(profile.weight?.toString() || '');
      setHairColor(profile.hairColor || '');
      setHairLength(profile.hairLength || '');
      setBustSize(profile.bustSize || '');
      setBodyType(profile.bodyType || '');
      setSmoker(profile.smoker || false);
      setLanguages(profile.languages || []);
      setAbout(profile.about || '');
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      name,
      age: parseInt(age),
      suburb,
      region,
      nationality,
      height: parseInt(height),
      weight: parseInt(weight),
      hairColor,
      hairLength,
      bustSize,
      bodyType,
      smoker,
      languages,
      about,
    });
  };

  // Table Handler
  const addLanguage = () => {
    setLanguages([...languages, { name: '', level: 'Basic' }]);
  };

  const removeLanguage = (index: number) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  const updateLanguage = (index: number, field: 'name' | 'level', value: string) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index][field] = value;
    setLanguages(updatedLanguages);
  };

  return (
    <div className="space-y-8 bg-gray-900 text-white p-4 sm:p-8 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8">Personal Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {[
          { label: 'Name', value: name, setter: setName, type: 'text' },
          { label: 'Age', value: age, setter: setAge, type: 'number', min: '18' },
          { label: 'Suburb', value: suburb, setter: setSuburb, type: 'text' },
          { label: 'Region', value: region, setter: setRegion, type: 'text' },
          { label: 'Nationality', value: nationality, setter: setNationality, type: 'text' },
          { label: 'Height (cm)', value: height, setter: setHeight, type: 'number', min: '0' },
          { label: 'Weight (kg)', value: weight, setter: setWeight, type: 'number', min: '0' },
          { label: 'Hair Color', value: hairColor, setter: setHairColor, type: 'text' },
          { label: 'Hair Length', value: hairLength, setter: setHairLength, type: 'text' },
          { label: 'Bust Size', value: bustSize, setter: setBustSize, type: 'text' },
          { label: 'Body Type', value: bodyType, setter: setBodyType, type: 'text' },
        ].map((field) => (
          <div key={field.label}>
            <label htmlFor={field.label.toLowerCase()} className="block text-sm font-medium text-gray-300">
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.label.toLowerCase()}
              value={field.value}
              onChange={(e) => field.setter(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-accent-gold focus:ring-accent-gold"
              min={field.min}
            />
          </div>
        ))}

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={smoker}
              onChange={(e) => setSmoker(e.target.checked)}
              className="rounded border-gray-700 text-accent-gold focus:ring-accent-gold h-4 w-4"
            />
            <span className="ml-2 text-sm text-gray-300">Smoker</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Languages</label>
          <table className="w-full mb-2 text-sm">
            <thead>
              <tr>
                <th className="text-left p-2 text-gray-300">Language</th>
                <th className="text-left p-2 text-gray-300">Proficiency</th>
                <th className="text-left p-2 text-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {languages.map((lang, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-2">
                    <input
                      type="text"
                      value={lang.name}
                      onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                      className="w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-accent-gold focus:ring-accent-gold"
                    />
                  </td>
                  <td className="py-2">
                    <select
                      value={lang.level}
                      onChange={(e) => updateLanguage(index, 'level', e.target.value)}
                      className="w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-accent-gold focus:ring-accent-gold"
                    >
                      <option value="Basic">Basic</option>
                      <option value="Conversational">Conversational</option>
                      <option value="Fluent">Fluent</option>
                      <option value="Native">Native</option>
                    </select>
                  </td>
                  <td className="py-2">
                    <button
                      type="button"
                      onClick={() => removeLanguage(index)}
                      className="text-red-400 hover:text-red-300 transition-colors p-1"
                      aria-label="Remove language"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            onClick={addLanguage}
            className="bg-accent-gold text-gray-900 px-4 py-2 rounded hover:bg-opacity-80 transition-colors"
            disabled={languages.length >= 5}
          >
            Add Language
          </button>
        </div>

        <div>
          <label htmlFor="about" className="block text-sm font-medium text-gray-300">About Me</label>
          <textarea
            id="about"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-accent-gold focus:ring-accent-gold"
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto bg-accent-gold text-gray-900 px-6 py-3 rounded-full hover:bg-opacity-80 transition-colors font-bold"
        >
          Save Changes
        </button>
      </form>
    </div>  
  );
};

export default InformationManagement;