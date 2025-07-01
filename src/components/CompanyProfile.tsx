
import { CompaniesManager } from "./CompaniesManager";

interface CompanyProfileProps {
  selectedId: string | null;
  onSelectCompany: (id: string) => void;
}

export function CompanyProfile({ selectedId, onSelectCompany }: CompanyProfileProps) {
  return <CompaniesManager />;
}
