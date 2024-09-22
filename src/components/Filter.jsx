import { useFilter } from '../ContextFilter.jsx'

const Filter = ({ products }) => {

  const {
    selectedCategory,
    selectedSortOrder,
    setSelectedCategory,
    setSelectedSortOrder,
    handleCategoryChange,
    handleSortOrderChange
  } = useFilter();

  const removeFilters = () => {
    setSelectedCategory('');
    setSelectedSortOrder('');
  }

  return (
    <div className="filters p-2 space-x-4">
      <select value={selectedCategory} className="rounded-lg p-1" onChange={(event) => handleCategoryChange(event)}>
        <option value="">Filter...</option>
        {[...new Set(products.map(product => product.category))].map((category, i) => (
          <option key={`i-${i}`} value={category}>{category}</option>
        ))}
      </select>

      <select value={selectedSortOrder} className="rounded-lg p-1" onChange={(event) => handleSortOrderChange(event)}>
        <option value="">Sort by...</option>
        <option value="desc">Prices - from most to least expensive</option>
        <option value="asc">Prices - from cheapest to most expensive</option>
      </select>

      <button onClick={removeFilters}>X - Remove filters</button>
    </div>
  )
}

export default Filter;
