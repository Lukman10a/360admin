"use client";

import {
  useAddDataPlan,
  useDataPlans,
  useDeleteDataPlan,
  useUpdateDataPlan,
} from "@/services/hooks";
import { Edit, Plus, Trash } from "lucide-react";
import { useState } from "react";
import AddDataPlanModal from "./add-data-plan-modal";
import SuccessMessage from "./success-message";

export default function DataPlans() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successDetails, setSuccessDetails] = useState({
    title: "",
    message: "",
  });

  // API hooks
  const { data: dataPlansData, isLoading: dataPlansLoading } = useDataPlans();
  const addDataPlanMutation = useAddDataPlan();
  const updateDataPlanMutation = useUpdateDataPlan();
  const deleteDataPlanMutation = useDeleteDataPlan();

  const dataPlans = dataPlansData?.data || [];

  const handleAddPlan = (plan: {
    network: string;
    name: string;
    dataType: string;
    planId: string;
    duration: string;
    buyingPrice: string;
    userPrice: string;
    agentPrice: string;
    vendorPrice: string;
  }) => {
    const newPlan = {
      planNetwork: plan.network,
      planName: plan.name,
      planType: plan.dataType,
      planValidity: plan.duration,
      planId: parseInt(plan.planId),
      resellerPrice: parseFloat(plan.userPrice),
      smartEarnerPrice: parseFloat(plan.agentPrice),
      apiPrice: parseFloat(plan.vendorPrice),
      planCostPrice: parseFloat(plan.buyingPrice),
      partnerPrice: parseFloat(plan.vendorPrice),
      planVolumeRatio: 1, // Default value
    };

    addDataPlanMutation.mutate(newPlan, {
      onSuccess: () => {
        setIsModalOpen(false);
        setSuccessDetails({
          title: "Data Plan Added Successfully",
          message: `You have successfully added a data ${plan.dataType.toLowerCase()} plan.`,
        });
        setShowSuccess(true);
      },
    });
  };

  const handleDeletePlan = (planId: string) => {
    if (confirm("Are you sure you want to delete this data plan?")) {
      deleteDataPlanMutation.mutate(planId);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Page title */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
        Data plans
      </h1>

      {/* Add button */}
      <div className="flex justify-end mb-6">
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium flex items-center justify-center hover:bg-indigo-700 transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Data Plan
        </button>
      </div>

      {/* Data plans table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium">All Data Plan</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-4 md:px-6 py-3">Plan</th>
                <th className="px-4 md:px-6 py-3">Plan ID</th>
                <th className="px-4 md:px-6 py-3">Price</th>
                <th className="px-4 md:px-6 py-3">User</th>
                <th className="px-4 md:px-6 py-3">Agent</th>
                <th className="px-4 md:px-6 py-3">Vendor</th>
                <th className="px-4 md:px-6 py-3">Action</th>
                <th className="px-4 md:px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dataPlansLoading ? (
                // Loading skeleton
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-4 md:px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-48"></div>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-8"></div>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-8"></div>
                    </td>
                  </tr>
                ))
              ) : dataPlans.length > 0 ? (
                dataPlans.map((plan) => (
                  <tr key={plan._id} className="hover:bg-gray-50">
                    <td className="px-4 md:px-6 py-4 text-sm font-medium text-gray-900">
                      {plan.plan} ({plan.plan_network} {plan.plan_type})
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-500">
                      {plan.dataplan_id}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-500">
                      ₦{plan.my_price}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-500">
                      ₦{plan.resellerPrice}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-500">
                      ₦{plan.apiPrice}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-500">
                      ₦{plan.apiPrice}
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <button className="text-indigo-600 hover:text-indigo-800">
                        <Edit className="w-5 h-5" />
                      </button>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDeletePlan(plan._id)}
                        disabled={deleteDataPlanMutation.isPending}
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 md:px-6 py-8 text-center text-gray-500"
                  >
                    No data plans found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 gap-3">
          <div className="text-sm text-gray-700">Page 1 of 1</div>
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm"
              disabled
            >
              Previous
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add Data Plan Modal */}
      <AddDataPlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddPlan={handleAddPlan}
      />

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
