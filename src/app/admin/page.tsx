"use client";

import { useState, useEffect, useRef } from "react";
import { UploadCloud, Trash2, Image as ImageIcon, Video as VideoIcon, Loader2 } from "lucide-react";
import { supabase } from "@/utils/supabase/client";

type MediaItem = {
  id: string;
  title: string;
  url: string;
  type: "photography" | "videography";
  created_at: string;
};

export default function AdminPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch live media from Supabase on mount
  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const { data, error } = await supabase
        .from("media")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMedia(data || []);
    } catch (err: any) {
      console.error("Error fetching media:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      // 1. Determine media type internally
      const isVideo = file.type.startsWith("video/");
      const resourceType = isVideo ? "video" : "image";
      const dbType = isVideo ? "videography" : "photography";
      const titlePrompt = prompt(`Enter a title for this ${dbType}:`) || `Untitled ${file.name}`;

      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`;

      let cloudinaryData;

      // Use chunked upload for files larger than 20MB to prevent "Failed to fetch" network errors (413 Payload Too Large)
      if (file.size > 20 * 1024 * 1024) {
        const chunkSize = 20 * 1024 * 1024; // 20MB chunks
        const uniqueUploadId = 'chunk_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
        
        for (let start = 0; start < file.size; start += chunkSize) {
          const end = Math.min(start + chunkSize - 1, file.size - 1);
          const chunk = file.slice(start, end + 1);
          
          const formData = new FormData();
          formData.append("file", chunk);
          formData.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
          );
          
          const res = await fetch(cloudinaryUrl, {
            method: "POST",
            body: formData,
            headers: {
              "X-Unique-Upload-Id": uniqueUploadId,
              "Content-Range": `bytes ${start}-${end}/${file.size}`
            }
          });
          
          if (!res.ok) {
            let errorMsg = "Cloudinary Upload Failed";
            try { 
              const errRes = await res.json(); 
              errorMsg = errRes.error?.message || errorMsg; 
            } catch (e) {}
            throw new Error(errorMsg);
          }
          
          cloudinaryData = await res.json();
        }
      } else {
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
        );

        const cloudinaryRes = await fetch(cloudinaryUrl, {
          method: "POST",
          body: formData,
        });

        cloudinaryData = await cloudinaryRes.json();

        if (!cloudinaryRes.ok) {
          throw new Error(cloudinaryData.error?.message || "Cloudinary Upload Failed");
        }
      }

      // 3. Insert into Supabase
      const url = cloudinaryData.secure_url;
      const { error: dbError } = await supabase.from("media").insert([
        {
          title: titlePrompt,
          url: url,
          type: dbType,
        },
      ]);

      if (dbError) throw dbError;

      // 4. Refresh List
      alert("Successfully uploaded!");
      fetchMedia();
    } catch (err: any) {
      console.error("Upload process failed:", err.message);
      alert(`Upload failed: ${err.message}`);
    } finally {
      setIsUploading(false);
      // reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media?")) return;

    try {
      const { error } = await supabase.from("media").delete().eq("id", id);
      if (error) throw error;
      
      setMedia((prev) => prev.filter((m) => m.id !== id));
      alert("Deleted successfully.");
    } catch (err: any) {
      console.error("Error deleting:", err.message);
      alert(`Delete failed: ${err.message}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2 tracking-wide">
            Gallery Management
          </h1>
          <p className="text-zinc-500">Live Supabase Database View</p>
        </div>
        
        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*,video/*"
          onChange={handleFileUpload}
        />
        
        <button 
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex items-center gap-2 bg-Forest text-stone font-semibold px-6 py-3 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
          style={{ backgroundColor: 'var(--color-forest)', color: 'var(--color-stone)' }}
        >
          {isUploading ? <Loader2 size={20} className="animate-spin" /> : <UploadCloud size={20} />}
          {isUploading ? "Uploading..." : "Upload Submissions"}
        </button>
      </div>

      <div className="bg-zinc-900 border border-charcoal/20 rounded-lg overflow-hidden shadow-xl">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-zinc-800 text-zinc-400 font-medium text-sm text-left">
          <div className="col-span-1">#</div>
          <div className="col-span-5">Media Title</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>
        
        {isLoading ? (
          <div className="p-12 text-center text-zinc-500 animate-pulse">Loading live records...</div>
        ) : media.length === 0 ? (
          <div className="p-12 text-center text-zinc-500">
            No media uploaded to Supabase yet. Start by uploading!
          </div>
        ) : (
          <ul className="divide-y divide-zinc-800">
            {media.map((img, idx) => (
              <li key={img.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-zinc-800/50 transition-colors">
                <div className="col-span-1 text-zinc-500">{idx + 1}</div>
                <div className="col-span-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-charcoal/20 flex items-center justify-center text-zinc-400 shrink-0 overflow-hidden">
                    {img.type === "photography" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={img.url} className="w-full h-full object-cover" alt="thumb" />
                    ) : (
                       <VideoIcon size={18} />
                    )}
                  </div>
                  <span className="text-zinc-200 truncate pr-2">{img.title}</span>
                </div>
                <div className="col-span-2 text-zinc-500 capitalize">{img.type}</div>
                <div className="col-span-2 text-zinc-500">
                  {new Date(img.created_at).toLocaleDateString()}
                </div>
                <div className="col-span-2 flex justify-end">
                  <button 
                    onClick={() => handleDelete(img.id)}
                    className="p-2 text-zinc-500 hover:text-terracotta hover:bg-terracotta/10 rounded transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
