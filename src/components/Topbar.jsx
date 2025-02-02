import i18n from "../i18/i18";
function Topbar() {

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="flex items-center justify-between h-8 w-screen bg-gray-200 text-gray-700 px-5">
      <div className="font-bold">भारत सरकार | Government of India</div>
      <div className="font-bold flex space-x-2">
        {/* <button>Skip to main content |</button> */}
        {/* <button>Search |</button> */}
        {/* <button>AT |</button> */}
        <select
          name=""
          id="language"
          defaultValue={"en"}
          onChange={(e) => { changeLanguage(e.target.value) }}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>
        {/* <button>Chatbot |</button> */}
        {/* <button>Back to Login |</button> */}
      </div>
    </header>
  );
};

export default Topbar;