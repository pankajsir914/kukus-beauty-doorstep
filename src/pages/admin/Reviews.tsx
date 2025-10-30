import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Check, X, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Review {
  id: string;
  full_name: string;
  email: string | null;
  rating: number;
  review_text: string;
  is_approved: boolean;
  created_at: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const { error } = await supabase
        .from("reviews")
        .update({ is_approved: true })
        .eq("id", id);

      if (error) throw error;

      toast.success("Review approved successfully");
      fetchReviews();
    } catch (error) {
      console.error("Error approving review:", error);
      toast.error("Failed to approve review");
    }
  };

  const handleReject = async (id: string) => {
    try {
      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Review rejected and deleted");
      fetchReviews();
    } catch (error) {
      console.error("Error rejecting review:", error);
      toast.error("Failed to reject review");
    }
  };

  const pendingReviews = reviews.filter(r => !r.is_approved);
  const approvedReviews = reviews.filter(r => r.is_approved);

  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Reviews Management</h1>
          <div className="flex gap-4">
            <Badge variant="outline" className="text-base py-2 px-4">
              Pending: {pendingReviews.length}
            </Badge>
            <Badge variant="outline" className="text-base py-2 px-4 bg-green-50">
              Approved: {approvedReviews.length}
            </Badge>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading reviews...</p>
          </div>
        ) : (
          <>
            {/* Pending Reviews */}
            {pendingReviews.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                  Pending Reviews
                </h2>
                <div className="grid gap-4">
                  {pendingReviews.map((review) => (
                    <Card key={review.id} className="border-2 border-orange-200 bg-orange-50/30">
                      <CardHeader>
                        <CardTitle className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-bold text-lg">{review.full_name}</span>
                              {review.email && (
                                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Mail className="h-3 w-3" />
                                  {review.email}
                                </span>
                              )}
                            </div>
                            <div className="flex gap-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <Badge variant="secondary">Pending</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm italic leading-relaxed">"{review.review_text}"</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">
                            Submitted: {new Date(review.created_at).toLocaleString('en-IN')}
                          </p>
                          <div className="flex gap-2">
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleApprove(review.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleReject(review.id)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Approved Reviews */}
            {approvedReviews.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Approved Reviews
                </h2>
                <div className="grid gap-4">
                  {approvedReviews.map((review) => (
                    <Card key={review.id} className="border-2 border-green-200 bg-green-50/30">
                      <CardHeader>
                        <CardTitle className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-bold text-lg">{review.full_name}</span>
                              {review.email && (
                                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Mail className="h-3 w-3" />
                                  {review.email}
                                </span>
                              )}
                            </div>
                            <div className="flex gap-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <Badge className="bg-green-600">Approved</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm italic leading-relaxed">"{review.review_text}"</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">
                            Submitted: {new Date(review.created_at).toLocaleString('en-IN')}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReject(review.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {reviews.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No reviews yet</p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
  );
};

export default Reviews;
