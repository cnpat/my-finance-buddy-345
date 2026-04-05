import { useFinance } from "@/store/FinanceContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Role } from "@/types/finance";
import { Shield, Eye } from "lucide-react";

export function RoleSwitcher() {
  const { role, setRole } = useFinance();

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground hidden sm:inline">Role:</span>
      <Select value={role} onValueChange={(v) => setRole(v as Role)}>
        <SelectTrigger className="w-[130px] h-9">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">
            <span className="flex items-center gap-2"><Shield className="w-3.5 h-3.5" /> Admin</span>
          </SelectItem>
          <SelectItem value="viewer">
            <span className="flex items-center gap-2"><Eye className="w-3.5 h-3.5" /> Viewer</span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
