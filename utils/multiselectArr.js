export default function multiSelectArray(id) {
  return Array.from(document.getElementById(id).options)
    .filter(option => option.selected)
    .map(option => option.value);
}
