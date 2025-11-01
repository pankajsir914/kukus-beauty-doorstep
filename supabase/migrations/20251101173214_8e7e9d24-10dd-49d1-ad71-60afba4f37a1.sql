-- Add original_price column to services table for showing discounts
ALTER TABLE public.services 
ADD COLUMN IF NOT EXISTS original_price numeric;

-- Add comment to clarify pricing structure
COMMENT ON COLUMN public.services.price IS 'Current selling price (after discount if applicable)';
COMMENT ON COLUMN public.services.original_price IS 'Original price before discount (optional, for showing discount)';