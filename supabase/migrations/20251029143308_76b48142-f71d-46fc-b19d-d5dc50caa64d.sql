-- Create storage bucket for banner images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('banners', 'banners', true);

-- Create RLS policies for banner uploads
CREATE POLICY "Admins can upload banner images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'banners' AND
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update banner images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'banners' AND
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete banner images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'banners' AND
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Anyone can view banner images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'banners');