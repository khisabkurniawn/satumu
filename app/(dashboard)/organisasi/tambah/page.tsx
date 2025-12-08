import { Button } from "@/components/ui/button";
import Link from "next/link";
import AddOrganisasiForm from "@/app/(dashboard)/organisasi/tambah/AddOrganisasiForm";

export default async function Page() {
  return (
    <div className="px-4 lg:px-6 space-y-4 lg:space-y-6">
      <div className="flex flex-row justify-between">
        <h2 className="font-medium text-xl font-el-messiri mt-0.5">
          Tambah Organisasi
        </h2>
        <Button variant="default" size="sm" asChild>
          <Link href="/organisasi">Kembali</Link>
        </Button>
      </div>
      <AddOrganisasiForm />
    </div>
  );
}
