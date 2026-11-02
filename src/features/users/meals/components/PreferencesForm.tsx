const PreferencesForm = () => {
  return (
    <div className="flex flex-col bg-linear-to-br from-[#07BA61] via-[#0ABC6C] to-[#0EBA7B] w-full md:w-1/3 p-6 rounded-l-xl space-y-2">
      {/* - Tipo de dieta - */}

      <label
        className="text-black font-semibold text-shadow-xs text-shadow-white/60 tracking-tight"
        htmlFor="dietType"
      >
        Tipo de Dieta
      </label>

      <div className="flex items-center text-sm tracking-tight bg-white border border-emerald-950 rounded-lg mb-4 px-4 py-2">
        <input
          className="text-black placeholder:text-gray-500 bg-transparent w-full outline-none focus:outline-none"
          name="dietType"
          id="dietType"
          type="text"
          placeholder="Ex: Vegana, Vegetariana, Mediterrânea, Cetogênica..."
        />
      </div>

      {/* - Meta calórica - */}

      <label
        className="text-black font-semibold text-shadow-xs text-shadow-white/60 tracking-tight"
        htmlFor="calories"
      >
        Meta de Calorias Diária
      </label>

      <div className="flex items-center text-sm tracking-tight bg-white border border-emerald-950 rounded-lg mb-4 px-4 py-2">
        <input
          className="text-black placeholder:text-gray-500 bg-transparent w-full outline-none focus:outline-none"
          name="calories"
          id="calories"
          type="number"
          placeholder="Ex: 2000"
          min={500}
          max={12000}
        />
      </div>

      {/* - Alergias - */}

      <label
        className="text-black font-semibold text-shadow-xs text-shadow-white/60 tracking-tight"
        htmlFor="allergies"
      >
        Alergias e Restrições
      </label>

      <div className="flex items-center text-sm tracking-tight bg-white border border-emerald-950 rounded-lg mb-4 px-4 py-2">
        <input
          className="text-black placeholder:text-gray-500 bg-transparent w-full outline-none focus:outline-none"
          name="allergies"
          id="allergies"
          type="text"
          placeholder="Ex: Nenhuma, Nozes, Camarão, Amendoim..."
        />
      </div>

      {/* - Cozinha preferida - */}

      <label
        className="text-black font-semibold text-shadow-xs text-shadow-white/60 tracking-tight"
        htmlFor="preferredCuisine"
      >
        Culinária Favorita
      </label>

      <div className="flex items-center text-sm tracking-tight bg-white border border-emerald-950 rounded-lg mb-4 px-4 py-2">
        <input
          className="text-black placeholder:text-gray-500 bg-transparent w-full outline-none focus:outline-none"
          name="preferredCuisine"
          id="preferredCuisine"
          type="text"
          placeholder="Ex: Nenhuma, Italiana, Japonesa, Brasileira..."
        />
      </div>

      {/* - Incluir lanche - */}

      <div className="flex items-center justify-start space-x-2">
        <label
          className="text-black font-semibold text-shadow-xs text-shadow-white/60 tracking-tight mt-1"
          htmlFor="snacks"
        >
          Incluir Lanches
        </label>

        <input
          className="appearance-none h-5 w-5 mt-1 border border-black rounded-sm cursor-pointer bg-white checked:bg-center checked:bg-no-repeat checked:bg-[url(/checkbox/checkmark.svg)]"
          name="snacks"
          id="snacks"
          type="checkbox"
        />
      </div>

      {/* - Botão - */}

      <div className="flex items-center justify-center mt-2">
        <button className="group bg-gray-100 hover:bg-gray-300 px-4 py-2 rounded-lg shadow-md shadow-black/40 mb-6 transition cursor-pointer">
          <span className="text-transparent text-shadow-xs text-shadow-emerald-950/50 font-semibold bg-clip-text bg-linear-to-br from-[#07BA61] via-[#0ABC6C] to-[#0EBA7B] group-hover:from-[#059650] group-hover:via-[#078F52] group-hover:to-[#0A9462]">
            Preparar Minha Dieta
          </span>
        </button>
      </div>
    </div>
  );
};

export { PreferencesForm };
