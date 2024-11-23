import React, { useState } from 'react';

const carBrands = [
  'Playstation', 'Xbox'
  // Adicione mais marcas conforme necessário
];

const DropdownWithSearch = ({ selectedBrand, onSelectBrand }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleSelectBrand = (brand) => {
    onSelectBrand(brand);
    setIsOpen(false);
    setSearchTerm('');
  };

  const filteredBrands = carBrands.filter((brand) =>
    brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <div 
        className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer text-gray-700 text-sm hover:bg-gray-50 transition duration-200 ease-in-out "
        onClick={toggleDropdown}
      >
        {selectedBrand || "Selecione uma marca..."}
      </div>

      {isOpen && (
        <div className="absolute left-0 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <input
            type="text"
            className="w-full text-sm px-4 py-2 border-b border-gray-200 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-t-lg"
            placeholder="Pesquisar marca..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <ul className="max-h-48 overflow-y-auto">
            {filteredBrands.length > 0 ? (
              filteredBrands.map((brand) => (
                <li
                  key={brand}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-red-100 cursor-pointer transition-colors duration-150 ease-in-out"
                  onClick={() => handleSelectBrand(brand)}
                >
                  {brand}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-400">Nenhuma marca encontrada</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownWithSearch;
