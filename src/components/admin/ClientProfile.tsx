import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  FileText,
} from "lucide-react";
import { format } from "date-fns";

interface ClientProfileProps {
  clientId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ClientDetails {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  notes: string | null;
  created_at: string;
}

interface Appointment {
  id: string;
  appointment_date: string;
  status: string;
  notes: string | null;
  services: {
    name: string;
    price: number;
  };
}

export function ClientProfile({ clientId, open, onOpenChange }: ClientProfileProps) {
  const [client, setClient] = useState<ClientDetails | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (clientId && open) {
      fetchClientData();
    }
  }, [clientId, open]);

  const fetchClientData = async () => {
    if (!clientId) return;
    
    setLoading(true);
    
    // Fetch client details
    const { data: clientData } = await supabase
      .from("clients")
      .select("*")
      .eq("id", clientId)
      .single();

    // Fetch appointments
    const { data: appointmentsData } = await supabase
      .from("appointments")
      .select(`
        id,
        appointment_date,
        status,
        notes,
        services (
          name,
          price
        )
      `)
      .eq("client_id", clientId)
      .order("appointment_date", { ascending: false });

    setClient(clientData);
    setAppointments(appointmentsData || []);
    setLoading(false);
  };

  const totalRevenue = appointments
    .filter((apt) => apt.status === "completed")
    .reduce((sum, apt) => sum + (apt.services?.price || 0), 0);

  const completedAppointments = appointments.filter(
    (apt) => apt.status === "completed"
  ).length;

  const upcomingAppointments = appointments.filter(
    (apt) =>
      apt.status === "scheduled" || apt.status === "confirmed"
  ).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/20 text-emerald-500";
      case "confirmed":
        return "bg-blue-500/20 text-blue-500";
      case "scheduled":
        return "bg-yellow-500/20 text-yellow-500";
      case "cancelled":
        return "bg-red-500/20 text-red-500";
      default:
        return "bg-gray-500/20 text-gray-500";
    }
  };

  if (!client) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair">
            Client Profile
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* General Information Card */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  General Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-medium">{client.full_name}</p>
                    </div>
                  </div>
                  
                  {client.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{client.email}</p>
                      </div>
                    </div>
                  )}
                  
                  {client.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">{client.phone}</p>
                      </div>
                    </div>
                  )}
                  
                  {client.address && (
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p className="font-medium">{client.address}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Client Since</p>
                      <p className="font-medium">
                        {format(new Date(client.created_at), "PPP")}
                      </p>
                    </div>
                  </div>
                </div>
                
                {client.notes && (
                  <>
                    <Separator />
                    <div className="flex items-start gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Notes</p>
                        <p className="text-sm">{client.notes}</p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="glass">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500">
                      <DollarSign className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold">₹{totalRevenue.toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="text-2xl font-bold">{completedAppointments}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Upcoming</p>
                      <p className="text-2xl font-bold">{upcomingAppointments}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Appointments History */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Appointment History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {appointments.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No appointments found
                  </p>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-start justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <h4 className="font-semibold">
                              {appointment.services?.name}
                            </h4>
                            <Badge className={getStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {format(new Date(appointment.appointment_date), "PPP")}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {format(new Date(appointment.appointment_date), "p")}
                            </div>
                          </div>
                          
                          {appointment.notes && (
                            <p className="text-sm text-muted-foreground">
                              Note: {appointment.notes}
                            </p>
                          )}
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">
                            ₹{appointment.services?.price?.toFixed(2)}
                          </p>
                          {appointment.status === "completed" && (
                            <p className="text-xs text-emerald-500">Paid</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
