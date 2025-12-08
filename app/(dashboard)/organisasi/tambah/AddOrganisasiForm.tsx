"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const kecamatanList = ["Cipondoh", "Batuceper"];

const kelurahanList = [
  "Cipondoh",
  "Cipondoh Makmur",
  "Gondrong",
  "Kenanga",
  "Ketapang",
  "Petir",
  "Poris Jaya",
];

const FormSchema = z.object({
  nama: z.string().min(3, "Nama organisasi minimal 3 karakter"),
  singkatan: z.string().min(2, "Singkatan minimal 2 karakter"),
  tipe: z.string().min(1, "Tipe organisasi harus dipilih"),

  parent_id: z.string().min(1, "Induk organisasi harus dipilih"),

  kecamatan: z.string().min(1, "Kecamatan harus dipilih"),
  kelurahan: z.string().min(1, "Kelurahan harus dipilih"),
  alamat: z.string().min(1, "Alamat harus diisi"),
  latitude: z.string().optional(),
  longitude: z.string().optional(),

  logoFile: z.any().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export default function AddOrganisasiForm() {
  const [parentList, setParentList] = useState<any[]>([]);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Ambil data parent organisasi dari Supabase
  useEffect(() => {
    async function fetchParent() {
      const res = await fetch("/api/organisasi/list"); // kamu buat sendiri API ini
      const data = await res.json();
      setParentList(data);
    }
    fetchParent();
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nama: "",
      singkatan: "",
      tipe: "",
      parent_id: "",
      kecamatan: "",
      kelurahan: "",
      alamat: "",
      latitude: "",
      longitude: "",
    },
  });

  const watchAll = form.watch();

  const onSubmit = async (values: FormValues) => {
    console.log("Kirim ke Supabase:", values);
    // TODO: upload logo & insert supabase
  };

  const handleFileChange = (files: File[]) => {
    if (!files || files.length === 0) return;

    form.setValue("logoFile", files[0]);

    const previewURL = URL.createObjectURL(files[0]);
    setLogoPreview(previewURL);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="font-medium text-lg font-el-messiri mt-0.5">
          Data Organisasi
        </h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div>
                      Nama Organisasi
                      <span className="text-red-500 font-bold">*</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Pimpinan Cabang Muhammadiyah Cipondoh"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="singkatan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div>
                      Singkatan
                      <span className="text-red-500 font-bold">*</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="PCM Cipondoh" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tipe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div>
                      Tipe Organisasi
                      <span className="text-red-500 font-bold">*</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih tipe organisasi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pimpinan Cabang">
                          Pimpinan Cabang
                        </SelectItem>
                        <SelectItem value="Pimpinan Ranting">
                          Pimpinan Ranting
                        </SelectItem>
                        <SelectItem value="Organisasi Otonom">
                          Organisasi Otonom
                        </SelectItem>
                        <SelectItem value="Amal Usaha Muhammadiyah">
                          Amal Usaha Muhammadiyah
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="parent_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Induk Organisasi</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih induk organisasi" />
                      </SelectTrigger>
                      <SelectContent>
                        {parentList.map((org) => (
                          <SelectItem key={org.id} value={org.id}>
                            {org.nama} ({org.singkatan})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="kecamatan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div>
                      Kecamatan
                      <span className="text-red-500 font-bold">*</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih kecamatan" />
                      </SelectTrigger>
                      <SelectContent>
                        {kecamatanList.map((k) => (
                          <SelectItem key={k} value={k}>
                            {k}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="kelurahan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div>
                      Kelurahan
                      <span className="text-red-500 font-bold">*</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih kelurahan" />
                      </SelectTrigger>
                      <SelectContent>
                        {kelurahanList.map((k) => (
                          <SelectItem key={k} value={k}>
                            {k}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="alamat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div>
                      Alamat
                      <span className="text-red-500 font-bold">*</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Jalan Maulana Hasanudin Nomor 63"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input placeholder="-6.229" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input placeholder="106.812" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormItem>
              <FormLabel>
                <div>
                  Logo Organisasi
                  <span className="text-red-500 font-bold">*</span>
                </div>
              </FormLabel>
              <FormControl>
                <div
                  className="border rounded-md p-6 h-28 flex items-center justify-center text-center cursor-pointer"
                  {...{
                    onDrop: (e) => {
                      e.preventDefault();
                      const file = Array.from(e.dataTransfer.files) as File[];
                      handleFileChange(file);
                    },
                    onDragOver: (e) => e.preventDefault(),
                    onClick: () => {
                      const input = document.createElement("input");
                      input.type = "file";
                      input.accept = "image/*";
                      input.onchange = (e: any) => {
                        handleFileChange(Array.from(e.target.files));
                      };
                      input.click();
                    },
                  }}
                >
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Preview"
                      className="h-full object-contain"
                    />
                  ) : (
                    "Drop logo disini atau klik untuk upload"
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>

            <Button type="submit" className="w-full hover:cursor-pointer">
              Simpan Organisasi
            </Button>
          </form>
        </Form>
      </div>

      <div className="lg:sticky lg:top-24 h-fit">
        <Card>
          <CardHeader>
            <CardTitle>Pratinjau Organisasi</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex flex-row gap-4 py-2">
              <Avatar className="h-14 w-14">
                <AvatarImage src={logoPreview || ""} alt={watchAll.nama} />
                <AvatarFallback>O</AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <span className="font-medium text-lg">
                  {watchAll.nama || "Nama Organisasi"}
                </span>
                <span className="text-muted-foreground">
                  {watchAll.singkatan || "Singkatan"}
                </span>
                <span className="text-sm">
                  {watchAll.tipe || "Tipe Organisasi"}
                </span>
                <span className="text-sm text-muted-foreground">
                  {watchAll.alamat || "Alamat organisasi..."}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
