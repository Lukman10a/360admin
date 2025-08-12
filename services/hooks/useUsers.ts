import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { systemUsersApi, subscribersApi, creditUsersApi } from '../api/domain/users'
import {
  SystemUser,
  Subscriber,
  CreditUser,
  CreditUserAction,
  PaginationParams,
  CreateSystemUserRequest,
  UpdateSystemUserRequest,
  CreateSubscriberRequest,
  UpdateSubscriberRequest,
} from '../types'

// Query keys
export const userKeys = {
  all: ['users'] as const,
  systemUsers: () => [...userKeys.all, 'system'] as const,
  systemUser: (id: number) => [...userKeys.systemUsers(), id] as const,
  subscribers: () => [...userKeys.all, 'subscribers'] as const,
  subscriber: (id: number) => [...userKeys.subscribers(), id] as const,
  creditUsers: () => [...userKeys.all, 'credit'] as const,
  creditUser: (id: number) => [...userKeys.creditUsers(), id] as const,
}

// System Users Hooks
export const useSystemUsers = (params?: PaginationParams) => {
  return useQuery({
    queryKey: [...userKeys.systemUsers(), params],
    queryFn: () => systemUsersApi.getAll(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useSystemUser = (id: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: userKeys.systemUser(id),
    queryFn: () => systemUsersApi.getById(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useCreateSystemUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreateSystemUserRequest) => systemUsersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.systemUsers() })
    },
  })
}

export const useUpdateSystemUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateSystemUserRequest }) => 
      systemUsersApi.update(id, data),
    onSuccess: (updatedUser: any) => {
      queryClient.invalidateQueries({ queryKey: userKeys.systemUsers() })
      if (updatedUser && updatedUser.id) {
        queryClient.setQueryData(userKeys.systemUser(updatedUser.id), updatedUser)
      }
    },
  })
}

export const useDeleteSystemUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: number) => systemUsersApi.delete(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: userKeys.systemUsers() })
      queryClient.removeQueries({ queryKey: userKeys.systemUser(id) })
    },
  })
}

export const useToggleSystemUserStatus = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: number) => systemUsersApi.toggleStatus(id),
    onSuccess: (updatedUser: any) => {
      queryClient.invalidateQueries({ queryKey: userKeys.systemUsers() })
      if (updatedUser && updatedUser.id) {
        queryClient.setQueryData(userKeys.systemUser(updatedUser.id), updatedUser)
      }
    },
  })
}

// Subscribers Hooks
export const useSubscribers = (params?: PaginationParams) => {
  return useQuery({
    queryKey: [...userKeys.subscribers(), params],
    queryFn: () => subscribersApi.getAll(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useSubscriber = (id: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: userKeys.subscriber(id),
    queryFn: () => subscribersApi.getById(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useCreateSubscriber = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreateSubscriberRequest) => subscribersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.subscribers() })
    },
  })
}

export const useUpdateSubscriber = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateSubscriberRequest }) => 
      subscribersApi.update(id, data),
    onSuccess: (updatedSubscriber: any) => {
      queryClient.invalidateQueries({ queryKey: userKeys.subscribers() })
      if (updatedSubscriber && updatedSubscriber.id) {
        queryClient.setQueryData(userKeys.subscriber(updatedSubscriber.id), updatedSubscriber)
      }
    },
  })
}

export const useDeleteSubscriber = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: number) => subscribersApi.delete(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: userKeys.subscribers() })
      queryClient.removeQueries({ queryKey: userKeys.subscriber(id) })
    },
  })
}

export const useToggleSubscriberStatus = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: number) => subscribersApi.toggleStatus(id),
    onSuccess: (updatedSubscriber: any) => {
      queryClient.invalidateQueries({ queryKey: userKeys.subscribers() })
      if (updatedSubscriber && updatedSubscriber.id) {
        queryClient.setQueryData(userKeys.subscriber(updatedSubscriber.id), updatedSubscriber)
      }
    },
  })
}

export const useUpgradeSubscriberAccount = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, accountType }: { id: number; accountType: 'Agent' | 'Vendor' }) => 
      subscribersApi.upgradeAccount(id, accountType),
    onSuccess: (updatedSubscriber: any) => {
      queryClient.invalidateQueries({ queryKey: userKeys.subscribers() })
      if (updatedSubscriber && updatedSubscriber.id) {
        queryClient.setQueryData(userKeys.subscriber(updatedSubscriber.id), updatedSubscriber)
      }
    },
  })
}

export const useUpdateSubscriberWallet = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { 
      id: number; 
      data: { action: 'credit' | 'debit'; amount: number; reason: string } 
    }) => subscribersApi.updateWallet(id, data),
    onSuccess: (updatedSubscriber: any) => {
      queryClient.invalidateQueries({ queryKey: userKeys.subscribers() })
      if (updatedSubscriber && updatedSubscriber.id) {
        queryClient.setQueryData(userKeys.subscriber(updatedSubscriber.id), updatedSubscriber)
      }
    },
  })
}

// Credit Users Hooks
export const useCreditUsers = (params?: PaginationParams) => {
  return useQuery({
    queryKey: [...userKeys.creditUsers(), params],
    queryFn: () => creditUsersApi.getAll(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useCreditUser = (id: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: userKeys.creditUser(id),
    queryFn: () => creditUsersApi.getById(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useCreditUserByEmail = (email: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: [...userKeys.creditUsers(), 'email', email],
    queryFn: () => creditUsersApi.getByEmail(email),
    enabled: enabled && !!email,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useCreateCreditUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: { email: string; fullName: string; phone: string; initialBalance?: number }) => 
      creditUsersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.creditUsers() })
    },
  })
}

export const useUpdateCreditUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { 
      id: number; 
      data: { fullName?: string; phone?: string; status?: 'Active' | 'Inactive' } 
    }) => creditUsersApi.update(id, data),
    onSuccess: (updatedUser: any) => {
      queryClient.invalidateQueries({ queryKey: userKeys.creditUsers() })
      if (updatedUser && updatedUser.id) {
        queryClient.setQueryData(userKeys.creditUser(updatedUser.id), updatedUser)
      }
    },
  })
}

export const useDeleteCreditUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: number) => creditUsersApi.delete(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: userKeys.creditUsers() })
      queryClient.removeQueries({ queryKey: userKeys.creditUser(id) })
    },
  })
}

export const useUpdateCreditUserBalance = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreditUserAction) => creditUsersApi.updateBalance(data),
    onSuccess: (updatedUser: any) => {
      queryClient.invalidateQueries({ queryKey: userKeys.creditUsers() })
      if (updatedUser && updatedUser.id) {
        queryClient.setQueryData(userKeys.creditUser(updatedUser.id), updatedUser)
      }
    },
  })
}

export const useCreditUserBalanceHistory = (id: number, params?: PaginationParams, enabled: boolean = true) => {
  return useQuery({
    queryKey: [...userKeys.creditUser(id), 'balance-history', params],
    queryFn: () => creditUsersApi.getBalanceHistory(id, params),
    enabled: enabled && !!id,
    staleTime: 1 * 60 * 1000, // 1 minute
  })
}

export const useToggleCreditUserStatus = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: number) => creditUsersApi.toggleStatus(id),
    onSuccess: (updatedUser: any) => {
      queryClient.invalidateQueries({ queryKey: userKeys.creditUsers() })
      if (updatedUser && updatedUser.id) {
        queryClient.setQueryData(userKeys.creditUser(updatedUser.id), updatedUser)
      }
    },
  })
} 