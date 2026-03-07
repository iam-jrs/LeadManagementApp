import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import leadsData from '../mock/data.json';
import { Lead } from '../types/index';

interface LeadState {
  leads: Lead[];
}

const initialState: LeadState = {
  leads: leadsData.leads.map((lead: any) => ({
    ...lead,
    status: lead.status as Lead['status'],
  })),
};

export const leadSlice = createSlice({
  name: 'lead',
  initialState,
  reducers: {
    addLead: (state, action: PayloadAction<Omit<Lead, 'id' | 'created_at' | 'updated_at'>>) => {
      // Prevent duplicate mobile number
      if (state.leads.some(l => l.client.mobile_number === action.payload.client.mobile_number)) {
        return;
      }
      const newLead: Lead = {
        ...action.payload,
        id: state.leads.length + 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      state.leads = [newLead, ...state.leads];
    },

    updateLead: (state, action: PayloadAction<{ id: number; status?: string; comments?: string }>) => {
      const { id, status, comments } = action.payload;
      const lead = state.leads.find(l => l.id === id);
      if (lead) {
        if (status !== undefined) lead.status = status as any;
        if (comments !== undefined) lead.comments = comments;
        lead.updated_at = new Date().toISOString();
      }
    }
  }
});

export const { addLead, updateLead } = leadSlice.actions;
export default leadSlice.reducer;
