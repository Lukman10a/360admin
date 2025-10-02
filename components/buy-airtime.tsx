"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBuyAirtime } from "@/services/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import SuccessMessage from "./success-message";

const airtimeFormSchema = z.object({
  network: z.string().min(1, "Please select a network"),
  mobile_number: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^(\+?234|0)[789]\d{9}$/,
      "Please enter a valid Nigerian phone number"
    ),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 1;
    }, "Amount must be at least ₦1"),
});

type AirtimeFormData = z.infer<typeof airtimeFormSchema>;

export default function BuyAirtime() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [successDetails, setSuccessDetails] = useState({
    title: "",
    message: "",
  });
  const [savedNumbers, setSavedNumbers] = useState<string[]>([]);

  const form = useForm<AirtimeFormData>({
    resolver: zodResolver(airtimeFormSchema),
    defaultValues: {
      network: "",
      mobile_number: "",
      amount: "",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = form;
  const mobileNumber = watch("mobile_number");

  // Load saved numbers from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("savedPhoneNumbers");
    if (saved) {
      setSavedNumbers(JSON.parse(saved));
    }
  }, []);

  const buyAirtimeMutation = useBuyAirtime();

  const networks = [
    { id: "1", name: "MTN" },
    { id: "2", name: "GLO" },
    { id: "3", name: "AIRTEL" },
    { id: "4", name: "9MOBILE" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue(name as keyof AirtimeFormData, value);

    // Auto-detect network based on phone number
    if (name === "mobile_number" && value.length >= 4) {
      const prefix = value.replace(/^(\+?234|0)/, "").substring(0, 3);
      const networkMap: { [key: string]: string } = {
        703: "1",
        704: "1",
        706: "1",
        803: "1",
        806: "1",
        810: "1",
        813: "1",
        814: "1",
        816: "1",
        903: "1",
        906: "1",
        913: "1",
        916: "1", // MTN
        705: "2",
        805: "2",
        807: "2",
        811: "2",
        815: "2",
        905: "2", // GLO
        701: "3",
        708: "3",
        802: "3",
        808: "3",
        812: "3",
        902: "3",
        907: "3",
        901: "3",
        912: "3", // AIRTEL
        809: "4",
        817: "4",
        818: "4",
        908: "4",
        909: "4", // 9MOBILE
      };
      const detectedNetwork = networkMap[prefix];
      if (detectedNetwork) {
        setValue("network", detectedNetwork);
      }
    }
  };

  const onSubmit = async (data: AirtimeFormData) => {
    const request = {
      mobile_number: data.mobile_number,
      network: parseInt(data.network),
      amount: parseFloat(data.amount),
    };

    try {
      await buyAirtimeMutation.mutateAsync(request);
      setSuccessDetails({
        title: "Airtime Purchase Successful",
        message: `You have successfully purchased ₦${parseFloat(
          data.amount
        ).toLocaleString()} airtime for ${data.mobile_number}.`,
      });
      setShowSuccess(true);
      // Reset form
      form.reset();
    } catch (error) {
      form.setError("root", {
        message: `Failed to purchase airtime: ${error}`,
      });
    }
  };

  const savePhoneNumber = (number: string) => {
    if (!savedNumbers.includes(number)) {
      const updated = [...savedNumbers, number];
      setSavedNumbers(updated);
      localStorage.setItem("savedPhoneNumbers", JSON.stringify(updated));
    }
  };

  const selectSavedNumber = (number: string) => {
    setValue("mobile_number", number);
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Page title */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
        Buy Airtime
      </h1>

      {/* Buy Airtime Form */}
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Smartphone className="w-8 h-8 text-indigo-600 mr-3" />
            Purchase Airtime
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Network Selection */}
            <div className="space-y-2">
              <Label htmlFor="network">Network</Label>
              <Select onValueChange={(value) => setValue("network", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Network" />
                </SelectTrigger>
                <SelectContent>
                  {networks.map((network) => (
                    <SelectItem key={network.id} value={network.id}>
                      {network.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.network && (
                <p className="text-sm text-red-600">{errors.network.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="mobile_number">Phone Number</Label>
              <div className="flex gap-2">
                <Input
                  id="mobile_number"
                  {...register("mobile_number", {
                    onChange: handleInputChange,
                  })}
                  type="tel"
                  placeholder="Enter phone number"
                  className="flex-1"
                  required
                />
                <Button
                  type="button"
                  onClick={() => mobileNumber && savePhoneNumber(mobileNumber)}
                  variant="outline"
                  size="default"
                  disabled={!mobileNumber}
                >
                  Save
                </Button>
              </div>
              {/* Saved Numbers */}
              {savedNumbers.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground mb-1">
                    Saved Numbers:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {savedNumbers.map((number) => (
                      <Button
                        key={number}
                        type="button"
                        onClick={() => selectSavedNumber(number)}
                        variant="outline"
                        size="sm"
                      >
                        {number}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              {errors.mobile_number && (
                <p className="text-sm text-red-600">
                  {errors.mobile_number.message}
                </p>
              )}
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₦)</Label>
              <Input
                id="amount"
                {...register("amount")}
                type="number"
                placeholder="Enter amount"
                min="1"
                step="0.01"
                required
              />
              {/* Quick amount buttons */}
              <div className="flex flex-wrap gap-2 mt-2">
                {[100, 200, 500, 1000, 2000, 5000].map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    onClick={() => setValue("amount", amount.toString())}
                    variant="outline"
                    size="sm"
                  >
                    ₦{amount}
                  </Button>
                ))}
              </div>
              {errors.amount && (
                <p className="text-sm text-red-600">{errors.amount.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Purchase Airtime"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Success Message */}
      {showSuccess && (
        <SuccessMessage
          title={successDetails.title}
          message={successDetails.message}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
}
