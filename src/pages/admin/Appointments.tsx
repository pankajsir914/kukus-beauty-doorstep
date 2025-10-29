import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";

interface Appointment {
  id: string;
  appointment_date: string;
  status: string;
  notes: string | null;
  payment_amount: number;
  payment_status: string;
  clients: { full_name: string };
  services: { name: string };
}

interface Client {
  id: string;
  full_name: string;
  phone?: string | null;
}

interface Service {
  id: string;
  name: string;
}

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [open, setOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [clientSearch, setClientSearch] = useState("");
  const [formData, setFormData] = useState({
    client_id: "",
    service_id: "",
    appointment_date: "",
    status: "scheduled",
    notes: "",
    payment_amount: "0",
    payment_status: "pending",
  });

  useEffect(() => {
    fetchAppointments();
    fetchClients();
    fetchServices();
  }, []);

  const fetchAppointments = async () => {
    const { data, error } = await supabase
      .from("appointments")
      .select(`
        *,
        clients (full_name),
        services (name)
      `)
      .order("appointment_date", { ascending: false });

    if (error) {
      toast.error("Error fetching appointments");
    } else {
      setAppointments(data || []);
    }
  };

  const fetchClients = async () => {
    const { data } = await supabase
      .from("clients")
      .select("id, full_name, phone")
      .order("full_name");
    setClients(data || []);
  };

  const fetchServices = async () => {
    const { data } = await supabase
      .from("services")
      .select("id, name")
      .eq("is_active", true)
      .order("name");
    setServices(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const appointmentData = {
      ...formData,
      payment_amount: parseFloat(formData.payment_amount) || 0,
      created_by: (await supabase.auth.getUser()).data.user?.id,
    };

    if (editingAppointment) {
      const { error } = await supabase
        .from("appointments")
        .update(appointmentData)
        .eq("id", editingAppointment.id);

      if (error) {
        toast.error("Error updating appointment");
      } else {
        toast.success("Appointment updated successfully");
        fetchAppointments();
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from("appointments")
        .insert([appointmentData]);

      if (error) {
        toast.error("Error adding appointment");
      } else {
        toast.success("Appointment added successfully");
        fetchAppointments();
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this appointment?")) {
      const { error } = await supabase
        .from("appointments")
        .delete()
        .eq("id", id);

      if (error) {
        toast.error("Error deleting appointment");
      } else {
        toast.success("Appointment deleted successfully");
        fetchAppointments();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      client_id: "",
      service_id: "",
      appointment_date: "",
      status: "scheduled",
      notes: "",
      payment_amount: "0",
      payment_status: "pending",
    });
    setEditingAppointment(null);
    setClientSearch("");
    setOpen(false);
  };

  const handleEdit = (appointment: any) => {
    setEditingAppointment(appointment);
    setFormData({
      client_id: appointment.client_id,
      service_id: appointment.service_id,
      appointment_date: format(new Date(appointment.appointment_date), "yyyy-MM-dd'T'HH:mm"),
      status: appointment.status,
      notes: appointment.notes || "",
      payment_amount: appointment.payment_amount?.toString() || "0",
      payment_status: appointment.payment_status || "pending",
    });
    setOpen(true);
  };

  // Filter appointments based on search and status
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch = 
      appointment.clients.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.services.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Filter clients for the form dropdown
  const filteredClients = clients.filter((client) => {
    const searchLower = clientSearch.toLowerCase();
    return (
      client.full_name.toLowerCase().includes(searchLower) ||
      client.phone?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-playfair font-bold">Appointments</h2>
          <p className="text-muted-foreground mt-2">Manage your appointments</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="premium" onClick={() => resetForm()}>
              <Plus className="mr-2 h-4 w-4" />
              Add Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingAppointment ? "Edit Appointment" : "Add New Appointment"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="client">Client *</Label>
                <Input
                  placeholder="Search client by name or phone..."
                  value={clientSearch}
                  onChange={(e) => setClientSearch(e.target.value)}
                  className="mb-2"
                />
                <Select
                  value={formData.client_id}
                  onValueChange={(value) =>
                    setFormData({ ...formData, client_id: value })
                  }
                  required
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50 max-h-[300px]">
                    {filteredClients.length === 0 ? (
                      <div className="px-2 py-4 text-sm text-muted-foreground text-center">
                        No clients found
                      </div>
                    ) : (
                      filteredClients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.full_name} {client.phone && `- ${client.phone}`}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="service">Service *</Label>
                <Select
                  value={formData.service_id}
                  onValueChange={(value) =>
                    setFormData({ ...formData, service_id: value })
                  }
                  required
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="appointment_date">Date & Time *</Label>
                <Input
                  id="appointment_date"
                  type="datetime-local"
                  value={formData.appointment_date}
                  onChange={(e) =>
                    setFormData({ ...formData, appointment_date: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="payment_amount">Payment Amount (₹)</Label>
                  <Input
                    id="payment_amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.payment_amount}
                    onChange={(e) =>
                      setFormData({ ...formData, payment_amount: e.target.value })
                    }
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment_status">Payment Status</Label>
                  <Select
                    value={formData.payment_status}
                    onValueChange={(value) =>
                      setFormData({ ...formData, payment_status: value })
                    }
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50">
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="partial">Partial</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" variant="premium" className="flex-1">
                  {editingAppointment ? "Update" : "Add"} Appointment
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="glass">
        <CardHeader>
          <CardTitle>All Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search by client name, service, or notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No appointments found
                  </TableCell>
                </TableRow>
              ) : (
                filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">
                    {appointment.clients.full_name}
                  </TableCell>
                  <TableCell>{appointment.services.name}</TableCell>
                  <TableCell>
                    {format(new Date(appointment.appointment_date), "PPp")}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs ${
                        appointment.status === "completed"
                          ? "bg-emerald-500/20 text-emerald-500"
                          : appointment.status === "confirmed"
                          ? "bg-blue-500/20 text-blue-500"
                          : appointment.status === "cancelled"
                          ? "bg-red-500/20 text-red-500"
                          : "bg-yellow-500/20 text-yellow-500"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">₹{appointment.payment_amount?.toLocaleString('en-IN') || 0}</div>
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs ${
                          appointment.payment_status === "paid"
                            ? "bg-green-500/20 text-green-500"
                            : appointment.payment_status === "partial"
                            ? "bg-yellow-500/20 text-yellow-500"
                            : appointment.payment_status === "refunded"
                            ? "bg-red-500/20 text-red-500"
                            : "bg-gray-500/20 text-gray-500"
                        }`}
                      >
                        {appointment.payment_status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(appointment)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(appointment.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
