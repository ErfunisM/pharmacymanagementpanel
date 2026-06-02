import Filter from "./filter";
import SearchBox from "./SearchBox";

const Toolbox = ({
  filters,
  term,
  onSearch,
  onFilter,
  onReset,
  selectedFilters,
  SearchPlaceholder,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 w-full">
      <div className="w-full sm:w-auto sm:flex-1">
        <SearchBox
          term={term}
          onSearch={onSearch}
          SearchPlaceholder={SearchPlaceholder}
        />
      </div>
      <div className="w-full sm:w-auto">
        <Filter
          items={filters}
          onFilter={onFilter}
          onReset={onReset}
          selectedFilters={selectedFilters}
        />
      </div>
    </div>
  );
};

export default Toolbox;
