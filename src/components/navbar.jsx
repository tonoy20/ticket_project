const Navbar = () => {
  const toggleSidebar = () => {
    document
      .getElementById("default-sidebar")
      ?.classList.toggle("-translate-x-full");
  };
  return (
    <nav className="flex items-center justify-between flex-wrap bg-white p-6 shadow sm:w-[calc(100%-256px)] w-full absolute top-0 right-0">
      <button
        onClick={toggleSidebar}
        className="flex items-center px-3 py-2 border rounded hover:text-gray-700 hover:border-white lg:hidden"
      >
        <svg
          className="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
      <div className="flex 1 1 auto"></div>
      <button
        type="button"
        className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        id="user-menu-button"
        aria-expanded="false"
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 rounded-full"
          src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
          alt="user_avatar"
        />
      </button>
    </nav>
  );
};

export default Navbar;
