export const PRINT_ITEM = 'PRINT_ITEM';

export const printItem = (id: number, name: string) => {
  return {
    type: PRINT_ITEM,
    payload: { id, name }
  };
};