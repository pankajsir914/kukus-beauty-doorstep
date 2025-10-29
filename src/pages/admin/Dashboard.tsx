import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Users, Scissors, Calendar, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalServices: 0,
    totalAppointments: 0,
    todayAppointments: 0,
  });

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

      setStats({
        totalClients: clientsCount || 0,
        totalServices: servicesCount || 0,
        totalAppointments: appointmentsCount || 0,
        todayAppointments: todayCount || 0,
      });
    };

    fetchStats();
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
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-playfair font-bold">Dashboard</h2>
        <p className="text-muted-foreground mt-2">
          Welcome to your admin panel
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
