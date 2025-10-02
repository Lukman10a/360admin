"use client";

import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface AddDataPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPlan: (plan: {
    network: string;
    name: string;
    dataType: string;
    planId: string;
    duration: string;
    buyingPrice: string;
    userPrice: string;
    agentPrice: string;
    vendorPrice: string;
  }) => void;
  onUpdatePlan?: (plan: {
    network: string;
    name: string;
    dataType: string;
    planId: string;
    duration: string;
    buyingPrice: string;
    userPrice: string;
    agentPrice: string;
    vendorPrice: string;
  }) => void;
  selectedPlan?: any;
  isUpdate?: boolean;
}

type FormData = {
  network: string;
  name: string;
  dataType: string;
  planId: string;
  duration: string;
  buyingPrice: string;
  userPrice: string;
  agentPrice: string;
  vendorPrice: string;
};

export default function AddDataPlanModal({
  isOpen,
  onClose,
  onAddPlan,
  onUpdatePlan,
  selectedPlan,
  isUpdate = false,
}: AddDataPlanModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState(false);
  const [isDataTypeDropdownOpen, setIsDataTypeDropdownOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const networks = ["MTN", "Glo", "Airtel", "9mobile"];
  const dataTypes = ["Gifting", "SME", "Corporate", "Direct"];

  const watchedNetwork = watch("network");
  const watchedDataType = watch("dataType");

  useEffect(() => {
    if (isUpdate && selectedPlan) {
      setValue("network", selectedPlan.plan_network || "");
      setValue("name", selectedPlan.plan || "");
      setValue("dataType", selectedPlan.plan_type || "");
      setValue("planId", selectedPlan.dataplan_id || "");
      setValue("duration", selectedPlan.month_validate?.split(" ")[0] || "");
      setValue("buyingPrice", selectedPlan.planCostPrice?.toString() || "");
      setValue("userPrice", selectedPlan.resellerPrice || "");
      setValue("agentPrice", selectedPlan.apiPrice || "");
      setValue("vendorPrice", selectedPlan.apiPrice || "");
    } else if (!isUpdate) {
      // Reset form for add
      reset();
    }
  }, [isUpdate, selectedPlan, setValue, reset]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const onSubmit = (data: FormData) => {
    if (isUpdate && onUpdatePlan) {
      onUpdatePlan(data);
    } else {
      onAddPlan(data);
    }

    // Reset form only for add
    if (!isUpdate) {
      reset();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-60 p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="network"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Network
            </label>
            <div className="relative">
              <button
                type="button"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                onClick={() => setIsNetworkDropdownOpen(!isNetworkDropdownOpen)}
              >
                {watchedNetwork || "Select Network"}
                <svg
                  className={`w-5 h-5 transition-transform ${
                    isNetworkDropdownOpen ? "transform rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {isNetworkDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  <div className="py-1">
                    <div className="px-3 py-2 text-sm text-gray-700">
                      Select Network
                    </div>
                    {networks.map((net) => (
                      <button
                        key={net}
                        type="button"
                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center"
                        onClick={() => {
                          setValue("network", net);
                          setIsNetworkDropdownOpen(false);
                        }}
                      >
                        {watchedNetwork === net && (
                          <Check className="w-4 h-4 mr-2" />
                        )}
                        <span>{net}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">Name is required</p>
              )}
            </div>
            <div>
              <label
                htmlFor="dataType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Data type
              </label>
              <div className="relative">
                <button
                  type="button"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  onClick={() =>
                    setIsDataTypeDropdownOpen(!isDataTypeDropdownOpen)
                  }
                >
                  {watchedDataType || "Select Type"}
                  <svg
                    className={`w-5 h-5 transition-transform ${
                      isDataTypeDropdownOpen ? "transform rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {isDataTypeDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    <div className="py-1">
                      {dataTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                          onClick={() => {
                            setValue("dataType", type);
                            setIsDataTypeDropdownOpen(false);
                          }}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="planId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Plan id
              </label>
              <input
                type="text"
                id="planId"
                {...register("planId", { required: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.planId && (
                <p className="mt-1 text-sm text-red-600">Plan ID is required</p>
              )}
            </div>
            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Duration in days
              </label>
              <input
                type="number"
                id="duration"
                {...register("duration", { required: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Days"
              />
              {errors.duration && (
                <p className="mt-1 text-sm text-red-600">
                  Duration is required
                </p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="buyingPrice"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Buying Price
            </label>
            <input
              type="number"
              id="buyingPrice"
              {...register("buyingPrice", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Price"
            />
            {errors.buyingPrice && (
              <p className="mt-1 text-sm text-red-600">
                Buying Price is required
              </p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label
                htmlFor="userPrice"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                User Price
              </label>
              <input
                type="number"
                id="userPrice"
                {...register("userPrice", { required: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="User Price"
              />
              {errors.userPrice && (
                <p className="mt-1 text-sm text-red-600">
                  User Price is required
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="agentPrice"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Agent Price
              </label>
              <input
                type="number"
                id="agentPrice"
                {...register("agentPrice", { required: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Agent Price"
              />
              {errors.agentPrice && (
                <p className="mt-1 text-sm text-red-600">
                  Agent Price is required
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="vendorPrice"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Vendor Price
              </label>
              <input
                type="number"
                id="vendorPrice"
                {...register("vendorPrice", { required: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Vendor Price"
              />
              {errors.vendorPrice && (
                <p className="mt-1 text-sm text-red-600">
                  Vendor Price is required
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {isUpdate ? "Update Plan" : "Add Plan"}
          </button>
        </form>
      </div>
    </div>
  );
}
