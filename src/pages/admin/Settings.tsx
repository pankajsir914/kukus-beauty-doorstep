import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-playfair font-bold">Settings</h2>
        <p className="text-muted-foreground mt-2">Manage your application settings</p>
      </div>

      <Card className="glass">
        <CardHeader>
          <CardTitle>Settings Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Configuration options will be available soon. This section will include:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
            <li>Business profile settings</li>
            <li>Operating hours</li>
            <li>Email notifications</li>
            <li>Payment gateway configuration</li>
            <li>User management</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
