-- Add payment tracking columns to appointments table
ALTER TABLE public.appointments
ADD COLUMN payment_amount NUMERIC DEFAULT 0,
ADD COLUMN payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'partial', 'paid', 'refunded'));

-- Update existing appointments to have payment amounts from service prices
UPDATE public.appointments a
SET payment_amount = s.price
FROM public.services s
WHERE a.service_id = s.id AND a.payment_amount = 0;