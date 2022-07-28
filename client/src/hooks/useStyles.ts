export function useStyles<styleType = undefined>(
  style: () => styleType
): styleType {
  const result = style();
  return result;
}
