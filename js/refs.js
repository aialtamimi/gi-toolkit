// Reference link helper. When SPEC.md gives no URL for a source, link to a PubMed search
// for the citation text instead of guessing a URL.
export function pubmedSearch(citation) {
  return "https://pubmed.ncbi.nlm.nih.gov/?term=" + encodeURIComponent(citation);
}
export function ref(citation, url) {
  return { citation, url: url || pubmedSearch(citation), searchLink: !url };
}
