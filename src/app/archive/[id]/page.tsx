import { ArchiveDetailPage } from '@/components/ArchiveDetailPage'

export default function ArchiveDetail({
  params,
}: {
  params: { id: string }
}) {
  return <ArchiveDetailPage id={params.id} />
}

