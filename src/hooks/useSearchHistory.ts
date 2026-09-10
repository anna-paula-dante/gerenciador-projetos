import { useSyncExternalStore } from 'react'
import {
  getSearchHistorySnapshot,
  subscribeSearchHistory,
} from '../services/searchHistory'

export function useSearchHistory(): string[] {
  return useSyncExternalStore(
    subscribeSearchHistory,
    getSearchHistorySnapshot,
    getSearchHistorySnapshot,
  )
}
