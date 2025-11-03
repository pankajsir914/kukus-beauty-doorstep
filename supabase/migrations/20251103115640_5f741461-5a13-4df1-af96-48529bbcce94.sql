-- Add follow_up_date column to leads table
ALTER TABLE public.leads 
ADD COLUMN follow_up_date timestamp with time zone;

-- Add index for better query performance on follow_up_date
CREATE INDEX idx_leads_follow_up_date ON public.leads(follow_up_date) WHERE follow_up_date IS NOT NULL;