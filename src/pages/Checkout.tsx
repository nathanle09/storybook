import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Layout } from "@/components/layout/Layout";
import {
  ArrowLeft,
  Upload,
  X,
  Image as ImageIcon,
  Video,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const orderId = sessionStorage.getItem("orderId");
  
  // Fetch order from Convex
  const order = useQuery(api.orders.getOrder, orderId ? { orderId: orderId as any } : "skip");
  const updateOrderStatus = useMutation(api.orders.updateOrderStatus);
  const updateOrderWithFiles = useMutation(api.orders.updateOrderWithFiles);
  const generateUploadUrl = useMutation(api.uploads.generateUploadUrl);

  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  // Update customer info from order
  useEffect(() => {
    if (order) {
      setCustomerInfo({
        firstName: order.firstName || "",
        lastName: order.lastName || "",
        email: order.email || "",
        address: order.address || "",
        city: order.city || "",
        state: order.state || "",
        zip: order.zip || "",
      });
    }
  }, [order]);

  const maxPhotos = order?.productPhotos?.includes("48")
    ? 48
    : order?.productPhotos?.includes("36")
    ? 36
    : 24;

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      const imageFiles = files.filter((file) => file.type.startsWith("image/"));
      
      if (images.length + imageFiles.length > maxPhotos) {
        toast({
          title: "Too many images",
          description: `You can upload a maximum of ${maxPhotos} images.`,
          variant: "destructive",
        });
        return;
      }

      setImages((prev) => [...prev, ...imageFiles]);
    },
    [images.length, maxPhotos]
  );

  const handleVideoUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith("video/")) {
        setVideo(file);
      }
    },
    []
  );

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderId || !order) {
      toast({
        title: "Error",
        description: "Order not found. Please start again.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    if (images.length < 24) {
      toast({
        title: "Not enough images",
        description: "Please upload at least 24 images.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Upload images to Convex storage
      const imageStorageIds: string[] = [];
      for (const imageFile of images) {
        try {
          const uploadUrl = await generateUploadUrl();
          const response = await fetch(uploadUrl, {
            method: "POST",
            headers: { "Content-Type": imageFile.type },
            body: imageFile,
          });
          
          if (!response.ok) {
            throw new Error(`Failed to upload image: ${response.statusText}`);
          }
          
          const { storageId } = await response.json();
          imageStorageIds.push(storageId);
        } catch (error) {
          console.error("Error uploading image:", error);
          toast({
            title: "Error uploading image",
            description: `Failed to upload image. Please try again.`,
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
      }

      // Upload video to Convex storage if present
      let videoStorageId: string | undefined;
      if (video) {
        try {
          const uploadUrl = await generateUploadUrl();
          const response = await fetch(uploadUrl, {
            method: "POST",
            headers: { "Content-Type": video.type },
            body: video,
          });
          
          if (!response.ok) {
            throw new Error(`Failed to upload video: ${response.statusText}`);
          }
          
          const { storageId } = await response.json();
          videoStorageId = storageId;
        } catch (error) {
          console.error("Error uploading video:", error);
          toast({
            title: "Error uploading video",
            description: "Failed to upload video. Please try again.",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
      }

      // Update order with storage IDs and customer info
      await updateOrderWithFiles({
        orderId: orderId as any,
        imageStorageIds,
        videoStorageId,
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        email: customerInfo.email,
        address: customerInfo.address,
        city: customerInfo.city,
        state: customerInfo.state,
        zip: customerInfo.zip,
      });

      // Update order status to processing
      await updateOrderStatus({
        orderId: orderId as any,
        status: "processing",
      });
      
      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for your order. You'll receive a confirmation email shortly.",
      });
      
      sessionStorage.removeItem("orderId");
      setIsSubmitting(false);
      navigate("/");
    } catch (error) {
      console.error("Failed to process order:", error);
      toast({
        title: "Error",
        description: "Failed to process order. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  if (!orderId) {
    navigate("/");
    return null;
  }

  // Show loading state while order is being fetched
  if (order === undefined) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center">
              <Loader2 size={40} className="animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading your order...</p>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  // If order doesn't exist in the database, redirect home
  if (order === null) {
    navigate("/");
    return null;
  }

  return (
    <Layout>
      <section className="section-padding">
        <div className="max-w-5xl mx-auto px-6">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-8"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} />
            Back
          </Button>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-8">
              <div className="text-center lg:text-left">
                <h1 className="font-serif text-3xl md:text-4xl font-medium mb-2">
                  Complete Your Order
                </h1>
                <p className="text-muted-foreground">
                  Upload your photos and fill in your details
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Image Upload */}
                <div className="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border/50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <ImageIcon size={20} className="text-primary" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl font-medium">Upload Photos</h2>
                      <p className="text-sm text-muted-foreground">
                        {images.length} / {maxPhotos} photos uploaded (min 24)
                      </p>
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      id="images"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="images"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload size={40} className="text-muted-foreground mb-4" />
                      <span className="text-foreground font-medium mb-1">
                        Click to upload photos
                      </span>
                      <span className="text-sm text-muted-foreground">
                        JPG, PNG up to 10MB each
                      </span>
                    </label>
                  </div>

                  {images.length > 0 && (
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-3 mt-6">
                      {images.map((file, index) => (
                        <div
                          key={index}
                          className="relative aspect-square rounded-lg overflow-hidden bg-muted group"
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Video Upload */}
                <div className="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border/50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Video size={20} className="text-primary" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl font-medium">Upload Video</h2>
                      <p className="text-sm text-muted-foreground">
                        {video ? "1 video uploaded" : "Add a personal video message"}
                      </p>
                    </div>
                  </div>

                  {!video ? (
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors">
                      <input
                        type="file"
                        id="video"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="video"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <Video size={40} className="text-muted-foreground mb-4" />
                        <span className="text-foreground font-medium mb-1">
                          Click to upload video
                        </span>
                        <span className="text-sm text-muted-foreground">
                          MP4, MOV up to 500MB
                        </span>
                      </label>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle size={20} className="text-primary" />
                        <span className="text-sm">{video.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setVideo(null)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Customer Information */}
                <div className="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border/50">
                  <h2 className="font-serif text-xl font-medium mb-6">
                    Shipping Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        className="mt-1.5"
                        value={customerInfo.firstName}
                        onChange={(e) =>
                          setCustomerInfo({ ...customerInfo, firstName: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        className="mt-1.5"
                        value={customerInfo.lastName}
                        onChange={(e) =>
                          setCustomerInfo({ ...customerInfo, lastName: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        className="mt-1.5"
                        value={customerInfo.email}
                        onChange={(e) =>
                          setCustomerInfo({ ...customerInfo, email: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        className="mt-1.5"
                        value={customerInfo.address}
                        onChange={(e) =>
                          setCustomerInfo({ ...customerInfo, address: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        className="mt-1.5"
                        value={customerInfo.city}
                        onChange={(e) =>
                          setCustomerInfo({ ...customerInfo, city: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State / Province</Label>
                      <Input
                        id="state"
                        className="mt-1.5"
                        value={customerInfo.state}
                        onChange={(e) =>
                          setCustomerInfo({ ...customerInfo, state: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP / Postal Code</Label>
                      <Input
                        id="zip"
                        className="mt-1.5"
                        value={customerInfo.zip}
                        onChange={(e) =>
                          setCustomerInfo({ ...customerInfo, zip: e.target.value })
                        }
                        required
                      />
                    </div>

                  </div>
                </div>

                {/* Submit Button (Mobile) */}
                <div className="lg:hidden">
                  <Button
                    type="submit"
                    variant="hero"
                    size="xl"
                    className="w-full"
                    disabled={isSubmitting || images.length < 24}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>Place Order</>
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-28">
                <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
                  <h3 className="font-serif text-xl font-medium mb-6">
                    Order Summary
                  </h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Photos</span>
                      <span>{order.productPhotos}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Video</span>
                      <span>1 video</span>
                    </div>
                    {order.title && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Title</span>
                        <span className="text-right max-w-[140px] truncate">
                          {order.title}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Submit Button (Desktop) */}
                  <div className="hidden lg:block">
                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting || images.length < 24}
                      onClick={handleSubmit}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Place Order"
                      )}
                    </Button>
                  </div>

                  <p className="text-xs text-center text-muted-foreground mt-4">
                    🔒 Secure checkout powered by Storybook
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;
