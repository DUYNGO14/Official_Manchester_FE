import Detail from '@/app/components/containers/Posts/PostDetail'
import React from 'react'

export default async function PostDetail(props: PageProps<'/posts/[slug]'>) {
  const { slug } = await props.params
  return (
    <Detail slug={slug}/>
  )
}

