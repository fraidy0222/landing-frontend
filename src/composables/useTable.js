export default function useTable() {
  function getPaginationLabel(firstRowIndex, endRowIndex, totalRowsNumber) {
    const pagination = `${firstRowIndex}-${endRowIndex} de ${totalRowsNumber}`;

    return pagination;
  }

  const textInfo = {
    loadingLabel: "Cargando...",
    noDatalabel: "No existen datos",
    rowPerPageLabel: "Elementos por páginas",
    noResultsLabel: "No se encontraron registros coincidentes",
  };
  return {
    getPaginationLabel,
    textInfo,
  };
}
