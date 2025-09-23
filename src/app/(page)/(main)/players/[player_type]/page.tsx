
import ListPlayer from '@/app/components/containers/Players/ListPlayer'
import React from 'react'

export default async function ListPlayers(props: PageProps<'/players/[player_type]'>) {
  const { player_type } = await props.params
  return (
      <ListPlayer type={player_type} />
  )
}