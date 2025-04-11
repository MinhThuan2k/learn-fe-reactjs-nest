import { useQuery } from '@tanstack/react-query'

export function hookUser(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => {}
  })
}
