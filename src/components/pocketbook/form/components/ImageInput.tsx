/* eslint-disable react-hooks/exhaustive-deps */
import { ImagePlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ImageInputProps {
  image: string | null;
  alt_image: string;
  updateImage: (image: File) => void;
}

export function ImageInput({ image, alt_image, updateImage }: ImageInputProps) {
  const ref = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(image);

  // switch over to user.github_avatar if image url errors

  useEffect(() => {
    // create the preview
    if (!file) return;
    const objectUrl = URL.createObjectURL(file!);
    setPreview(objectUrl);
    updateImage(file);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.[0]) {
      setFile(event.target.files?.[0]);
    }
  }
  return (
    <div className="w-full flex flex-col items-center justify-center ">
      {preview && preview !== "" && (
        <img
          src={preview}
          alt="preview"
          height={250}
          width={250}
          onClick={() => ref.current?.click()}
          className="rounded-lg h-[200px] w-auto aspect-square object-cover flex items-center justify-center"
        />
      )}
      {!preview && (
        <div className="w-full px-2">
          <ImagePlus className="w-5 h-5" onClick={() => ref.current?.click()} />
        </div>
      )}
      <input
        id="file"
        className="hidden"
        ref={ref}
        type="file"
        onChange={handleChange}
      />
    </div>
  );
}
