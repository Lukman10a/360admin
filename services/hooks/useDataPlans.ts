import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import { ApiService } from '../api/api-service'
import {
  GetDataPlanPricesResponse, AddDataPlanRequest, AddDataPlanResponse,
  UpdateDataPlanRequest, UpdateDataPlanResponse, DeleteDataPlanResponse, GetDataPlansResponse,
  NetworkId, NETWORK_IDS
} from '../types'

// ============================================================================
// QUERY KEYS
// ============================================================================

export const dataPlanKeys = {
  all: ['dataPlans'] as const,
  byNetwork: (network: NetworkId) => ['dataPlans', 'network', network] as const,
  byId: (id: string) => ['dataPlan', id] as const,
  byType: (type: string) => ['dataPlans', 'type', type] as const,
  byNetworkAndType: (network: NetworkId, type: string) => ['dataPlans', 'network', network, 'type', type] as const,
  prices: ['dataPlanPrices'] as const,
  networkPrices: (network: NetworkId) => ['dataPlanPrices', 'network', network] as const,
} as const

// ============================================================================
// DATA PLAN QUERIES
// ============================================================================

// Get All Data Plans Query
export const useDataPlans = (options?: UseQueryOptions<GetDataPlansResponse>) => {
  return useQuery({
    queryKey: dataPlanKeys.all,
    queryFn: () => ApiService.getDataPlans(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    ...options,
  })
}

// Get Data Plans by Network Query
export const useDataPlansByNetwork = (
  network: NetworkId,
  options?: UseQueryOptions<GetDataPlanPricesResponse>
) => {
  return useQuery({
    queryKey: dataPlanKeys.byNetwork(network),
    queryFn: () => ApiService.getDataPlanPrices(network),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    enabled: !!network,
    ...options,
  })
}

// Get Data Plans by Type Query
export const useDataPlansByType = (
  type: string,
  options?: UseQueryOptions<GetDataPlansResponse>
) => {
  const { data: allPlans, ...rest } = useDataPlans(options)
  
  const filteredPlans = allPlans?.data?.filter(plan => plan.plan_type === type) || []
  
  return {
    ...rest,
    data: {
      ...allPlans,
      data: filteredPlans,
    },
  }
}

// Get Data Plans by Network and Type Query
export const useDataPlansByNetworkAndType = (
  network: NetworkId,
  type: string,
  options?: UseQueryOptions<GetDataPlanPricesResponse>
) => {
  const { data: networkPlans, ...rest } = useDataPlansByNetwork(network, options)
  
  const filteredPlans = networkPlans?.data?.filter(plan => plan.plan_type === type) || []
  
  return {
    ...rest,
    data: {
      ...networkPlans,
      data: filteredPlans,
    },
  }
}

// Get Available Data Plans Query (only available plans)
export const useAvailableDataPlans = (
  network?: NetworkId,
  options?: UseQueryOptions<GetDataPlanPricesResponse>
) => {
  const { data: plans, ...rest } = network 
    ? useDataPlansByNetwork(network, options)
    : useDataPlans(options)
  
  const availablePlans = plans?.data?.filter(plan => plan.isAvailable) || []
  
  return {
    ...rest,
    data: {
      ...plans,
      data: availablePlans,
    },
  }
}

// ============================================================================
// DATA PLAN MUTATIONS
// ============================================================================

// Add Data Plan Mutation
export const useAddDataPlan = (options?: UseMutationOptions<AddDataPlanResponse, Error, AddDataPlanRequest>) => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (request: AddDataPlanRequest) => ApiService.addDataPlan(request),
    onSuccess: (_, request) => {
      // Invalidate data plans and specific network plans
      queryClient.invalidateQueries({ queryKey: dataPlanKeys.all })
      queryClient.invalidateQueries({ queryKey: dataPlanKeys.byNetwork(request.planNetwork as NetworkId) })
      queryClient.invalidateQueries({ queryKey: dataPlanKeys.byType(request.planType) })
      queryClient.invalidateQueries({ 
        queryKey: dataPlanKeys.byNetworkAndType(request.planNetwork as NetworkId, request.planType) 
      })
    },
    ...options,
  })
}

// Update Data Plan Mutation
export const useUpdateDataPlan = (options?: UseMutationOptions<UpdateDataPlanResponse, Error, UpdateDataPlanRequest>) => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (request: UpdateDataPlanRequest) => ApiService.updateDataPlan(request),
    onSuccess: (_, request) => {
      // Invalidate data plans and specific network plans
      queryClient.invalidateQueries({ queryKey: dataPlanKeys.all })
      queryClient.invalidateQueries({ queryKey: dataPlanKeys.byNetwork((request as any).planNetwork as NetworkId) })
      queryClient.invalidateQueries({ queryKey: dataPlanKeys.byId((request as any)._id) })
      queryClient.invalidateQueries({ queryKey: dataPlanKeys.byType((request as any).planType) })
      queryClient.invalidateQueries({ 
        queryKey: dataPlanKeys.byNetworkAndType((request as any).planNetwork as NetworkId, (request as any).planType) 
      })
    },
    ...options,
  })
}

// Delete Data Plan Mutation
export const useDeleteDataPlan = (options?: UseMutationOptions<DeleteDataPlanResponse, Error, string>) => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (planId: string) => ApiService.deleteDataPlan(planId),
    onSuccess: (_, planId) => {
      // Remove plan from cache and invalidate lists
      queryClient.removeQueries({ queryKey: dataPlanKeys.byId(planId) })
      queryClient.invalidateQueries({ queryKey: dataPlanKeys.all })
    },
    ...options,
  })
}

// ============================================================================
// ADVANCED DATA PLAN HOOKS
// ============================================================================

// Get Data Plan by ID Query
export const useDataPlanById = (
  id: string,
  options?: UseQueryOptions<GetDataPlansResponse>
) => {
  const { data: allPlans, ...rest } = useDataPlans(options)
  
  const plan = allPlans?.data?.find(plan => plan._id === id)
  
  return {
    ...rest,
    data: plan ? { ...allPlans, data: [plan] } : undefined,
  }
}

// Get Data Plans by Price Range Query
export const useDataPlansByPriceRange = (
  minPrice: number,
  maxPrice: number,
  network?: NetworkId,
  options?: UseQueryOptions<GetDataPlanPricesResponse>
) => {
  const { data: plans, ...rest } = network 
    ? useDataPlansByNetwork(network, options)
    : useDataPlans(options)
  
  const filteredPlans = plans?.data?.filter(plan => {
    const price = parseFloat(plan.my_price)
    return price >= minPrice && price <= maxPrice
  }) || []
  
  return {
    ...rest,
    data: {
      ...plans,
      data: filteredPlans,
    },
  }
}

// Get Data Plans by Validity Query
export const useDataPlansByValidity = (
  validity: string,
  network?: NetworkId,
  options?: UseQueryOptions<GetDataPlanPricesResponse>
) => {
  const { data: plans, ...rest } = network 
    ? useDataPlansByNetwork(network, options)
    : useDataPlans(options)
  
  const filteredPlans = plans?.data?.filter(plan => 
    plan.month_validate.toLowerCase().includes(validity.toLowerCase())
  ) || []
  
  return {
    ...rest,
    data: {
      ...plans,
      data: filteredPlans,
    },
  }
}

// ============================================================================
// DATA PLAN UTILITIES
// ============================================================================

// Get Network Names Hook
export const useNetworkNames = () => {
  return useQuery({
    queryKey: ['networkNames'],
    queryFn: () => Promise.resolve({
      [NETWORK_IDS.MTN]: 'MTN',
      [NETWORK_IDS.GLO]: 'GLO',
      [NETWORK_IDS.AIRTEL]: 'AIRTEL',
      [NETWORK_IDS['9MOBILE']]: '9MOBILE',
    }),
    staleTime: Infinity,
    gcTime: Infinity,
  })
}

// Get Plan Types Hook
export const usePlanTypes = () => {
  const { data: plans } = useDataPlans()
  
  const planTypes = plans?.data?.reduce((types: string[], plan) => {
    if (!types.includes(plan.plan_type)) {
      types.push(plan.plan_type)
    }
    return types
  }, []) || []
  
  return planTypes
}

// Get Plan Validities Hook
export const usePlanValidities = () => {
  const { data: plans } = useDataPlans()
  
  const validities = plans?.data?.reduce((vals: string[], plan) => {
    if (!vals.includes(plan.month_validate)) {
      vals.push(plan.month_validate)
    }
    return vals
  }, []) || []
  
  return validities
}

// ============================================================================
// DATA PLAN STATISTICS
// ============================================================================

// Get Data Plan Statistics Hook
export const useDataPlanStats = (network?: NetworkId) => {
  const { data: plans, isLoading, error } = network 
    ? useDataPlansByNetwork(network)
    : useDataPlans()
  
  const stats = plans?.data?.reduce((acc, plan) => {
    // Count by type
    acc.byType[plan.plan_type] = (acc.byType[plan.plan_type] || 0) + 1
    
    // Count by availability
    if (plan.isAvailable) {
      acc.available++
    } else {
      acc.unavailable++
    }
    
    // Price ranges
    const price = parseFloat(plan.my_price)
    if (price < 100) acc.priceRanges.under100++
    else if (price < 500) acc.priceRanges.under500++
    else if (price < 1000) acc.priceRanges.under1000++
    else acc.priceRanges.over1000++
    
    // Total plans
    acc.total++
    
    return acc
  }, {
    total: 0,
    available: 0,
    unavailable: 0,
    byType: {} as Record<string, number>,
    priceRanges: {
      under100: 0,
      under500: 0,
      under1000: 0,
      over1000: 0,
    },
  }) || {
    total: 0,
    available: 0,
    unavailable: 0,
    byType: {},
    priceRanges: {
      under100: 0,
      under500: 0,
      under1000: 0,
      over1000: 0,
    },
  }
  
  return {
    stats,
    isLoading,
    error,
  }
}

// ============================================================================
// OPTIMISTIC UPDATES
// ============================================================================

// Optimistic Update Data Plan Hook
export const useOptimisticUpdateDataPlan = () => {
  const queryClient = useQueryClient()
  
  const optimisticUpdate = (id: string, updates: Partial<UpdateDataPlanRequest>) => {
    // Update in all relevant caches
    queryClient.setQueryData(dataPlanKeys.all, (old: any) => ({
      ...old,
      data: old?.data?.map((plan: any) => 
        plan._id === id ? { ...plan, ...updates } : plan
      ) || [],
    }))
    
    if ('planNetwork' in updates && updates.planNetwork) {
      queryClient.setQueryData(dataPlanKeys.byNetwork(updates.planNetwork as NetworkId), (old: any) => ({
        ...old,
        data: old?.data?.map((plan: any) => 
          plan._id === id ? { ...plan, ...updates } : plan
        ) || [],
      }))
    }
  }
  
  const rollbackUpdate = (id: string) => {
    queryClient.invalidateQueries({ queryKey: dataPlanKeys.byId(id) })
    queryClient.invalidateQueries({ queryKey: dataPlanKeys.all })
  }
  
  return {
    optimisticUpdate,
    rollbackUpdate,
  }
}

// ============================================================================
// BULK OPERATIONS
// ============================================================================

// Bulk Invalidate Data Plans Hook
export const useBulkInvalidateDataPlans = () => {
  const queryClient = useQueryClient()
  
  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: dataPlanKeys.all })
  }
  
  const invalidateByNetwork = (network: NetworkId) => {
    queryClient.invalidateQueries({ queryKey: dataPlanKeys.byNetwork(network) })
  }
  
  const invalidateByType = (type: string) => {
    queryClient.invalidateQueries({ queryKey: dataPlanKeys.byType(type) })
  }
  
  return {
    invalidateAll,
    invalidateByNetwork,
    invalidateByType,
  }
}
