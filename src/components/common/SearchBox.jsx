const SearchBox = ({ onSearch, SearchPlaceholder }) => {
  return (
    <input
      onChange={(t) => onSearch(t.target.value)}
      className="flex h-auto items-center shadow-sm justify-center text-black p-[20px] bg-white w-full rounded-[10px]"
      type="text"
      placeholder={SearchPlaceholder}
    />
  );
};

export default SearchBox;
