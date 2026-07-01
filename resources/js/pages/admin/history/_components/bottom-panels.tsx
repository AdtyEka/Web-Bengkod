import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const decorativeBars = [40, 60, 45, 75, 55, 90, 70];

export function BottomPanels() {
    return (
        <Card className="relative overflow-hidden bg-[#2563eb] text-white shadow-[0_4px_20px_rgba(37,99,235,0.25)]">
            {/* Decorative bar chart shapes */}
            <div className="pointer-events-none absolute bottom-0 right-4 flex items-end gap-1.5 opacity-20">
                {decorativeBars.map((h, i) => (
                    <div key={i} className="w-6 rounded-t-md bg-white" style={{ height: `${h}px` }} />
                ))}
            </div>

            <CardContent className="relative z-10 p-8">
                <h3 className="text-xl font-bold">Historical AI Trends</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                    Your talent pipeline matching accuracy has increased by 15% since you started
                    using our automated CV refinement tools last month.
                </p>
                <Button className="mt-6 gap-2 rounded-xl bg-white font-bold text-[#2563eb] hover:bg-white/90">
                    <Download className="size-4" />
                    Download Report
                </Button>
            </CardContent>
        </Card>
    );
}
