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
  clients: { full_name: string };
  services: { name: string };
}

interface Client {
  id: string;
  full_name: string;
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
  const [formData, setFormData] = useState({
    client_id: "",
    service_id: "",
    appointment_date: "",
    status: "scheduled",
    notes: "",
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
      .select("id, full_name")
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
    });
    setEditingAppointment(null);
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
    });
    setOpen(true);
  };

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
                <Select
                  value={formData.client_id}
                  onValueChange={(value) =>
                    setFormData({ ...formData, client_id: value })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.full_name}
                      </SelectItem>
                    ))}
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
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
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
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
