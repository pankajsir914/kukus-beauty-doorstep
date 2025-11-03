import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Users, Scissors, Calendar, TrendingUp, IndianRupee, Wallet, CalendarClock, Phone, Mail } from "lucide-react";
import { format, startOfDay, endOfDay } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface TodayFollowUp {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  service_interested: string | null;
  follow_up_date: string;
  status: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalClients: 0,
    totalServices: 0,
    totalAppointments: 0,
    todayAppointments: 0,
    todayRevenue: 0,
    monthlyRevenue: 0,
  });
  const [todayFollowUps, setTodayFollowUps] = useState<TodayFollowUp[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const { count: clientsCount } = await supabase
        .from("clients")
        .select("*", { count: "exact", head: true });

      const { count: servicesCount } = await supabase
        .from("services")
        .select("*", { count: "exact", head: true });

      const { count: appointmentsCount } = await supabase
        .from("appointments")
        .select("*", { count: "exact", head: true });

      const today = new Date().toISOString().split("T")[0];
      const { count: todayCount } = await supabase
        .from("appointments")
        .select("*", { count: "exact", head: true })
        .gte("appointment_date", today)
        .lt("appointment_date", `${today}T23:59:59`);

      // Fetch today's revenue (only paid appointments)
      const { data: todayAppointments } = await supabase
        .from("appointments")
        .select("payment_amount, payment_status")
        .gte("appointment_date", today)
        .lt("appointment_date", `${today}T23:59:59`)
        .eq("payment_status", "paid");

      const todayRevenue = todayAppointments?.reduce(
        (sum, apt) => sum + (Number(apt.payment_amount) || 0),
        0
      ) || 0;

      // Fetch monthly revenue (current month, only paid appointments)
      const currentMonth = new Date();
      const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
        .toISOString().split("T")[0];
      const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
        .toISOString().split("T")[0];

      const { data: monthlyAppointments } = await supabase
        .from("appointments")
        .select("payment_amount, payment_status")
        .gte("appointment_date", firstDay)
        .lte("appointment_date", lastDay)
        .eq("payment_status", "paid");

      const monthlyRevenue = monthlyAppointments?.reduce(
        (sum, apt) => sum + (Number(apt.payment_amount) || 0),
        0
      ) || 0;

      setStats({
        totalClients: clientsCount || 0,
        totalServices: servicesCount || 0,
        totalAppointments: appointmentsCount || 0,
        todayAppointments: todayCount || 0,
        todayRevenue,
        monthlyRevenue,
      });
    };

    const fetchTodayFollowUps = async () => {
      const today = startOfDay(new Date()).toISOString();
      const endToday = endOfDay(new Date()).toISOString();

      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .lte("follow_up_date", endToday)
        .order("follow_up_date", { ascending: true });

      if (!error && data) {
        setTodayFollowUps(data.filter(lead => lead.follow_up_date));
      }
    };

    fetchStats();
    fetchTodayFollowUps();
  }, []);

  const cards = [
    {
      title: "Total Clients",
      value: stats.totalClients,
      icon: Users,
      gradient: "from-rose-500 to-pink-500",
    },
    {
      title: "Total Services",
      value: stats.totalServices,
      icon: Scissors,
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      title: "Total Appointments",
      value: stats.totalAppointments,
      icon: Calendar,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Today's Appointments",
      value: stats.todayAppointments,
      icon: TrendingUp,
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      title: "Today's Revenue",
      value: `₹${stats.todayRevenue.toLocaleString('en-IN')}`,
      icon: IndianRupee,
      gradient: "from-amber-500 to-orange-500",
    },
    {
      title: "Monthly Revenue",
      value: `₹${stats.monthlyRevenue.toLocaleString('en-IN')}`,
      icon: Wallet,
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  const getStatusBadgeColor = (status: string) => {
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

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-playfair font-bold">Dashboard</h2>
        <p className="text-muted-foreground mt-2">
          Welcome to your admin panel
        </p>
      </div>

      {todayFollowUps.length > 0 && (
        <Card className="border-orange-500/50 bg-orange-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <CalendarClock className="h-5 w-5" />
              Today's Follow-Ups ({todayFollowUps.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayFollowUps.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-background border cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => navigate("/admin/leads")}
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{lead.full_name}</p>
                      <Badge className={`${getStatusBadgeColor(lead.status)} text-xs`}>
                        {lead.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      {lead.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          <span>{lead.phone}</span>
                        </div>
                      )}
                      {lead.email && (
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          <span>{lead.email}</span>
                        </div>
                      )}
                      {lead.service_interested && (
                        <span className="text-xs bg-secondary px-2 py-1 rounded">
                          {lead.service_interested}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <p className="text-orange-600 font-semibold">
                      {format(new Date(lead.follow_up_date), "h:mm a")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className="glass overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div className={`bg-gradient-to-br ${card.gradient} p-2 rounded-lg`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{card.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
