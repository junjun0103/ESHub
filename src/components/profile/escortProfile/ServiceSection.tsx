import type React from 'react';
import { useState, useEffect } from 'react';
import type { Escort } from '../../../types';

interface ServiceSectionProps {
  profile: Escort | null;
  onUpdate: (updatedData: Partial<Escort>) => void;
}

interface Service {
  name: string;
  isOffered: boolean;
  isCustom: boolean;
}

const defaultBaseServices: Service[] = [
  { name: 'OWO (Oral without condom)', isOffered: false, isCustom: false },
  { name: 'O-Level (Oral sex)', isOffered: false, isCustom: false },
  { name: 'CIM (Come in mouth)', isOffered: false, isCustom: false },
  { name: 'COF (Come on face)', isOffered: false, isCustom: false },
  { name: 'COB (Come on body)', isOffered: false, isCustom: false },
  { name: 'Swallow', isOffered: false, isCustom: false },
  { name: 'DFK (Deep french kissing)', isOffered: false, isCustom: false },
  { name: 'A-Level (Anal sex)', isOffered: false, isCustom: false },
  { name: 'Anal Rimming (Licking anus)', isOffered: false, isCustom: false },
  { name: '69 (69 sex position)', isOffered: false, isCustom: false },
  { name: 'Striptease/Lapdance', isOffered: false, isCustom: false },
  { name: 'Erotic massage', isOffered: false, isCustom: false },
  { name: 'Golden shower', isOffered: false, isCustom: false },
  { name: 'Couples', isOffered: false, isCustom: false },
  { name: 'GFE (Girlfriend experience)', isOffered: false, isCustom: false },
  { name: 'Threesome', isOffered: false, isCustom: false },
  { name: 'Foot fetish', isOffered: false, isCustom: false },
  { name: 'Sex toys', isOffered: false, isCustom: false },
  { name: 'Extraball (Having sex multiple times)', isOffered: false, isCustom: false },
  { name: 'Domination', isOffered: false, isCustom: false },
  { name: 'LT (Long Time; Usually overnight)', isOffered: false, isCustom: false },
];

const defaultExtraServices: Service[] = [];

const ServiceSection: React.FC<ServiceSectionProps> = ({ profile, onUpdate }) => {
  const [baseServices, setBaseServices] = useState<Service[]>(defaultBaseServices);
  const [extraServices, setExtraServices] = useState<Service[]>(defaultExtraServices);
  const [baseCustomService, setBaseCustomService] = useState('');
  const [extraCustomService, setExtraCustomService] = useState('');

  useEffect(() => {
    if (profile?.services) {
      const updatedBaseServices = defaultBaseServices.map(service => ({
        ...service,
        isOffered: profile.services.includes(service.name)
      }));
      const baseCustomServices = profile.services
        .filter(service => !defaultBaseServices.some(s => s.name === service) && 
                           !service.startsWith('Extra: '))
        .map(service => ({ name: service, isOffered: true, isCustom: true }));
      setBaseServices([...updatedBaseServices, ...baseCustomServices]);

      const extraCustomServices = profile.services
        .filter(service => service.startsWith('Extra: '))
        .map(service => ({ name: service.slice(7), isOffered: true, isCustom: true }));
      setExtraServices(extraCustomServices);
    }
  }, [profile]);

  const handleServiceToggle = (index: number, isBase: boolean) => {
    if (isBase) {
      const updatedServices = [...baseServices];
      updatedServices[index].isOffered = !updatedServices[index].isOffered;
      setBaseServices(updatedServices);
    } else {
      const updatedServices = [...extraServices];
      updatedServices[index].isOffered = !updatedServices[index].isOffered;
      setExtraServices(updatedServices);
    }
  };

  const handleAddCustomService = (isBase: boolean) => {
    if (isBase) {
      if (baseCustomService.trim()) {
        setBaseServices([...baseServices, { name: baseCustomService.trim(), isOffered: true, isCustom: true }]);
        setBaseCustomService('');
      }
    } else {
      if (extraCustomService.trim() && extraServices.length < 20) {
        setExtraServices([...extraServices, { name: extraCustomService.trim(), isOffered: true, isCustom: true }]);
        setExtraCustomService('');
      }
    }
  };

  const handleDeleteCustomService = (index: number, isBase: boolean) => {
    if (isBase) {
      const updatedServices = [...baseServices];
      updatedServices.splice(index, 1);
      setBaseServices(updatedServices);
    } else {
      const updatedServices = [...extraServices];
      updatedServices.splice(index, 1);
      setExtraServices(updatedServices);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const offeredServices = [
      ...baseServices.filter(service => service.isOffered).map(service => service.name),
      ...extraServices.filter(service => service.isOffered).map(service => `Extra: ${service.name}`)
    ];
    onUpdate({ services: offeredServices });
  };

  const renderServiceList = (services: Service[], isBase: boolean) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((service, index) => (
        <div key={index} className="flex items-center justify-between bg-gray-800 p-2 rounded">
          <div className="flex items-center">
            <input
              type="checkbox"
              id={`service-${isBase ? 'base' : 'extra'}-${index}`}
              checked={service.isOffered}
              onChange={() => handleServiceToggle(index, isBase)}
              className="mr-2 form-checkbox h-5 w-5 text-accent-gold rounded border-gray-600 focus:ring-accent-gold"
            />
            <label htmlFor={`service-${isBase ? 'base' : 'extra'}-${index}`} className="text-white">{service.name}</label>
          </div>
          {service.isCustom && (
            <button
              onClick={() => handleDeleteCustomService(index, isBase)}
              className="text-red-400 hover:text-red-300 transition-colors"
              aria-label="Delete service"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-8 bg-gray-900 text-white p-4 sm:p-8 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8">Services Offered</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-accent-gold">Base Services</h3>
          {renderServiceList(baseServices, true)}
          <div className="flex items-center space-x-2 mt-4">
            <input
              type="text"
              value={baseCustomService}
              onChange={(e) => setBaseCustomService(e.target.value)}
              placeholder="Add custom base service"
              className="flex-grow p-2 border rounded bg-gray-800 border-gray-700 text-white focus:border-accent-gold focus:ring-accent-gold"
            />
            <button
              type="button"
              onClick={() => handleAddCustomService(true)}
              className="bg-accent-gold text-gray-900 px-4 py-2 rounded hover:bg-opacity-80 transition-colors"
              disabled={baseServices.length >= 30}
            >
              Add
            </button>
          </div>
          {baseServices.length >= 30 && (
            <p className="text-red-400 mt-2">Maximum base services reached (30)</p>
          )}
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4 text-accent-gold">Extra Services</h3>
          {renderServiceList(extraServices, false)}
          <div className="flex items-center space-x-2 mt-4">
            <input
              type="text"
              value={extraCustomService}
              onChange={(e) => setExtraCustomService(e.target.value)}
              placeholder="Add custom extra service"
              className="flex-grow p-2 border rounded bg-gray-800 border-gray-700 text-white focus:border-accent-gold focus:ring-accent-gold"
            />
            <button
              type="button"
              onClick={() => handleAddCustomService(false)}
              className="bg-accent-gold text-gray-900 px-4 py-2 rounded hover:bg-opacity-80 transition-colors"
              disabled={extraServices.length >= 20}
            >
              Add
            </button>
          </div>
          {extraServices.length >= 20 && (
            <p className="text-red-400 mt-2">Maximum extra services reached (20)</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto bg-accent-gold text-gray-900 px-6 py-3 rounded-full hover:bg-opacity-80 transition-colors font-bold mt-8"
        >
          Save Services
        </button>
      </form>
    </div>
  );

};

export default ServiceSection;