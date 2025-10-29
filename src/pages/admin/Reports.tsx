import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-playfair font-bold">Reports</h2>
        <p className="text-muted-foreground mt-2">View and analyze your business reports</p>
      </div>

      <Card className="glass">
        <CardHeader>
          <CardTitle>Reports Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Advanced reporting features will be available soon. This section will include:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
            <li>Revenue analytics</li>
            <li>Appointment trends</li>
            <li>Client retention metrics</li>
            <li>Service performance</li>
            <li>Monthly/Yearly comparisons</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
