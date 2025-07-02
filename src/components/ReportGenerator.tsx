import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Building2,
  Globe,
  Target,
  Handshake,
  Eye,
  Clock
} from "lucide-react";

interface ReportGeneratorProps {
  onBack: () => void;
}

export function ReportGenerator({ onBack }: ReportGeneratorProps) {
  // Forward to the enhanced version
  const EnhancedReportGenerator = require('./EnhancedReportGenerator').EnhancedReportGenerator;
  return <EnhancedReportGenerator onBack={onBack} />;
}
