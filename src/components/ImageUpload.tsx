
import { useState, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { Camera, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export const ImageUpload = ({ name }: { name: string }) => {
  const { setValue, watch, formState: { errors } } = useFormContext();
  const [preview, setPreview] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  
  const fieldError = errors[name];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue(name, event.target.files, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div
            className={cn(
              "w-full h-48 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer bg-input/40 hover:bg-input/70 transition-colors relative",
              fieldError ? "border-destructive" : "border-muted-foreground"
            )}
          >
            {preview ? (
              <img src={preview} alt="Event preview" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <div className="text-center text-muted-foreground">
                <Camera className="mx-auto h-12 w-12" />
                <p>Click to upload an image</p>
                <p className="text-xs">PNG, JPG, GIF up to 5MB</p>
              </div>
            )}
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-card border-slate-800 text-white">
          <DialogHeader>
            <DialogTitle>Upload Event Picture</DialogTitle>
            <DialogDescription>
              Choose how you want to upload your event picture.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button type="button" className="w-full" onClick={() => cameraInputRef.current?.click()}>
              <Camera className="mr-2 h-4 w-4" /> Take a Picture
            </Button>
            <Button type="button" className="w-full" onClick={() => fileInputRef.current?.click()}>
              <Upload className="mr-2 h-4 w-4" /> Upload from Gallery
            </Button>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={cameraInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
