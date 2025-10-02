"use client";

import {
  useAddDataPlan,
  useDataPlans,
  useDeleteDataPlan,
  useUpdateDataPlan,
} from "@/services/hooks";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Edit, Filter, Plus, Trash } from "lucide-react";
import { useState } from "react";
import AddDataPlanModal from "./add-data-plan-modal";
import SuccessMessage from "./success-message";

export default function DataPlans() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successDetails, setSuccessDetails] = useState({
    title: "",
    message: "",
  });
  const [filters, setFilters] = useState({
    network: "",
    plan_type: "",
  });

  // API hooks
  const { data: dataPlansData, isLoading: dataPlansLoading } =
    useDataPlans(filters);
  const addDataPlanMutation = useAddDataPlan();
  const updateDataPlanMutation = useUpdateDataPlan();
  const deleteDataPlanMutation = useDeleteDataPlan();

  const dataPlans = dataPlansData || [];

  // Define table columns
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "plan",
      header: "Plan",
      cell: ({ row }) => (
        <div className="text-sm font-medium text-gray-900">
          {row.original.plan} ({row.original.plan_network}{" "}
          {row.original.plan_type})
        </div>
      ),
    },
    {
      accessorKey: "dataplan_id",
      header: "Plan ID",
      cell: ({ getValue }) => (
        <div className="text-sm text-gray-500">{getValue() as string}</div>
      ),
    },
    {
      accessorKey: "my_price",
      header: "Price",
      cell: ({ getValue }) => (
        <div className="text-sm text-gray-500">₦{getValue() as string}</div>
      ),
    },
    {
      accessorKey: "resellerPrice",
      header: "User",
      cell: ({ getValue }) => (
        <div className="text-sm text-gray-500">₦{getValue() as string}</div>
      ),
    },
    {
      accessorKey: "apiPrice",
      header: "Agent",
      cell: ({ getValue }) => (
        <div className="text-sm text-gray-500">₦{getValue() as string}</div>
      ),
    },
    {
      accessorKey: "apiPrice",
      header: "Vendor",
      cell: ({ getValue }) => (
        <div className="text-sm text-gray-500">₦{getValue() as string}</div>
      ),
    },
    {
      accessorKey: "month_validate",
      header: "Expiry",
      cell: ({ getValue }) => (
        <div className="text-sm text-gray-500">{getValue() as string}</div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            className="text-indigo-600 hover:text-indigo-800"
            onClick={() => handleEditPlan(row.original)}
            disabled={updateDataPlanMutation.isPending}
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            className="text-red-600 hover:text-red-800"
            onClick={() => handleDeletePlan(row.original._id)}
            disabled={deleteDataPlanMutation.isPending}
          >
            <Trash className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  // Initialize table
  const table = useReactTable({
    data: dataPlans,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

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

  const handleUpdatePlan = (plan: {
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
    if (!selectedPlan) return;

    const updatedPlan = {
      _id: selectedPlan._id,
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
      planVolumeRatio: selectedPlan.volumeRatio || 1,
    };

    updateDataPlanMutation.mutate(updatedPlan, {
      onSuccess: () => {
        setIsUpdateModalOpen(false);
        setSelectedPlan(null);
        setSuccessDetails({
          title: "Data Plan Updated Successfully",
          message: `You have successfully updated the data plan.`,
        });
        setShowSuccess(true);
      },
    });
  };

  const handleEditPlan = (plan) => {
    setSelectedPlan(plan);
    setIsUpdateModalOpen(true);
  };

  const handleDeletePlan = (planId: string) => {
    if (confirm("Are you sure you want to delete this data plan?")) {
      deleteDataPlanMutation.mutate(planId, {
        onSuccess: () => {
          setSuccessDetails({
            title: "Data Plan Deleted Successfully",
            message: `The data plan has been deleted.`,
          });
          setShowSuccess(true);
        },
      });
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ network: "", plan_type: "" });
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Page title */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
        Data plans
      </h1>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <h3 className="font-medium">Filters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Network
            </label>
            <select
              value={filters.network}
              onChange={(e) => handleFilterChange("network", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Networks</option>
              <option value="MTN">MTN</option>
              <option value="GLO">GLO</option>
              <option value="AIRTEL">AIRTEL</option>
              <option value="9MOBILE">9MOBILE</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Plan Type
            </label>
            <select
              value={filters.plan_type}
              onChange={(e) => handleFilterChange("plan_type", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Types</option>
              <option value="SME">SME</option>
              <option value="CG">CG</option>
              <option value="Corporate">Corporate</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

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
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 md:px-6 py-3 cursor-pointer select-none"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </th>
                  ))}
                </tr>
              ))}
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
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-8"></div>
                    </td>
                  </tr>
                ))
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 md:px-6 py-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
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
          <div className="text-sm text-gray-700">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm disabled:opacity-50"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm disabled:opacity-50"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
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
        isUpdate={false}
      />

      {/* Update Data Plan Modal */}
      <AddDataPlanModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedPlan(null);
        }}
        onAddPlan={handleAddPlan}
        onUpdatePlan={handleUpdatePlan}
        selectedPlan={selectedPlan}
        isUpdate={true}
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
