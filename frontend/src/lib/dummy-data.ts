/* eslint-disable @typescript-eslint/no-unused-vars */

// TypeScript interfaces matching FastAPI Schemas
export interface JobResponse {
  id: int;
  title: string;
  description: string;
  location: string;
  salary: string;
  company_id: int;
  is_active: boolean;
  created_at: string;
}

export interface UserResponse {
  id: int;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export interface ApplicationResponse {
  id: int;
  job_id: int;
  candidate_id: int;
  status: string;
  created_at: string;
}

// Map 'int' to 'number' for TypeScript types
export type int = number;

export const COMPANIES: UserResponse[] = [
  { id: 1, name: "Acme Corp", email: "careers@acmecorp.com", role: "company", created_at: "2024-01-01T00:00:00Z" },
  { id: 2, name: "Google", email: "jobs@google.com", role: "company", created_at: "2024-01-01T00:00:00Z" },
  { id: 3, name: "Notion", email: "team@notion.so", role: "company", created_at: "2024-01-01T00:00:00Z" },
  { id: 4, name: "Linear", email: "engineering@linear.app", role: "company", created_at: "2024-01-01T00:00:00Z" },
];

export const CURRENT_USER: UserResponse = {
  id: 101,
  name: "Jane Doe",
  email: "jane@example.com",
  role: "candidate",
  created_at: "2024-02-15T00:00:00Z",
};

export const JOBS: JobResponse[] = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    description: "Build exceptional user experiences for our flagship product using React and Next.js.",
    location: "Remote, US",
    salary: "$140k - $180k",
    company_id: 1, // Acme Corp
    is_active: true,
    created_at: "2024-03-24T10:00:00Z"
  },
  {
    id: 2,
    title: "Product Designer",
    description: "Shape the future of our design system and craft beautiful interfaces.",
    location: "San Francisco, CA",
    salary: "$120k - $160k",
    company_id: 4, // Linear
    is_active: true,
    created_at: "2024-03-23T09:30:00Z"
  },
  {
    id: 3,
    title: "Backend Specialist (Python)",
    description: "Scale our core APIs using FastAPI and PostgreSQL holding millions of requests.",
    location: "Remote, Global",
    salary: "$130k - $170k",
    company_id: 2, // Google
    is_active: true,
    created_at: "2024-03-20T14:20:00Z"
  },
  {
    id: 4,
    title: "UX Researcher",
    description: "Conduct generative and evaluative research to inform product strategy.",
    location: "New York, NY",
    salary: "$110k - $140k",
    company_id: 3, // Notion
    is_active: true,
    created_at: "2024-03-22T08:15:00Z"
  },
  {
    id: 5,
    title: "Full Stack Developer",
    description: "Work across the stack with Next.js, Node, and Python. Build features end-to-end.",
    location: "Remote",
    salary: "$125k - $155k",
    company_id: 1, 
    is_active: true,
    created_at: "2024-03-21T11:00:00Z"
  },
  {
    id: 6,
    title: "DevOps Engineer",
    description: "Maintain and scale our Kubernetes infrastructure across AWS and GCP.",
    location: "Seattle, WA",
    salary: "$150k - $190k",
    company_id: 2,
    is_active: true,
    created_at: "2024-03-19T13:45:00Z"
  },
  {
    id: 7,
    title: "Growth Marketer",
    description: "Drive user acquisition strategies and run impactful marketing campaigns.",
    location: "Remote, Europe",
    salary: "€80k - €110k",
    company_id: 3,
    is_active: true,
    created_at: "2024-03-24T12:00:00Z"
  },
  {
    id: 8,
    title: "Data Scientist",
    description: "Analyze vast amounts of data to uncover insights and build predictive models.",
    location: "London, UK",
    salary: "£90k - £130k",
    company_id: 4,
    is_active: true,
    created_at: "2024-03-15T09:00:00Z"
  },
  {
    id: 9,
    title: "Mobile Engineer (React Native)",
    description: "Lead the development of our flagship mobile application using React Native.",
    location: "Remote, US",
    salary: "$135k - $175k",
    company_id: 1,
    is_active: true,
    created_at: "2024-03-25T08:00:00Z"
  },
  {
    id: 10,
    title: "Engineering Manager",
    description: "Support, mentor, and grow a diverse team of engineers while driving technical excellence.",
    location: "San Francisco, CA",
    salary: "$180k - $220k",
    company_id: 2,
    is_active: true,
    created_at: "2024-03-10T10:00:00Z"
  },
  {
    id: 11,
    title: "AI Prompt Engineer",
    description: "Design robust, reliable, and highly performant prompts for our core LLM interactions.",
    location: "Remote",
    salary: "$120k - $160k",
    company_id: 3,
    is_active: true,
    created_at: "2024-03-24T18:00:00Z"
  },
  {
    id: 12,
    title: "Staff Security Engineer",
    description: "Lead comprehensive security audits and establish best practices across the engineering organization.",
    location: "Austin, TX",
    salary: "$190k - $240k",
    company_id: 1,
    is_active: true,
    created_at: "2024-03-26T09:00:00Z"
  },
  {
    id: 13,
    title: "Technical Writer",
    description: "Create exceptionally clear and engaging documentation for our developer APIs and SDKs.",
    location: "Remote, Global",
    salary: "$90k - $120k",
    company_id: 4,
    is_active: true,
    created_at: "2024-03-22T14:30:00Z"
  },
  {
    id: 14,
    title: "DevRel Advocate",
    description: "Engage with the developer community, host webinars, and create educational content.",
    location: "San Francisco, CA",
    salary: "$130k - $160k",
    company_id: 2,
    is_active: true,
    created_at: "2024-03-20T10:00:00Z"
  },
  {
    id: 15,
    title: "Data Engineer",
    description: "Build scalable ETL pipelines to process millions of events per second.",
    location: "New York, NY",
    salary: "$140k - $180k",
    company_id: 1,
    is_active: true,
    created_at: "2024-03-18T11:15:00Z"
  }
];

export const APPLICATIONS: ApplicationResponse[] = [
  {
    id: 1,
    job_id: 2, // Product Designer
    candidate_id: 101, // Jane Doe
    status: "Pending",
    created_at: "2024-03-24T18:00:00Z"
  },
  {
    id: 2,
    job_id: 4, // UX Researcher
    candidate_id: 101,
    status: "Accepted",
    created_at: "2024-03-23T11:00:00Z"
  },
  {
    id: 3,
    job_id: 1, // Senior Frontend Engineer
    candidate_id: 101,
    status: "Rejected",
    created_at: "2024-03-20T10:00:00Z"
  }
];

/** Helper to get company details for a job */
export const getCompanyForJob = (companyId: number) => {
  return COMPANIES.find(c => c.id === companyId) || COMPANIES[0];
};

/** Helper to get full job details */
export const getJobDetails = (id: number) => {
  return JOBS.find(j => j.id === id);
};
