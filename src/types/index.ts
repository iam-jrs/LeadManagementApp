export * from './auth';
// types/index.ts

interface Client {
  id: number
  name: string
  email: string | null
  mobile_number: string
  dial_code: string
}

interface Project {
  id: number
  name: string
  builder: string
}

interface Agent {
  id: number
  name: string
  email: string
}

interface Lead {
  id: number
  status: 'new' | 'contacted' | 'qualified' | 'meeting_scheduled' | 'meeting_done' | 'hot' | 'booking_done'
  sub_status: string
  source: 'google' | 'facebook' | 'instagram' | 'referral' | 'direct'
  created_at: string
  updated_at: string
  client: Client
  project: Project
  agent: Agent
  comments: string | null
}

interface LeadFilters {
  status?: string
  search?: string
  page?: number
  per_page?: number
  sort_by?: 'created_at' | 'client_name'
  sort_order?: 'asc' | 'desc'
}

interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    current_page: number
    total_pages: number
    total_count: number
    next_page: number | null
    prev_page: number | null
  }
}

interface CreateLeadPayload {
  client_name: string
  mobile_number: string
  dial_code: string
  email?: string
  project_id: number
  source: string
  assignee_email: string
}