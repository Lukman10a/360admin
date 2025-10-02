"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
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
import {
  useBuyElectricity,
  useDiscos,
  useValidateMeter,
} from "@/services/hooks";
import { Disco, ValidateMeterRequest } from "@/services/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle, Search, Zap } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import SuccessMessage from "./success-message";

const electricityFormSchema = z.object({
  selectedDisco: z.string().min(1, "Please select a disco"),
  meterNumber: z.string().min(1, "Meter number is required"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 100;
    }, "Amount must be at least ₦100"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^(\+?234|0)[789]\d{9}$/,
      "Please enter a valid Nigerian phone number"
    ),
});

type ElectricityFormData = z.infer<typeof electricityFormSchema>;

export default function ElectricityService() {
  const [shouldValidate, setShouldValidate] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successDetails, setSuccessDetails] = useState({
    title: "",
    message: "",
  });

  const form = useForm<ElectricityFormData>({
    resolver: zodResolver(electricityFormSchema),
    defaultValues: {
      selectedDisco: "",
      meterNumber: "",
      amount: "",
      phoneNumber: "",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = form;
  const selectedDisco = watch("selectedDisco");
  const meterNumber = watch("meterNumber");

  // API hooks
  const { data: discosData, isLoading: discosLoading } = useDiscos();
  const buyElectricityMutation = useBuyElectricity();
  const {
    data: validationData,
    isLoading: isValidatingMeter,
    error: validationError,
  } = useValidateMeter(
    selectedDisco && meterNumber && shouldValidate
      ? {
          meterNumber,
          meterId: selectedDisco,
          meterType: "PREPAID",
        }
      : ({} as ValidateMeterRequest)
  );

  const discos: Disco[] = discosData?.data || [];
  const validationResult = validationData;

  const handleValidate = () => {
    const formData = form.getValues();
    if (!formData.selectedDisco || !formData.meterNumber) {
      form.setError("selectedDisco", {
        message: "Please select a disco and enter meter number",
      });
      return;
    }
    setShouldValidate(true);
  };

  const onSubmit = async (data: ElectricityFormData) => {
    if (!validationResult || validationResult.invalid) {
      form.setError("meterNumber", { message: "Please validate meter first" });
      return;
    }

    const purchaseData = {
      meterId: data.selectedDisco,
      meterNumber: data.meterNumber,
      amount: data.amount,
      meterType: "PREPAID" as const,
    };

    buyElectricityMutation.mutate(purchaseData, {
      onSuccess: (response) => {
        setSuccessDetails({
          title: "Electricity Purchase Successful",
          message: `You have successfully purchased ₦${parseFloat(
            data.amount
          ).toLocaleString()} electricity for meter ${
            data.meterNumber
          }. Transaction ID: ${response.data?.trans_Id || "N/A"}`,
        });
        setShowSuccess(true);
        // Reset form
        form.reset();
        setShouldValidate(false);
      },
      onError: (error) => {
        form.setError("root", {
          message: "Purchase failed. Please try again.",
        });
        console.error("Purchase error:", error);
      },
    });
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      {/* Page title */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
        Electricity Purchase
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Purchase Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-500" />
              Purchase Electricity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Disco Selection */}
              <div className="space-y-2">
                <Label htmlFor="selectedDisco">Select Disco</Label>
                <Select
                  value={selectedDisco}
                  onValueChange={(value) => setValue("selectedDisco", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a disco..." />
                  </SelectTrigger>
                  <SelectContent>
                    {discosLoading
                      ? null
                      : discos.map((disco) => (
                          <SelectItem key={disco.id} value={disco.id}>
                            {disco.name}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
                {errors.selectedDisco && (
                  <p className="text-sm text-red-600">
                    {errors.selectedDisco.message}
                  </p>
                )}
              </div>

              {/* Meter Number */}
              <div className="space-y-2">
                <Label htmlFor="meterNumber">Meter Number</Label>
                <div className="flex gap-2">
                  <Input
                    id="meterNumber"
                    {...register("meterNumber")}
                    placeholder="Enter meter number"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={handleValidate}
                    disabled={
                      isValidatingMeter || !selectedDisco || !meterNumber
                    }
                    variant="outline"
                    size="default"
                  >
                    {isValidatingMeter ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                    ) : (
                      <Search className="w-4 h-4 mr-2" />
                    )}
                    Validate
                  </Button>
                </div>
                {errors.meterNumber && (
                  <p className="text-sm text-red-600">
                    {errors.meterNumber.message}
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
                  min="100"
                  step="50"
                />
                {/* Quick amount buttons */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {[1000, 2000, 5000, 10000, 20000].map((amt) => (
                    <Button
                      key={amt}
                      type="button"
                      onClick={() => setValue("amount", amt.toString())}
                      variant="outline"
                      size="sm"
                    >
                      ₦{amt.toLocaleString()}
                    </Button>
                  ))}
                </div>
                {errors.amount && (
                  <p className="text-sm text-red-600">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  {...register("phoneNumber")}
                  type="tel"
                  placeholder="Enter phone number"
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-red-600">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {/* Purchase Button */}
              <Button
                type="submit"
                disabled={
                  isSubmitting ||
                  buyElectricityMutation.isPending ||
                  !validationResult
                }
                className="w-full"
                size="lg"
              >
                {isSubmitting || buyElectricityMutation.isPending ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : (
                  <Zap className="w-5 h-5 mr-2" />
                )}
                {isSubmitting || buyElectricityMutation.isPending
                  ? "Processing..."
                  : "Purchase Electricity"}
              </Button>

              {errors.root && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.root.message}</AlertDescription>
                </Alert>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Validation Result */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
              Meter Validation
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isValidatingMeter ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2 text-muted-foreground">
                  Validating meter...
                </span>
              </div>
            ) : validationError ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Validation failed. Please check your meter details and try
                  again.
                  <br />
                  <span className="text-sm">{validationError.message}</span>
                </AlertDescription>
              </Alert>
            ) : validationResult ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-md dark:bg-green-950">
                  <span className="text-sm font-medium text-green-800 dark:text-green-200">
                    Customer Name:
                  </span>
                  <span className="text-sm text-green-700 dark:text-green-300">
                    {validationResult.name}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-md dark:bg-blue-950">
                  <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Address:
                  </span>
                  <span className="text-sm text-blue-700 dark:text-blue-300">
                    {validationResult.address}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-md dark:bg-purple-950">
                  <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                    Meter Type:
                  </span>
                  <span className="text-sm text-purple-700 dark:text-purple-300">
                    PREPAID
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-md dark:bg-yellow-950">
                  <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Status:
                  </span>
                  <span className="text-sm text-yellow-700 dark:text-yellow-300">
                    {validationResult.invalid ? "Invalid" : "Valid"}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                <p>
                  Please enter meter details and click validate to see customer
                  information.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Purchases */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Electricity Purchases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">
            <p>No recent purchases found.</p>
          </div>
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
