'use server';

import { Character } from '@/types/shared/types';

export async function compileCsv(
  prevState: string | null,
  formData: FormData
): Promise<string | null> {
  const rawItems = formData.get('selectedItems')?.toString();
  if (!rawItems) return null;

  const items: Character[] = JSON.parse(rawItems);
  if (items.length === 0) return null;

  const csvHeader = ['ID', 'Name', 'Gender', 'Species', 'Status'];

  const csvRows = items.map((item) => [
    item.id,
    `"${item.name.replace(/"/g, '""')}"`,
    `"${item.gender}"`,
    `"${item.species}"`,
    `"${item.status}"`,
  ]);

  return [csvHeader, ...csvRows].map((row) => row.join(';')).join('\n');
}
