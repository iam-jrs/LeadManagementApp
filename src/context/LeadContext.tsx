import React, { createContext, useContext, useState, ReactNode } from 'react';
import leadsData from '../mock/data.json';
import { Lead } from '../types/index';

interface LeadContextType {
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'created_at' | 'updated_at'>) => boolean;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export const LeadProvider = ({ children }: { children: ReactNode }) => {
  const [leads, setLeads] = useState<Lead[]>(
    leadsData.leads.map((lead: any) => ({
      ...lead,
      status: lead.status as Lead['status'],
    }))
  );

  const addLead = (lead: Omit<Lead, 'id' | 'created_at' | 'updated_at'>) => {
    // Simple validation for duplicate mobile number
    if (leads.some(l => l.client.mobile_number === lead.client.mobile_number)) {
      return false;
    }
    const newLead: Lead = {
      ...lead,
      id: leads.length + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setLeads([newLead, ...leads]);
    return true;
  };

  return (
    <LeadContext.Provider value={{ leads, addLead }}>
      {children}
    </LeadContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
};
