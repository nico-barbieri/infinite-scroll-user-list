import { useState } from "react";
import { ReactComponent as SearchIcon } from "../res/icons/search.svg";
import { ReactComponent as OptionsIcon } from "../res/icons/options.svg";

const SearchBar = ({ users, handleSearch }) => {
  const [searchTerms, setSearchTerms] = useState({
    name: "",
    gen: "",
    nat: "",
  });

  const [panelIsOpen, setPanelIsOpen] = useState(false);

  const handleSearchTermsChange = (e) => {
    const { name, value } = e.target;
    setSearchTerms((searchTerms) => ({
      ...searchTerms,
      [name]: value,
    }));
  };

  const handleToggleOption = (e) => {
    setPanelIsOpen(e.target.checked);
  };

  const handleReset = () => {
    setSearchTerms({
      name: "",
      gen: "",
      nat: "",
    });
    handleSearch([...users]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // create a "filtered" array and populate it with current fetched users
    let filtered = [...users];

    // filter results in 3 steps, depending on filled fields:
    if (searchTerms.name) {
      filtered = filtered.filter(
        (user) =>
          user.name.first
            .toLowerCase()
            .includes(searchTerms.name.toLowerCase()) ||
          user.name.last.toLowerCase().includes(searchTerms.name.toLowerCase())
      );
    }
    if (searchTerms.nat) {
      filtered = filtered.filter((user) => user.nat == searchTerms.nat);
    }

    if (searchTerms.gen) {
      filtered = filtered.filter((user) => user.gender == searchTerms.gen);
    }

    handleSearch(filtered);
  };

  return (
    <form className="search-section" onSubmit={handleSubmit}>
      <div className="mobile-only show-options">
        <input type="checkbox" onChange={handleToggleOption} />
        <OptionsIcon />
      </div>
      <div className={(panelIsOpen ? "show" : "hide") + " options-wrapper"}>
        <input
          className="search-bar"
          placeholder="Name..."
          name="name"
          value={searchTerms.name}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit(e);
          }}
          onChange={handleSearchTermsChange}
        />
        <select
          name="gen"
          value={searchTerms.gen}
          onChange={handleSearchTermsChange}
        >
          <option value="">All genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <select
          name="nat"
          value={searchTerms.nat}
          onChange={handleSearchTermsChange}
        >
          <option value="">All nationalities</option>
          <option value="AU">Australia</option>
          <option value="BR">Brazil</option>
          <option value="CA">Canada</option>
          <option value="CH">Switzerland</option>
          <option value="DE">Germany</option>
          <option value="DK">Denmark</option>
          <option value="ES">Spain</option>
          <option value="FI">Finland</option>
          <option value="FR">France</option>
          <option value="GB">United Kingdom (Great Britain)</option>
          <option value="IE">Ireland</option>
          <option value="IN">India</option>
          <option value="IR">Iran</option>
          <option value="MX">Mexico</option>
          <option value="NL">Netherlands (Holland)</option>
          <option value="NO">Norway</option>
          <option value="NZ">New Zealand</option>
          <option value="RS">Serbia</option>
          <option value="TR">Turkey</option>
          <option value="UA">Ukraine</option>
          <option value="US">United States of America (USA)</option>
        </select>
      </div>
      <button onClick={handleReset} name="reset">
        Reset
      </button>
      <button type="submit">
        Search <SearchIcon />
      </button>
    </form>
  );
};

export default SearchBar;
