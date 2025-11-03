import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Search, Phone, Mail, Calendar, MessageSquare, CalendarClock, X } from "lucide-react";
import { format, addDays, startOfDay, endOfDay, isBefore, isToday, isPast } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Lead {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  service_interested: string | null;
  preferred_date: string | null;
  message: string | null;
  status: string;
  created_at: string;
  follow_up_date: string | null;
}

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [followUpFilter, setFollowUpFilter] = useState("all");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error: any) {
      toast.error("Error fetching leads");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("leads")
        .update({ status: newStatus })
        .eq("id", leadId);

      if (error) throw error;
      toast.success("Lead status updated");
      fetchLeads();
    } catch (error: any) {
      toast.error("Error updating lead status");
      console.error(error);
    }
  };

  const updateFollowUpDate = async (leadId: string, date: Date | null) => {
    try {
      const { error } = await supabase
        .from("leads")
        .update({ follow_up_date: date ? date.toISOString() : null })
        .eq("id", leadId);

      if (error) throw error;
      toast.success(date ? "Follow-up date set" : "Follow-up date cleared");
      fetchLeads();
    } catch (error: any) {
      toast.error("Error updating follow-up date");
      console.error(error);
    }
  };

  const setQuickFollowUp = async (leadId: string, days: number) => {
    const date = addDays(new Date(), days);
    await updateFollowUpDate(leadId, date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500";
      case "contacted":
        return "bg-yellow-500";
      case "converted":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getFollowUpStatus = (followUpDate: string | null) => {
    if (!followUpDate) return "none";
    const date = new Date(followUpDate);
    if (isPast(date) && !isToday(date)) return "overdue";
    if (isToday(date)) return "today";
    return "upcoming";
  };

  const getFollowUpRowClass = (followUpDate: string | null) => {
    const status = getFollowUpStatus(followUpDate);
    switch (status) {
      case "overdue":
        return "bg-red-500/10 hover:bg-red-500/20";
      case "today":
        return "bg-orange-500/10 hover:bg-orange-500/20";
      case "upcoming":
        return "bg-green-500/5 hover:bg-green-500/10";
      default:
        return "";
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = lead.full_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone?.includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    
    const followUpStatus = getFollowUpStatus(lead.follow_up_date);
    const matchesFollowUp = 
      followUpFilter === "all" ||
      (followUpFilter === "due_today" && followUpStatus === "today") ||
      (followUpFilter === "overdue" && followUpStatus === "overdue") ||
      (followUpFilter === "upcoming" && followUpStatus === "upcoming") ||
      (followUpFilter === "no_followup" && followUpStatus === "none");
    
    return matchesSearch && matchesStatus && matchesFollowUp;
  }).sort((a, b) => {
    // Sort by follow-up date priority: overdue -> today -> upcoming -> none
    const statusA = getFollowUpStatus(a.follow_up_date);
    const statusB = getFollowUpStatus(b.follow_up_date);
    const priority = { overdue: 0, today: 1, upcoming: 2, none: 3 };
    
    if (priority[statusA] !== priority[statusB]) {
      return priority[statusA] - priority[statusB];
    }
    
    // If same priority, sort by follow-up date
    if (a.follow_up_date && b.follow_up_date) {
      return new Date(a.follow_up_date).getTime() - new Date(b.follow_up_date).getTime();
    }
    
    return 0;
  });

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Leads</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Website Inquiries</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-background">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={followUpFilter} onValueChange={setFollowUpFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-background">
                <SelectValue placeholder="Follow-up filter" />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                <SelectItem value="all">All Follow-ups</SelectItem>
                <SelectItem value="overdue">🔴 Overdue</SelectItem>
                <SelectItem value="due_today">🟡 Due Today</SelectItem>
                <SelectItem value="upcoming">🟢 Upcoming</SelectItem>
                <SelectItem value="no_followup">⚪ No Follow-up</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredLeads.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No leads found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Preferred Date</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Follow-Up Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Received</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id} className={getFollowUpRowClass(lead.follow_up_date)}>
                    <TableCell className="font-medium">
                      {lead.full_name}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {lead.email && (
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3" />
                            <span>{lead.email}</span>
                          </div>
                        )}
                        {lead.phone && (
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="h-3 w-3" />
                            <span>{lead.phone}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{lead.service_interested || "-"}</TableCell>
                    <TableCell>
                      {lead.preferred_date ? (
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(lead.preferred_date), "MMM dd, yyyy")}
                        </div>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      {lead.message ? (
                        <div className="flex items-center gap-1 text-sm max-w-xs truncate">
                          <MessageSquare className="h-3 w-3 flex-shrink-0" />
                          <span title={lead.message}>{lead.message}</span>
                        </div>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {lead.follow_up_date ? (
                          <>
                            <div className="flex items-center gap-1 text-sm">
                              <CalendarClock className="h-3 w-3" />
                              <span className={
                                getFollowUpStatus(lead.follow_up_date) === "overdue" 
                                  ? "text-red-600 font-semibold"
                                  : getFollowUpStatus(lead.follow_up_date) === "today"
                                  ? "text-orange-600 font-semibold"
                                  : "text-green-600"
                              }>
                                {format(new Date(lead.follow_up_date), "MMM dd, yyyy")}
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => updateFollowUpDate(lead.id, null)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </>
                        ) : (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" size="sm">
                                <CalendarClock className="h-4 w-4 mr-2" />
                                Set Follow-up
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <div className="p-3 space-y-2 border-b">
                                <p className="text-sm font-medium">Quick Actions</p>
                                <div className="flex flex-wrap gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setQuickFollowUp(lead.id, 1)}
                                  >
                                    +1 Day
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setQuickFollowUp(lead.id, 3)}
                                  >
                                    +3 Days
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setQuickFollowUp(lead.id, 7)}
                                  >
                                    +7 Days
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setQuickFollowUp(lead.id, 15)}
                                  >
                                    +15 Days
                                  </Button>
                                </div>
                              </div>
                              <CalendarComponent
                                mode="single"
                                selected={undefined}
                                onSelect={(date) => date && updateFollowUpDate(lead.id, date)}
                                disabled={(date) => isBefore(date, startOfDay(new Date()))}
                                initialFocus
                                className="pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(lead.status)}>
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(lead.created_at), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={lead.status}
                        onValueChange={(value) => updateLeadStatus(lead.id, value)}
                      >
                        <SelectTrigger className="w-[130px] bg-background">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-popover z-50">
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="converted">Converted</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Leads;
