import { createClient } from "@/lib/supabase/server";
import DataTable from "@/app/(dashboard)/organisasi/data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  const supabase = createClient();

  const { data: orgs, error } = await (await supabase)
    .from("organizations")
    .select("*");

  if (error) console.error(error);

  const rows = await Promise.all(
    (orgs || []).map(async (org) => {
      const orgId = org.id;

      const { count: anggotaCount } = await (await supabase)
        .from("organization_members")
        .select("id", { count: "exact", head: true })
        .eq("organization_id", orgId)
        .eq("status", "aktif");

      const { count: operatorCount } = await (await supabase)
        .from("organization_members")
        .select("id", { count: "exact", head: true })
        .eq("organization_id", orgId)
        .eq("role", "operator");

      const fields = [
        "short_name",
        "organization_type",
        "province",
        "city",
        "district",
        "village",
        "address",
        "logo_url",
        "latitude",
        "longitude",
      ];

      const total = fields.length;
      const filled = fields.filter((f) => org[f] && org[f] !== "").length;
      const profilProgress = Math.round((filled / total) * 100);

      return {
        id: orgId,
        organisasi: org.name,
        organisasi_shortname: org.short_name,
        organisasi_logourl: org.logo_url,
        profil: profilProgress,
        anggota: anggotaCount ?? 0,
        operator: operatorCount ?? 0,
      };
    })
  );

  return (
    <div className="px-4 lg:px-6 space-y-4 lg:space-y-6">
      <div className="flex flex-row justify-between">
        <h2 className="font-medium text-xl font-el-messiri mt-0.5">
          Daftar Organisasi
        </h2>
        <Button variant="default" size="sm" asChild>
          <Link href="/organisasi/tambah">Tambah</Link>
        </Button>
      </div>
      <DataTable rows={rows} />
    </div>
  );
}
