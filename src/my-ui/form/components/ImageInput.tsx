import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ImageInputProps {
image:string|null;
alt_image:string;
updateImage: (image: string) => void
}

export function ImageInput({image,alt_image,updateImage}:ImageInputProps){
const ref = useRef<HTMLInputElement|null>(null);
const [file,setFile] = useState<File|null>(null);
const [preview,setPreview] = useState<string|null>(image);

// switch over to user.github_avatar if image url errors


useEffect(() => {
        // create the preview
        if(!file) return;
        const objectUrl = URL.createObjectURL(file!)
        setPreview(objectUrl)
        updateImage(objectUrl)
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [file, updateImage])

function handleChange(event:React.ChangeEvent<HTMLInputElement>){
if(event.target.files?.[0]){
    setFile(event.target.files?.[0]);
}    

}
return (
 <div className='w-full h-full flex flex-col items-center justify-center '>
{preview && 
<Image src={preview}
    alt="preview"
    height={250}
    width={250}
    onClick={()=>ref.current?.click()}
    className="rounded-lg h-[300px] w-auto aspect-square object-cover flex items-center justify-center"/>}
    {!preview&&
    <ImagePlus className="w-8 h-8" onClick={() => ref.current?.click()} />}
    <input id="file" className="hidden" ref={ref} type="file" onChange={handleChange} />
    
 </div>
);
}
