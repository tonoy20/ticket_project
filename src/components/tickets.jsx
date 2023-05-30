import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTicketTypeStore } from "../features/ticketTypes/slice";
import DeleteConfirmModal from "./modals/deleteConfirm";

const TicketManagement = () => {
  const existingTicketTypes = useSelector(
    (state) => state.ticketType.ticketTypes
  );
  const dispatch = useDispatch();
  const [ticketType, setTicketType] = useState("");
  const [description, setDescription] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalElement, setModalElement] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedItem) {
      const tmp = existingTicketTypes.map((item) => {
        if (item.id === selectedItem.id) {
          return { ...item, type: ticketType, description: description };
        }
        return item;
      });
      dispatch(setTicketTypeStore(tmp));
    } else {
      const tmp = [
        ...existingTicketTypes,
        { id: existingTicketTypes.length + 2, type: ticketType, description },
      ];
      dispatch(setTicketTypeStore(tmp));
    }
    closeModal();
    setDescription("");
    setTicketType("");
    setSelectedItem(null);
  };

  const handleDelete = () => {
    if (selectedItem) {
      const tmp = existingTicketTypes.filter((el) => el.id !== selectedItem.id);
      dispatch(setTicketTypeStore(tmp));
      closeModal();
    }
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setTicketType(item.type);
    setDescription(item.description);
    showModal("defaultModal");
  };

  const handleAddClick = () => {
    setSelectedItem(null);
    setTicketType("");
    setDescription("");
    showModal("defaultModal");
  };

  const closeModal = () => {
    modalElement.hide();
  };

  const showModal = (id) => {
    const modal = new window.Modal(document.getElementById(id), null);
    modal.show();
    setModalElement(modal);
  };

  return (
    <div>
      <div className="flex justify-end my-2">
        <button
          // data-modal-show="defaultModal"
          onClick={handleAddClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Ticket Type
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-lg rounded-md">
        <table className="w-full text-sm text-left ">
          <thead className="text-xs  uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Ticket Type
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {existingTicketTypes?.map((item) => (
              <tr key={item.id} className="bg-white border-b ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {item.type}
                </th>
                <td className="px-6 py-4">{item.description}</td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <button
                    onClick={() => {
                      handleEditClick(item);
                    }}
                    // data-modal-show="defaultModal"
                    className="p-2 bg-gray-100 cursor-pointer flex justify-center items-center rounded-md hover:bg-gray-50 shadow"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      showModal("delete-modal");
                    }}
                    className="p-2 bg-gray-100 cursor-pointer flex justify-center items-center rounded-md hover:bg-gray-50 shadow"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
            {existingTicketTypes.length === 0 && (
              <tr>
                <td className="px-6 py-4">No data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div
        id="defaultModal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-start justify-between p-4 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900 ">
                Add Ticekt Type
              </h3>
              <button
                onClick={() => {
                  closeModal();
                }}
                type="button"
                className=" bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                // data-modal-hide="defaultModal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <form className="w-full" onSubmit={handleSubmit}>
                <div className="md:flex md:items-center mb-6">
                  <div className="min-w-[150px]">
                    <label
                      className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="inline-full-name"
                    >
                      Ticket Type
                    </label>
                  </div>
                  <div className="w-full">
                    <input
                      required
                      className=" appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                      id="inline-full-name"
                      type="text"
                      value={ticketType}
                      onChange={(e) => setTicketType(e.target.value)}
                    />
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="min-w-[150px]">
                    <label
                      className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="desc"
                    >
                      Description
                    </label>
                  </div>
                  <div className="w-full">
                    <textarea
                      className=" appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                      id="desc"
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-2">
                  <button
                    onClick={() => {
                      closeModal();
                    }}
                    type="button"
                    className="0 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    {selectedItem ? "Edit" : "Add"} Ticket Type
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmModal onCloseModal={closeModal} onConfirm={handleDelete} />
    </div>
  );
};

export default TicketManagement;
