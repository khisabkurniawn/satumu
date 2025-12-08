import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  return (
    <div className="px-4 lg:px-6 space-y-4 lg:space-y-6">
      <div className="flex flex-row justify-between">
        <h2 className="font-medium text-xl font-el-messiri mt-0.5">
          Detail Organisasi
        </h2>
        <Button variant="default" size="sm" asChild>
          <Link href="/organisasi">Kembali</Link>
        </Button>
      </div>
      <p className="mt-4">ID: {id}</p>
    </div>
  );
}
