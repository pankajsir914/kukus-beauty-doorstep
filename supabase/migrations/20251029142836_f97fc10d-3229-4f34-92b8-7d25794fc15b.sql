-- Create banners table for website display
CREATE TABLE public.banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  link_url TEXT,
  priority INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;

-- Admins can manage all banners
CREATE POLICY "Admins can manage banners"
ON public.banners
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Anyone can view active banners (for website display)
CREATE POLICY "Anyone can view active banners"
ON public.banners
FOR SELECT
TO anon
USING (is_active = true);

-- Add trigger for updated_at
CREATE TRIGGER update_banners_updated_at
BEFORE UPDATE ON public.banners
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add index for priority ordering
CREATE INDEX idx_banners_priority ON public.banners(priority DESC, created_at DESC);